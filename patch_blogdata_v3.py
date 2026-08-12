import sys, re

PATH = "lib/blogData.ts"

with open(PATH, "r", encoding="utf-8") as f:
    content = f.read()

anchor_interface = "export interface BlogPost {"
body_pattern = re.compile(r"body: \{ heading: string; content: string \}\[\s*,")
anchor_slug1 = 'slug: "noida-expressway-vs-yamuna-expressway-2026",'
anchor_slug2 = 'slug: "step-by-step-property-verification-checklist",'
anchor_blogposts = "export const blogPosts: BlogPost[] = [\n"
end_pattern = re.compile(r"\n\s*\n\s*\];\s*\n")

if content.count(anchor_interface) != 1:
    print(f"FAILED: expected exactly 1 occurrence of anchor [interface start], found {content.count(anchor_interface)}")
    sys.exit(1)

body_matches = list(body_pattern.finditer(content))
if len(body_matches) != 1:
    print(f"FAILED: expected exactly 1 occurrence of anchor [broken body line pattern], found {len(body_matches)}")
    sys.exit(1)

for name, anchor in [
    ("noida-expressway slug", anchor_slug1),
    ("verification-checklist slug", anchor_slug2),
    ("blogPosts array start", anchor_blogposts),
]:
    if content.count(anchor) != 1:
        print(f"FAILED: expected exactly 1 occurrence of anchor [{name}], found {content.count(anchor)}")
        sys.exit(1)

obj1_open_idx = content.rfind("{", 0, content.index(anchor_slug1))
if obj1_open_idx == -1:
    print("FAILED: could not find opening brace for object 1")
    sys.exit(1)

obj2_open_idx = content.rfind("{", 0, content.index(anchor_slug2))
if obj2_open_idx == -1:
    print("FAILED: could not find opening brace for object 2")
    sys.exit(1)

end_match = end_pattern.search(content, obj2_open_idx)
if not end_match:
    print("FAILED: could not find end marker pattern (blank line + optional spaces + '];') after object 2")
    sys.exit(1)
end_idx = end_match.start()  # position right before the closing whitespace/'];' block

extracted_block = content[obj1_open_idx:end_idx]

if anchor_slug1 not in extracted_block or anchor_slug2 not in extracted_block:
    print("FAILED: extracted block missing expected slugs")
    sys.exit(1)
if not extracted_block.rstrip().endswith("}"):
    print("FAILED: extracted block does not end with a closing brace as expected")
    sys.exit(1)

extracted_block_fixed = extracted_block.rstrip() + ",\n"

body_match = body_matches[0]
region_start = body_match.start()
region_end = end_match.end()
removed_region = content[region_start:region_end]

if anchor_slug1 not in removed_region or anchor_slug2 not in removed_region:
    print("FAILED: region designated for removal doesn't match expected corrupted content")
    sys.exit(1)

clean_body_line = "body: { heading: string; content: string }[];\n"
new_content = content[:region_start] + clean_body_line + content[region_end:]

insert_pos = new_content.index(anchor_blogposts) + len(anchor_blogposts)
new_content = new_content[:insert_pos] + extracted_block_fixed + new_content[insert_pos:]

iface_start = new_content.index("export interface BlogPost {")
iface_end = new_content.index("\n}\n", iface_start) + 3
iface_block = new_content[iface_start:iface_end]
if "noida-expressway" in iface_block or "step-by-step-property" in iface_block:
    print("FAILED: interface still contains corrupted object data after patch")
    sys.exit(1)
if "body: { heading: string; content: string }[];" not in iface_block:
    print("FAILED: clean body line not found in interface after patch")
    sys.exit(1)

bp_start = new_content.index("export const blogPosts: BlogPost[] = [")
bp_end = new_content.index("\nexport function getBlogBySlug", bp_start)
bp_block = new_content[bp_start:bp_end]
order_check = [bp_block.find(anchor_slug1), bp_block.find(anchor_slug2), bp_block.find('slug: "jewar-airport-ncr-real-estate-impact"')]
if -1 in order_check:
    print(f"FAILED: not all 3 slugs found in blogPosts array: {order_check}")
    sys.exit(1)
if not (order_check[0] < order_check[1] < order_check[2]):
    print(f"FAILED: slugs not in expected order: {order_check}")
    sys.exit(1)

with open(PATH, "w", encoding="utf-8") as f:
    f.write(new_content)

print("SUCCESS: blogData.ts patched. Interface cleaned, 3 blog posts now in blogPosts array.")
