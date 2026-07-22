import sys

# --- Patch 1: ProjectsSection.tsx ---
path1 = "components/ProjectsSection.tsx"
with open(path1, "r", encoding="utf-8") as f:
    lines = f.readlines()

# line 109 (1-indexed) -> index 108: filtered.map((project: any, i: number) => {
idx = 108
if "filtered.map((project" not in lines[idx]:
    print("FAILED line109 mismatch: " + lines[idx])
    sys.exit(1)
lines[idx] = lines[idx].replace(
    "filtered.map((project: any, i: number) => {",
    "[...filtered].sort((a: any, b: any) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0)).map((project: any, i: number) => {"
)

# line 120 (1-indexed) -> index 119: <Link href={`/projects/${project.slug}`}...
idx2 = 119
if "<Link href=" not in lines[idx2]:
    print("FAILED line120 mismatch: " + lines[idx2])
    sys.exit(1)
indent = lines[idx2][:len(lines[idx2]) - len(lines[idx2].lstrip())]
badge_block = (
    indent + "{project.is_featured && !isSoldOut && (\n" +
    indent + "  <div className=\"absolute top-3 left-3 z-20\">\n" +
    indent + "    <span className=\"text-xs font-bold px-3 py-1 rounded-full shadow-lg\" style={{background: '#c9a84c', color: '#0a1628'}}>\u2b50 Featured</span>\n" +
    indent + "  </div>\n" +
    indent + ")}\n"
)
lines.insert(idx2, badge_block)

with open(path1, "w", encoding="utf-8") as f:
    f.writelines(lines)
print("DONE_FEATURED_V2_1")
