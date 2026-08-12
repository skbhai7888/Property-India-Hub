import sys
path = "lib/blogData.ts"
with open(path, "r", encoding="utf-8") as f: c = f.read()

bad_start = c.find('id: "noida-expressway')
if bad_start != -1:
    comma_idx = c.rfind(',', 0, bad_start)
    end_idx = c.find('];', bad_start)
    if comma_idx != -1 and end_idx != -1:
        c = c[:comma_idx] + "\n" + c[end_idx:]

if 'slug: "noida-expressway-vs-yamuna-expressway-2026"' in c:
    sys.exit("SUCCESS: Correct blogs already exist!")
b1 = """  ,
  {
    slug: "noida-expressway-vs-yamuna-expressway-2026",
    title: "Noida Expressway vs Yamuna Expressway: Which is Better for Investment in 2026?",
    question: "Which is a better real estate investment in 2026: Noida Expressway or Yamuna Expressway?",
    directAnswer: "Noida Expressway is ideal for immediate rental income due to established infrastructure, while Yamuna Expressway is better for 3-5 year capital appreciation driven by the Jewar Airport and Film City.",
    body: [
      {
        heading: "Noida Expressway: Saturated High-Yield Corridor",
        content: "Noida Expressway is a fully functional commercial and residential hub. With operational IT parks and metro connectivity, it offers steady rental income (4-5% yields) and lower vacancy risks."
      },
      {
        heading: "Yamuna Expressway: High-Appreciation Growth Zone",
        content: "Yamuna Expressway is an evolving mega-infrastructure zone anchored by the Jewar International Airport and upcoming industrial allotments. It is meant for long-term capital multiplication."
      }
    ],
    faqs: [{ q: "Can I expect immediate rental income on Yamuna?", a: "No, it is a developing corridor suited for long-term appreciation." }],
    datePublished: "2026-08-08"
  }"""
b2 = """,
  {
    slug: "step-by-step-property-verification-checklist",
    title: "Step-by-Step Property Verification Checklist Before Paying Token Money",
    question: "What legal documents should I check before paying token money for a property?",
    directAnswer: "Before transferring any token amount, you must verify the Legal Title Deed, the project's RERA registration, the Encumbrance Certificate (EC), and the authority-approved layout plans.",
    body: [
      {
        heading: "Legal Title and RERA",
        content: "Always ensure the seller is the verified owner with a registered sale deed. Check the RERA identifier on the official state RERA portal to avoid illegal constructions."
      },
      {
        heading: "Encumbrance and Layout",
        content: "Verify the Encumbrance Certificate (EC) to ensure the land is free from bank mortgages or liens. Confirm the local authority has sanctioned the building layout."
      }
    ],
    faqs: [{ q: "Is an Encumbrance Certificate mandatory?", a: "Yes, it proves the property has no pending legal dues or bank loans." }],
    datePublished: "2026-08-08"
  }
"""
idx = c.find('];')
if idx == -1: sys.exit("Error: Could not find ];")
open(path, "w", encoding="utf-8").write(c[:idx] + b1 + b2 + "\n" + c[idx:])
print("SUCCESS: Blogs fixed to match TypeScript interface!")
