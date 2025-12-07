import {clearHighlight, createHighlight} from "@/treeJS/Cube/Highlight/highlight";
import {setColor} from "@/treeJS/Cube/Cube";
import {focusCameraOnSphere} from "@/treeJS/Renderer/cameraHelpers";
import {getCamera} from "@/treeJS/Renderer/init";
import {initSolve} from "@/treeJS/Cube/Solve/init";
import {hideDeck} from "@/treeJS/Cube/Animations/begin";

let idx = 0;

export const nextHighlight = (): void => {
    const face = Math.floor(idx / 9);
    const element = idx % 9;
    if(element === 4){
        createHighlight(getFace(face), 5);

    }else{
        createHighlight(getFace(face), element);
    }
}

export const addColor = (color:string) => {
    if(idx%9==8){
        updateRotation(Math.floor(idx/9))
    }


    if(idx%9 == 4){
        idx ++;
    }


    if(idx != 53){
        setColor(getFace(Math.floor(idx/9)), idx%9, color);
        idx++;
        nextHighlight();
    }else{
        setColor(getFace(Math.floor(idx/9)), idx%9, color);
        clearHighlight();
        hideDeck();
        initSolve();
    }

}

export const back = (): void => {
    if(idx > 0){
        idx--;
        if(idx % 9 == 4){
            idx--;
        }
        if(idx%9==8){
            try {
                updateRotation(Math.floor(idx/9)-1)
            }catch(e){
                console.error(e);
            }
        }
        setColor(getFace(Math.floor(idx/9)), idx%9, "black");
        nextHighlight();
    }
}

const getFace = (idx: number): "front" | "right" | "back" | "left" | "top" | "bottom" => {
    const faces = ["front", "right", "back", "left", "top", "bottom"] as const;
    if (idx < 0 || idx >= faces.length) {
        throw new Error("Ungültiger Index");
    }
    return faces[idx];
};


const updateRotation = (face: number) => {
    switch(face){
        case -1:
            focusCameraOnSphere(getCamera(), 8, 8);
            break;
        case 0:
            focusCameraOnSphere(getCamera(), -82, 8);
            break;
        case 1:
            focusCameraOnSphere(getCamera(), -172, 8);
            break;
        case 2:
            focusCameraOnSphere(getCamera(), 98, 8);
            break;
        case 3:
            focusCameraOnSphere(getCamera(), 0, 75);
            break;
        case 4:
            focusCameraOnSphere(getCamera(), 0, -75);
            break;
        case 5:
            focusCameraOnSphere(getCamera(), 16, 16);
            break;
    }
}