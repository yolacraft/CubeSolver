import * as THREE from "three";

const remapAzimuth = (input: number): number => {
    let val = ((input + 180) % 360) - 180;

    if (val < -90) {
        return -90 + ((val + 180) / 90) * 90;
    } else if (val < 0) {
        return 0 + ((val + 90) / 90) * 90;
    } else if (val <= 90) {
        return 90 + (val / 90) * 90;
    } else {
        return 180 + ((val - 90) / 90) * 90;
    }
};




export const focusCameraOnSphere = (
    camera: THREE.PerspectiveCamera,
    inputX: number,
    elevation: number,
    radius = 30,
    duration = 1
) => {
    const startPos = camera.position.clone();
    const r0 = startPos.length();
    let theta0 = Math.acos(startPos.y / r0);
    let phi0 = Math.atan2(startPos.z, startPos.x);

    const mappedPhi = THREE.MathUtils.degToRad(remapAzimuth(inputX));
    const mappedTheta = THREE.MathUtils.degToRad(90 - elevation); // falls elevation linear bleibt

    let dPhi = mappedPhi - phi0;
    if (dPhi > Math.PI) dPhi -= 2 * Math.PI;
    if (dPhi < -Math.PI) dPhi += 2 * Math.PI;

    const clock = new THREE.Clock();
    const ease = (t: number) => t * t * (3 - 2 * t);

    const animate = () => {
        const t = Math.min(clock.getElapsedTime() / duration, 1);
        const tEased = ease(t);

        const phi = phi0 + dPhi * tEased;
        const theta = theta0 + (mappedTheta - theta0) * tEased;

        const x = radius * Math.sin(theta) * Math.cos(phi);
        const y = radius * Math.cos(theta);
        const z = radius * Math.sin(theta) * Math.sin(phi);

        camera.position.set(x, y, z);
        camera.lookAt(0, 0, 0);

        if (t < 1) requestAnimationFrame(animate);
    };

    animate();
};
