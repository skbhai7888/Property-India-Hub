export interface KnowledgeGuide {
  slug: string;
  title: string;
  question: string;
  directAnswer: string;
  sections: { heading: string; content: string }[];
  faqs: { q: string; a: string }[];
}

export const knowledgeGuides: KnowledgeGuide[] = [
  {
    slug: "rera-guide",
    title: "RERA Guide: What Every Property Buyer Should Know",
    question: "What is RERA and why does it matter when buying property in India?",
    directAnswer: "RERA (Real Estate Regulation and Development Act, 2016) requires most residential and commercial projects to be registered with a state RERA authority, giving buyers a way to verify project details, timelines, and builder track record before making a payment.",
    sections: [
      { heading: "What RERA Covers", content: "RERA registration is generally required for projects above a minimum land area (varies by state, often 500 sq. m. or more, or more than 8 units). Registered projects get a unique RERA registration number that can be verified on the respective state's RERA website." },
      { heading: "How to Verify a Project", content: "Each state has its own RERA portal (for example, UP-RERA, Rajasthan RERA, Uttarakhand RERA). Buyers can search by project name, builder name, or RERA number to see registered details, promised delivery date, and any complaints filed." },
      { heading: "What RERA Does Not Guarantee", content: "RERA registration confirms the project is registered and disclosed to the authority — it does not by itself guarantee construction quality or investment returns. Buyers should still do independent due diligence." },
    ],
    faqs: [
      { q: "Is every property project required to register under RERA?", a: "Not always — very small projects below the state's minimum threshold may be exempt. Always check with the specific state RERA portal." },
      { q: "What should I do if a project isn't RERA registered?", a: "Ask the builder directly for an explanation, and independently verify on the state RERA website before proceeding. Consulting a legal professional is advisable." },
    ],
  },
  {
    slug: "home-loan-guide",
    title: "Home Loan Guide: Key Things to Know Before Applying",
    question: "What should I check before taking a home loan for property in India?",
    directAnswer: "Before taking a home loan, compare interest rates (fixed vs. floating) across banks and NBFCs, check your loan eligibility based on income, and confirm the property has clear title and (where applicable) RERA registration, since lenders typically require this documentation.",
    sections: [
      { heading: "Fixed vs. Floating Interest Rates", content: "Fixed rates stay the same for a set period (or the full tenure), while floating rates move with the lender's benchmark rate (such as the repo-linked rate). Floating rates are more common for home loans in India and can go up or down over the loan tenure." },
      { heading: "Documents Typically Required", content: "Lenders generally ask for identity and address proof, income proof (salary slips or ITR for self-employed applicants), bank statements, and property documents including the sale agreement and title papers." },
      { heading: "Loan-to-Value Ratio", content: "Banks typically finance a percentage of the property value (commonly up to 75-90% depending on the loan amount and lender policy), with the buyer expected to arrange the remaining amount as a down payment." },
    ],
    faqs: [
      { q: "Can I get a home loan for a resale property?", a: "Yes, most banks offer loans for resale properties, subject to the property having clear title and meeting the lender's other criteria." },
      { q: "Does Property India Hub provide home loans?", a: "No, we are a listings platform and do not provide loans directly. We can connect you with the property poster and you can pursue financing through your preferred bank or NBFC." },
    ],
  },
  {
    slug: "property-registry-guide",
    title: "Property Registry Guide: Registration and Stamp Duty Basics",
    question: "What is property registration and why is it necessary?",
    directAnswer: "Property registration is the legal process of recording a property transaction with the local sub-registrar's office, and it is necessary to establish legal ownership; it involves paying stamp duty and registration fees, which vary by state.",
    sections: [
      { heading: "Stamp Duty", content: "Stamp duty is a state government tax on property transactions, calculated as a percentage of the property's transaction value or circle rate, whichever is higher. Rates vary significantly by state and sometimes by gender of the buyer (some states offer concessions for women buyers)." },
      { heading: "Registration Process", content: "After stamp duty is paid, the sale deed is presented at the local sub-registrar's office for registration, along with required documents (ID proof, PAN, photographs, and the executed sale deed). Both buyer and seller (or their authorized representatives) are typically required to be present." },
      { heading: "Why Registration Matters", content: "An unregistered sale deed generally does not confer full legal ownership rights in the way a registered one does. Buyers should not treat payment alone as completing a property transaction — registration is a distinct, necessary step." },
    ],
    faqs: [
      { q: "Is stamp duty the same across all of India?", a: "No, stamp duty rates are set by individual state governments and vary considerably, so buyers should check the current rate in the specific state where the property is located." },
      { q: "Can registration be done online?", a: "Several states now offer partial or full online registration and stamp duty payment facilities, though procedures vary by state — check your local sub-registrar's office or state revenue department website for current options." },
    ],
  },
];

export function getGuideBySlug(slug: string) {
  return knowledgeGuides.find((g) => g.slug === slug);
}
