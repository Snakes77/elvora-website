import { Header } from "@/components/Header";
import { COMPANY_INFO } from "@/lib/constants";
import { Mail, Linkedin } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950">
            <Header />

            <section className="pt-32 pb-24">
                <div className="container px-4 mx-auto max-w-4xl">
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">Privacy Policy</h1>
                        <p className="text-zinc-500 dark:text-zinc-500 font-medium">Last updated: September 2025</p>
                    </div>

                    <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">1. Introduction</h2>
                            <p>
                                This Privacy Policy applies between you, the User of this Website, and {COMPANY_INFO.fullName} ("we", "our", or "us"), the owner and provider of this Website. {COMPANY_INFO.fullName} takes the privacy of your information very seriously. This privacy policy applies to our use of any and all data collected by us or provided by you in relation to your use of the Website.
                            </p>
                            <p>
                                Please read this privacy policy carefully.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">2. Data Collected</h2>
                            <p>We may collect the following Data, which includes personal Data, from you:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Name and contact details (email address, telephone number, postal address);</li>
                                <li>Company information and job title;</li>
                                <li>Demographic information such as postcode, preferences and interests;</li>
                                <li>Information provided through contact forms, consultations, or service enquiries;</li>
                                <li>Web browser type and version (automatically collected);</li>
                                <li>Operating system (automatically collected);</li>
                                <li>IP address and device information (automatically collected).</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">3. How We Use Data</h2>
                            <p>Data may be used by us for the following reasons:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Internal record keeping;</li>
                                <li>Improvement of our products and services;</li>
                                <li>Transmission by email of marketing materials that may be of interest to you;</li>
                                <li>Contact for market research purposes;</li>
                                <li>To provide independent care quality consultancy services;</li>
                                <li>To respond to your enquiries and service requests.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">4. Keeping Data Secure</h2>
                            <p>
                                We will use technical and organisational measures to safeguard your Data, including storing your Data on secure servers and using encryption for sensitive data transmission.
                            </p>
                            <p>
                                If you suspect any misuse or loss or unauthorised access to your Data, please let us know immediately by contacting us via {COMPANY_INFO.email}.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">5. Your Rights</h2>
                            <p>You have the right to request access to, correction of, or erasure of your personal Data. You also have the right to restrict or object to our use of your Data. To exercise these rights, please contact us at {COMPANY_INFO.email}.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">6. Contact Information</h2>
                            <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800">
                                <p className="font-bold text-zinc-900 dark:text-white mb-2">Data Protection Officer: {COMPANY_INFO.founder.name}</p>
                                <p className="text-sm">{COMPANY_INFO.fullName}</p>
                                <p className="text-sm">Company Registration: {COMPANY_INFO.companyNumber}</p>
                                <a href={`mailto:${COMPANY_INFO.email}`} className="text-teal-600 dark:text-teal-400 hover:underline">{COMPANY_INFO.email}</a>
                            </div>
                        </section>
                    </div>
                </div>
            </section>

            {/* Footer (Simplified) */}
            <footer className="bg-zinc-950 py-12 border-t border-white/5">
                <div className="container px-4 mx-auto text-center">
                    <p className="text-zinc-500 text-xs">
                        &copy; {new Date().getFullYear()} {COMPANY_INFO.fullName} | All Rights Reserved
                    </p>
                </div>
            </footer>
        </main>
    );
}
