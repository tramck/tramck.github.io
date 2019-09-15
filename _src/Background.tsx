import React from 'react';
import { useStoreState } from 'easy-peasy';
import { Stage, Layer, Rect } from 'react-konva';

interface Props {
    still: boolean;
}

export default ({ still }: Props) => {
    // setup stage
    const bgColor = useStoreState(state => state.colors.bgColor);
    const strokeColor = useStoreState(state => state.colors.strokeColor);
    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
                <Rect
                    x={0}
                    y={0}
                    width={window.innerWidth}
                    height={window.innerHeight}
                    fill={bgColor}
                />
            </Layer>
        </Stage>
    );
};