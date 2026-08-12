import sys
path = "lib/blogData.ts"
with open(path, "r", encoding="utf-8") as f: content = f.read()
if "noida-expressway" in content: sys.exit("SUCCESS: Blogs already exist!")

b1 = """  ,
  {
    id: "noida-expressway-vs-yamuna-expressway-2026",
    title: "Noida Expressway vs Yamuna Expressway: Which is Better in 2026?",
    date: "8 August 2026",
    author: "Property India Hub Editorial Team",
    category: "Investment Guide",
    excerpt: "Comparing rental yields and price appreciation.",
    readTime: "7 min read",
    content: `
# Noida Expressway vs Yamuna Expressway
Noida Expressway offers steady rental income (4-5% yields).
Yamuna Expressway is ideal for long-term capital appreciation.
`
  },
  {
    id: "step-by-step-property-verification-checklist",
    title: "Step-by-Step Property Verification Checklist",
    date: "8 August 2026",
    author: "Property India Hub Legal Team",
    category: "Legal Advisory",
    excerpt: "Must-have verification checklist before paying advance.",
    readTime: "5 min read",
    content: `
# Property Verification Checklist
- **Legal Title Deed:** Ensure seller is verified owner.
- **RERA Verification:** Check RERA portal.
- **Encumbrance Certificate:** Verify land is free from mortgages.
- **Approved Layout Plans:** Confirm authority sanctioned layout.
`
  }
]"""
if content.rstrip().endswith("]"):
    open(path, "w", encoding="utf-8").write(content.rstrip()[:-1] + b1)
    print("SUCCESS: 2 Blogs Added")
