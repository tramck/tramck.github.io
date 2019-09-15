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
            dx: randBetween(-3, 3),
            dy: randBetween(-3, 3),
        });
    }
    return arr;
}

interface Props {
    animated: boolean;
    strokeColor: string;
}

const ICOSAHEDRON_EDGES = [
    [0, 1],
    [0, 4],
    [0, 6],
    [0, 7],
    [0, 10],
    [1, 4],
    [1, 5],
    [1, 7],
    [1, 9],
    [2, 3],
    [2, 6],
    [2, 8],
    [2, 10],
    [2, 11],
    [3, 6],
    [3, 7],
    [3, 9],
    [3, 11],
    [4, 5],
    [4, 8],
    [4, 10],
    [5, 8],
    [5, 9],
    [5, 11],
    [6, 7],
    [6, 10],
    [7, 9],
    [8, 10],
    [8, 11],
    [9, 11],
];

const ICOSAHEDRON_FACES = [
    [ 0, 5, 1 ],
    [ 0, 7, 3 ],
    [ 1, 20, 4 ],
    [ 2, 24, 3 ],
    [ 2, 25, 4 ],
    [ 5, 18, 6 ],
    [ 6, 22, 8 ],
    [ 7, 26, 8 ],
    [ 9, 14, 10 ],
    [ 9, 17, 13 ],
    [ 10, 25, 12 ],
    [ 11, 27, 12 ],
    [ 11, 28, 13 ],
    [ 14, 24, 15 ],
    [ 15, 26, 16 ],
    [ 16, 29, 17 ],
    [ 18, 21, 19 ],
    [ 19, 27, 20 ],
    [ 21, 28, 23 ],
    [ 22, 29, 23 ],
];
// for (let i = 0; i < ICOSAHEDRON_EDGES.length; i++) {
//     let [a, b] = ICOSAHEDRON_EDGES[i];
//     for (let j = 0; j < ICOSAHEDRON_EDGES.length; j++) {
//         let [b_, c] = ICOSAHEDRON_EDGES[j];
//         if (b_ === b) {
//             for (let k = 0; k < ICOSAHEDRON_EDGES.length; k++) {
//                 let [a_, c_] = ICOSAHEDRON_EDGES[k];
//                 if (a_ === a && c_ === c) {
//                     triangles.push([i, j, k]);
//                 }
//             }
//         }
//     }
// }

const generateIcosahedralEdges = (vectors: Vector[]): Edge[] =>
    ICOSAHEDRON_EDGES.map(([i, j]) => [
        vectors[i].x, vectors[i].y, vectors[j].x, vectors[j].y
    ]
);

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