import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.elvoraconsulting.co.uk";

  // Define the standard public routes of the website
  const routes = [
    "",
    "/privacy-policy",
    "/cookie-policy",
    "/terms-conditions",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));
}
