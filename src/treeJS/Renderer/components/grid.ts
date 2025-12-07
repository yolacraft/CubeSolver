import * as THREE from "three";

export const createGrid = (scene: THREE.Scene) => {
    const gridHelper = new THREE.GridHelper(200, 75);
    scene.add(gridHelper);
};
