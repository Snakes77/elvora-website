"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { COMPANY_INFO } from "@/lib/constants";

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

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
                    <div className="relative w-12 h-12 transition-transform group-hover:scale-105">
                        <Image
                            src="/assets/images/elvora-circle-logo.png"
                            alt="Elvora Consulting Logo"
                            fill
                            className="object-contain"
                            priority
                        />
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
                    <Link
                        href="#consultation"
                        className="hidden sm:block px-5 py-2.5 bg-elvora-teal text-white text-sm font-semibold rounded-full hover:bg-opacity-90 transition-all hover:shadow-lg active:scale-95"
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
            </div>
        </header>
    );
};
