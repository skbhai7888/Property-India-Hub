'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

const projects: Record<string, any> = {
  'fragrance-homes': {
    name: "Fragrance Homes", location: "Siddharth Vihar, Ghaziabad", price: "₹10,999/Sq.Ft onwards", tag: "Ready to Move", type: "Apartment", builder: "Truvae Group", rera: "UPRERAPRJ4727",
    sizes: ["2 BHK - 1105 Sq.Ft", "2 BHK - 1135 Sq.Ft", "3 BHK - 1350 Sq.Ft", "3 BHK - 1525 Sq.Ft"],
    amenities: ["Rooftop Swimming Pool", "Luxury Clubhouse", "Gym", "Amphitheater", "Jogging Track", "Yoga Lawn"],
    highlights: ["2 min from Metro & RRTS", "Near NH-58 & NH-24", "Near DPS Indirapuram"],
    payment: "10% Booking | 60% in 45 Days | 20% on Structure | 10% on Possession",
  },
  'garh-ganga-enclave': {
    name: "Garh Ganga Enclave", location: "Garhmukteshwar, UP", price: "₹18,000/Sq.Yard", tag: "Ganga View", type: "Plot", builder: "Ind Group",
    sizes: ["50 Sq.Yard", "100 Sq.Yard", "150 Sq.Yard", "200 Sq.Yard", "250 Sq.Yard"],
    amenities: ["Gated Society", "Swimming Pool", "Clubhouse", "CCTV", "Street Lights", "Parks"],
    highlights: ["200m from NH-09", "Ready for Construction", "Immediate Registry"],
    payment: "Immediate Registry & Mutation Available",
  },
  'sunshine-city-plots': {
    name: "Sunshine City Plots", location: "Yamuna Expressway, Greater Noida", price: "₹30.5 Lac onwards", tag: "Near Jewar Airport", type: "Plot", builder: "Aaradhya Realty",
    sizes: ["100 Sq.Yard (20x45)", "120 Sq.Yard", "200 Sq.Yard"],
    amenities: ["Grand Entrance", "Concrete Roads", "Street Lights", "Green Parks", "24x7 Security", "CCTV"],
    highlights: ["15 min from Jewar Airport", "10 min from Film City", "70% Bank Loan Available"],
    payment: "Up to 70% loan from PNB Housing Finance",
  },
  'scc-blossom': {
    name: "SCC Blossom", location: "Raj Nagar Extension, Ghaziabad", price: "₹6,990/Sq.Ft onwards", tag: "RERA Approved", type: "Apartment", builder: "SCC Builders Pvt. Ltd.", rera: "UPRERAPRJ735034",
    sizes: ["2 BHK - 915 Sq.Ft", "2 BHK+Dress - 1030 Sq.Ft", "2 BHK+Kids Room - 1190 Sq.Ft"],
    amenities: ["Swimming Pool", "Badminton Court", "Cricket Pitch", "Clubhouse", "Power Backup", "Parking"],
    highlights: ["8 KM from Hindon Metro", "Near DPS & GD Goenka", "Main NH-58"],
    payment: "10% Booking | 60% in 45 Days | 20% on Structure | 10% on Possession",
  },
  'dev-bhoomi-uttarakhand': {
    name: "Dev Bhoomi Uttarakhand", location: "Jageshwar Dham, Almora", price: "₹9,000/Sq.Yard", tag: "Hill View", type: "Plot", builder: "Property India Hub (JV)",
    sizes: ["200 Sq.Yard - ₹18 Lakh", "240 Sq.Yard - ₹21.6 Lakh", "300 Sq.Yard - ₹27 Lakh"],
    amenities: ["10-Acre Forest", "Himalayan Views", "Natural Mineral Water", "Water Body", "25Ft Roads", "Trekking Paths"],
    highlights: ["Near Jageshwar Dham Temple", "Homestay/Airbnb Potential", "Pre-Launch Price"],
    payment: "50% Booking | 25% in 60 Days | 25% on Possession",
  },
  'mapple-green': {
    name: "Mapple Green", location: "Behror, Rajasthan", price: "₹25,000/Sq.Yard", tag: "NH-48 Highway", type: "Plot", builder: "Epic Infrateck",
    sizes: ["Residential - ₹25,000/Sq.Yard", "Commercial G+2 - ₹60,000/Sq.Yard", "Shop G+1 - Booking ₹51,000"],
    amenities: ["Grand Gated Entry", "Clubhouse", "Swimming Pool", "Gym", "8 Green Parks", "Underground Wiring"],
    highlights: ["1 min from RRTS Sotanala", "10 min from Neemrana", "500m from RPS School"],
    payment: "10% Booking | 30% in 30 Days | 30% in 60 Days | 30% on Registry",
  },
  'radha-krishna-vihar': {
    name: "Radha Krishna Vihar", location: "Mathura, UP", price: "₹21,000/Gaj", tag: "Religious Hub", type: "Plot", builder: "Shubh Labh Developers",
    sizes: ["100 Sq.Yard (900 Sq.Ft)"],
    amenities: ["Gated Boundary Wall", "40Ft/30Ft Roads", "Electricity", "Water Supply", "Street Lights", "Parks"],
    highlights: ["1 KM from Sanskriti University", "3 KM from KD Medical College", "17 KM from Prem Mandir"],
    payment: "20% Booking | 10% in 30 Days | 10% in 60 Days | 12 EMI of ₹97,500",
  },
  'radha-krishna-puram': {
    name: "Radha Krishna Puram", location: "Chhata, Mathura", price: "₹19,500/Gaj", tag: "12-Month EMI", type: "Plot", builder: "Shubh Labh Developers",
    sizes: ["100 Sq.Yard (900 Sq.Ft)"],
    amenities: ["Wide Roads", "Underground Drainage", "Street Lights", "Water & Electricity", "24x7 Security", "Park"],
    highlights: ["In front of Shree Ji Baba Law College", "1.5 KM from GL Bajaj University", "17 KM from Prem Mandir"],
    payment: "20% Booking | 10% in 30 Days | 10% in 60 Days | 12 EMI of ₹90,000",
  },
  'radha-krishna-brij-bhumi': {
    name: "Radha Krishna Brij Bhumi", location: "Chhata, Mathura", price: "₹13,500/Gaj onwards", tag: "Near Highway", type: "Plot", builder: "Shubh Labh Developers",
    sizes: ["100 Sq.Yard - Phase II ₹15,500/Gaj", "100 Sq.Yard - Phase III ₹13,500/Gaj"],
    amenities: ["40Ft/30Ft Roads", "Park", "Street Lights", "Drainage", "24x7 Security", "Demarcation"],
    highlights: ["400m from Delhi-Agra Highway", "2 KM from DPS", "2 KM from GL Bajaj University"],
    payment: "20% Booking | 10% in 30 Days | 10% in 60 Days | 12 EMI of ₹59,995",
  },
  'radhe-awadh-puri': {
    name: "Radhe Awadh Puri", location: "Ayodhya Dham, UP", price: "₹17,000/Gaj", tag: "Near Ram Mandir", type: "Plot", builder: "Shubh Labh Developers",
    sizes: ["100 Sq.Yard (900 Sq.Ft)"],
    amenities: ["Gated Township", "40Ft Roads", "Electricity", "Water", "Parks", "CCTV"],
    highlights: ["10 KM from Ram Mandir", "13 KM from Valmiki Airport", "20 KM from Naka Chauraha"],
    payment: "20% Booking | 10% in 30 Days | 10% in 60 Days | 12 EMI of ₹77,495",
  },
  'radhe-shyam-puri': {
    name: "Radhe Shyam Puri", location: "Khatu Shyam Ji, Sikar", price: "₹21,000/Gaj", tag: "Spiritual Hub", type: "Plot", builder: "Shubh Labh Developers",
    sizes: ["100 Sq.Yard (900 Sq.Ft)"],
    amenities: ["Gated Society", "40Ft/30Ft Roads", "Street Lights", "Drainage", "Water Pipelines", "24x7 Security"],
    highlights: ["7 KM from Khatu Shyam Mandir", "300m from Karni Mata Mandir", "7 KM from Toran Dwar"],
    payment: "20% Booking | 10% in 30 Days | 10% in 60 Days | 12 EMI of ₹97,500",
  },
  'shri-ram-janki-ayodhya-dham': {
    name: "Shri Ram Janki Ayodhya Dham", location: "Ayodhya, UP", price: "₹27,000/Gaj", tag: "Near 7-Star Hotel", type: "Plot", builder: "Shubh Labh Developers",
    sizes: ["100 Sq.Yard (900 Sq.Ft)"],
    amenities: ["High Boundary Wall", "Security Lobby", "Wide Roads", "Park", "Sewage Line", "Street Lights"],
    highlights: ["400m from Leela Ambience 7-Star Hotel", "8 KM from Ram Mandir", "15 KM from Valmiki Airport"],
    payment: "20% Booking | 10% in 30 Days | 10% in 60 Days | 12 EMI of ₹1,27,495",
  },
  'radha-krishna-nagar': {
    name: "Radha Krishna Nagar", location: "Greater Noida, UP", price: "₹21,000/Gaj", tag: "Near KMP Expressway", type: "Plot", builder: "Shubh Labh Developers",
    sizes: ["100 Sq.Yard (900 Sq.Ft)"],
    amenities: ["Gated Township", "24x7 Security", "Parks", "Concrete Roads", "Electricity", "Water & Sewer"],
    highlights: ["700m from KMP Expressway", "2 KM from Dadri Railway Station", "Near Hero Factory"],
    payment: "20% Booking | 10% in 30 Days | 10% in 60 Days | 12 EMI of ₹97,500",
  },
  'shree-govind-vatika': {
    name: "Shree Govind Vatika", location: "Chhata, Mathura", price: "₹12,000/Gaj", tag: "Budget Friendly", type: "Plot", builder: "Shubh Labh Developers",
    sizes: ["100 Sq.Yard (900 Sq.Ft)"],
    amenities: ["Demarcated Plots", "Broad Roads", "Water", "Street Lights", "Park", "Gated Fencing"],
    highlights: ["18 KM from Govardhan Parbat", "2 KM from Chhata Railway Station", "18 KM from Barsana"],
    payment: "20% Booking | 10% in 30 Days | 10% in 60 Days | 12 EMI of ₹52,500",
  },
  'radha-krishna-vrindavan-ashram': {
    name: "Radha Krishna Vrindavan Ashram", location: "Sadar, Mathura", price: "₹28,000/Gaj", tag: "Near Prem Mandir", type: "Plot", builder: "Shubh Labh Developers",
    sizes: ["100 Sq.Yard (900 Sq.Ft)"],
    amenities: ["Luxury Gated Boundary", "Security Lobby", "Wide Roads", "Sewerage", "Parks", "24x7 Guard"],
    highlights: ["6 KM from Prem Mandir", "8 KM from Banke Bihari Mandir", "7 KM from ISKCON"],
    payment: "20% Booking | 10% in 30 Days | 10% in 60 Days | 12 EMI of ₹1,32,495",
  },
  'shree-radha-krishna-enclave': {
    name: "Shree Radha Krishna Enclave", location: "Mant, Mathura", price: "₹17,500/Gaj", tag: "Near Jewar Airport", type: "Plot", builder: "Shubh Labh Developers",
    sizes: ["100 Sq.Yard (900 Sq.Ft)"],
    amenities: ["Beautiful Park", "Street Lights", "Gated Township", "Wide Road", "Demarcation", "Full Security"],
    highlights: ["20 KM from Jewar Airport", "8 KM from Tappal Cut", "6 KM from Bajna Industrial Area"],
    payment: "20% Booking | 10% in 30 Days | 10% in 60 Days | 12 EMI of ₹80,000",
  },
  'shree-radha-krishna-vatika': {
    name: "Shree Radha Krishna Vatika", location: "Tappal, Aligarh", price: "₹25,500/Gaj", tag: "8 KM Jewar Airport", type: "Plot", builder: "Shubh Labh Developers",
    sizes: ["100 Sq.Yard (900 Sq.Ft)"],
    amenities: ["Modern Sewage", "40/30/25Ft Roads", "Street Lights", "Park", "Sweet Water", "24x7 Security"],
    highlights: ["8 KM from Jewar Airport", "1.5 KM from Tappal Cut", "2 KM from Tappal Market"],
    payment: "20% Booking | 10% in 30 Days | 10% in 60 Days | 12 EMI of ₹1,20,000",
  },
  'prateek-grand-begonia': {
    name: "Prateek Grand Begonia", location: "Siddharth Vihar, Ghaziabad", price: "₹1.29 Cr onwards", tag: "Luxury High-Rise", type: "Apartment", builder: "Prateek Group", rera: "UPRERAPRJ790651",
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
  const [form, setForm] = useState({ firstName: '', lastName: '', mobile: '', email: '', visitDate: 'This Week', submitted: false });

  const handleShare = async () => {
    const text = `${project.name}\n📍 ${project.location}\n💰 ${project.price}\n📞 +91 7820008509\n🔗 ${window.location.href}`;
    if (navigator.share) {
      await navigator.share({ title: project.name, text, url: window.location.href });
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
    }
  };

  const handleSubmit = () => {
    if (!form.firstName || !form.mobile) { alert('Please fill Name and Mobile'); return; }
    const msg = `New Inquiry!\nProject: ${project.name}\nName: ${form.firstName} ${form.lastName}\nMobile: ${form.mobile}\nEmail: ${form.email}\nVisit: ${form.visitDate}`;
    window.open(`https://wa.me/917820008509?text=${encodeURIComponent(msg)}`);
    setForm({...form, submitted: true});
  };

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{background: '#0a1628'}}>
        <p className="text-white text-xl mb-4">Project not found</p>
        <Link href="/" className="px-6 py-2 rounded-full text-black font-bold" style={{background: '#c9a84c'}}>← Back to Home</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 shadow-lg" style={{background: '#0a1628'}}>
        <div className="max-w-4xl mx-auto flex justify-between items-center p-4">
          <Link href="/" className="font-bold" style={{color: '#c9a84c'}}>← Back</Link>
          <h1 className="text-sm font-bold text-white">Property India Hub</h1>
          <button onClick={handleShare} className="px-3 py-1 rounded-full text-xs font-bold text-black" style={{background: '#c9a84c'}}>Share 📤</button>
        </div>
      </header>

      <div className="h-48 flex items-center justify-center" style={{background: 'linear-gradient(135deg, #0a1628 0%, #1a3a6b 100%)'}}>
        <div className="text-center">
          <span className="text-6xl">{project.type === 'Apartment' ? '🏢' : '🏡'}</span>
          <p className="text-white font-bold mt-2">{project.tag}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <h2 className="text-xl font-bold" style={{color: '#0a1628'}}>{project.name}</h2>
          <p className="text-gray-500 text-sm mt-1">📍 {project.location}</p>
          <p className="text-2xl font-bold mt-2" style={{color: '#c9a84c'}}>{project.price}</p>
          {project.builder && <p className="text-sm text-gray-600 mt-1">🏗️ {project.builder}</p>}
          {project.rera && <p className="text-xs text-green-600 mt-1">✅ RERA: {project.rera}</p>}
        </div>

        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <h3 className="font-bold mb-3" style={{color: '#0a1628'}}>📐 Available Sizes</h3>
          {project.sizes.map((size: string, i: number) => (
            <div key={i} className="flex items-center gap-2 py-2 border-b last:border-0">
              <span style={{color: '#c9a84c'}}>▪</span>
              <span className="text-sm text-gray-700">{size}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <h3 className="font-bold mb-3" style={{color: '#0a1628'}}>✨ Amenities</h3>
          <div className="grid grid-cols-2 gap-2">
            {project.amenities.map((a: string, i: number) => (
              <div key={i} className="text-xs bg-blue-50 rounded-lg p-2 text-center text-blue-800">✓ {a}</div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <h3 className="font-bold mb-3" style={{color: '#0a1628'}}>📍 Location Highlights</h3>
          {project.highlights.map((h: string, i: number) => (
            <div key={i} className="flex items-center gap-2 py-1">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700">{h}</span>
            </div>
          ))}
        </div>

        <div className="rounded-xl p-4 mb-4" style={{background: '#0a1628'}}>
          <h3 className="font-bold mb-2" style={{color: '#c9a84c'}}>💰 Payment Plan</h3>
          <p className="text-white text-sm">{project.payment}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <a href={`https://wa.me/917820008509?text=I am interested in ${project.name}`} className="text-white text-center py-3 rounded-xl font-bold text-sm" style={{background: '#16a34a'}}>💬 WhatsApp</a>
          <a href="tel:+917820008509" className="text-white text-center py-3 rounded-xl font-bold text-sm" style={{background: '#0a1628'}}>📞 Call</a>
          <button onClick={handleShare} className="text-black text-center py-3 rounded-xl font-bold text-sm" style={{background: '#c9a84c'}}>📤 Share</button>
        </div>

        {/* Lead Form */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h3 className="font-bold text-lg mb-1" style={{color: '#0a1628'}}>🏠 Book Free Site Visit</h3>
          <p className="text-xs text-gray-500 mb-4">Project: <span className="font-bold" style={{color: '#c9a84c'}}>{project.name}</span></p>

          {form.submitted ? (
            <div className="text-center py-6">
              <p className="text-2xl mb-2">🎉</p>
              <p className="font-bold text-green-600">Request Submitted!</p>
              <p className="text-sm text-gray-500 mt-1">Hamari team jald contact karegi</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <input
                  placeholder="First Name *"
                  value={form.firstName}
                  onChange={e => setForm({...form, firstName: e.target.value})}
                  className="flex-1 border rounded-lg p-3 text-sm"
                  style={{borderColor: '#0a1628'}}
                />
                <input
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={e => setForm({...form, lastName: e.target.value})}
                  className="flex-1 border rounded-lg p-3 text-sm"
                  style={{borderColor: '#0a1628'}}
                />
              </div>
              <input
                placeholder="Mobile Number *"
                type="tel"
                value={form.mobile}
                onChange={e => setForm({...form, mobile: e.target.value})}
                className="border rounded-lg p-3 text-sm w-full"
                style={{borderColor: '#0a1628'}}
              />
              <input
                placeholder="Email ID (Optional)"
                type="email"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                className="border rounded-lg p-3 text-sm w-full"
                style={{borderColor: '#0a1628'}}
              />
              <div>
                <p className="text-sm font-semibold mb-2" style={{color: '#0a1628'}}>📅 When do you want to visit?</p>
                <div className="grid grid-cols-3 gap-2">
                  {['Today', 'This Week', 'Next Week'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setForm({...form, visitDate: opt})}
                      className="py-2 rounded-lg text-xs font-bold border-2 transition-all"
                      style={{
                        background: form.visitDate === opt ? '#0a1628' : 'white',
                        color: form.visitDate === opt ? '#c9a84c' : '#0a1628',
                        borderColor: '#0a1628'
                      }}
                    >{opt}</button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full py-3 rounded-xl font-bold text-white mt-2"
                style={{background: '#0a1628'}}
              >Submit Inquiry 🚀</button>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-6 right-4 flex flex-col gap-3 z-50">
        <a href="tel:+917820008509" className="text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-xl" style={{background: '#0a1628'}}>📞</a>
        <a href="https://wa.me/917820008509" className="bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-xl">💬</a>
      </div>
    </main>
  );
}
