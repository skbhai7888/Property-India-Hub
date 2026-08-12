import sys
p = "app/projects/[slug]/page.tsx"
c = open(p, "r").read()
h = "Frequently Asked Questions</h2>"
m = "</main>"
i1 = c.find(h)
i2 = c.find(m, i1)
if i1==-1 or i2==-1: sys.exit("Error: Markers missing")
i1 += len(h)
f1 = [
["1. Is this project RERA registered?","Verify RERA registration status directly with the builder or state RERA website."],
["2. Schedule a site visit?","Use the Free Site Visit Book Kare option or contact via Call/WhatsApp."],
["3. Can I negotiate price?","Discuss pricing directly with the poster via Call or WhatsApp."],
["4. Documents to check?","Review title deed, RERA, approved plans, and encumbrance certificate."],
["5. Platform charges?","Browsing and contacting through Property India Hub is completely free."],
["6. Apply for home loan?","Most approved projects are eligible for loans from leading banks."],
["7. Stamp duty process?","Registration is done at the sub-registrar office after paying stamp duty."],
["8. Carpet vs Built-up area?","Carpet is usable area. Built-up includes walls and balcony."],
["9. Maintenance charges?","Yes, monthly/annual charges apply for security, lift, and sanitation."],
["10. Verify legal title?","Request title deeds and allotment letters from the seller."]
]
f2 = [
["11. NRI buyers?","Yes, NRIs can legally purchase property using standard NRE/NRO channels."],
["12. Payment plans?","Common plans include CLP, Down Payment, and PLP."],
["13. Parking space?","Parking allotment depends on the individual project offerings."],
["14. Possession delayed?","RERA-registered developers are liable to pay interest for delays."],
["15. Other city visits?","We can coordinate video calls or guided virtual walkthroughs."],
["16. Basic amenities?","Typically include 24/7 security, power backup, water, and parking."],
["17. Contact directly?","Click the Call or WhatsApp button to connect with the poster."],
["18. Bank loans available?","Properties with clear titles qualify for national/private bank loans."],
["19. Booking precautions?","Verify documents and avoid transferring to unverified personal accounts."],
["20. Listing transparency?","We provide direct contact, structured specs, and clear locations."]
]
html = '\n<div className="space-y-3">\n'
for q,a in (f1+f2): html += f'  <div>\n    <p className="text-sm font-bold">{q}</p>\n    <p className="text-sm text-gray-600">{a}</p>\n  </div>\n'
html += '</div>\n</div>\n</div>\n'
open(p,"w").write(c[:i1] + html + c[i2:])
print("SUCCESS: 20 FAQs Updated")
