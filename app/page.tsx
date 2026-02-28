"use client";

import { Header } from "@/components/Header";
import WarpShaderHero from "@/components/ui/wrap-shader";
import { PremiumTestimonials } from "@/components/ui/premium-testimonials";
import { ContactForm } from "@/components/ContactForm";
import NewsSection from "@/components/NewsSection";
import CookieBanner from "@/components/CookieBanner";
import { SERVICES, COMPANY_INFO } from "@/lib/constants";
import { CheckCircle2, ChevronRight, Mail, Phone, Linkedin, Award, Clock, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";

export default function Home() {
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) section.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <main id="main-content" className="min-h-screen bg-white dark:bg-zinc-950">
            <Header />

            {/* Hero Section */}
            <section className="relative">
                <WarpShaderHero
                    title="Achieve Exceptional Care Outcomes"
                    description="Your trusted partner in CQC compliance, crisis management, and achieving Outstanding ratings through 20+ years of frontline expertise."
                    ctaText="Book Consultation"
                    onCtaClick={() => scrollToSection('contact')}
                    secondaryCtaText="View Services"
                    onSecondaryCtaClick={() => scrollToSection('services')}
                    distortion={0.15}
                />

                {/* Floating Stats */}
                <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-20 px-4">
                    <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {COMPANY_INFO.stats.map((stat, idx) => (
                            <div key={idx} className="bg-white dark:bg-zinc-900 shadow-2xl rounded-3xl p-4 sm:p-6 lg:p-8 border border-zinc-100 dark:border-zinc-800 text-center transform hover:scale-105 transition-all">
                                <div className="text-3xl sm:text-4xl font-black text-teal-600 dark:text-teal-400 mb-2">{stat.value}</div>
                                <div className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm font-bold uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Spacing for floating stats */}
            <div className="h-48 md:h-32"></div>

            {/* Services Section */}
            <section id="services" className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
                <div className="container px-4 mx-auto">
                    <div className="max-w-3xl mx-auto text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
                            Expert Care Quality Consultancy Services
                        </h2>
                        <div className="w-24 h-1.5 bg-teal-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {SERVICES.map((service) => (
                            <div
                                key={service.id}
                                className="group bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:border-teal-500/30 transition-all duration-300"
                            >
                                <div className="text-4xl font-black text-teal-500/10 mb-6 group-hover:text-teal-500/20 transition-colors">
                                    {service.id}
                                </div>
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm leading-relaxed">
                                    {service.description}
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                                            <CheckCircle2 size={16} className="text-teal-500 mt-0.5 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href="#contact"
                                    className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-sm group/btn"
                                >
                                    Learn More <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-32 bg-white dark:bg-zinc-950 overflow-hidden relative">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        <div className="lg:w-1/2 relative">
                            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white dark:border-zinc-900">
                                <div className="aspect-[4/5] relative bg-zinc-200 dark:bg-zinc-800">
                                    <Image
                                        src="/assets/images/melissa-meakin.jpg"
                                        alt={COMPANY_INFO.founder.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </div>

                            {/* Floating Badges */}
                            <div className="absolute -bottom-8 -right-8 z-20 bg-teal-600 text-white p-8 rounded-3xl shadow-xl max-w-[240px] hidden md:block border-4 border-white dark:border-zinc-950">
                                <div className="flex items-center gap-3 mb-2">
                                    <Award size={24} />
                                    <span className="font-bold">20+ Years</span>
                                </div>
                                <p className="text-sm font-medium opacity-90">Experience in health and social care sector excellence.</p>
                            </div>

                            <div className="absolute -top-12 -left-12 z-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
                        </div>

                        <div className="lg:w-1/2">
                            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-8">
                                Meet {COMPANY_INFO.founder.name}
                            </h2>
                            <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
                                {COMPANY_INFO.founder.bio.map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>

                            <div className="bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 mb-12">
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                                    <ShieldCheck className="text-teal-500" /> Core Specialisms
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {COMPANY_INFO.founder.specialisms.map((spec, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                                            <span className="text-zinc-700 dark:text-zinc-300 font-medium">{spec}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <a
                                    href={COMPANY_INFO.linkedin}
                                    target="_blank"
                                    className="px-8 py-4 bg-[#0077b5] hover:bg-[#00669c] text-white rounded-full font-bold transition-all flex items-center gap-2 shadow-lg hover:scale-105"
                                >
                                    <Linkedin size={20} /> Connect on LinkedIn
                                </a>
                                <a
                                    href="#contact"
                                    className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-bold transition-all shadow-lg hover:scale-105 hover:bg-zinc-800 dark:hover:bg-zinc-100"
                                >
                                    Get Expert Consultation
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <PremiumTestimonials />

            {/* News Section */}
            <NewsSection />

            {/* Contact Section */}
            <section id="contact" className="py-32 bg-zinc-900 relative overflow-hidden">
                {/* Background elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500 rounded-full blur-[128px]"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[128px]"></div>
                </div>

                <div className="container px-4 mx-auto relative z-10">
                    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl md:text-6xl font-bold text-white mb-8 leading-tight">
                                Ready to Achieve <span className="text-teal-400">Care Excellence?</span>
                            </h2>
                            <p className="text-xl text-zinc-400 mb-12 max-w-lg leading-relaxed">
                                Book your consultation today and take the first step towards Outstanding ratings and exceptional care delivery.
                            </p>

                            <div className="space-y-8 mb-12">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <div className="text-zinc-500 text-sm uppercase tracking-widest font-bold">Email Us</div>
                                        <a href={`mailto:${COMPANY_INFO.email}`} className="text-xl font-bold text-white hover:text-teal-400 transition-colors">
                                            {COMPANY_INFO.email}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                                        <Linkedin size={24} />
                                    </div>
                                    <div>
                                        <div className="text-zinc-500 text-sm uppercase tracking-widest font-bold">Follow Us</div>
                                        <a href={COMPANY_INFO.linkedin} target="_blank" className="text-xl font-bold text-white hover:text-teal-400 transition-colors">
                                            Melissa Meakin (LinkedIn)
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 p-8 rounded-3xl bg-white/5 border border-white/10">
                                <div className="flex flex-col gap-2">
                                    <ShieldCheck className="text-teal-500" />
                                    <h4 className="font-bold text-white">Action Plan</h4>
                                    <p className="text-xs text-zinc-400">Clear steps to address challenges.</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Star className="text-teal-500" />
                                    <h4 className="font-bold text-white">Expert Guidance</h4>
                                    <p className="text-xs text-zinc-400">Direct access to 20+ years experience.</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-zinc-950 pt-24 pb-12 overflow-hidden relative">
                <div className="container px-4 mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                        <div className="lg:col-span-1">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-teal-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-teal-500/20">
                                    EC
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-2xl leading-tight">Elvora <span className="text-zinc-500 font-light">Consulting</span></h3>
                                    <p className="text-teal-500 text-[10px] tracking-[0.2em] uppercase font-bold mt-1">Care Quality Excellence</p>
                                </div>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                                Independent care quality consultancy helping care homes achieve Outstanding ratings through practical compliance guidance.
                            </p>
                            <div className="flex items-center gap-4">
                                <a href={COMPANY_INFO.linkedin} target="_blank" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-teal-500/50 transition-all">
                                    <Linkedin size={20} />
                                </a>
                                <a href={`mailto:${COMPANY_INFO.email}`} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-teal-500/50 transition-all">
                                    <Mail size={20} />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Services</h4>
                            <ul className="space-y-4">
                                {SERVICES.slice(0, 5).map(s => (
                                    <li key={s.id}>
                                        <a href="#services" className="text-zinc-400 hover:text-teal-400 transition-colors text-sm">{s.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Quick Links</h4>
                            <ul className="space-y-4">
                                <li><a href="/" className="text-zinc-400 hover:text-teal-400 transition-colors text-sm">Home</a></li>
                                <li><a href="#about" className="text-zinc-400 hover:text-teal-400 transition-colors text-sm">About</a></li>
                                <li><a href="#testimonials" className="text-zinc-400 hover:text-teal-400 transition-colors text-sm">Testimonials</a></li>
                                <li><a href="#contact" className="text-zinc-400 hover:text-teal-400 transition-colors text-sm">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Legal</h4>
                            <ul className="space-y-4">
                                <li><a href="/privacy-policy" className="text-zinc-400 hover:text-teal-400 transition-colors text-sm">Privacy Policy</a></li>
                                <li><a href="/terms-conditions" className="text-zinc-400 hover:text-teal-400 transition-colors text-sm">Terms & Conditions</a></li>
                                <li><a href="/cookie-policy" className="text-zinc-400 hover:text-teal-400 transition-colors text-sm">Cookie Policy</a></li>
                            </ul>
                            <div className="mt-8 pt-8 border-t border-white/5">
                                <p className="text-zinc-600 text-[10px] uppercase tracking-tighter">Company Reg: {COMPANY_INFO.companyNumber}</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-white/5 text-center space-y-6">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                            <p className="text-zinc-500 text-xs">
                                &copy; {new Date().getFullYear()} Elvora Consulting Limited | All Rights Reserved
                            </p>
                            <p className="text-zinc-400 text-[10px] flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5 hover:border-rose-500/20 transition-all group">
                                <span className="opacity-60">Powered by</span>
                                <a href="https://www.staxxd.co.uk" target="_blank" rel="noopener noreferrer" className="font-black tracking-tighter text-sm text-rose-500 group-hover:text-rose-400 transition-colors flex items-center gap-1">
                                    STAXXD<span className="text-[8px] opacity-40 font-normal tracking-normal">-UK</span>
                                </a>
                                <span className="w-1 h-1 rounded-full bg-zinc-800 hidden md:block"></span>
                                <span className="opacity-60 hidden md:block">Data-driven automation</span>
                            </p>
                        </div>
                        <p className="text-zinc-700 text-[9px] max-w-2xl mx-auto italic leading-relaxed">
                            Elvora Consulting is a specialist provider of CQC compliance, crisis management, and Outstanding rating support for healthcare providers across the United Kingdom.
                        </p>
                    </div>
                </div>
            </footer>

            <CookieBanner />
        </main>
    );
}
