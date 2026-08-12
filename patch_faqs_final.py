from pathlib import Path
import shutil, sys, re

target = Path("app/projects/[slug]/page.tsx")

if not target.exists():
    print("fAILED: target file not found")
    sys.exit(1)

lines = target.read_text(encoding="utf-8").splitlines()

hits = [i for i, l in enumerate(lines) if "Frequently Asked Questions" in l]
if len(hits) != 1:
    print(f"FAILED: expected exactly 1 FAQ heading, found {len(hits)}")
    sys.exit(1)
h = hits[0]

if h + 1 >= len(lines) or 'className="space-y-3"' not in lines[h+1]:
    print("FAILED: FAQ content wrapper not found immediately after heading")
    sys.exit(1)

depth = 0
wrapper_close = None
for i in range(h+1, len(lines)):
    line = lines[i]
    depth += line.count("<div")
    depth -= line.count("</div>")
    if i == h + 1 and depth != 1:
        print("FAILED: unexpected FAQ wrapper structure")
        sys.exit(1)
    if i > h + 1 and depth == 0:
        wrapper_close = i
        break
if wrapper_close is None:
    print("FAILED: FAQ wrapper closing div not found")
    sys.exit(1)

old_block = "\n".join(lines[h+1:wrapper_close+1])
old_questions = re.findall('<p className="text-sm font-bold">.*?</p>', old_block, flags=re.S.)
if len(old_questions) != 5:
    print(f"FAILED: expected 5 existing FAQs, found {len(old_questions)}")
    sys.exit(1)

faq_pairs = [
("Is this project RERA registered?", "Buyers should independently verify RERA registration status directly with the builder or on the applicable state RERA website before making any payment."),
("How do I schedule a site visit for this property?", 'Use the "Free Site Visit Book Karo" option on this page, or contact the property poster directly via Call or WhatsApp to arrange a convenient time.'),
("Can I negotiate the listed price?", "Pricing is set by the property poster (owner, builder, or broker). You can discuss pricing directly with the Call or WhatsApp contact shown on this page."),
("What documents should I check before booking?", "Typical buyers should review the title deed, RERA registration (if applicable), approved building plans, and relevant encumbrance or ownership documents. Consider consulting a qualified legal professional before finalizing any purchase."),
("does Property India Hub charge for site visits or inquiries?", "No, browsing listings, booking a site visit, and contacting posters through Property India Hub is free for buyers and tenants."),
("How can I contact the property poster?", "Use the Call or WhatsApp options shown on the property page to contact the poster directly."),
("Can I book this property directly through Property India Hub?", "Property India Hub provides the listing and contact/booking interface. Final booking, payment, and agreement terms should be confirmed directly with the property poster."),
("Is the displayed property information guaranteed?", "Property details are provided for informational purposes. Buyers should independently verify price, availability, approvals, ownership, dimensions, and other important details with the property poster before making a decision."),
("How do I verify the ownership of a property?", "Ask the property poster for the relevant ownership and title documents and have them independently verified before making any payment or signing an agreement."),
("Should I verify property approvals before buying?", "Yes. Buyers should verify the approvals and permissions applicable to the specific property and project before proceeding with a purchase."),
("What should I verify before paying a token amount?", "Verify the property's ownership, applicable approvals, payment terms, refund conditions, and the identity and authority of the person receiving the payment before paying any token amount."),
("Can I request more property details from the poster?", "Yes. Contact the poster through the Call or WhatsApp option on the listing and ask for any additional information or documents you need."),
("How do I know whether the property is still available?", "Availability can change. Contact the property poster directly through the listing to confirm current availability before planning a visit or making any payment."),
("Are prices on Property India Hub final?", "Not necessarily. Listed prices may be subject to change and should be confirmed directly with the property poster before making any financial commitment."),
("Can I compare this property with other listings?", "You can review other available listings on Property India Hub and compare their published details. Always independently verify important facts with each respective property poster."),
("Is a site visit recommended before booking?", "Yes. A physical site visit can help you inspect the location and property and discuss documents and terms directly with the poster before making a decision."),
("What should I check during a site visit?", "Check the actual location, access, boundaries or unit details, surrounding development, and any documents or claims that are important to your purchase decision."),
("Can I get a receipt for a payment made to the property poster?", "Ask the property poster for appropriate written documentation or a receipt for any payment, and keep copies of all transaction records."),
("Does a listing on Property India Hub mean the property has been legally verified?", "A listing on the platform should not be treated as a legal certification or guarantee. Buyers should independently verify legal, ownership, approval, and regulatory details before purchasing."),
("Who is responsible for the final sale agreement?", "The final sale, booking, agreement, payment, and related legal terms are between the buyer and the property poster or seller. Buyers should review the documents carefully before signing.")
]

new_block = ["<div className="space-y-3">"]
for q, a in faq_pairs:
    new_block += ["<div>", f"  <p className="text-sm font-bold">{q}</p>", f"  <p className="text-sm text-gray-600">{a}</p>", "</div>"]
new_block.append("</div>")
candidate = lines:h+ new_block + lines[wrapper_close+1:]
candidate_text = "\n".join(candidate) + "\n"
questions = re.findall(r'<p className="text-sm font-bold">(.*?)</p>', candidate_text, flags=re.S)
if len(questions) != 20:
    print(f"FAILED: post-patch verification found {len(questions)} FAQ questions, expected 20")
    sys.exit(1)
if "</main>" not in candidate_text:
    print("FAILED: closing </main> missing")
    sys.exit(1)

backup = target.with_suffix(target.suffix + ".faq-backup")
shutil.copy2target, backup)
target.write_text(candidate_text, encoding="utf-8")
print("SUCCESS: FAQ section expanded from 5 to 20.")
print(f"Backup created: {backup}")
