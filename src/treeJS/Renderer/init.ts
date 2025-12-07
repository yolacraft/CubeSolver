import * as THREE from "three";
import { createLight } from "./components/lights";
import { initCube } from "@/treeJS/Cube/Cube";

let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;

export const getCamera = () => {
    return camera;
};


export const getScene = () => {
    return scene;
};

export const init = (canvas: HTMLCanvasElement) => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);

    camera = new THREE.PerspectiveCamera(
        16,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 100, 0);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    createLight(scene);
    initCube(scene);

    const animate = () => {
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };
    animate();

    return camera;
};
