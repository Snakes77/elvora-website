"use client";

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Quote, Star, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';

export function PremiumTestimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 8000);

        return () => clearInterval(timer);
    }, []);

    const slideVariants: Variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9,
            rotateY: direction > 0 ? 30 : -30
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9,
            rotateY: direction < 0 ? 30 : -30
        })
    };

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.23, 0.86, 0.39, 0.96]
            }
        }
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const nextTestimonial = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    };

    const prevTestimonial = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    };

    return (
        <section id="testimonials" className="relative py-32 bg-zinc-950 text-white overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-teal-500/[0.05] via-zinc-950 to-emerald-500/[0.05]"
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        backgroundSize: '400% 400%'
                    }}
                />

                {/* Light Orbs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-[128px]"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <motion.div
                ref={containerRef}
                className="relative z-10 max-w-7xl mx-auto px-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Header */}
                <div className="text-center mb-20 px-4">
                    <motion.div
                        className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.1] backdrop-blur-sm mb-6"
                        whileHover={{ scale: 1.05, borderColor: "rgba(20, 184, 166, 0.4)" }}
                        variants={fadeInUp}
                    >
                        <Sparkles className="h-4 w-4 text-teal-400" />
                        <span className="text-sm font-medium text-zinc-300">
                            Client Success Stories
                        </span>
                    </motion.div>

                    <motion.h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-none" variants={fadeInUp}>
                        Trusted by <span className="text-teal-500">Industry Leaders</span>
                    </motion.h2>
                    <motion.p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed" variants={fadeInUp}>
                        Real outcomes from care home managers and operations directors Melissa has partnered with to achieve regulatory excellence.
                    </motion.p>
                </div>

                {/* Main Carousel */}
                <div className="relative max-w-6xl mx-auto mb-16">
                    <div className="relative h-[600px] md:h-[450px] perspective-1000">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.4 },
                                    scale: { duration: 0.4 },
                                    rotateY: { duration: 0.6 }
                                }}
                                className="absolute inset-0"
                            >
                                <div className="relative h-full bg-zinc-900/50 backdrop-blur-xl rounded-[2.5rem] border border-white/[0.08] p-8 md:p-16 overflow-hidden shadow-2xl">
                                    {/* Quote Icon */}
                                    <div className="absolute top-12 right-12 opacity-5">
                                        <Quote className="w-24 h-24 text-white" />
                                    </div>

                                    <div className="relative z-10 h-full flex flex-col md:flex-row items-center gap-12">
                                        {/* Client Info */}
                                        <div className="flex-shrink-0 text-center md:text-left">
                                            <div className="relative mb-6">
                                                <div className="w-28 h-28 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-teal-500/20 shadow-xl">
                                                    <img
                                                        src={TESTIMONIALS[currentIndex].avatar}
                                                        alt={TESTIMONIALS[currentIndex].role}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <motion.div
                                                    className="absolute -inset-2 border border-teal-500/10 rounded-full"
                                                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
                                                    transition={{ duration: 4, repeat: Infinity }}
                                                />
                                            </div>

                                            <div className="flex justify-center md:justify-start gap-1 mb-6">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="w-5 h-5 fill-teal-500 text-teal-500" />
                                                ))}
                                            </div>

                                            <p className="text-white text-xl font-black mb-1 leading-tight">
                                                {TESTIMONIALS[currentIndex].role}
                                            </p>
                                            <p className="text-teal-500 text-xs font-bold uppercase tracking-[0.2em]">
                                                {TESTIMONIALS[currentIndex].company}
                                            </p>
                                        </div>

                                        {/* Testimonial Content */}
                                        <div className="flex-1">
                                            <motion.blockquote
                                                className="text-xl md:text-2xl text-zinc-100 leading-relaxed mb-10 font-medium italic"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3, duration: 0.8 }}
                                            >
                                                "{TESTIMONIALS[currentIndex].text}"
                                            </motion.blockquote>

                                            {/* Key Results Badges */}
                                            <div className="flex flex-wrap gap-3">
                                                {TESTIMONIALS[currentIndex].results.map((result, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="bg-teal-500/10 rounded-xl px-4 py-2 border border-teal-500/20 backdrop-blur-sm"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.5 + i * 0.1 }}
                                                    >
                                                        <span className="text-teal-400 text-sm font-bold tracking-tight">
                                                            {result}
                                                        </span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex justify-center items-center gap-8 mt-12">
                        <button
                            onClick={prevTestimonial}
                            className="p-4 rounded-full bg-white/[0.05] border border-white/[0.1] text-white hover:bg-teal-600 transition-all hover:scale-110 shadow-lg"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>

                        <div className="flex gap-4">
                            {TESTIMONIALS.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setDirection(index > currentIndex ? 1 : -1);
                                        setCurrentIndex(index);
                                    }}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${index === currentIndex
                                        ? 'bg-teal-400 w-8'
                                        : 'bg-white/20 hover:bg-white/40'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextTestimonial}
                            className="p-4 rounded-full bg-white/[0.05] border border-white/[0.1] text-white hover:bg-teal-600 transition-all hover:scale-110 shadow-lg"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
