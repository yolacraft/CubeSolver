"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { init } from "@/treeJS/Renderer/init";
import HUD from "@/components/HUD";

export default function ThreeScene() {
    const mountRef = useRef<HTMLCanvasElement>(null);
    const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);

    useEffect(() => {
        if (mountRef.current) {
            const cam = init(mountRef.current);
            setCamera(cam);
        }
    }, []);

    return (
        <div>
            <canvas ref={mountRef} className="w-full absolute top-[-120]" />
            {camera && <HUD camera={camera} />}
        </div>
    );
}
