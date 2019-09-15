import React, { useState, useEffect, useRef } from 'react';
import { Circle } from 'react-konva';

type Vector = {
    x: number;
    y: number;
    dx: number;
    dy: number;
}

const updateVector = ({ x, y, dx, dy }: Vector): Vector => ({
    x: x + dx,
    y: y + dy,
    dx: (x < 0 || x > window.innerWidth) ? dx * -1 : dx,
    dy: (y < 0 || y > window.innerHeight) ? dy * -1 : dy,
});

const randBetween = (a, b) => a + Math.random() * (b - a);

const generateRandomVectors = (n: number): Vector[] => {
    const arr = [];
    for (let i = 0; i < n; i++) {
        arr.push({
            x: randBetween(0, window.innerWidth),
            y: randBetween(0, window.innerHeight),
            dx: randBetween(1, 3),
            dy: randBetween(1, 3),
        });
    }
    return arr;
}

interface Props {
    animated: boolean;
    strokeColor: string;
}

export default ({ animated, strokeColor }: Props) => {
    const [vectors, setVectors] = useState<Vector[]>(generateRandomVectors(10));
    console.log(vectors);
    const rafRef = useRef<number>();

    const animate = t => {
        setVectors(vectors.map(v => updateVector(v)));
        rafRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (animated) {
            rafRef.current = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(rafRef.current);
        }
    }, []);

    return (
        <>
            {vectors.map((v, idx) => (
                <Circle key={idx} x={v.x} y={v.y} radius={10} fill={strokeColor} />
            ))}
        </>
    );

}