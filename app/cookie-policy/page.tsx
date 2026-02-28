import { Header } from "@/components/Header";
import { COMPANY_INFO } from "@/lib/constants";

export default function CookiePolicy() {
    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950">
            <Header />

            <section className="pt-32 pb-24">
                <div className="container px-4 mx-auto max-w-4xl">
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">Cookie Policy</h1>
                        <p className="text-zinc-500 dark:text-zinc-500 font-medium">Last updated: September 2025</p>
                    </div>

                    <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">What Are Cookies?</h2>
                            <p>
                                Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better browsing experience.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">How We Use Cookies</h2>
                            <p>We use cookies to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Remember your preferences:</strong> We store your cookie consent choice so you don't see the banner repeatedly.</li>
                                <li><strong>Essential functionality:</strong> To allow the website to operate correctly and remember your interaction state.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Managing Your Cookies</h2>
                            <p>
                                You can control cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or set preferences for different websites.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Contact Us</h2>
                            <p>
                                If you have any questions about our use of cookies, please contact us at {COMPANY_INFO.email}.
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
