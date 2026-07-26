import sys

def add_canonical_last(path, anchor, expected_count, var_name, url_expr, label):
    with open(path, "r", encoding="utf-8") as f:
        c = f.read()
    n = c.count(anchor)
    if n != expected_count:
        print("FAILED at " + label + ": found " + str(n) + " occurrences (expected " + str(expected_count) + ")")
        sys.exit(1)
    idx = c.rindex(anchor)
    insert_at = idx + len(anchor)
    canon_tag = (
        '\n      {' + var_name + ' && (\n'
        '        <link rel="canonical" href={' + url_expr + '} />\n'
        '      )}'
    )
    c = c[:insert_at] + canon_tag + c[insert_at:]
    with open(path, "w", encoding="utf-8") as f:
        f.write(c)

add_canonical_last(
    "app/projects/[slug]/page.tsx",
    '<main className="min-h-screen bg-gray-50">',
    1,
    "project",
    '`https://property-india-hub.vercel.app/projects/${project.slug}`',
    "project-main"
)
add_canonical_last(
    "app/locations/[slug]/page.tsx",
    '<main className="min-h-screen bg-gray-50 p-4 pb-20">',
    2,
    "location",
    '`https://property-india-hub.vercel.app/locations/${location.slug}`',
    "location-main"
)
add_canonical_last(
    "app/blog/[slug]/page.tsx",
    '<main className="min-h-screen bg-gray-50 p-4 pb-20">',
    2,
    "post",
    '`https://property-india-hub.vercel.app/blog/${post.slug}`',
    "blog-main"
)

print("DONE_CANONICAL2")
