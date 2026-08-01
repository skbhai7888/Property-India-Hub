import sys
path = "app/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

def must_have_one(text, label):
    n = c.count(text)
    if n != 1:
        print("FAILED at " + label + ": found " + str(n) + " occurrences (expected 1)")
        sys.exit(1)

anchor = '<div className="flex gap-4 justify-center text-xs mb-2" style={{color: "#e8d5a3"}}>'
must_have_one(anchor, "privacy-row")
idx = c.index(anchor)
indent = c[:idx].rsplit("\n", 1)[1]
new_row = (
    '<div className="flex gap-4 justify-center text-xs mb-2" style={{color: "#e8d5a3"}}>\n' +
    indent + '  <a href="/locations" className="hover:underline">Locations</a>\n' +
    indent + '  <a href="/blog" className="hover:underline">Blog</a>\n' +
    indent + '  <a href="/knowledge" className="hover:underline">Knowledge Base</a>\n' +
    indent + '  <a href="/about" className="hover:underline">About Us</a>\n' +
    indent + '</div>\n' +
    indent
)
c = c[:idx] + new_row + c[idx:]

with open(path, "w", encoding="utf-8") as f:
    f.write(c)
print("DONE_FOOTER_NAV")
