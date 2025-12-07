import * as THREE from "three";
import { getScene } from "@/treeJS/Renderer/init";
import { Vector3 } from "three";

let currentHighlight: THREE.Group | null = null;

export const createHighlight = (face: string, id: number) => {
    if (currentHighlight) {
        getScene().remove(currentHighlight);
        currentHighlight.traverse((child) => {
            if ((child as THREE.Mesh).geometry) (child as THREE.Mesh).geometry.dispose();
            if ((child as THREE.Mesh).material) ((child as THREE.Mesh).material as THREE.Material).dispose();
        });
        currentHighlight = null;
    }

    const highlight = new THREE.BoxGeometry(0.1, 0.9, 0.01);
    const highlight2 = new THREE.BoxGeometry(0.7, 0.1, 0.01);
    const material = new THREE.MeshStandardMaterial({ color: 0xF1F1F1 });

    const highlightSegment1 = new THREE.Mesh(highlight, material);
    highlightSegment1.position.set(-0.4, 0, 0);

    const highlightSegment2 = new THREE.Mesh(highlight, material);
    highlightSegment2.position.set(0.4, 0, 0);

    const highlightSegment3 = new THREE.Mesh(highlight2, material);
    highlightSegment3.position.set(0, -0.4, 0);

    const highlightSegment4 = new THREE.Mesh(highlight2, material);
    highlightSegment4.position.set(0, 0.4, 0);

    const group = new THREE.Group();
    group.add(highlightSegment1, highlightSegment2, highlightSegment3, highlightSegment4);

    if (face == "front") {
        switch (id) {
            case 0: group.position.set(-1, 1, 1.5); break;
            case 1: group.position.set(0, 1, 1.5); break;
            case 2: group.position.set(1, 1, 1.5); break;
            case 3: group.position.set(-1, 0, 1.5); break;
            case 4: group.position.set(0, 0, 1.5); break;
            case 5: group.position.set(1, 0, 1.5); break;
            case 6: group.position.set(-1, -1, 1.5); break;
            case 7: group.position.set(0, -1, 1.5); break;
            case 8: group.position.set(1, -1, 1.5); break;
        }
    } else if (face == "back") {
        switch (id) {
            case 0: group.position.set(1, 1, -1.5); break;
            case 1: group.position.set(0, 1, -1.5); break;
            case 2: group.position.set(-1, 1, -1.5); break;
            case 3: group.position.set(1, 0, -1.5); break;
            case 4: group.position.set(0, 0, -1.5); break;
            case 5: group.position.set(-1, 0, -1.5); break;
            case 6: group.position.set(1, -1, -1.5); break;
            case 7: group.position.set(0, -1, -1.5); break;
            case 8: group.position.set(-1, -1, -1.5); break;
        }
    } else if (face == "top") {
        switch (id) {
            case 0: group.rotation.set(-Math.PI / 2, 0, 0); group.position.set(-1, 1.5, -1); break;
            case 1: group.rotation.set(-Math.PI / 2, 0, 0); group.position.set(0, 1.5, -1); break;
            case 2: group.rotation.set(-Math.PI / 2, 0, 0); group.position.set(1, 1.5, -1); break;
            case 3: group.rotation.set(-Math.PI / 2, 0, 0); group.position.set(-1, 1.5, 0); break;
            case 4: group.rotation.set(-Math.PI / 2, 0, 0); group.position.set(0, 1.5, 0); break;
            case 5: group.rotation.set(-Math.PI / 2, 0, 0); group.position.set(1, 1.5, 0); break;
            case 6: group.rotation.set(-Math.PI / 2, 0, 0); group.position.set(-1, 1.5, 1); break;
            case 7: group.rotation.set(-Math.PI / 2, 0, 0); group.position.set(0, 1.5, 1); break;
            case 8: group.rotation.set(-Math.PI / 2, 0, 0); group.position.set(1, 1.5, 1); break;
        }
    } else if (face == "bottom") {
        switch (id) {
            case 0: group.rotation.set(-Math.PI / 2, 0, 0); group.position.set(-1, -1.5, 1); break;
            case 1: group.rotation.set(-Math.PI / 2, 0, 0); group.position.set(0, -1.5, 1); break;
            case 2: group.rotation.set(-Math.PI / 2, 0, 0); group.position.set(1, -1.5, 1); break;
            case 3: group.rotation.set(-Math.PI / 2, 0, 0); group.position.set(-1, -1.5, 0); break;
            case 4: group.rotation.set(-Math.PI / 2, 0, 0); group.position.set(0, -1.5, 0); break;
            case 5: group.rotation.set(-Math.PI / 2, 0, 0); group.position.set(1, -1.5, 0); break;
            case 6: group.rotation.set(-Math.PI / 2, 0, 0); group.position.set(-1, -1.5, -1); break;
            case 7: group.rotation.set(-Math.PI / 2, 0, 0); group.position.set(0, -1.5, -1); break;
            case 8: group.rotation.set(-Math.PI / 2, 0, 0); group.position.set(1, -1.5, -1); break;
        }
    } else if (face == "right") {
        switch (id) {
            case 0: group.rotation.set(0, Math.PI / 2, 0); group.position.set(1.5, 1, 1); break;
            case 1: group.rotation.set(0, Math.PI / 2, 0); group.position.set(1.5, 1, 0); break;
            case 2: group.rotation.set(0, Math.PI / 2, 0); group.position.set(1.5, 1, -1); break;
            case 3: group.rotation.set(0, Math.PI / 2, 0); group.position.set(1.5, 0, 1); break;
            case 4: group.rotation.set(0, Math.PI / 2, 0); group.position.set(1.5, 0, 0); break;
            case 5: group.rotation.set(0, Math.PI / 2, 0); group.position.set(1.5, 0, -1); break;
            case 6: group.rotation.set(0, Math.PI / 2, 0); group.position.set(1.5, -1, 1); break;
            case 7: group.rotation.set(0, Math.PI / 2, 0); group.position.set(1.5, -1, 0); break;
            case 8: group.rotation.set(0, Math.PI / 2, 0); group.position.set(1.5, -1, -1); break;
        }
    } else if (face == "left") {
        switch (id) {
            case 0: group.rotation.set(0, Math.PI / 2, 0); group.position.set(-1.5, 1, -1); break;
            case 1: group.rotation.set(0, Math.PI / 2, 0); group.position.set(-1.5, 1, 0); break;
            case 2: group.rotation.set(0, Math.PI / 2, 0); group.position.set(-1.5, 1, 1); break;
            case 3: group.rotation.set(0, Math.PI / 2, 0); group.position.set(-1.5, 0, -1); break;
            case 4: group.rotation.set(0, Math.PI / 2, 0); group.position.set(-1.5, 0, 0); break;
            case 5: group.rotation.set(0, Math.PI / 2, 0); group.position.set(-1.5, 0, 1); break;
            case 6: group.rotation.set(0, Math.PI / 2, 0); group.position.set(-1.5, -1, -1); break;
            case 7: group.rotation.set(0, Math.PI / 2, 0); group.position.set(-1.5, -1, 0); break;
            case 8: group.rotation.set(0, Math.PI / 2, 0); group.position.set(-1.5, -1, 1); break;
        }
    }

    getScene().add(group);
    currentHighlight = group;
};

export const clearHighlight = () => {
    if (currentHighlight) {
        getScene().remove(currentHighlight);
        currentHighlight.traverse((child) => {
            if ((child as THREE.Mesh).geometry) (child as THREE.Mesh).geometry.dispose();
            if ((child as THREE.Mesh).material) ((child as THREE.Mesh).material as THREE.Material).dispose();
        });
        currentHighlight = null;
    }
}
