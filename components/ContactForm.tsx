"use client";

import React, { useState } from "react";
import { Mail, Linkedin, ShieldCheck, Star, Loader2, CheckCircle2 } from "lucide-react";
import { COMPANY_INFO, SERVICES } from "@/lib/constants";

export const ContactForm = () => {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        service: "Select a service...",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus("success");
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    service: "Select a service...",
                    message: ""
                });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="bg-white rounded-[2.5rem] p-12 shadow-2xl text-center space-y-6">
                <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-bold text-zinc-900">Request Sent!</h3>
                <p className="text-zinc-600">
                    Thank you for reaching out. Melissa will review your request and get back to you within 24 hours.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="px-8 py-3 bg-teal-600 text-white font-bold rounded-2xl hover:bg-teal-700 transition-all"
                >
                    Send Another Message
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-900">First Name</label>
                        <input
                            type="text"
                            placeholder="John"
                            className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-zinc-900"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-900">Last Name</label>
                        <input
                            type="text"
                            placeholder="Doe"
                            className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-zinc-900"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            required
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-zinc-900">Work Email</label>
                    <input
                        type="email"
                        placeholder="john@carehome.com"
                        className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-zinc-900"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-zinc-900">Service Required</label>
                    <select
                        className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-zinc-900 appearance-none bg-no-repeat bg-[right_1.5rem_center] cursor-pointer"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                        <option>Select a service...</option>
                        {SERVICES.map(s => <option key={s.id}>{s.title}</option>)}
                        <option>General Consultation</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-zinc-900">Message</label>
                    <textarea
                        rows={4}
                        placeholder="How can we help you?"
                        className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-zinc-900"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-teal-500/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                    {status === "loading" ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            Sending...
                        </>
                    ) : (
                        "Submit Consultation Request"
                    )}
                </button>
                {status === "error" && (
                    <p className="text-center text-sm text-rose-500 font-medium">
                        Failed to send request. Please try again or email us directly.
                    </p>
                )}
                <p className="text-center text-xs text-zinc-500">
                    We'll respond within 24 hours during business days.
                </p>
            </form>
        </div>
    );
};
