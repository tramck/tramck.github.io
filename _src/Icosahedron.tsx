import React, { useState, useEffect, useRef } from 'react';
import { Circle, Line } from 'react-konva';

interface Point {
    x: number;
    y: number;
}

type Edge = number[];

type Face = number[];

interface VectorPoint extends Point {
    dx: number;
    dy: number;
}

const W = window.innerWidth;
const H = window.innerHeight;

const MAX_V = 2;
const BORDER = 20;
const C_X = W / 2;
const C_Y = H / 2;
const R = Math.min(C_X, C_Y) - 20;

const updateVector = ({ x, y, dx, dy }: VectorPoint): VectorPoint => {
    // calculate distance from center (dc)
    const dcx = C_X - x;
    const dcy = C_Y - y;
    const dc = Math.sqrt(dcx ** 2 + dcy ** 2);
    let _dx = dx;
    let _dy = dy;

    const isMovingAway = () => Math.sqrt((C_X - x - dx) ** 2 + (C_Y - y - dy) ** 2) > dc;

    if (dc > R && isMovingAway()) {
        // point's polar coordinate relative to center
        //  + 1 to get the normal of the wall angle
        const n_theta = Math.atan(dcy / dcx) + 1;
        // −(2(n · v) n − v)
        // normal of wall angle
        const nx = -1 * Math.sin(n_theta);
        const ny = Math.cos(n_theta);
        // dot product
        const dot = _dx * nx + _dy * ny;
        // new _dx, _dy
        _dx = _dx - 2 * dot * nx - _dx;
        _dy = _dy - 2 * dot * ny - _dy;
    }

    return {
        x: x + _dx,
        y: y + _dy,
        dx: _dx,
        dy: _dy,
    };
};

const randBetween = (a, b) => a + Math.random() * (b - a);

const nRandomVectors = (n: number): VectorPoint[] => {
    const arr = [];
    for (let i = 0; i < n; i++) {
        // calculate x and y using polar coordinates in order to
        // contain initial points within R of C
        let r = randBetween(0, R);
        let phi = randBetween(0, 2);
        arr.push({
            x: C_X + r * Math.cos(phi),
            y: C_Y + r * Math.sin(phi),
            dx: randBetween(-MAX_V, MAX_V),
            dy: randBetween(-MAX_V, MAX_V),
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

const generateIcosahedralEdges = (vps: VectorPoint[]): Edge[] => ICOSAHEDRON_EDGES.map(([i, j]) => [
    vps[i].x, vps[i].y,
    vps[j].x, vps[j].y,
]);

const generateIcosahedralFaces = (vps: VectorPoint[]): Face[] => ICOSAHEDRON_FACES.map(([i, j, k]) => [
    vps[i].x, vps[i].y,
    vps[j].x, vps[j].y,
    vps[k].x, vps[k].y,
]);


interface Props {
    animated: boolean;
    strokeColor: string;
    faceColor: string;
}

export default ({ animated, strokeColor, faceColor }: Props) => {
    const [vectors, setVectors] = useState<VectorPoint[]>(nRandomVectors(12));
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