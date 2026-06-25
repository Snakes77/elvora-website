import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export const dynamic = "force-dynamic";
export const revalidate = 0; // Disable caching to fetch real-time updates without needing a cron job ("no-cron")

export async function GET() {
    try {
        const response = await axios.get("https://www.cqc.org.uk/news", {
            timeout: 8000,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
        });

        const $ = cheerio.load(response.data);
        const newsItems: any[] = [];

        // Scrape news articles from CQC's news list view
        $(".views-row, article, .news-item").slice(0, 3).each((i, el) => {
            const $el = $(el);
            const title = $el.find("h3, h2, a").first().text().trim();
            const relativeLink = $el.find("a").first().attr("href") || "";
            const link = relativeLink.startsWith("http") ? relativeLink : `https://www.cqc.org.uk${relativeLink}`;
            
            // Extract excerpt and clean it
            const excerpt = $el.find("p, .field-content").first().text().trim();
            const date = $el.find(".date, .created, .views-field-created").first().text().trim() || "Latest";

            if (title && title.length > 5 && link) {
                newsItems.push({
                    date: date,
                    title: title.substring(0, 80) + (title.length > 80 ? "..." : ""),
                    excerpt: excerpt ? (excerpt.substring(0, 140) + (excerpt.length > 140 ? "..." : "")) : "Click below to read the latest updates directly from CQC.",
                    link
                });
            }
        });

        if (newsItems.length > 0) {
            return NextResponse.json(newsItems);
        }
        
        throw new Error("No news items successfully parsed from CQC");
    } catch (error: any) {
        console.error("CQC News scraping failed, returning fallback mock news:", error.message);
        
        // Return standard, CQC-compliant fallback mock news
        return NextResponse.json([
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
        ]);
    }
}
