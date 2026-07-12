export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow mt-6 text-center">
        <h1 className="text-2xl font-bold mb-6" style={{ color: "#0a1628" }}>Contact Karein</h1>
        <div className="flex flex-col gap-3">
          <a href="tel:+917820008509" className="py-3 rounded-lg font-bold text-white" style={{ background: "#22c55e" }}>📞 Call: +91 7820008509</a>
          <a href="https://wa.me/917820008509" className="py-3 rounded-lg font-bold text-white" style={{ background: "#25D366" }}>💬 WhatsApp</a>
          <a href="mailto:propertyindiahubs@gmail.com" className="py-3 rounded-lg font-bold text-white" style={{ background: "#0a1628" }}>✉️ propertyindiahubs@gmail.com</a>
        </div>
      </div>
    </main>
  );
}
