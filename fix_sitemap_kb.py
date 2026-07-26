import sys
path = "app/sitemap.ts"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

old_import = 'import { blogPosts } from "../lib/blogData";'
if old_import not in c:
    print("FAILED: blog import anchor not found")
    sys.exit(1)
new_import = old_import + '\nimport { knowledgeGuides } from "../lib/knowledgeData";'
c = c.replace(old_import, new_import)

old_return_tail = "  }))];"
if c.count(old_return_tail) != 1:
    print("FAILED: return tail found " + str(c.count(old_return_tail)))
    sys.exit(1)
new_return_tail = """  })), { url: `${baseUrl}/knowledge`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 }, ...knowledgeGuides.map((g) => ({
    url: `${baseUrl}/knowledge/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))];"""
c = c.replace(old_return_tail, new_return_tail)

with open(path, "w", encoding="utf-8") as f:
    f.write(c)
print("DONE_SITEMAP_KB")
