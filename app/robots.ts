import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.elvoraconsulting.co.uk";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/signature/", "/api/"], // Exclude signatures and internal API routes from indexation
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
