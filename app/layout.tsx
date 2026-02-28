import type { Metadata } from "next";
import { Inter, Figtree } from "next/font/google";
import "./globals.css";
import { COMPANY_INFO } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const figtree = Figtree({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-figtree",
});

export const metadata: Metadata = {
    title: COMPANY_INFO.metadata.title,
    description: COMPANY_INFO.metadata.description,
    keywords: COMPANY_INFO.metadata.keywords,
    openGraph: {
        title: COMPANY_INFO.metadata.title,
        description: COMPANY_INFO.metadata.description,
        type: "website",
        url: "https://elvoraconsulting.co.uk",
        siteName: "Elvora Consulting",
    },
    twitter: {
        card: "summary_large_image",
        title: COMPANY_INFO.metadata.title,
        description: COMPANY_INFO.metadata.description,
    },
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/icon.png", type: "image/png" },
        ],
        apple: [
            { url: "/apple-icon.png", type: "image/png" },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${inter.variable} ${figtree.variable} font-sans antialiased selection:bg-teal-100 selection:text-teal-900`}>
                <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-teal-600 focus:text-white focus:rounded-lg">
                    Skip to content
                </a>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "LocalBusiness",
                            "name": COMPANY_INFO.fullName,
                            "image": "https://elvoraconsulting.co.uk/assets/images/logo-color.png",
                            "@id": "https://elvoraconsulting.co.uk",
                            "url": "https://elvoraconsulting.co.uk",
                            "telephone": "",
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "",
                                "addressLocality": "UK Nationwide",
                                "addressRegion": "",
                                "postalCode": "",
                                "addressCountry": "GB"
                            },
                            "geo": {
                                "@type": "GeoCoordinates",
                                "latitude": 52.3555,
                                "longitude": -1.1743
                            },
                            "openingHoursSpecification": {
                                "@type": "OpeningHoursSpecification",
                                "dayOfWeek": [
                                    "Monday",
                                    "Tuesday",
                                    "Wednesday",
                                    "Thursday",
                                    "Friday"
                                ],
                                "opens": "09:00",
                                "closes": "17:00"
                            },
                            "sameAs": [
                                COMPANY_INFO.linkedin
                            ]
                        })
                    }}
                />
                {children}
            </body>
        </html>
    );
}
