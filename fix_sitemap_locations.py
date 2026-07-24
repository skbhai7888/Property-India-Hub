import sys
path = "app/sitemap.ts"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

old_import = 'import { supabase } from "../lib/supabase";'
if old_import not in c:
    print("FAILED: import anchor not found")
    sys.exit(1)
new_import = old_import + '\nimport { locations } from "../lib/locationsData";'
c = c.replace(old_import, new_import)

old_return = "  return [...staticRoutes, ...projectRoutes];"
if old_return not in c:
    print("FAILED: return anchor not found")
    sys.exit(1)
new_return = """  const locationRoutes = locations.map((loc) => ({
    url: `${baseUrl}/locations/${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes, { url: `${baseUrl}/locations`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 }, ...locationRoutes];"""
c = c.replace(old_return, new_return)

with open(path, "w", encoding="utf-8") as f:
    f.write(c)
print("DONE_SITEMAP_LOCATIONS")
