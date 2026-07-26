import sys
path = "app/projects/[slug]/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    lines = f.readlines()

idx = 398  # line 399
if "</main>" not in lines[idx]:
    print("FAILED line399 mismatch: " + lines[idx])
    sys.exit(1)
indent = lines[idx][:len(lines[idx]) - len(lines[idx].lstrip())]

faq_block = indent + '''<div className="max-w-2xl mx-auto px-4 mb-6">
'''+indent+'''  <div className="bg-white rounded-xl shadow p-4">
'''+indent+'''    <h2 className="font-bold text-lg mb-3" style={{color: "#0a1628"}}>Frequently Asked Questions</h2>
'''+indent+'''    <div className="space-y-3">
'''+indent+'''      <div>
'''+indent+'''        <p className="text-sm font-bold">Is this project RERA registered?</p>
'''+indent+'''        <p className="text-sm text-gray-600">Buyers should independently verify RERA registration status directly with the builder or on the state RERA website before making any payment.</p>
'''+indent+'''      </div>
'''+indent+'''      <div>
'''+indent+'''        <p className="text-sm font-bold">How do I schedule a site visit for this property?</p>
'''+indent+'''        <p className="text-sm text-gray-600">Use the "Free Site Visit Book Karo" option on this page, or contact us directly via Call or WhatsApp to arrange a convenient time.</p>
'''+indent+'''      </div>
'''+indent+'''      <div>
'''+indent+'''        <p className="text-sm font-bold">Can I negotiate the listed price?</p>
'''+indent+'''        <p className="text-sm text-gray-600">Pricing is set by the property poster (owner, builder, or broker). You can discuss pricing directly with them via the Call or WhatsApp contact shown on this page.</p>
'''+indent+'''      </div>
'''+indent+'''      <div>
'''+indent+'''        <p className="text-sm font-bold">What documents should I check before booking?</p>
'''+indent+'''        <p className="text-sm text-gray-600">Typically buyers should review the title deed, RERA registration (if applicable), approved building plans, and any encumbrance certificates. We recommend consulting a legal professional before finalizing any purchase.</p>
'''+indent+'''      </div>
'''+indent+'''      <div>
'''+indent+'''        <p className="text-sm font-bold">Does Property India Hub charge for site visits or inquiries?</p>
'''+indent+'''        <p className="text-sm text-gray-600">No, browsing listings, booking a site visit, and contacting posters through Property India Hub is free for buyers and tenants.</p>
'''+indent+'''      </div>
'''+indent+'''    </div>
'''+indent+'''  </div>
'''+indent+'''</div>
'''

lines.insert(idx, faq_block)

with open(path, "w", encoding="utf-8") as f:
    f.writelines(lines)

print("DONE_PROJECT_FAQ")
