import sys
path = "app/sitemap.ts"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

old_import = 'import { locations } from "../lib/locationsData";'
if old_import not in c:
    print("FAILED: locations import anchor not found")
    sys.exit(1)
new_import = old_import + '\nimport { blogPosts } from "../lib/blogData";'
c = c.replace(old_import, new_import)

old_return = ", ...locationRoutes];"
if old_return not in c:
    print("FAILED: return anchor not found")
    sys.exit(1)
new_return = """, ...locationRoutes, { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 }, ...blogPosts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.datePublished),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))];"""
c = c.replace(old_return, new_return)

with open(path, "w", encoding="utf-8") as f:
    f.write(c)
print("DONE_SITEMAP_BLOG")
