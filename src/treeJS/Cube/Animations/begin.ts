import * as THREE from "three";
import { focusCameraOnSphere } from "@/treeJS/Renderer/cameraHelpers";
import { removeColor } from "@/treeJS/Cube/Animations/color/removeColor";
import { nextHighlight } from "@/treeJS/Cube/Input/init";
import { RefObject } from "react";

let deck:RefObject<HTMLDivElement |null>;
let notation:RefObject<HTMLDivElement |null>;

export const beginAnimation = (camera: THREE.PerspectiveCamera, colordeck: RefObject<HTMLDivElement |null>,  notationdeck: RefObject<HTMLDivElement |null>): void => {

    deck = colordeck;
    notation = notationdeck;

    focusCameraOnSphere(camera, 8, 8, 30, 1);

    removeColor();
    setTimeout(() => {
        nextHighlight();
        if (colordeck.current) {
            colordeck.current.classList.remove("hidden");
        }
    }, 1200);
};

export const hideDeck = () => {
    if(deck.current) {
        deck.current.classList.add("hidden");
    }
}

export const getNotation = () => {
    return notation;
}
