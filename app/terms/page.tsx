export const metadata = { title: "Terms & Conditions - Property India Hub" };

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-5">
        <h1 className="text-xl font-bold mb-4" style={{ color: "#0a1628" }}>Terms &amp; Conditions</h1>
        <p className="text-xs text-gray-500 mb-4">Last updated: July 2026</p>

        <h2 className="font-bold text-sm mt-4 mb-1">About This Platform</h2>
        <p className="text-sm text-gray-600">Property India Hub is a listings platform that connects property owners, builders, brokers, and buyers/tenants. We are not a party to any transaction between users, and we do not act as a real estate agent, broker, or developer in any listed transaction unless explicitly stated.</p>

        <h2 className="font-bold text-sm mt-4 mb-1">User Responsibilities</h2>
        <p className="text-sm text-gray-600">Users listing properties are responsible for the accuracy of the information they submit, including price, location, and ownership details. Property India Hub does not independently verify every listing.</p>

        <h2 className="font-bold text-sm mt-4 mb-1">No Guarantee</h2>
        <p className="text-sm text-gray-600">We make reasonable efforts to display accurate and current information, but we do not guarantee the availability, price, or legal status of any listed property. Buyers and tenants should independently verify all details, including RERA registration where applicable, before making any commitment.</p>

        <h2 className="font-bold text-sm mt-4 mb-1">Limitation of Liability</h2>
        <p className="text-sm text-gray-600">Property India Hub is not liable for any loss or dispute arising from transactions conducted between users of this platform.</p>

        <h2 className="font-bold text-sm mt-4 mb-1">Governing Law</h2>
        <p className="text-sm text-gray-600">These terms are governed by the laws of India.</p>

        <h2 className="font-bold text-sm mt-4 mb-1">Contact Us</h2>
        <p className="text-sm text-gray-600">For questions about these terms, contact us at propertyindiahubs@gmail.com or +91 7820008509.</p>
      </div>
    </main>
  );
}
