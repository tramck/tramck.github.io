import React, { useState, useEffect, useRef } from 'react';
import { Circle, Line } from 'react-konva';

interface Point {
    x: number;
    y: number;
}

type Edge = number[];

interface Vector extends Point {
    dx: number;
    dy: number;
}

const W = window.innerWidth;
const H = window.innerHeight;

const updateVector = ({ x, y, dx, dy }: Vector): Vector => ({
    x: x + dx,
    y: y + dy,
    dx: ((x < 0 && dx < 0) || (x > W && dx > 0)) ? dx * -1 : dx,
    dy: ((y < 0 && dy < 0) || (y > H && dy > 0)) ? dy * -1 : dy,
});

const randBetween = (a, b) => a + Math.random() * (b - a);

const generateRandomVectors = (n: number): Vector[] => {
    const arr = [];
    for (let i = 0; i < n; i++) {
        arr.push({
            x: randBetween(0, W),
            y: randBetween(0, H),
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

const ICOSAHEDRON_ADJACENCY_MATRIX = [
    [0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1],
    [0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1],
    [1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0],
];

const generateIcosahedralEdges = (vectors: Vector[]): Edge[] => {
    const edges = [];
    for (let i = 0; i < ICOSAHEDRON_ADJACENCY_MATRIX.length; i++) {
        for (let j = i; j < ICOSAHEDRON_ADJACENCY_MATRIX[i].length; j++) {
            if (ICOSAHEDRON_ADJACENCY_MATRIX[i][j]) {
                let vi = vectors[i];
                let vj = vectors[j];
                edges.push([ vi.x, vi.y, vj.x, vj.y ]);
            }
        }
    }
    return edges;
}

export default ({ animated, strokeColor }: Props) => {
    const [vectors, setVectors] = useState<Vector[]>(generateRandomVectors(12));
    const rafRef = useRef<number>();

    useEffect(() => {
        if (animated) {
            const animate = () => {
                setVectors(vectors.map(updateVector));
            };
            rafRef.current = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(rafRef.current);
        }
    }, [vectors]);

    const edges = generateIcosahedralEdges(vectors);

    return (
        <>
            {vectors.map((v, idx) => (
                <Circle key={`v${idx}`} x={v.x} y={v.y} radius={4} fill={strokeColor} />
            ))}
            {edges.map((edge, idx) => (
                <Line key={`e${idx}`} points={edge} stroke={strokeColor} strokeWidth={2} />
            ))}
        </>
    );

}