export const metadata = { title: "Disclaimer - Property India Hub" };

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-5">
        <h1 className="text-xl font-bold mb-4" style={{ color: "#0a1628" }}>Disclaimer</h1>
        <p className="text-xs text-gray-500 mb-4">Last updated: July 2026</p>

        <h2 className="font-bold text-sm mt-4 mb-1">General Disclaimer</h2>
        <p className="text-sm text-gray-600">Property India Hub is an online listings platform. Prices, availability, and specifications shown on this website are provided by property posters and are subject to change without notice.</p>

        <h2 className="font-bold text-sm mt-4 mb-1">RERA Disclaimer</h2>
        <p className="text-sm text-gray-600">Buyers are advised to independently verify the RERA registration status of any project before making a booking or payment, as applicable under the Real Estate (Regulation and Development) Act. Property India Hub does not guarantee RERA compliance of listings shown on this platform.</p>

        <h2 className="font-bold text-sm mt-4 mb-1">No Professional Advice</h2>
        <p className="text-sm text-gray-600">Content on this website, including location guides and FAQs, is provided for general informational purposes only and should not be treated as legal, financial, or investment advice.</p>

        <h2 className="font-bold text-sm mt-4 mb-1">Contact Us</h2>
        <p className="text-sm text-gray-600">For any concerns, contact us at propertyindiahubs@gmail.com or +91 7820008509.</p>
      </div>
    </main>
  );
}
