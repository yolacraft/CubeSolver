import * as THREE from "three";

export const createLight = (scene: THREE.Scene) => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

};
