"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface VortexProps {
    children?: React.ReactNode;
    className?: string;
    containerClassName?: string;
    particleCount?: number;
    rangeY?: number;
    baseHue?: number;
    baseSpeed?: number;
    rangeSpeed?: number;
    baseRadius?: number;
    rangeRadius?: number;
    backgroundColor?: string;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const Vortex = (props: VortexProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef(null);
    const particleCount = props.particleCount || 700;
    const particlePropCount = 9;
    const particlePropsLength = particleCount * particlePropCount;
    const rangeY = props.rangeY || 100;
    const baseHue = props.baseHue || 180; // Teal/Blue range
    const rangeHue = 60;
    const baseSpeed = props.baseSpeed || 0.0;
    const rangeSpeed = props.rangeSpeed || 1.5;
    const baseRadius = props.baseRadius || 1;
    const rangeRadius = props.rangeRadius || 2;
    const backgroundColor = props.backgroundColor || "#000000";
    let tick = 0;
    const noise = 0.005;

    let canvas: any;
    let ctx: any;
    let center: [number, number];
    let particleProps: Float32Array;

    const initCanvas = () => {
        canvas = canvasRef.current;
        if (!canvas) return;
        ctx = canvas.getContext("2d");
        center = [0.5 * canvas.width, 0.5 * canvas.height];
        particleProps = new Float32Array(particlePropsLength);

        for (let i = 0; i < particlePropsLength; i += particlePropCount) {
            initParticle(i);
        }
    };

    const initParticle = (i: number) => {
        const x = Math.random() * canvas.width;
        const y = center[1] + (Math.random() - 0.5) * rangeY;
        const vx = 0;
        const vy = 0;
        const life = 0;
        const ttl = 10 + Math.random() * 100;
        const speed = baseSpeed + Math.random() * rangeSpeed;
        const radius = baseRadius + Math.random() * rangeRadius;
        const hue = baseHue + Math.random() * rangeHue;

        particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
    };

    const draw = () => {
        tick++;
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlePropsLength; i += particlePropCount) {
            updateParticle(i);
        }

        renderParticles();
        window.requestAnimationFrame(draw);
    };

    const updateParticle = (i: number) => {
        let x = particleProps[i];
        let y = particleProps[i + 1];
        let vx = particleProps[i + 2];
        let vy = particleProps[i + 3];
        let life = particleProps[i + 4];
        let ttl = particleProps[i + 5];
        let speed = particleProps[i + 6];
        let radius = particleProps[i + 7];
        let hue = particleProps[i + 8];

        const n = Math.sin(x * noise) * Math.cos(y * noise) * Math.PI * 2;
        vx = lerp(vx, Math.cos(n) * speed, 0.1);
        vy = lerp(vy, Math.sin(n) * speed, 0.1);

        x += vx;
        y += vy;
        life++;

        if (life > ttl || x < 0 || x > canvas.width || y < 0 || y > canvas.height) {
            initParticle(i);
        } else {
            particleProps[i] = x;
            particleProps[i + 1] = y;
            particleProps[i + 2] = vx;
            particleProps[i + 3] = vy;
            particleProps[i + 4] = life;
        }
    };

    const renderParticles = () => {
        if (!ctx) return;
        for (let i = 0; i < particlePropsLength; i += particlePropCount) {
            const x = particleProps[i];
            const y = particleProps[i + 1];
            const radius = particleProps[i + 7];
            const hue = particleProps[i + 8];
            const life = particleProps[i + 4];
            const ttl = particleProps[i + 5];

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${hue}, 100%, 60%, ${1 - life / ttl})`;
            ctx.fill();
            ctx.closePath();
        }
    };

    useEffect(() => {
        const resize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                initCanvas();
            }
        };

        window.addEventListener("resize", resize);
        resize();
        draw();

        return () => window.removeEventListener("resize", resize);
    }, []);

    return (
        <div className={cn("relative w-full h-full overflow-hidden", props.containerClassName)}>
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
            <div className={cn("relative z-10", props.className)}>{props.children}</div>
        </div>
    );
};
