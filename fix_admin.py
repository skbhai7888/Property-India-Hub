import sys

path = "app/admin/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

def must_have_one(text, label):
    n = c.count(text)
    if n != 1:
        print("FAILED at " + label + ": found " + str(n) + " occurrences (expected 1)")
        sys.exit(1)

old1 = '  const [selectedPerms, setSelectedPerms] = useState<string[]>([]);'
must_have_one(old1, "state-anchor")
new1 = old1 + '\n  const [myPhone, setMyPhone] = useState("");\n  const [myPerms, setMyPerms] = useState<Record<string, boolean>>({});'
c = c.replace(old1, new1)

old2 = '  function togglePerm(perm: string) {\n    setSelectedPerms(prev => prev.includes(perm) ? prev.filter(p => p !== perm) : [...prev, perm]);\n  }'
must_have_one(old2, "toggleperm-anchor")
new2 = old2 + '\n\n  const canDo = (perm: string) => myPhone === "7820008509" || myPerms?.[perm] === true;'
c = c.replace(old2, new2)

old3 = '.select("role").eq("id", user.id).single();'
must_have_one(old3, "select-role-anchor")
c = c.replace(old3, '.select("role, phone, admin_permissions").eq("id", user.id).single();')

old3b = 'if (profile?.role !== "admin") { router.push("/"); return; }\n    setChecking(false);'
must_have_one(old3b, "role-check-anchor")
c = c.replace(old3b, 'if (profile?.role !== "admin") { router.push("/"); return; }\n    setMyPhone(profile?.phone || "");\n    setMyPerms(profile?.admin_permissions || {});\n    setChecking(false);')

crown = "\U0001F451 Make Someone Admin"
must_have_one(crown, "crown-anchor")
idx = c.index(crown)
s = c.rindex("<div", 0, idx)
pos = c.index("Remove Admin", idx)
e = pos
for _ in range(3):
    e = c.index("</div>", e) + len("</div>")
c = c[:s] + '{canDo("promote_admin") && (\n' + c[s:e] + '\n)}' + c[e:]

def wrap_h2_section(c, h2_text, condition):
    marker = ">" + h2_text + "</h2>"
    must_have_one(marker, "h2-" + h2_text)
    idx = c.index(marker)
    s = c.rindex("<h2", 0, idx)
    e = c.index("</div>", idx) + len("</div>")
    return c[:s] + "{" + condition + " && (\n" + c[s:e] + "\n)}" + c[e:]

c = wrap_h2_section(c, "Property Ads", 'canDo("property_ads")')
c = wrap_h2_section(c, "Partner Applications", 'canDo("partners")')

must_have_one('setView("siteVisits")', "sitevisits-anchor")
s = c.rindex("<button", 0, c.index('setView("siteVisits")'))
e = c.index("</button>", s) + len("</button>")
c = c[:s] + '{canDo("site_visits") && (\n' + c[s:e] + '\n)}' + c[e:]

with open(path, "w", encoding="utf-8") as f:
    f.write(c)

print("DONE")
