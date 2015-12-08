import {
  compose,
  map,
  identity,
  times,
  multiply,
  clone,
  sortBy,
  prop,
  flatten
} from 'ramda';

import partitionAll from 'partition-all';

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

// [Point] -> [Point]
const recalculatePoints = map(recalculatePoint);


export default class BackgroundArt extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      points: setupPoints(props.rowCount * props.colCount)
    };

    this.renderPoint = this.renderPoint.bind(this);
    this.renderLines = this.renderLines.bind(this);
    this.windowX = this.windowX.bind(this);
    this.windowY = this.windowY.bind(this);
    this.onTick = this.onTick.bind(this);
  }

  componentDidMount() {
    this._interval = setInterval(this.onTick, 50);
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
        {this.renderLines()}
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

  renderLines() {
    const { points } = this.state,
          { colCount } = this.props,
          segments = [],
          pointsToRows = compose(
            map(sortBy(prop('x'))), 
            partitionAll(colCount), 
            sortBy(prop('y'))
          ),
          rows = pointsToRows(points),
          // *---*---*---*
          //  \ / \ / \ / \
          //   *---*---*---*
          //    \ / \ / \ / \
          //     *---*---*---*
          paths = flatten(rows.map((row, i) => {
            const paths = [],
                  path1 = Path();

            row.forEach((p, i2) => {
              if (!i2) {
                return path1.move(this.windowX(p.x), this.windowY(p.y));
              }
              const lp = row[i2-1];
              return path1.line(this.windowX(p.x - lp.x), this.windowY(p.y - lp.y));
            });

            paths.push(path1);
            
            if (i < rows.length - 1) {
              let path2 = Path(),
                  row2 = rows[i+1];

              row.forEach((p, i2) => {
                let p2 = row2[i2],
                    p3 = row[i2+1];

                if (!i2) {
                  path2.move(this.windowX(p.x), this.windowY(p.y));
                }
                
                if (p2) {
                  path2.line(this.windowX(p2.x - p.x), this.windowY(p2.y - p.y));
                  if (p3) {
                    path2.line(this.windowX(p3.x - p2.x), this.windowY(p3.y - p2.y)); 
                  }
                }
              });

              paths.push(path2);
            }
            return paths;
          }));

    return paths.map((p, i) => 
      <Shape 
        stroke="green" 
        strokeWidth={1} 
        d={p}
        key={i} />);
  }
}

BackgroundArt.propTypes = { 
  rowCount: PropTypes.number.isRequired,
  colCount: PropTypes.number.isRequired
};