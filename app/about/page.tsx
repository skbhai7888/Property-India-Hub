export const metadata = { title: "About Us - Property India Hub" };

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            mainEntity: {
              "@type": "Organization",
              name: "Property India Hub",
              url: "https://property-india-hub.vercel.app",
              telephone: "+91-7820008509",
              email: "propertyindiahubs@gmail.com",
              areaServed: ["NCR", "Uttar Pradesh", "Rajasthan", "Uttarakhand"],
            },
          }),
        }}
      />
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-5">
        <h1 className="text-xl font-bold mb-4" style={{ color: "#0a1628" }}>About Property India Hub</h1>

        <h2 className="font-bold text-sm mt-4 mb-1">Who We Are</h2>
        <p className="text-sm text-gray-600">Property India Hub is a real estate listings platform connecting property buyers, tenants, brokers, and builders across North India. We list verified residential and commercial projects with direct contact to the poster for site visits and inquiries.</p>

        <h2 className="font-bold text-sm mt-4 mb-1">Where We Operate</h2>
        <p className="text-sm text-gray-600">Our listings currently cover NCR (Noida, Greater Noida, Ghaziabad, Jewar/Yamuna Expressway), Uttar Pradesh (Mathura, Vrindavan, Ayodhya, Garhmukteshwar), Rajasthan (Behror, Khatu Shyam), and Uttarakhand (Jageshwar Dham).</p>

        <h2 className="font-bold text-sm mt-4 mb-1">What We Offer</h2>
        <p className="text-sm text-gray-600">Free browsing of live project listings, free site visit booking, a partner/broker program for referral-based leads, and guides on RERA, home loans, and property registration in our Knowledge Base.</p>

        <h2 className="font-bold text-sm mt-4 mb-1">Contact Us</h2>
        <p className="text-sm text-gray-600">Phone: +91 7820008509<br />Email: propertyindiahubs@gmail.com<br />Social: @propertyindiahub</p>

        <div className="mt-4 flex gap-2">
          <a href="tel:+917820008509" className="px-4 py-2 rounded-lg font-bold text-sm text-white" style={{ background: "#0a1628" }}>Call Now</a>
          <a href="https://wa.me/917820008509" className="px-4 py-2 rounded-lg font-bold text-sm text-white" style={{ background: "#25D366" }}>WhatsApp</a>
        </div>
      </div>
    </main>
  );
}
