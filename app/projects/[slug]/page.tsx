'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const projects: Record<string, any> = {
  'fragrance-homes': {
    name: "Fragrance Homes",
    location: "Siddharth Vihar, Ghaziabad",
    price: "₹10,999/Sq.Ft onwards",
    tag: "Ready to Move",
    type: "Apartment",
    builder: "Truvae Group",
    rera: "UPRERAPRJ4727",
    sizes: ["2 BHK - 1105 Sq.Ft", "2 BHK - 1135 Sq.Ft", "3 BHK - 1350 Sq.Ft", "3 BHK - 1525 Sq.Ft"],
    amenities: ["Rooftop Swimming Pool", "Luxury Clubhouse", "Gym", "Amphitheater", "Jogging Track", "Yoga Lawn"],
    highlights: ["2 min from Metro & RRTS", "Near NH-58 & NH-24", "Near DPS Indirapuram"],
    payment: "10% Booking | 60% in 45 Days | 20% on Structure | 10% on Possession",
  },
  'garh-ganga-enclave': {
    name: "Garh Ganga Enclave",
    location: "Garhmukteshwar, UP",
    price: "₹18,000/Sq.Yard",
    tag: "Ganga View",
    type: "Plot",
    builder: "Ind Group",
    sizes: ["50 Sq.Yard", "100 Sq.Yard", "150 Sq.Yard", "200 Sq.Yard", "250 Sq.Yard"],
    amenities: ["Gated Society", "Swimming Pool", "Clubhouse", "CCTV", "Street Lights", "Parks"],
    highlights: ["200m from NH-09", "Ready for Construction", "Immediate Registry"],
    payment: "Immediate Registry & Mutation Available",
  },
  'sunshine-city-plots': {
    name: "Sunshine City Plots",
    location: "Yamuna Expressway, Greater Noida",
    price: "₹30.5 Lac onwards",
    tag: "Near Jewar Airport",
    type: "Plot",
    builder: "Aaradhya Realty",
    sizes: ["100 Sq.Yard (20x45)", "120 Sq.Yard", "200 Sq.Yard"],
    amenities: ["Grand Entrance", "Concrete Roads", "Street Lights", "Green Parks", "24x7 Security", "CCTV"],
    highlights: ["15 min from Jewar Airport", "10 min from Film City", "70% Bank Loan Available"],
    payment: "Up to 70% loan from PNB Housing Finance",
  },
  'dev-bhoomi-uttarakhand': {
    name: "Dev Bhoomi Uttarakhand",
    location: "Jageshwar Dham, Almora",
    price: "₹9,000/Sq.Yard",
    tag: "Hill View",
    type: "Plot",
    builder: "Property India Hub (JV)",
    sizes: ["200 Sq.Yard - ₹18 Lakh", "240 Sq.Yard - ₹21.6 Lakh", "300 Sq.Yard - ₹27 Lakh"],
    amenities: ["10-Acre Forest", "Himalayan Views", "Natural Mineral Water", "Water Body", "25Ft Roads"],
    highlights: ["Near Jageshwar Dham Temple", "Homestay/Airbnb Potential", "Pre-Launch Price"],
    payment: "50% Booking | 25% in 60 Days | 25% on Possession",
  },
  'radhe-awadh-puri': {
    name: "Radhe Awadh Puri",
    location: "Ayodhya Dham, UP",
    price: "₹17,000/Gaj",
    tag: "Near Ram Mandir",
    type: "Plot",
    builder: "Shubh Labh Developers",
    sizes: ["100 Sq.Yard (900 Sq.Ft)"],
    amenities: ["Gated Township", "40Ft Roads", "Electricity", "Water", "Parks", "CCTV"],
    highlights: ["10 KM from Ram Mandir", "13 KM from Valmiki Airport", "20 KM from Ram Mandir"],
    payment: "20% Booking | 10% in 30 Days | 10% in 60 Days | 12 EMI of ₹77,495",
  },
  'prateek-grand-begonia': {
    name: "Prateek Grand Begonia",
    location: "Siddharth Vihar, Ghaziabad",
    price: "₹1.29 Cr onwards",
    tag: "Luxury High-Rise",
    type: "Apartment",
    builder: "Prateek Group",
    rera: "UPRERAPRJ790651",
    sizes: ["2 BHK - 1075 Sq.Ft @ ₹1.29 Cr", "2 BHK+Study - 1280 Sq.Ft @ ₹1.54 Cr", "3 BHK - 1500 Sq.Ft @ ₹1.80 Cr", "3 BHK Premium - 1810 Sq.Ft @ ₹2.17 Cr"],
    amenities: ["Rooftop Garden", "Golf Cart", "Swimming Pool", "EV Charging", "Box Cricket", "Tennis Court"],
    highlights: ["32 Floor High-Rise", "2 min from Metro & RRTS", "Near Noida Sector 62"],
    payment: "10% Booking | 30% in 90 Days | 30% on Top Floor | 30% on Possession",
  },
};

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projects[slug];

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{background: '#0a1628'}}>
        <p className="text-white text-xl">Project not found</p>
        <Link href="/" className="mt-4 px-6 py-2 rounded-full text-black font-bold" style={{background: '#c9a84c'}}>← Back to Home</Link>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: project.name,
        text: `${project.name} - ${project.location}\n${project.price}\nContact: +91 7820008509`,
        url: window.location.href,
      });
    } else {
      const text = `${project.name} - ${project.location}\n${project.price}\nContact: +91 7820008509\n${window.location.href}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 shadow-lg" style={{background: '#0a1628'}}>
        <div className="max-w-4xl mx-auto flex justify-between items-center p-4">
          <Link href="/" className="font-bold" style={{color: '#c9a84c'}}>← Back</Link>
          <h1 className="text-sm font-bold text-white">Property India Hub</h1>
          <button onClick={handleShare} className="px-3 py-1 rounded-full text-xs font-bold text-black" style={{background: '#c9a84c'}}>Share 📤</button>
        </div>
      </header>

      {/* Hero Image */}
      <div className="h-56 flex items-center justify-center" style={{background: 'linear-gradient(135deg, #0a1628 0%, #1a3a6b 100%)'}}>
        <div className="text-center">
          <span className="text-7xl">{project.type === 'Apartment' ? '🏢' : '🏡'}</span>
          <p className="text-white font-bold mt-2">{project.tag}</p>
        </div>
      </div>

      {/* Project Info */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <h2 className="text-xl font-bold" style={{color: '#0a1628'}}>{project.name}</h2>
          <p className="text-gray-500 text-sm mt-1">📍 {project.location}</p>
          <p className="text-2xl font-bold mt-2" style={{color: '#c9a84c'}}>{project.price}</p>
          {project.builder && <p className="text-sm text-gray-600 mt-1">🏗️ {project.builder}</p>}
          {project.rera && <p className="text-xs text-green-600 mt-1">✅ RERA: {project.rera}</p>}
        </div>

        {/* Sizes */}
        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <h3 className="font-bold mb-3" style={{color: '#0a1628'}}>📐 Available Sizes</h3>
          {project.sizes.map((size: string, i: number) => (
            <div key={i} className="flex items-center gap-2 py-2 border-b last:border-0">
              <span style={{color: '#c9a84c'}}>▪</span>
              <span className="text-sm text-gray-700">{size}</span>
            </div>
          ))}
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <h3 className="font-bold mb-3" style={{color: '#0a1628'}}>✨ Amenities</h3>
          <div className="grid grid-cols-2 gap-2">
            {project.amenities.map((a: string, i: number) => (
              <div key={i} className="text-xs bg-blue-50 rounded-lg p-2 text-center text-blue-800">✓ {a}</div>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <h3 className="font-bold mb-3" style={{color: '#0a1628'}}>📍 Location Highlights</h3>
          {project.highlights.map((h: string, i: number) => (
            <div key={i} className="flex items-center gap-2 py-1">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700">{h}</span>
            </div>
          ))}
        </div>

        {/* Payment Plan */}
        <div className="rounded-xl p-4 mb-6" style={{background: '#0a1628'}}>
          <h3 className="font-bold mb-2" style={{color: '#c9a84c'}}>💰 Payment Plan</h3>
          <p className="text-white text-sm">{project.payment}</p>
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <a href="https://wa.me/917820008509" className="text-white text-center py-3 rounded-xl font-bold text-sm" style={{background: '#16a34a'}}>💬 WhatsApp</a>
          <a href="tel:+917820008509" className="text-white text-center py-3 rounded-xl font-bold text-sm" style={{background: '#0a1628'}}>📞 Call</a>
          <button onClick={handleShare} className="text-black text-center py-3 rounded-xl font-bold text-sm" style={{background: '#c9a84c'}}>📤 Share</button>
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-4 flex flex-col gap-3 z-50">
        <a href="tel:+917820008509" className="text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-xl" style={{background: '#0a1628'}}>📞</a>
        <a href="https://wa.me/917820008509" className="bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-xl">💬</a>
      </div>
    </main>
  );
}
