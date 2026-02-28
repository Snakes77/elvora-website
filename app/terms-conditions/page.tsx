import { Header } from "@/components/Header";
import { COMPANY_INFO } from "@/lib/constants";

export default function TermsConditions() {
    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950">
            <Header />

            <section className="pt-32 pb-24">
                <div className="container px-4 mx-auto max-w-4xl">
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">Terms & Conditions</h1>
                        <p className="text-zinc-500 dark:text-zinc-500 font-medium">Last updated: September 2025</p>
                    </div>

                    <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">1. Introduction</h2>
                            <p>
                                By using our Website located at elvoraconsulting.co.uk you are indicating your acceptance of the terms, conditions, agreements and other obligations contained herein. If you do not agree with any part of the Terms of Use, you must not use the Website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">2. About Our Services</h2>
                            <p>
                                {COMPANY_INFO.fullName} is an independent care consultancy offering nationwide care quality improvement services. The Website offers information regarding our independent consultancy services.
                            </p>
                            <p>
                                The information provided is not intended to replace professional consultations. Any info obtained through the Website is provided without the benefit of a thorough professional assessment and therefore cannot be relied upon as a professional opinion.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">3. Restrictions on Use</h2>
                            <p>
                                All information, documents and content appearing on the Website are the sole property of {COMPANY_INFO.fullName}. You agree to use the info only for your personal use and for no other purpose.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">4. Limitation of Liability</h2>
                            <p>
                                {COMPANY_INFO.fullName} shall not be liable for any damages of any kind relating to the use or attempted use of the Website, its content, information, documents or links.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">5. Contact Information</h2>
                            <p>
                                If you have any questions about these Terms, please contact us at {COMPANY_INFO.email}.
                            </p>
                        </section>
                    </div>
                </div>
            </section>

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
