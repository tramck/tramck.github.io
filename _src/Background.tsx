import React from 'react';
import { useStoreState } from 'easy-peasy';
import { Stage, Layer, Rect } from 'react-konva';
import Icosahedron from './Icosahedron';

interface Props {
    animated: boolean;
}

export default ({ animated }: Props) => {
    const bgColor = useStoreState(state => state.colors.bgColor);
    const strokeColor = useStoreState(state => state.colors.strokeColor);
    const faceColor = useStoreState(state => state.colors.faceColor);
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
                <Icosahedron animated={animated} strokeColor={strokeColor} faceColor={faceColor} />
            </Layer>
        </Stage>
    );
};