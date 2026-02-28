"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";
import Link from "next/link";

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleConsent = (type: "accepted" | "declined") => {
        localStorage.setItem("cookie-consent", type);
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-in fade-in slide-in-from-bottom-10 duration-500">
            <div className="max-w-4xl mx-auto bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-teal-500/20 shadow-2xl rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 pointer-events-auto">
                <div className="flex-1">
                    <h4 className="text-lg font-bold text-teal-600 dark:text-teal-400 mb-2 flex items-center gap-2">
                        🍪 Cookie Notice
                    </h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        We use essential cookies to make our website work properly. By continuing to use our site, you agree to our use of cookies.{" "}
                        <Link href="/cookie-policy" className="text-teal-500 hover:underline font-medium">
                            Learn more
                        </Link>
                    </p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={() => handleConsent("declined")}
                        className="flex-1 md:flex-none py-2.5 px-6 rounded-xl border border-teal-500/30 text-teal-600 dark:text-teal-400 font-medium hover:bg-teal-500/5 transition-colors"
                    >
                        Decline
                    </button>
                    <button
                        onClick={() => handleConsent("accepted")}
                        className="flex-1 md:flex-none py-2.5 px-6 rounded-xl bg-teal-600 text-white font-medium hover:bg-teal-700 shadow-lg shadow-teal-500/30 transition-all hover:scale-[1.02]"
                    >
                        Accept
                    </button>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="hidden md:flex p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-400"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
