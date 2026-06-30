import Link from 'next/link';

const LOGO = "https://res.cloudinary.com/deeolaopc/image/upload/v1782739062/Property_India_Hub_jbrp94.jpg";

const projects = [
  { slug: "fragrance-homes", name: "Fragrance Homes", location: "Siddharth Vihar, Ghaziabad", price: "₹10,999/Sq.Ft onwards", tag: "Ready to Move", type: "Apartment", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782727652/ChatGPT_Image_Jun_29_2026_05_33_05_AM_b0czaq.png" },
  { slug: "garh-ganga-enclave", name: "Garh Ganga Enclave", location: "Garhmukteshwar, UP", price: "₹18,000/Sq.Yard", tag: "Ganga View", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782737374/ChatGPT_Image_Jun_29_2026_07_04_46_AM_eao6yf.png" },
  { slug: "sunshine-city-plots", name: "Sunshine City Plots", location: "Yamuna Expressway, Greater Noida", price: "₹30.5 Lac onwards", tag: "Near Jewar Airport", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782736551/ChatGPT_Image_Jun_23_2026_04_01_17_PM_yzom54.png" },
  { slug: "scc-blossom", name: "SCC Blossom", location: "Raj Nagar Extension, Ghaziabad", price: "₹6,990/Sq.Ft onwards", tag: "RERA Approved", type: "Apartment", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782736544/ChatGPT_Image_Jun_23_2026_07_30_47_AM_xhsuo0.png" },
  { slug: "dev-bhoomi-uttarakhand", name: "Dev Bhoomi Uttarakhand", location: "Jageshwar Dham, Almora", price: "₹9,000/Sq.Yard", tag: "Hill View", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782736569/ChatGPT_Image_Jun_24_2026_04_43_11_PM_sqr01n.png" },
  { slug: "mapple-green", name: "Mapple Green", location: "Behror, Rajasthan", price: "₹25,000/Sq.Yard", tag: "NH-48 Highway", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782736571/ChatGPT_Image_Jun_24_2026_01_14_11_AM_kvcyej.png" },
  { slug: "radha-krishna-vihar", name: "Radha Krishna Vihar", location: "Mathura, UP", price: "₹21,000/Gaj", tag: "Religious Hub", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782736571/ChatGPT_Image_Jun_25_2026_01_49_07_PM_kyluc6.png" },
  { slug: "radha-krishna-puram", name: "Radha Krishna Puram", location: "Chhata, Mathura", price: "₹19,500/Gaj", tag: "12-Month EMI", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782736578/ChatGPT_Image_Jun_24_2026_09_38_23_AM_qvfjn0.png" },
  { slug: "radha-krishna-brij-bhumi", name: "Radha Krishna Brij Bhumi", location: "Chhata, Mathura", price: "₹13,500/Gaj onwards", tag: "Near Highway", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782739089/ChatGPT_Image_Jun_25_2026_07_38_25_AM_xginoq.png" },
  { slug: "radhe-awadh-puri", name: "Radhe Awadh Puri", location: "Ayodhya Dham, UP", price: "₹17,000/Gaj", tag: "Near Ram Mandir", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782745110/ChatGPT_Image_Jun_26_2026_06_36_49_PM_tq8pmj.png" },
  { slug: "radhe-shyam-puri", name: "Radhe Shyam Puri", location: "Khatu Shyam Ji, Sikar", price: "₹21,000/Gaj", tag: "Spiritual Hub", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782739086/ChatGPT_Image_Jun_25_2026_09_26_03_PM_ebntxb.png" },
  { slug: "shri-ram-janki-ayodhya-dham", name: "Shri Ram Janki Ayodhya Dham", location: "Ayodhya, UP", price: "₹27,000/Gaj", tag: "Near 7-Star Hotel", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782738727/ChatGPT_Image_Jun_26_2026_12_35_26_PM_bmeszt.png" },
  { slug: "radha-krishna-nagar", name: "Radha Krishna Nagar", location: "Greater Noida, UP", price: "₹21,000/Gaj", tag: "Near KMP Expressway", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782738117/ChatGPT_Image_Jun_27_2026_09_40_59_PM_jcrmvy.png" },
  { slug: "shree-govind-vatika", name: "Shree Govind Vatika", location: "Chhata, Mathura", price: "₹12,000/Gaj", tag: "Budget Friendly", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782738685/ChatGPT_Image_Jun_27_2026_06_14_27_PM_dxtv0l.png" },
  { slug: "radha-krishna-vrindavan-ashram", name: "Radha Krishna Vrindavan Ashram", location: "Sadar, Mathura", price: "₹28,000/Gaj", tag: "Near Prem Mandir", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782738519/ChatGPT_Image_Jun_27_2026_06_29_44_AM_hxabse.png" },
  { slug: "shree-radha-krishna-enclave", name: "Shree Radha Krishna Enclave", location: "Mant, Mathura", price: "₹17,500/Gaj", tag: "Near Jewar Airport", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782737577/ChatGPT_Image_Jun_28_2026_04_26_24_PM_l9vhls.png" },
  { slug: "shree-radha-krishna-vatika", name: "Shree Radha Krishna Vatika", location: "Tappal, Aligarh", price: "₹25,500/Gaj", tag: "8 KM Jewar Airport", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782738291/ChatGPT_Image_Jun_27_2026_09_06_43_PM_xziw9a.png" },
  { slug: "prateek-grand-begonia", name: "Prateek Grand Begonia", location: "Siddharth Vihar, Ghaziabad", price: "₹1.29 Cr onwards", tag: "Luxury High-Rise", type: "Apartment", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782737453/ChatGPT_Image_Jun_28_2026_10_06_21_PM_luntnv.png" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 shadow-lg" style={{background: '#0a1628'}}>
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="Logo" className="h-10 w-10 rounded-full object-cover" />
            <div>
              <h1 className="text-lg font-bold" style={{color: '#c9a84c'}}>PROPERTY</h1>
              <p className="text-xs font-semibold tracking-widest" style={{color: '#e8d5a3'}}>— INDIA HUB —</p>
            </div>
          </div>
          <div className="flex gap-2">
            <a href="tel:+917820008509" className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{background: '#22c55e'}}>📞 Call</a>
            <a href="https://wa.me/917820008509" className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{background: '#16a34a'}}>💬 WA</a>
          </div>
        </div>
      </header>

      <section className="text-white py-14 px-4 text-center" style={{background: 'linear-gradient(135deg, #0a1628 0%, #1a3a6b 100%)'}}>
        <img src={LOGO} alt="Logo" className="h-20 w-20 mx-auto rounded-full mb-4 object-cover border-4" style={{borderColor: '#c9a84c'}} />
        <h2 className="text-3xl font-bold mb-2">भारत की बेहतरीन Properties</h2>
        <p className="mb-1" style={{color: '#c9a84c'}}>Uttarakhand • Rajasthan • Uttar Pradesh</p>
        <p className="font-semibold mb-6 text-sm" style={{color: '#e8d5a3'}}>18 Premium Projects | 12-Month EMI Available</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href="https://wa.me/917820008509" className="px-6 py-3 rounded-full font-bold text-black" style={{background: '#c9a84c'}}>Free Site Visit Book Karo</a>
          <a href="tel:+917820008509" className="border-2 px-6 py-3 rounded-full font-bold" style={{borderColor: '#c9a84c', color: '#c9a84c'}}>📞 Call Now</a>
        </div>
      </section>

      <section className="bg-white py-6 px-4 shadow">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4 text-center">
          <div><p className="text-2xl font-bold" style={{color: '#0a1628'}}>18+</p><p className="text-xs text-gray-500">Live Projects</p></div>
          <div><p className="text-2xl font-bold" style={{color: '#c9a84c'}}>5+</p><p className="text-xs text-gray-500">States</p></div>
          <div><p className="text-2xl font-bold" style={{color: '#0a1628'}}>500+</p><p className="text-xs text-gray-500">Happy Clients</p></div>
        </div>
      </section>

      <section className="py-10 px-4 max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-center mb-1" style={{color: '#0a1628'}}>Our Live Projects</h3>
        <p className="text-center text-gray-500 mb-8 text-sm">👆 Tap any project for full details</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div key={i} className="bg-white border rounded-xl shadow-md overflow-hidden">
              <Link href={`/projects/${project.slug}`} className="block">
                <div className="h-40 overflow-hidden">
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs px-2 py-1 rounded-full font-semibold" style={{background: '#fef3c7', color: '#92400e'}}>{project.tag}</span>
                    <span className="text-xs px-2 py-1 rounded-full" style={{background: '#e0e7ff', color: '#3730a3'}}>{project.type}</span>
                  </div>
                  <h4 className="font-bold text-sm mt-2" style={{color: '#0a1628'}}>{project.name}</h4>
                  <p className="text-gray-500 text-xs mt-1">📍 {project.location}</p>
                  <p className="font-bold mt-2 text-sm" style={{color: '#c9a84c'}}>{project.price}</p>
                  <p className="text-xs mt-2 font-semibold" style={{color: '#0a1628'}}>Tap for Full Details →</p>
                </div>
              </Link>
              <div className="px-4 pb-4 flex gap-2">
                <a href={`https://wa.me/917820008509?text=I am interested in ${project.name}`} className="flex-1 text-white text-center py-2 rounded-lg text-xs font-bold" style={{background: '#16a34a'}}>💬 WhatsApp</a>
                <a href="tel:+917820008509" className="text-white px-3 py-2 rounded-lg text-xs font-bold" style={{background: '#0a1628'}}>📞</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-white py-10 px-4 text-center" style={{background: '#0a1628'}}>
        <h3 className="text-xl font-bold mb-1">Aaj Hi Contact Karein</h3>
        <p className="text-sm mb-6" style={{color: '#c9a84c'}}>Free Consultation • Site Visit • Best Price Guaranteed</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="tel:+917820008509" className="px-6 py-3 rounded-full font-bold" style={{background: '#c9a84c', color: '#0a1628'}}>📞 +91 7820008509</a>
          <a href="https://wa.me/917820008509" className="bg-green-500 text-white px-6 py-3 rounded-full font-bold">💬 WhatsApp</a>
        </div>
        <p className="text-xs mt-4" style={{color: '#e8d5a3'}}>📧 propertyindiahubs@gmail.com</p>
      </section>

      <footer className="text-center py-4 text-xs" style={{background: '#060e1a', color: '#c9a84c'}}>
        <p>© 2026 <span className="font-bold">PROPERTY INDIA HUB</span> | All Rights Reserved</p>
      </footer>

      <div className="fixed bottom-6 right-4 flex flex-col gap-3 z-50">
        <a href="tel:+917820008509" className="text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-xl" style={{background: '#0a1628'}}>📞</a>
        <a href="https://wa.me/917820008509" className="bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-xl">💬</a>
      </div>
    </main>
  );
} 
