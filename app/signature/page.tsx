'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { getSignatureHTML } from '@/lib/outreach-templates';

export default function SignaturePage() {
    const [formData, setFormData] = useState({
        name: 'Melissa Meakin',
        role: 'CARE CONSULTANT',
        phone: '0115 646 8587',
        email: 'melissa@elvoraconsulting.co.uk'
    });

    const [signatureHtml, setSignatureHtml] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setSignatureHtml(getSignatureHTML(formData));
    }, [formData]);

    const handleCopy = () => {
        // Copy HTML to clipboard
        navigator.clipboard.writeText(signatureHtml).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header />

            <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Team Signature Generator</h1>
                    <p className="text-lg text-slate-600">Create your professional Elvora Consulting email signature in seconds.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                        <h2 className="text-xl font-bold mb-6 text-slate-800">Your Details</h2>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0F8B8D] focus:border-transparent outline-none transition-all"
                                    placeholder="e.g. Melissa Meakin"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Job Title / Role</label>
                                <input
                                    type="text"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0F8B8D] focus:border-transparent outline-none transition-all"
                                    placeholder="e.g. CARE CONSULTANT"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Direct Phone Number</label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0F8B8D] focus:border-transparent outline-none transition-all"
                                    placeholder="e.g. 0115 646 8587"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0F8B8D] focus:border-transparent outline-none transition-all"
                                    placeholder="e.g. melissa@elvoraconsulting.co.uk"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold mb-6 text-slate-800">Live Preview</h2>
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex-grow overflow-auto mb-6">
                            <div
                                className="signature-preview border border-dashed border-slate-200 p-4 rounded-lg"
                                dangerouslySetInnerHTML={{ __html: signatureHtml }}
                            />
                        </div>

                        <button
                            onClick={handleCopy}
                            className={`w-full py-4 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg ${copied ? 'bg-green-500' : 'bg-[#0F8B8D] hover:bg-[#0D7377]'}`}
                        >
                            {copied ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Signature HTML Copied!
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                    Copy Signature HTML for Outlook
                                </>
                            )}
                        </button>
                        <p className="text-xs text-slate-400 mt-4 text-center italic">
                            After copying, follow the <a href="/signature_installation.md" className="underline hover:text-[#0F8B8D]">Installation Guide</a> to add this to your Outlook.
                        </p>
                    </div>
                </div>
            </main>

            <footer className="py-12 bg-slate-100 text-center text-slate-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Elvora Consulting. Professional Branding Tool.</p>
            </footer>
        </div>
    );
}
