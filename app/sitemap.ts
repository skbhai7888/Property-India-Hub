import type { MetadataRoute } from "next";
import { supabase } from "../lib/supabase";
import { locations } from "../lib/locationsData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://property-india-hub.vercel.app";

  const staticRoutes = ["", "projects", "partner", "contact", "login", "signup", "search"].map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const { data: projects } = await supabase.from("projects").select("slug, created_at");

  const projectRoutes = (projects || []).map((p: any) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: p.created_at ? new Date(p.created_at) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const locationRoutes = locations.map((loc) => ({
    url: `${baseUrl}/locations/${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes, { url: `${baseUrl}/locations`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 }, ...locationRoutes];
}
