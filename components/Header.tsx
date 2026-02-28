"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { COMPANY_INFO } from "@/lib/constants";

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6",
                isScrolled ? "py-2 shadow-lg" : "py-4",
                "glass shadow-sm border-b border-white/10"
            )}
        >
            <div className="container mx-auto flex items-center justify-between text-zinc-900">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-12 h-12 bg-elvora-teal rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-teal-500/20 transition-transform group-hover:scale-105">
                        EC
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold leading-none tracking-tight text-zinc-900">
                            {COMPANY_INFO.name.split(" ")[0]} <span className="text-elvora-teal">Consulting</span>
                        </h1>
                        <span className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mt-1">
                            {COMPANY_INFO.tagline}
                        </span>
                    </div>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {["Home", "About", "Services", "Testimonials", "Contact"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm font-medium hover:text-elvora-teal transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="#consultation"
                            className="px-5 py-2.5 bg-elvora-teal text-white text-sm font-semibold rounded-full hover:bg-opacity-90 transition-all hover:shadow-lg active:scale-95"
                        >
                            Get Expert Consultation
                        </Link>
                        <a
                            href={`mailto:${COMPANY_INFO.email}`}
                            className="text-sm font-semibold text-elvora-teal hover:underline underline-offset-4"
                        >
                            Email Us
                        </a>
                    </div>
                    <button
                        className="md:hidden text-zinc-900 p-2 hover:bg-zinc-100 rounded-full transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Overlay */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-xl border-t border-zinc-100 flex flex-col p-6 gap-6 md:hidden max-h-[calc(100vh-80px)] overflow-y-auto">
                    {["Home", "About", "Services", "Testimonials", "Contact"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-lg font-semibold text-zinc-900 border-b border-zinc-100 pb-4"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-4 mt-2">
                        <Link
                            href="#consultation"
                            className="px-6 py-4 bg-elvora-teal text-white text-center text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Get Expert Consultation
                        </Link>
                        <a
                            href={`mailto:${COMPANY_INFO.email}`}
                            className="text-base text-center font-bold text-elvora-teal py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Email Us: {COMPANY_INFO.email}
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};
