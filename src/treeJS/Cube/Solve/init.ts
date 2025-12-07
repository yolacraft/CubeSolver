import {getCubeState} from "@/treeJS/Cube/Cube";
import {getNotation} from "@/treeJS/Cube/Animations/begin";
import {getNotationFromNumber, parseCubeNotation, stringifyCubeNotation} from "@/treeJS/Cube/Notations/parse";
import {useState} from "react";

let solve:number[];
let incompleted:number[] = [];
let completed:number[] = [];
let CubeState:string = "";


export const initSolve = () => {

    getNotation().current?.classList.remove('hidden');

    setTimeout(() => {
        (async () => {
            try {
                const cubeState = getCubeState();
                CubeState = cubeState;
                const solution = await fetchCubeSolution(cubeState);
                console.log(solution);
                const notationRef = getNotation().current;
                notationRef?.classList.remove('hidden');
                notationRef?.classList.add('flex');
                notationRef?.classList.add('flex-warp');
                if (notationRef) {
                    if(solution == "Cube invalid"){
                        notationRef.textContent = solution;
                    }else{
                        notationRef.textContent = "";

                        solve = parseCubeNotation(solution);
                        incompleted = [...solve];
                        completed = [];
                    }
                }

            } catch (err) {
                console.log(err);
            }
        })();
    }, 2000);
};

async function fetchCubeSolution(cubeState: string): Promise<string> {
    const url = 'https://api.yolacraft.de/solve';


    try {
        const response = await fetch(url, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ state: cubeState }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.solution) {
            return "Cube invalid";
        }

        return data.solution;
    } catch (err) {
        console.error(err);
        return "Cube invalid";
    }
}


export const getCompleted = () => {
    return completed;
}

export const getIncompleted = () => {
    return incompleted;
}

export const nextNotation = () => {
    if(incompleted.length == 0){
        return;
    }
    completed.push(incompleted[0]);
    incompleted.shift();
}

export const getSolve = () => {
    return solve;
}

export const setIdx = (idx: number) => {
    completed   = solve.slice(0, idx);
    incompleted = solve.slice(idx);
}


export const getLocalCubeState = () => {
    return CubeState;
}