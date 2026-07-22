import type { MetadataRoute } from "next";
import { supabase } from "../lib/supabase";

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

  return [...staticRoutes, ...projectRoutes];
}
