import { Header } from "@/components/Header";
import { COMPANY_INFO } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Accessibility Statement | Elvora Consulting",
    description: "Elvora Consulting's commitment to making this website accessible, and how to contact us about accessibility.",
    alternates: { canonical: "/accessibility" },
};

export default function Accessibility() {
    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950">
            <Header />

            <section className="pt-32 pb-24">
                <div className="container px-4 mx-auto max-w-4xl">
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">Accessibility Statement</h1>
                        <p className="text-zinc-500 dark:text-zinc-500 font-medium">Last updated: June 2026</p>
                    </div>

                    <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Our Commitment</h2>
                            <p>
                                {COMPANY_INFO.fullName} is committed to making this website accessible to as many people as possible, regardless of ability or technology. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at level AA.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">What We Do</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Use semantic, structured HTML with clear headings and landmarks.</li>
                                <li>Maintain colour contrast that meets WCAG AA for text.</li>
                                <li>Provide text alternatives for meaningful images.</li>
                                <li>Support keyboard navigation with a visible focus state and a skip to content link.</li>
                                <li>Design layouts that adapt to mobile, tablet, and desktop screens.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Contact Us About Accessibility</h2>
                            <p>
                                If you have difficulty using any part of this website, or you need information in a different format, please contact us and we will do our best to help.
                            </p>
                            <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 mt-4">
                                <p className="text-sm">{COMPANY_INFO.fullName}</p>
                                <a href={`mailto:${COMPANY_INFO.email}`} className="text-teal-600 dark:text-teal-400 hover:underline">{COMPANY_INFO.email}</a>
                                <p className="text-sm mt-1">{COMPANY_INFO.phone}</p>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </main>
    );
}
