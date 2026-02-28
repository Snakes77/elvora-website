"use client";

import { Warp } from "@paper-design/shaders-react";
import { ChevronRight } from "lucide-react";

interface WarpShaderHeroProps {
    title: string;
    description: string;
    ctaText: string;
    onCtaClick?: () => void;
    secondaryCtaText?: string;
    onSecondaryCtaClick?: () => void;
    distortion?: number;
    speed?: number;
}

export default function WarpShaderHero({
    title,
    description,
    ctaText,
    onCtaClick,
    secondaryCtaText,
    onSecondaryCtaClick,
    distortion = 0.25,
    speed = 1,
}: WarpShaderHeroProps) {
    return (
        <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-zinc-950">
            <div className="absolute inset-0 z-0">
                <Warp
                    style={{ height: "100%", width: "100%" }}
                    proportion={0.45}
                    softness={1}
                    distortion={distortion}
                    swirl={0.8}
                    swirlIterations={10}
                    shape="checks"
                    shapeScale={0.1}
                    scale={1}
                    rotation={0}
                    speed={speed}
                    colors={[
                        "hsl(180, 100%, 10%)", // Deep forest/dark teal
                        "hsl(175, 77%, 33%)",  // Elvora teal-600
                        "hsl(174, 72%, 56%)",  // Elvora teal-400
                        "hsl(170, 100%, 20%)"  // Very deep teal
                    ]}
                />
                {/* Subtle overlay gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-transparent to-zinc-950/30" />
            </div>

            <div className="relative z-10 w-full container mx-auto px-6 md:px-12 text-center space-y-10">
                <h1 className="text-white text-5xl md:text-8xl font-bold tracking-tight text-balance leading-[1.1] drop-shadow-2xl">
                    {title}
                </h1>

                <p className="text-zinc-100 text-xl md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-md opacity-90">
                    {description}
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                    <button
                        onClick={onCtaClick}
                        className="group px-10 py-5 bg-teal-600 hover:bg-teal-500 text-white rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl shadow-teal-500/20 flex items-center gap-2"
                    >
                        {ctaText}
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {secondaryCtaText && (
                        <button
                            onClick={onSecondaryCtaClick}
                            className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-bold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-xl"
                        >
                            {secondaryCtaText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
