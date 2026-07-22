import sys
path = "app/admin/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    lines = f.readlines()

# line 140 (1-indexed) -> index 139: const toggleSoldOut = async (id: number, currentStatus: string) => {
idx = 139
if "const toggleSoldOut" not in lines[idx]:
    print("FAILED line140 mismatch: " + lines[idx])
    sys.exit(1)
indent = lines[idx][:len(lines[idx]) - len(lines[idx].lstrip())]
# find the end of this function (closing "};" line) - search forward
end_idx = None
for j in range(idx, min(idx+15, len(lines))):
    if lines[j].strip() == "};":
        end_idx = j
        break
if end_idx is None:
    print("FAILED: could not find end of toggleSoldOut function")
    sys.exit(1)

new_fn = (
    "\n" + indent + "const toggleFeatured = async (id: number, current: boolean) => {\n" +
    indent + "  await supabase.from(\"projects\").update({ is_featured: !current }).eq(\"id\", id);\n" +
    indent + "  loadProjects();\n" +
    indent + "};\n"
)
lines.insert(end_idx + 1, new_fn)

with open(path, "w", encoding="utf-8") as f:
    f.writelines(lines)

# --- Part 2: find delete button near line 752 and insert Mark Featured button before it ---
with open(path, "r", encoding="utf-8") as f:
    lines = f.readlines()

del_idx = None
for j in range(740, min(770, len(lines))):
    if "deleteProject(project.id, project.name)" in lines[j]:
        del_idx = j
        break
if del_idx is None:
    print("FAILED: could not find delete button line near 752")
    sys.exit(1)
indent2 = lines[del_idx][:len(lines[del_idx]) - len(lines[del_idx].lstrip())]
btn = (
    indent2 + "<button onClick={() => toggleFeatured(project.id, project.is_featured)} className=\"text-xs px-3 py-2 rounded-lg font-bold text-white\" style={{background: project.is_featured ? '#6b7280' : '#c9a84c'}}>\n" +
    indent2 + "  {project.is_featured ? 'Unmark Featured' : '\u2b50 Mark Featured'}\n" +
    indent2 + "</button>\n"
)
lines.insert(del_idx, btn)

with open(path, "w", encoding="utf-8") as f:
    f.writelines(lines)

print("DONE_FEATURED_V2_2")
