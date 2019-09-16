import React, { useState, useEffect, useRef } from 'react';
import { Circle, Line } from 'react-konva';

interface Point {
    x: number;
    y: number;
}

type Edge = number[];

type Face = number[];

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

const nRandomVectors = (n: number): Vector[] => {
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
    [ 0, 1, 4 ],
    [ 0, 1, 7 ],
    [ 0, 4, 10 ],
    [ 0, 6, 7 ],
    [ 0, 6, 10 ],
    [ 1, 4, 5 ],
    [ 1, 5, 9 ],
    [ 1, 7, 9 ],
    [ 2, 3, 6 ],
    [ 2, 3, 11 ],
    [ 2, 6, 10 ],
    [ 2, 8, 10 ],
    [ 2, 8, 11 ],
    [ 3, 6, 7 ],
    [ 3, 7, 9 ],
    [ 3, 9, 11 ],
    [ 4, 5, 8 ],
    [ 4, 8, 10 ],
    [ 5, 8, 11 ],
    [ 5, 9, 11 ],
];
// const triangles = [];
// for (let i = 0; i < ICOSAHEDRON_EDGES.length; i++) {
//     let [a, b] = ICOSAHEDRON_EDGES[i];
//     for (let j = 0; j < ICOSAHEDRON_EDGES.length; j++) {
//         let [b_, c] = ICOSAHEDRON_EDGES[j];
//         if (b_ === b) {
//             for (let k = 0; k < ICOSAHEDRON_EDGES.length; k++) {
//                 let [a_, c_] = ICOSAHEDRON_EDGES[k];
//                 if (a_ === a && c_ === c) {
//                     triangles.push([a, b, c]);
//                 }
//             }
//         }
//     }
// }

const generateIcosahedralEdges = (vectors: Vector[]): Edge[] => ICOSAHEDRON_EDGES.map(([i, j]) => [
    vectors[i].x, vectors[i].y,
    vectors[j].x, vectors[j].y,
]);

const generateIcosahedralFaces = (vectors: Vector[]): Face[] => ICOSAHEDRON_FACES.map(([i, j, k]) => [
    vectors[i].x, vectors[i].y,
    vectors[j].x, vectors[j].y,
    vectors[k].x, vectors[k].y,
]);


interface Props {
    animated: boolean;
    strokeColor: string;
    faceColor: string;
}

export default ({ animated, strokeColor, faceColor }: Props) => {
    const [vectors, setVectors] = useState<Vector[]>(nRandomVectors(12));
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
    const faces = generateIcosahedralFaces(vectors);

    return (
        <>
            {faces.map((face, idx) => (
                <Line key={`f${idx}`} points={face} fill={faceColor} closed={true} />
            ))}
            {vectors.map((v, idx) => (
                <Circle key={`v${idx}`} x={v.x} y={v.y} radius={2} fill={strokeColor} />
            ))}
            {edges.map((edge, idx) => (
                <Line key={`e${idx}`} points={edge} stroke={strokeColor} strokeWidth={1} />
            ))}
        </>
    );

}