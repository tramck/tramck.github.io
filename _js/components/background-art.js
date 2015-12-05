import {
  compose,
  map,
  identity,
  times,
  multiply,
  clone
} from 'ramda';

import React, { 
  Component,
  PropTypes 
} from 'react';

import { 
  Group,
  Shape,
  Surface,
  Transform,
  Path
} from 'react-art';

import Circle from 'react-art/shapes/circle';

import log from '../fn/log';

// Number -> Number
const intUnder = n => Math.floor(Math.random() * n);
const radiansFromDeg = deg => deg * (Math.PI/180);

// -> Point
const randomVector = () => {
  return {
    x: intUnder(100),
    y: intUnder(100),
    vx: (Math.random() * 2 - 1) * 0.05,
    vy: (Math.random() * 2 - 1) * 0.05
  };
};

// Number -> Array<Point>
const setupPoints = compose(map(randomVector), times(identity));


// Point -> Point
const recalculatePoint = p => {
  const np = clone(p);
  
  if (np.x > 100 || np.x < 0) {
    np.vx *= -1;
  }

  if (np.y > 100 || np.y < 0) {
    np.vy *= -1;
  }

  np.y += np.vy;
  np.x += np.vx;

  return np;
};

// Array<Point> -> Array<Point>
const recalculatePoints = map(recalculatePoint);


export default class BackgroundArt extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      points: setupPoints(props.count)
    };

    this.renderPoint = this.renderPoint.bind(this);
    this.renderLines = this.renderLines.bind(this);
    this.windowX = this.windowX.bind(this);
    this.windowY = this.windowY.bind(this);
    this.onTick = this.onTick.bind(this);
    this.renderPath = this.renderPath.bind(this);
  }

  componentDidMount() {
    this._interval = setInterval(this.onTick, 20);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  onTick() {
    const points = recalculatePoints(this.state.points);
    this.setState({ points });
  }

  windowX(x) {
    return window.innerWidth * x / 100;
  }

  windowY(y) {
    return window.innerHeight * y  / 100;
  }

  render() {
    return (
      <Surface
        width={window.innerWidth}
        height={window.innerHeight}>
        {this.state.points.map(this.renderLines)}
        {this.state.points.map(this.renderPoint)}
      </Surface>
    );
  }

  renderPoint(p, i) {
    const x = this.windowX(p.x),
          y = this.windowY(p.y);

    return (
      <Group x={x} y={y} key={i}>
        <Circle
          radius={3}
          stroke="green"
          strokeWidth={1}
          fill="blue"/>
      </Group>
    );
  }

  renderLines(point, i) {
    return this.state.points.slice(i, this.state.points.length).map((p, i2) => {
      const path = Path();
      path.move(this.windowX(point.x), this.windowY(point.y));
      path.line(this.windowX(p.x - point.x), this.windowY(p.y - point.y));
      return <Shape 
        stroke="green" 
        strokeWidth={1} 
        d={path}
        key={i2} />;
    }); 
  }

  renderPath() {
    const path = Path();
    const points = this.state.points.slice(0, this.state.points.length);
    let point = this.state.points[0];
          
    path.move(
      this.windowX(point.x), 
      this.windowY(point.y)
    );

    points.forEach(p => {
      path.line(this.windowX(p.x - point.x), this.windowY(p.y - point.y));
      point = p;
    });

    return <Shape 
      stroke="green" 
      strokeWidth={3} 
      d={path} />;
  }
}

BackgroundArt.propTypes = { 
  count: PropTypes.number.isRequired
};