"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Bubbles = () => {
    const [bubbles, setBubbles] = useState<Array<{ id: number; left: string; size: number; duration: number; delay: number }>>([]);

    useEffect(() => {
        const newBubbles = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 40 + 10,
            duration: Math.random() * 5 + 5,
            delay: Math.random() * 5,
        }));
        setBubbles(newBubbles);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {bubbles.map((bubble) => (
                <motion.div
                    key={bubble.id}
                    initial={{ y: "110vh", opacity: 0 }}
                    animate={{
                        y: "-10vh",
                        opacity: [0, 0.3, 0.3, 0],
                        x: [0, Math.random() * 50 - 25, 0]
                    }}
                    transition={{
                        duration: bubble.duration,
                        repeat: Infinity,
                        delay: bubble.delay,
                        ease: "linear",
                    }}
                    className="absolute rounded-full bg-teal-500/20 backdrop-blur-sm border border-teal-500/10"
                    style={{
                        left: bubble.left,
                        width: bubble.size,
                        height: bubble.size,
                    }}
                />
            ))}
        </div>
    );
};
