"use client";

import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const NEWS_MOCK = [
    {
        date: "Latest",
        title: "Understanding CQC's New Assessment Framework",
        excerpt: "A deep dive into how the new regulatory approach impacts care providers across the UK.",
        link: "https://www.cqc.org.uk/news"
    },
    {
        date: "Current",
        title: "Promoting Safety and Wellbeing in Care Homes",
        excerpt: "Best practices for maintaining high safety standards while ensuring resident dignity.",
        link: "https://www.cqc.org.uk/news"
    },
    {
        date: "Insights",
        title: "Technological Innovation in Adult Social Care",
        excerpt: "How digital tools are transforming the delivery of care and improving outcomes.",
        link: "https://www.cqc.org.uk/news"
    }
];

export default function NewsSection() {
    return (
        <section className="py-24 bg-white dark:bg-zinc-950 overflow-hidden">
            <div className="container px-4 mx-auto relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-16 px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6"
                    >
                        Latest Care Industry News & Insights
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-zinc-600 dark:text-zinc-400"
                    >
                        Stay informed with the latest care sector updates and expert analysis from regulatory sources.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {NEWS_MOCK.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-teal-500/50 transition-all hover:shadow-2xl dark:hover:shadow-teal-500/5"
                        >
                            <div className="text-sm font-bold text-teal-600 dark:text-teal-400 mb-4 uppercase tracking-widest px-3 py-1 rounded-full bg-teal-500/10 w-fit">
                                {item.date}
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                                {item.excerpt}
                            </p>
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold hover:gap-3 transition-all"
                            >
                                Read More <ExternalLink size={16} />
                            </a>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center border-t border-zinc-200 dark:border-zinc-800 pt-12">
                    <p className="text-zinc-500 dark:text-zinc-500 text-sm mb-4">News Sources:</p>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        <a href="https://www.cqc.org.uk/news" className="text-zinc-600 dark:text-zinc-400 hover:text-teal-500 transition-colors text-sm font-medium">Care Official News</a>
                        <span className="text-zinc-300 dark:text-zinc-700">|</span>
                        <a href="https://www.cqc.org.uk/search/press-releases" className="text-zinc-600 dark:text-zinc-400 hover:text-teal-500 transition-colors text-sm font-medium">Care Press Releases</a>
                        <span className="text-zinc-300 dark:text-zinc-700">|</span>
                        <a href="#contact" className="text-zinc-600 dark:text-zinc-400 hover:text-teal-500 transition-colors text-sm font-medium">Expert Analysis</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
