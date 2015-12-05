import {
  compose,
  map,
  identity,
  times,
  multiply
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

const intUnder = n => Math.floor(Math.random() * n);

const randomVector = () => {
  return {
    x: intUnder(100),
    y: intUnder(100),
    d: intUnder(360),
    v: 2
  };
};

const setupPoints = compose(map(randomVector), times(identity));

/**
 * An animated SVG component.
 */
export default class BackgroundArt extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      points: setupPoints(props.count)
    };

    this.renderPoint = this.renderPoint.bind(this);
    this.windowX = this.windowX.bind(this);
    this.windowY = this.windowY.bind(this);
  }

  /**
   * When the component is mounted into the document - this is similar to a
   * constructor, but invoked when the instance is actually mounted into the
   * document. Here's, we'll just set up an animation loop that invokes our
   * method. Binding of `this.onTick` is not needed because all React methods
   * are automatically bound before being mounted.
   */
  componentDidMount() {
    // this._interval = setInterval(this.onTick, 20);
  }

  componentWillUnmount() {
    // clearInterval(this._interval);
  }

  onTick() {
    var nextDegrees = this.state.degrees + BASE_VEL + this.state.velocity;
    var nextVelocity = this.state.velocity * this.state.drag;
    this.setState({degrees: nextDegrees, velocity: nextVelocity});
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