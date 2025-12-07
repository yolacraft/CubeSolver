import * as THREE from "three";

export const renderLoop = (
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera
) => {
    const clock = new THREE.Clock();
    let angle = 0;
    const radius = 30;
    const speed = 0.5;
    function animate() {
        const delta = clock.getDelta();
        angle += speed * delta;

        camera.position.x = Math.cos(angle) * radius;
        camera.position.z = Math.sin(angle) * radius;
        camera.lookAt(0, 0, 0);


        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    animate();
};


