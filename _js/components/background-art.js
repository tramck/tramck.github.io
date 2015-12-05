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
  Transform 
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
    this.windowX = this.windowX.bind(this);
    this.windowY = this.windowY.bind(this);
    this.onTick = this.onTick.bind(this);
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

  render() {
    return (
      <Surface
        width={window.innerWidth}
        height={window.innerHeight}>
        {this.state.points.map(this.renderPoint)}
      </Surface>
    );
  }

  windowX(x) {
    return window.innerWidth * x / 100;
  }

  windowY(y) {
    return window.innerHeight * y  / 100;
  }

  renderPoint(p, i) {
    const x = this.windowX(p.x),
          y = this.windowY(p.y);

    return (
      <Group x={x} y={y} key={i}>
        <Circle
          radius={10}
          stroke="green"
          strokeWidth={3}
          fill="blue"/>
      </Group>
    );
  }
}

BackgroundArt.propTypes = { 
  count: PropTypes.number.isRequired
};