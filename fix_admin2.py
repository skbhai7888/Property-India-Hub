import sys
path = "app/admin/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

def add_fragment(c, condition, label):
    marker = '{' + condition + ' && (\n'
    if c.count(marker) != 1:
        print("FAILED at " + label + "-open: found " + str(c.count(marker)))
        sys.exit(1)
    idx = c.index(marker)
    insert_at = idx + len(marker)
    c = c[:insert_at] + '<>\n' + c[insert_at:]
    close_marker = '\n)}'
    cidx = c.index(close_marker, insert_at)
    c = c[:cidx] + '\n</>' + c[cidx:]
    return c

c = add_fragment(c, 'canDo("property_ads")', "property_ads")
c = add_fragment(c, 'canDo("partners")', "partners")

with open(path, "w", encoding="utf-8") as f:
    f.write(c)
print("DONE2")
