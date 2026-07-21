import sys
path = "app/admin/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

def must_have_one(text, label):
    n = c.count(text)
    if n != 1:
        print("FAILED at " + label + ": found " + str(n) + " occurrences (expected 1)")
        sys.exit(1)

def wrap_simple(c, start_tag, start_marker, end_tag, condition, label):
    must_have_one(start_marker, label)
    idx = c.index(start_marker)
    s = c.rindex(start_tag, 0, idx)
    e = c.index(end_tag, idx) + len(end_tag)
    return c[:s] + '{' + condition + ' && (\n' + c[s:e] + '\n)}' + c[e:]

def find_matching_div_end(c, div_open_start):
    depth = 1
    pos = div_open_start + 4
    while True:
        next_open = c.find("<div", pos)
        next_close = c.find("</div>", pos)
        if next_close == -1:
            raise Exception("no closing div found")
        if next_open != -1 and next_open < next_close:
            depth += 1
            pos = next_open + 4
        else:
            depth -= 1
            pos = next_close + len("</div>")
            if depth == 0:
                return pos

# 1. + Add Project button (single <a> element)
c = wrap_simple(c, "<a", 'href="/admin/add-project"', "</a>", 'canDo("projects")', "add-project")

# 2. Total Projects stat card (single <div>)
c = wrap_simple(c, "<div", ">Total Projects</p>", "</div>", 'canDo("projects")', "total-projects")

# 3. Total Users stat card (single <button>)
c = wrap_simple(c, "<button", ">Total Users</p>", "</button>", 'canDo("users")', "total-users")

# 4. Partners / Brokers stat card (single <button>)
c = wrap_simple(c, "<button", ">Partners / Brokers</p>", "</button>", 'canDo("partners")', "partners-brokers")

# 5. Normal Users stat card (single <button>)
c = wrap_simple(c, "<button", ">Normal Users</p>", "</button>", 'canDo("users")', "normal-users")

# 6. All Projects section (h2 + div = needs fragment)
marker = ">All Projects</h2>"
must_have_one(marker, "all-projects-marker")
idx = c.index(marker)
s = c.rindex("<h2", 0, idx)
div_start = c.index("<div", idx)
e = find_matching_div_end(c, div_start)
block = c[s:e]
c = c[:s] + '{canDo("projects") && (\n<>\n' + block + '\n</>\n)}' + c[e:]

with open(path, "w", encoding="utf-8") as f:
    f.write(c)

print("DONE3")
