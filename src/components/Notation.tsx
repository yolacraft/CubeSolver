import React from "react";
import { getNotationFromNumber } from "@/treeJS/Cube/Notations/parse";
import { setIdx } from "@/treeJS/Cube/Solve/init";
import { animateMove, performMove, setToCubestate } from "@/treeJS/Cube/Cube";

interface CubeProps {
    action: number;
    state: number;
    idx: number;
    prevMoves: number[];
    cubeState: string;
}

export const CubeNotation: React.FC<CubeProps> = ({ action, state, idx, cubeState, prevMoves }) => {

    const onHandleClick = () => {
        setToCubestate(cubeState);
        prevMoves.forEach(move => performMove(getNotationFromNumber(move)));
        setIdx(idx-1);
    }

    let textColor = "text-white";
    if (state === 1) textColor = "text-purple-700";
    if (state === 0) textColor = "text-neutral-500";

    return (
        <div className="bg-neutral-700 border-2 border-neutral-800 text-5xl px-4 py-2 h-16">
            <span className={`cursor-pointer ${textColor}`} onClick={onHandleClick}>
                {getNotationFromNumber(action)}
            </span>
        </div>
    );
}
