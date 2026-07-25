export const metadata = { title: "Privacy Policy - Property India Hub" };

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-5">
        <h1 className="text-xl font-bold mb-4" style={{ color: "#0a1628" }}>Privacy Policy</h1>
        <p className="text-xs text-gray-500 mb-4">Last updated: July 2026</p>

        <h2 className="font-bold text-sm mt-4 mb-1">Information We Collect</h2>
        <p className="text-sm text-gray-600">When you sign up, list a property, or book a site visit on Property India Hub, we collect information such as your name, phone number, email address, and property details you choose to submit.</p>

        <h2 className="font-bold text-sm mt-4 mb-1">How We Use Your Information</h2>
        <p className="text-sm text-gray-600">We use this information to display your listings, connect you with interested buyers or sellers, process site visit requests, and improve our services. We do not sell your personal information to third parties.</p>

        <h2 className="font-bold text-sm mt-4 mb-1">Sharing of Information</h2>
        <p className="text-sm text-gray-600">Contact details of a property poster (owner, builder, or broker) may be shown to interested visitors so they can connect directly regarding a listing. We use third-party services such as Supabase (database) and Cloudinary (image hosting) to operate the platform.</p>

        <h2 className="font-bold text-sm mt-4 mb-1">Your Choices</h2>
        <p className="text-sm text-gray-600">You can update or remove your listings and profile information at any time by logging into your account, or by contacting us directly.</p>

        <h2 className="font-bold text-sm mt-4 mb-1">Contact Us</h2>
        <p className="text-sm text-gray-600">For any privacy-related questions, contact us at propertyindiahubs@gmail.com or +91 7820008509.</p>
      </div>
    </main>
  );
}
