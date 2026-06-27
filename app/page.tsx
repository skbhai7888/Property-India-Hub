export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-900 text-white p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/logo.jpg" alt="Property India Hub" className="h-10 w-10 rounded-full object-cover" />
            <h1 className="text-xl font-bold">Property India Hub</h1>
          </div>
          <div className="flex gap-3">
            <a href="tel:+917820008509" className="bg-green-500 px-3 py-1 rounded text-sm">📞 Call</a>
            <a href="https://wa.me/917820008509" className="bg-green-600 px-3 py-1 rounded text-sm">💬 WhatsApp</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-blue-800 text-white py-16 px-4 text-center">
        <img src="/logo.jpg" alt="Logo" className="h-24 w-24 mx-auto rounded-full mb-4 object-cover border-4 border-yellow-400" />
        <h2 className="text-3xl font-bold mb-4">भारत की बेहतरीन Properties</h2>
        <p className="text-lg mb-6">Uttarakhand • Rajasthan • Uttar Pradesh</p>
        <a href="https://wa.me/917820008509" className="bg-yellow-400 text-black px-8 py-3 rounded-full font-bold text-lg">
          Free Site Visit Book Karo
        </a>
      </section>

      {/* Projects */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-center mb-8 text-blue-900">Our Live Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Uttarakhand Hills", location: "Uttarakhand", price: "₹5.5 Lac onwards", tag: "Hill View" },
            { name: "Ayodhya Dham Plots", location: "Ayodhya, UP", price: "₹8 Lac onwards", tag: "Religious Hub" },
            { name: "Sikar Plots", location: "Sikar, Rajasthan", price: "₹3.5 Lac onwards", tag: "Hot Location" },
          ].map((project, i) => (
            <div key={i} className="border rounded-xl shadow-lg overflow-hidden">
              <div className="bg-blue-100 h-40 flex items-center justify-center text-4xl">🏡</div>
              <div className="p-4">
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">{project.tag}</span>
                <h4 className="font-bold text-lg mt-2">{project.name}</h4>
                <p className="text-gray-500 text-sm">📍 {project.location}</p>
                <p className="text-blue-900 font-bold mt-1">{project.price}</p>
                <a href="https://wa.me/917820008509" className="block mt-3 bg-blue-900 text-white text-center py-2 rounded-lg text-sm">
                  Enquire Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-center py-6">
        <img src="/logo.jpg" alt="Logo" className="h-16 w-16 mx-auto rounded-full mb-2 object-cover" />
        <p className="font-bold">Property India Hub</p>
        <p className="text-sm mt-1">📧 propertyindiahubs@gmail.com</p>
        <p className="text-sm">📞 +91 7820008509</p>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-4 flex flex-col gap-3 z-50">
        <a href="tel:+917820008509" className="bg-blue-900 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg">📞</a>
        <a href="https://wa.me/917820008509" className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg">💬</a>
      </div>
    </main>
  );
}
