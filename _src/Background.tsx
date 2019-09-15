import React from 'react';
import { useStoreState } from 'easy-peasy';
import { Stage, Layer, Rect } from 'react-konva';
import ShapeThing from './ShapeThing';

interface Props {
    animated: boolean;
}

export default ({ animated }: Props) => {
    // setup stage
    const bgColor = useStoreState(state => state.colors.bgColor);
    const strokeColor = useStoreState(state => state.colors.strokeColor);
    return (
        <Stage width={window.innerWidth} height={window.innerHeight} x={0} y={0}>
            <Layer x={0} y={0} width={window.innerWidth} height={window.innerHeight}>
                <Rect
                    x={0}
                    y={0}
                    width={window.innerWidth}
                    height={window.innerHeight}
                    fill={bgColor}
                />
                <ShapeThing animated={animated} strokeColor={strokeColor} />
            </Layer>
        </Stage>
    );
};