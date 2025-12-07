import * as THREE from "three";
import {beginAnimation} from "@/treeJS/Cube/Animations/begin";
import React, {useEffect, useRef, useState} from "react";
import {addColor, back} from "@/treeJS/Cube/Input/init";
import { FaDeleteLeft } from "react-icons/fa6";
import {getCompleted, getIncompleted, getLocalCubeState, getSolve, nextNotation} from "@/treeJS/Cube/Solve/init";
import {CubeNotation} from "@/components/Notation";
import { FaPlay, FaPause } from "react-icons/fa";
import {animateMove} from "@/treeJS/Cube/Cube";
import {getNotationFromNumber} from "@/treeJS/Cube/Notations/parse";

interface HUDProps {
    camera: THREE.PerspectiveCamera;
}

export default function HUD({ camera }: HUDProps) {

    const colorDeckRef = useRef<HTMLDivElement>(null);
    const notationDeckRef = useRef<HTMLDivElement>(null);

    const [incompleted, setIncompleted] = useState<number[]>([]);
    const [completed, setCompleted] = useState<number[]>([]);
    const [cubeState, setCubeState] = useState<string>("");
    const [solve, setSolve] = useState<number[]>([]);
    const [running, setRunning] = useState<boolean>(false);
    const [speed, setSpeed] = useState<number>(3); // Standard: 3 Sekunden

    const incompletedRef = useRef<number[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newIncompleted = [...getIncompleted()];
            const newCompleted = [...getCompleted()];

            setIncompleted(newIncompleted);
            setCompleted(newCompleted);
            setCubeState(getLocalCubeState());
            setSolve(getSolve());
            incompletedRef.current = newIncompleted;
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval2 = setInterval(() => {
            if (running) {
                if (incompletedRef.current.length > 0) {
                    animateMove(getNotationFromNumber(incompletedRef.current[0]));
                    nextNotation();
                } else {
                    setRunning(false);
                }
            }
        }, speed * 1000);

        return () => clearInterval(interval2);
    }, [running, speed]);

    return (
        <div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="bg-neutral-200/60 xl:text-8xl text-6xl py-16 px-24 rounded-2xl cursor-pointer font-extrabold text-white hover:text-purple-700 transition-all"
                     onClick={(event) => {
                         event.currentTarget.style.visibility = "hidden";
                         beginAnimation(camera, colorDeckRef, notationDeckRef);
                     }}>
                    START
                </div>
            </div>

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden transition-all" ref={colorDeckRef}>
                <div className="bg-neutral-600 rounded-md flex gap-4 p-4">
                    <div className="xl:w-24 xl:h-24 w-10 h-12  rounded-md bg-white hover:border-8 border-0 border-black transition-all" onClick={() => addColor("white")}></div>
                    <div className="xl:w-24 xl:h-24 w-10 h-12  rounded-md bg-yellow-400 hover:border-8 border-0 border-black transition-all" onClick={() => addColor("yellow")}></div>
                    <div className="xl:w-24 xl:h-24 w-10 h-12  rounded-md bg-red-500 hover:border-8 border-0 border-black transition-all" onClick={() => addColor("red")}></div>
                    <div className="xl:w-24 xl:h-24 w-10 h-12  rounded-md bg-orange-500 hover:border-8 border-0 border-black transition-all" onClick={() => addColor("orange")}></div>
                    <div className="xl:w-24 xl:h-24 w-10 h-12  rounded-md bg-blue-700 hover:border-8 border-0 border-black transition-all" onClick={() => addColor("blue")}></div>
                    <div className="xl:w-24 xl:h-24 w-10 h-12  rounded-md bg-green-600 hover:border-8 border-0 border-black transition-all" onClick={() => addColor("green")}></div>
                    <div className="xl:w-24 xl:h-24 w-10 h-12  rounded-md bg-gray-700 hover:border-8 border-0 border-black transition-all" onClick={() => back()}><FaDeleteLeft className="w-full h-full p-1 xl:p-4"/></div>
                </div>
            </div>

            {/* Notation Deck */}
            <div
                className="
        absolute bottom-0 left-0
        bg-neutral-600 rounded-md
        xl:p-4 p-2 text-white
        xl:text-6xl text-2xl font-bold
        transition-all hidden
        w-full
    "
                ref={notationDeckRef}
            >
                Processing Cube...

                {(completed.length !== 0 || incompleted.length !== 0) && (
                    <div className="flex flex-col gap-2 w-full">

                        <div className="flex flex-wrap items-center justify-center gap-2 w-full">

                            <div className="
                    bg-neutral-700 border-2 border-neutral-800 rounded-lg
                    flex items-center justify-center
                    h-10 xl:h-16
                    w-10 xl:w-16
                    text-2xl xl:text-5xl
                ">
                                {!running ? (
                                    <span className="cursor-pointer" onClick={() => setRunning(true)}>
                            <FaPlay />
                        </span>
                                ) : (
                                    <span className="cursor-pointer" onClick={() => setRunning(false)}>
                            <FaPause />
                        </span>
                                )}
                            </div>

                            <div className="
                    flex items-center gap-2
                    bg-neutral-800/50 border-2 border-neutral-800 rounded-lg
                    px-3 h-12 sm:h-14 xl:h-16
                ">
                                <span className="text-sm sm:text-lg">Speed:</span>
                                <input
                                    type="range"
                                    min="1"
                                    max="5"
                                    step="1"
                                    value={speed}
                                    onChange={(e) => setSpeed(parseInt(e.target.value))}
                                    className="w-24 sm:w-32 accent-purple-600"
                                />
                                <span className="text-sm sm:text-lg">{speed}s</span>
                            </div>
                        </div>

                        <div
                            className="
                    flex flex-wrap justify-center
                    gap-1 sm:gap-2 w-full
                    text-base sm:text-2xl xl:text-4xl
                    scale-90 sm:scale-100
                "
                        >
                            {completed.map((e, idx) => (
                                <CubeNotation
                                    action={e}
                                    key={idx}
                                    state={idx === completed.length - 1 ? 1 : 2}
                                    idx={idx}
                                    cubeState={cubeState}
                                    prevMoves={solve.slice(0, idx)}
                                />
                            ))}

                            {incompleted.map((e, idx) => (
                                <CubeNotation
                                    action={e}
                                    key={completed.length + idx}
                                    state={0}
                                    idx={completed.length + idx}
                                    cubeState={cubeState}
                                    prevMoves={solve.slice(0, idx + completed.length)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}