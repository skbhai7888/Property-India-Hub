import sys
path = "app/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

def must_have_one(text, label):
    n = c.count(text)
    if n != 1:
        print("FAILED at " + label + ": found " + str(n) + " occurrences (expected 1)")
        sys.exit(1)

anchor = '<p>© 2026 <span className="font-bold">PROPERTY INDIA HUB</span> | All Rights Reserved</p>'
must_have_one(anchor, "copyright-line")
idx = c.index(anchor)
indent = c[:idx].rsplit("\n", 1)[1]
links_block = (
    '<div className="flex gap-4 justify-center text-xs mb-2" style={{color: "#e8d5a3"}}>\n' +
    indent + '  <a href="/privacy" className="hover:underline">Privacy Policy</a>\n' +
    indent + '  <a href="/terms" className="hover:underline">Terms &amp; Conditions</a>\n' +
    indent + '  <a href="/disclaimer" className="hover:underline">Disclaimer</a>\n' +
    indent + '</div>\n' +
    indent
)
c = c[:idx] + links_block + c[idx:]

with open(path, "w", encoding="utf-8") as f:
    f.write(c)
print("DONE_FOOTER")
