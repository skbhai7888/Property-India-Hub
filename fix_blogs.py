import sys
p = "lib/blogData.ts"
c = open(p, "r").read()
if "noida-expressway" in c: sys.exit("SUCCESS: Blogs already exist!")

idx = c.rfind("]")
if idx == -1: sys.exit("ERROR: No closing bracket found")

b1 = """  ,
  {
    id: "noida-expressway-vs-yamuna-expressway-2026",
    title: "Noida Expressway vs Yamuna Expressway: Which is Better in 2026?",
    date: "8 August 2026",
    author: "Property India Hub Editorial Team",
    category: "Investment Guide",
    excerpt: "Comparing rental yields and price appreciation.",
    readTime: "7 min read",
    content: `\n# Noida Expressway vs Yamuna Expressway\nNoida Expressway offers steady rental income (4-5% yields).\nYamuna Expressway is ideal for long-term capital appreciation.\n`
  },
  {
    id: "step-by-step-property-verification-checklist",
    title: "Step-by-Step Property Verification Checklist",
    date: "8 August 2026",
    author: "Property India Hub Legal Team",
    category: "Legal Advisory",
    excerpt: "Must-have verification checklist before paying advance.",
    readTime: "5 min read",
    content: `\n# Property Verification Checklist\n- **Legal Title Deed:** Ensure seller is verified owner.\n- **RERA Verification:** Check RERA portal.\n- **Encumbrance Certificate:** Verify land is free from mortgages.\n- **Approved Layout Plans:** Confirm authority sanctioned layout.\n`
  }
\n"""
open(p, "w", encoding="utf-8").write(c[:idx] + b1 + c[idx:])
print("SUCCESS: 2 Blogs Added Safely")
