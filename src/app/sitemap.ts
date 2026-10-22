import type { MetadataRoute } from "next";
import { events } from "@/data/events";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/artists"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const eventRoutes = events.map((event) => ({
    url: `${site.url}/event-details/${event.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...eventRoutes];
}
