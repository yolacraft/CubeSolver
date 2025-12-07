import * as THREE from "three";
import {getScene} from "@/treeJS/Renderer/init";

const colorMap: Record<string, string[]> = {
    top:    ["yellow","yellow","yellow","yellow","yellow","yellow","yellow","yellow","yellow"],
    bottom: ["white","white","white","white","white","white","white","white","white"],
    front:  ["green","green","green","green","green","green","green","green","green"],
    back:   ["blue","blue","blue","blue","blue","blue","blue","blue","blue"],
    left:   ["red","red","red","red","red","red","red","red","red"],
    right:  ["orange","orange","orange","orange","orange","orange","orange","orange","orange"],
};

const idx = (row: number, col: number) => row * 3 + col;

export const getCubeState = (): string => {
    const faceColors: Record<string, string> = {
        top: "U",
        bottom: "D",
        front: "F",
        back: "B",
        left: "L",
        right: "R",
    };

    const colorToFace: Record<string, string> = {};
    (Object.keys(colorMap) as (keyof typeof colorMap)[]).forEach(face => {
        const centerColor = colorMap[face][4]; // immer das mittlere Feld
        colorToFace[centerColor] = faceColors[face];
    });

    const faceOrder: (keyof typeof colorMap)[] = ["top", "right", "front", "bottom", "left", "back"];

    let state = "";

    for (const face of faceOrder) {
        for (const color of colorMap[face]) {
            const faceLetter = colorToFace[color];
            if (!faceLetter) {
                throw new Error(`Color "${color}" not recognized in colorMap center colors.`);
            }
            state += faceLetter;
        }
    }

    return state;
};

export const setToCubestate = (CubeState: string) => {
    if (CubeState.length !== 54) {
        console.error("Invalid CubeState length. Must be 54 characters.");
        return;
    }

    const faceLetterToColor: Record<string, string> = {
        U: colorMap.top[4],
        D: colorMap.bottom[4],
        F: colorMap.front[4],
        B: colorMap.back[4],
        L: colorMap.left[4],
        R: colorMap.right[4],
    };

    const faceOrder: (keyof typeof colorMap)[] = ["top", "right", "front", "bottom", "left", "back"];

    let pos = 0;
    for (const face of faceOrder) {
        for (let i = 0; i < 9; i++) {
            const letter = CubeState[pos];
            const color = faceLetterToColor[letter];
            if (!color) {
                console.error(`Unknown face letter "${letter}" at position ${pos}`);
                return;
            }
            colorMap[face][i] = color;
            pos++;
        }
    }

    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            for (let z = 0; z < 3; z++) {
                const cube = cubes[x][y][z];
                if (!cube) continue;

                const newMaterials = getMaterials(x, y, z);
                (cube.material as THREE.Material[]).forEach((_, i) => {
                    (cube.material as THREE.Material[])[i] = newMaterials[i];
                });
            }
        }
    }
};


const colorToMaterial = (color: string) =>
    new THREE.MeshStandardMaterial({ color: new THREE.Color(color) });

const cubes: (THREE.Mesh | null)[][][] = [];

const getMaterials = (x: number, y: number, z: number): THREE.Material[] => {
    const black = new THREE.MeshStandardMaterial({ color: 0x000000 });

    return [
        // RIGHT
        x === 2 ? colorToMaterial(colorMap.right[idx(2 - y, 2 - z)]) : black,
        // LEFT
        x === 0 ? colorToMaterial(colorMap.left[idx(2 - y, z)]) : black,
        // TOP
        y === 2 ? colorToMaterial(colorMap.top[idx(z, x)]) : black,
        // BOTTOM
        y === 0 ? colorToMaterial(colorMap.bottom[idx(2 - z, x)]) : black,
        // FRONT
        z === 2 ? colorToMaterial(colorMap.front[idx(2 - y, x)]) : black,
        // BACK
        z === 0 ? colorToMaterial(colorMap.back[idx(2 - y, 2 - x)]) : black,
    ];
};

export const initCube = (scene: THREE.Scene) => {
    const cubeGeometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);

    for (let x = 0; x < 3; x++) {
        cubes[x] = [];
        for (let y = 0; y < 3; y++) {
            cubes[x][y] = [];
            for (let z = 0; z < 3; z++) {
                if (x === 1 && y === 1 && z === 1) {
                    cubes[x][y][z] = null;
                    continue;
                }

                const cube = new THREE.Mesh(cubeGeometry, getMaterials(x, y, z));
                cube.position.set(x - 1, y - 1, z - 1);
                scene.add(cube);
                cubes[x][y][z] = cube;
            }
        }
    }

    const innerCube = new THREE.Mesh(
        new THREE.BoxGeometry(2.8, 2.8, 2.8),
        new THREE.MeshStandardMaterial({ color: 0x000000 })
    );
};

export const setColor = (face: string, index: number, color: string) => {
    if (!colorMap[face] || index < 0 || index > 8) {
        console.error("Invalid face or index");
        return;
    }

    colorMap[face][index] = color;

    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            for (let z = 0; z < 3; z++) {
                const cube = cubes[x][y][z];
                if (!cube) continue;

                const newMaterials = getMaterials(x, y, z);
                (cube.material as THREE.Material[]).forEach((mat, i) => {
                    (cube.material as THREE.Material[])[i] = newMaterials[i];
                });
            }
        }
    }
};



const rotateFace = (face: string, clockwise = true) => {
    const f = [...colorMap[face]];
    const newFace = [];
    if (clockwise) {
        newFace[0] = f[6]; newFace[1] = f[3]; newFace[2] = f[0];
        newFace[3] = f[7]; newFace[4] = f[4]; newFace[5] = f[1];
        newFace[6] = f[8]; newFace[7] = f[5]; newFace[8] = f[2];
    } else {
        // CCW
        newFace[0] = f[2]; newFace[1] = f[5]; newFace[2] = f[8];
        newFace[3] = f[1]; newFace[4] = f[4]; newFace[5] = f[7];
        newFace[6] = f[0]; newFace[7] = f[3]; newFace[8] = f[6];
    }
    colorMap[face] = newFace;
};

const cycleColors = (
    indicesA: { face: string; idx: number[] },
    indicesB: { face: string; idx: number[] },
    indicesC: { face: string; idx: number[] },
    indicesD: { face: string; idx: number[] },
    clockwise: boolean
) => {
    const getColors = (f: { face: string; idx: number[] }) => f.idx.map(i => colorMap[f.face][i]);

    const colorsA = getColors(indicesA);
    const colorsB = getColors(indicesB);
    const colorsC = getColors(indicesC);
    const colorsD = getColors(indicesD);

    const setColors = (f: { face: string; idx: number[] }, colors: string[]) => {
        f.idx.forEach((idx, i) => {
            colorMap[f.face][idx] = colors[i];
        });
    };

    if (clockwise) {
        setColors(indicesB, colorsA);
        setColors(indicesC, colorsB);
        setColors(indicesD, colorsC);
        setColors(indicesA, colorsD);
    } else {
        setColors(indicesD, colorsA);
        setColors(indicesC, colorsD);
        setColors(indicesB, colorsC);
        setColors(indicesA, colorsB);
    }
};

export const performMove = (move: string) => {
    const times = move.endsWith("2") ? 2 : 1;
    let clockwise = !move.endsWith("'");

    for (let t = 0; t < times; t++) {
        const baseMove = move[0];

        switch (baseMove) {
            case "U":
                rotateFace("top", clockwise);
                cycleColors(
                    { face: "front", idx: [0, 1, 2] },
                    { face: "left",  idx: [0, 1, 2] },
                    { face: "back",  idx: [0, 1, 2] },
                    { face: "right", idx: [0, 1, 2] },
                    clockwise
                );
                break;
            case "D":
                rotateFace("bottom", clockwise);
                cycleColors(
                    { face: "front", idx: [6, 7, 8] },
                    { face: "right", idx: [6, 7, 8] },
                    { face: "back",  idx: [6, 7, 8] },
                    { face: "left",  idx: [6, 7, 8] },
                    clockwise
                );
                break;
            case "F":
                rotateFace("front", clockwise);
                cycleColors(
                    { face: "top",    idx: [6, 7, 8] },
                    { face: "right",  idx: [0, 3, 6] },
                    { face: "bottom", idx: [2, 1, 0] },
                    { face: "left",   idx: [8, 5, 2] },
                    clockwise
                );
                break;
            case "B":
                rotateFace("back", clockwise);
                cycleColors(
                    { face: "top",    idx: [2, 1, 0] },
                    { face: "left",   idx: [0, 3, 6] },
                    { face: "bottom", idx: [6, 7, 8] },
                    { face: "right",  idx: [8, 5, 2] },
                    clockwise
                );
                break;
            case "R":
                rotateFace("right", clockwise);
                cycleColors(
                    { face: "front",  idx: [2, 5, 8] },
                    { face: "top",    idx: [2, 5, 8] },
                    { face: "back",   idx: [6, 3, 0] },
                    { face: "bottom", idx: [2, 5, 8] },
                    clockwise
                );
                break;
            case "L":
                rotateFace("left", clockwise);
                cycleColors(
                    { face: "front",  idx: [0, 3, 6] },
                    { face: "bottom", idx: [0, 3, 6] },
                    { face: "back",   idx: [8, 5, 2] },
                    { face: "top",    idx: [0, 3, 6] },
                    clockwise
                );
                break;
        }
    }

    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            for (let z = 0; z < 3; z++) {
                const cube = cubes[x][y][z];
                if (!cube) continue;
                const newMaterials = getMaterials(x, y, z);
                (cube.material as THREE.Material[]).forEach((_, i) => {
                    (cube.material as THREE.Material[])[i] = newMaterials[i];
                });
            }
        }
    }
};



const moveAxis: Record<string, "x" | "y" | "z"> = {
    U: "y", D: "y",
    F: "z", B: "z",
    R: "x", L: "x"
};

const getCubesForMove = (move: string): THREE.Mesh[] => {
    const cubesToRotate: THREE.Mesh[] = [];
    const layer = move[0];
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            for (let z = 0; z < 3; z++) {
                const cube = cubes[x][y][z];
                if (!cube) continue;

                switch (layer) {
                    case "U": if (y === 2) cubesToRotate.push(cube); break;
                    case "D": if (y === 0) cubesToRotate.push(cube); break;
                    case "F": if (z === 2) cubesToRotate.push(cube); break;
                    case "B": if (z === 0) cubesToRotate.push(cube); break;
                    case "R": if (x === 2) cubesToRotate.push(cube); break;
                    case "L": if (x === 0) cubesToRotate.push(cube); break;
                }
            }
        }
    }
    return cubesToRotate;
};

export const animateMove = async (move: string, duration = 300) => {
    const times = move.endsWith("2") ? 2 : 1;
    const clockwise = !move.endsWith("'");



    for (let t = 0; t < times; t++) {
        const cubesToRotate = getCubesForMove(move);

        const group = new THREE.Group();
        for (const cube of cubesToRotate) group.add(cube);

        const scene = getScene();
        scene.add(group);

        const axis = moveAxis[move[0]];
        let angle = (clockwise ? -1 : 1) * Math.PI / 2;

        // Visuelle Korrektur für L und B bleibt bestehen (das ist korrekt für ThreeJS Koordinaten)
        if (move[0] === "L" || move[0] === "B" || move[0] === "D") {
            angle *= -1;
        }

        await new Promise<void>((resolve) => {
            const start = performance.now();
            const animate = (now: number) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);

                group.rotation[axis] = angle * progress;

                if (progress < 1) requestAnimationFrame(animate);
                else resolve();
            };
            requestAnimationFrame(animate);
        });

        for (let i = group.children.length - 1; i >= 0; i--) {
            const cube = group.children[i] as THREE.Mesh;
            group.remove(cube);
            scene.add(cube);
        }
        group.rotation.set(0, 0, 0);
        scene.remove(group);

        // FIX: Wir müssen das Prime (') mitgeben, wenn es keine Clockwise-Drehung ist
        const stepMove = move[0] + (clockwise ? "" : "'");
        performMove(stepMove);
    }
};


