import {setColor} from "@/treeJS/Cube/Cube";

export const removeColor = () => {
    let idx = 0;

    const intervall = setInterval(() => {
        if(idx == 4){
            idx++;
        }

        setColor("front", idx, "black");
        setColor("back", idx, "black");
        setColor("left", idx, "black");
        setColor("right", idx, "black");
        setColor("top", idx, "black");
        setColor("bottom", idx, "black");
        idx++;
        if(idx == 9){
            clearInterval(intervall);
        }
    }, 100)
}