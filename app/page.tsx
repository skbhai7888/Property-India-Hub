import Link from 'next/link';

const LOGO = "https://res.cloudinary.com/deeolaopc/image/upload/v1782739062/Property_India_Hub_jbrp94.jpg";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
    <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const GoogleMapsIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
    <path d="M12 0C7.802 0 4 3.403 4 7.602 4 11.8 7.469 16.812 12 24c4.531-7.188 8-12.2 8-16.398C20 3.403 16.199 0 12 0zm0 11a3 3 0 110-6 3 3 0 010 6z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

const projects = [
  { slug: "fragrance-homes", name: "Fragrance Homes", location: "Siddharth Vihar, Ghaziabad", price: "₹10,999/Sq.Ft onwards", tag: "Ready to Move", type: "Apartment", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782727652/ChatGPT_Image_Jun_29_2026_05_33_05_AM_b0czaq.png", description: "Luxury ready-to-move apartments by Truvae Group. Premium amenities including rooftop pool, spa & modern clubhouse. RERA approved project on prime NH-58 corridor.", mapLink: "https://maps.google.com/?q=Siddharth+Vihar+Ghaziabad" },
  { slug: "garh-ganga-enclave", name: "Garh Ganga Enclave", location: "Garhmukteshwar, UP", price: "₹18,000/Sq.Yard", tag: "Ganga View", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782737374/ChatGPT_Image_Jun_29_2026_07_04_46_AM_eao6yf.png", description: "Gated plotted township near holy Ganga river. Immediate registry & mutation available. 200m from NH-09 Delhi-Meerut corridor. Best for investment & weekend home.", mapLink: "https://maps.google.com/?q=Garhmukteshwar+UP" },
  { slug: "sunshine-city-plots", name: "Sunshine City Plots", location: "Yamuna Expressway, Greater Noida", price: "₹30.5 Lac onwards", tag: "Near Jewar Airport", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782736551/ChatGPT_Image_Jun_23_2026_04_01_17_PM_yzom54.png", description: "NOC approved freehold plots just 15 min from Jewar International Airport. 70% bank loan available from PNB Housing. Near upcoming Film City & Knowledge Corridor.", mapLink: "https://maps.google.com/?q=Sector+17A+Yamuna+Expressway+Greater+Noida" },
  { slug: "scc-blossom", name: "SCC Blossom", location: "Raj Nagar Extension, Ghaziabad", price: "₹6,990/Sq.Ft onwards", tag: "RERA Approved", type: "Apartment", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782736544/ChatGPT_Image_Jun_23_2026_07_30_47_AM_xhsuo0.png", description: "Triple RERA approved high-rise on Main NH-58. 400% historical ROI. Near Hindon Airport & Metro. Predicted ₹9000+ per sq.ft by 2028.", mapLink: "https://maps.google.com/?q=Raj+Nagar+Extension+Ghaziabad" },
  { slug: "dev-bhoomi-uttarakhand", name: "Dev Bhoomi Uttarakhand", location: "Jageshwar Dham, Almora", price: "₹9,000/Sq.Yard", tag: "Hill View", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782736569/ChatGPT_Image_Jun_24_2026_04_43_11_PM_sqr01n.png", description: "Pre-launch hill plots near sacred Jageshwar Dham & Kasar Devi Temple. 5-star resort concept with 10-acre dense forest & Himalayan views. Perfect for Airbnb income.", mapLink: "https://maps.google.com/?q=Jageshwar+Dham+Almora+Uttarakhand" },
  { slug: "mapple-green", name: "Mapple Green", location: "Behror, Rajasthan", price: "₹25,000/Sq.Yard", tag: "NH-48 Highway", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782736571/ChatGPT_Image_Jun_24_2026_01_14_11_AM_kvcyej.png", description: "RERA & BIDA approved township on Delhi-Jaipur NH-48. 1 min from RRTS Sotanala Station. Commercial plots with G+2 permission. Shop booking starts at just ₹51,000.", mapLink: "https://maps.google.com/?q=Behror+Rajasthan" },
  { slug: "radha-krishna-vihar", name: "Radha Krishna Vihar", location: "Mathura, UP", price: "₹21,000/Gaj", tag: "Religious Hub", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782736571/ChatGPT_Image_Jun_25_2026_01_49_07_PM_kyluc6.png", description: "Gated residential plots in divine Mathura. 1 KM from Sanskriti University, 3 KM from KD Medical College. Easy 12-month EMI plan available.", mapLink: "https://maps.google.com/?q=Chhata+Mathura+UP" },
  { slug: "radha-krishna-puram", name: "Radha Krishna Puram", location: "Chhata, Mathura", price: "₹19,500/Gaj", tag: "12-Month EMI", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782736578/ChatGPT_Image_Jun_24_2026_09_38_23_AM_qvfjn0.png", description: "Ready-to-build gated community in Mathura. In front of Shree Ji Baba Law College. 1.5 KM from GL Bajaj University. Affordable EMI starting ₹90,000/month.", mapLink: "https://maps.google.com/?q=Chhata+Mathura+UP" },
  { slug: "radha-krishna-brij-bhumi", name: "Radha Krishna Brij Bhumi", location: "Chhata, Mathura", price: "₹13,500/Gaj onwards", tag: "Near Highway", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782739089/ChatGPT_Image_Jun_25_2026_07_38_25_AM_xginoq.png", description: "Most affordable plots in Mathura Brij region. Just 400m from Delhi-Agra Highway. Phase II & III available. 2 KM from DPS & GL Bajaj University.", mapLink: "https://maps.google.com/?q=Nari+Simari+Chhata+Mathura" },
  { slug: "radhe-awadh-puri", name: "Radhe Awadh Puri", location: "Ayodhya Dham, UP", price: "₹17,000/Gaj", tag: "Near Ram Mandir", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782745110/ChatGPT_Image_Jun_26_2026_06_36_49_PM_tq8pmj.png", description: "Gated plots in holy Ayodhya. 10 KM from Ram Mandir, 13 KM from Valmiki International Airport. NH-28 & Purvanchal Expressway corridor. High appreciation potential.", mapLink: "https://maps.google.com/?q=Daulatpur+Sohawal+Ayodhya+UP" },
  { slug: "radhe-shyam-puri", name: "Radhe Shyam Puri", location: "Khatu Shyam Ji, Sikar", price: "₹21,000/Gaj", tag: "Spiritual Hub", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782739086/ChatGPT_Image_Jun_25_2026_09_26_03_PM_ebntxb.png", description: "Premium plots near world-famous Khatu Shyam Ji Mandir. 7 KM from main temple, 300m from Karni Mata Mandir. High footfall area with excellent rental potential.", mapLink: "https://maps.google.com/?q=Khatu+Shyam+Sikar+Rajasthan" },
  { slug: "shri-ram-janki-ayodhya-dham", name: "Shri Ram Janki Ayodhya Dham", location: "Ayodhya, UP", price: "₹27,000/Gaj", tag: "Near 7-Star Hotel", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782738727/ChatGPT_Image_Jun_26_2026_12_35_26_PM_bmeszt.png", description: "Premium plots just 400m from upcoming Leela Ambience 7-Star Hotel. 8 KM from Ram Mandir. Fastest appreciating location in Uttar Pradesh right now.", mapLink: "https://maps.google.com/?q=Tihura+Manjha+Sadar+Ayodhya" },
  { slug: "radha-krishna-nagar", name: "Radha Krishna Nagar", location: "Greater Noida, UP", price: "₹21,000/Gaj", tag: "Near KMP Expressway", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782738117/ChatGPT_Image_Jun_27_2026_09_40_59_PM_jcrmvy.png", description: "Strategic plots near KMP Expressway. 700m from KMP, 2 KM from Dadri Railway Station. Near Hero Factory & Air Force Station. Excellent connectivity.", mapLink: "https://maps.google.com/?q=Dhoom+Manikpur+Dadri+Greater+Noida" },
  { slug: "shree-govind-vatika", name: "Shree Govind Vatika", location: "Chhata, Mathura", price: "₹12,000/Gaj", tag: "Budget Friendly", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782738685/ChatGPT_Image_Jun_27_2026_06_14_27_PM_dxtv0l.png", description: "Most budget-friendly plots near Mathura Brij circuit. 18 KM from Govardhan Parbat & Barsana. 2 KM from Chhata Railway Station. Perfect for long-term investment.", mapLink: "https://maps.google.com/?q=Sankhi+Chhata+Mathura" },
  { slug: "radha-krishna-vrindavan-ashram", name: "Radha Krishna Vrindavan Ashram", location: "Sadar, Mathura", price: "₹28,000/Gaj", tag: "Near Prem Mandir", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782738519/ChatGPT_Image_Jun_27_2026_06_29_44_AM_hxabse.png", description: "Premium plots near Vrindavan's holiest temples. 6 KM from Prem Mandir, 7 KM from ISKCON, 8 KM from Banke Bihari. Ideal for ashram, guesthouse or devotional stay.", mapLink: "https://maps.google.com/?q=Devi+Atas+Sadar+Mathura" },
  { slug: "shree-radha-krishna-enclave", name: "Shree Radha Krishna Enclave", location: "Mant, Mathura", price: "₹17,500/Gaj", tag: "Near Jewar Airport", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782737577/ChatGPT_Image_Jun_28_2026_04_26_24_PM_l9vhls.png", description: "Strategic plots connecting Mathura & Jewar Airport. 20 KM from Jewar International Airport & 6 KM from Bajna Industrial Area. High growth corridor.", mapLink: "https://maps.google.com/?q=Chandpur+Khurad+Mant+Mathura" },
  { slug: "shree-radha-krishna-vatika", name: "Shree Radha Krishna Vatika", location: "Tappal, Aligarh", price: "₹25,500/Gaj", tag: "8 KM Jewar Airport", type: "Plot", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782738291/ChatGPT_Image_Jun_27_2026_09_06_43_PM_xziw9a.png", description: "Prime plots just 8 KM from Jewar International Airport. Fastest growing corridor post airport announcement. 1.5 KM from Tappal Cut on main highway.", mapLink: "https://maps.google.com/?q=Tappal+Aligarh+UP" },
  { slug: "prateek-grand-begonia", name: "Prateek Grand Begonia", location: "Siddharth Vihar, Ghaziabad", price: "₹1.29 Cr onwards", tag: "Luxury High-Rise", type: "Apartment", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782737453/ChatGPT_Image_Jun_28_2026_10_06_21_PM_luntnv.png", description: "Ultra-luxury 32-floor towers in 40-acre integrated township. Golf cart, rooftop garden, EV charging at every parking. 2 min from Metro & Namo Bharat RRTS. RERA approved.", mapLink: "https://maps.google.com/?q=Siddharth+Vihar+NH24+Ghaziabad" },
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
            <a href="tel:+917820008509" className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white" style={{background: '#22c55e'}}>
              <PhoneIcon /> Call
            </a>
            <a href="https://wa.me/917820008509" className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white" style={{background: '#25D366'}}>
              <WhatsAppIcon /> WA
            </a>
          </div>
        </div>
      </header>

      <section className="text-white py-12 px-4 text-center" style={{background: 'linear-gradient(135deg, #0a1628 0%, #1a3a6b 100%)'}}>
        <img src={LOGO} alt="Logo" className="h-20 w-20 mx-auto rounded-full mb-4 object-cover border-4" style={{borderColor: '#c9a84c'}} />
        <h2 className="text-3xl font-bold mb-2">भारत की बेहतरीन Properties</h2>
        <p className="mb-1" style={{color: '#c9a84c'}}>Uttarakhand • Rajasthan • Uttar Pradesh</p>
        <p className="font-semibold mb-6 text-sm" style={{color: '#e8d5a3'}}>18 Premium Projects | 12-Month EMI Available</p>
        <div className="flex gap-3 justify-center flex-wrap mb-6">
          <a href="https://wa.me/917820008509" className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-black" style={{background: '#c9a84c'}}>
            Free Site Visit Book Karo
          </a>
          <a href="tel:+917820008509" className="flex items-center gap-2 border-2 px-6 py-3 rounded-full font-bold" style={{borderColor: '#c9a84c', color: '#c9a84c'}}>
            <PhoneIcon /> Call Now
          </a>
        </div>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href="https://youtube.com/@propertyindiahub" target="_blank" className="flex items-center gap-2 text-xs px-4 py-2 rounded-full font-bold" style={{background: '#FF0000', color: 'white'}}>
            <YouTubeIcon /> YouTube
          </a>
          <a href="https://www.instagram.com/propertyindiahub" target="_blank" className="flex items-center gap-2 text-xs px-4 py-2 rounded-full font-bold" style={{background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', color: 'white'}}>
            <InstagramIcon /> Instagram
          </a>
          <a href="https://www.facebook.com/share/19HMKt3MWr/" target="_blank" className="flex items-center gap-2 text-xs px-4 py-2 rounded-full font-bold" style={{background: '#1877F2', color: 'white'}}>
            <FacebookIcon /> Facebook
          </a>
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
                <div className="h-40 overflow-hidden relative">
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2">
                    <span className="text-xs px-2 py-1 rounded-full font-bold" style={{background: '#c9a84c', color: '#0a1628'}}>{project.tag}</span>
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-xs px-2 py-1 rounded-full" style={{background: '#e0e7ff', color: '#3730a3'}}>{project.type}</span>
                  <h4 className="font-bold text-sm mt-2" style={{color: '#0a1628'}}>{project.name}</h4>
                  <p className="text-gray-500 text-xs mt-1">📍 {project.location}</p>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{project.description}</p>
                  <p className="font-bold mt-2 text-sm" style={{color: '#c9a84c'}}>{project.price}</p>
                  <p className="text-xs mt-1 font-semibold" style={{color: '#0a1628'}}>Tap for Full Details →</p>
                </div>
              </Link>
              <div className="px-4 pb-4 flex gap-2">
                <a href={`https://wa.me/917820008509?text=I am interested in ${project.name}`} className="flex-1 flex items-center justify-center gap-1 text-white text-center py-2 rounded-lg text-xs font-bold" style={{background: '#25D366'}}>
                  <WhatsAppIcon /> WhatsApp
                </a>
                <a href={project.mapLink} target="_blank" className="flex items-center justify-center text-white px-3 py-2 rounded-lg text-xs font-bold" style={{background: '#4285F4'}}>
                  <GoogleMapsIcon />
                </a>
                <a href="tel:+917820008509" className="flex items-center justify-center text-white px-3 py-2 rounded-lg text-xs font-bold" style={{background: '#22c55e'}}>
                  <PhoneIcon />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-white py-10 px-4 text-center" style={{background: '#0a1628'}}>
        <h3 className="text-xl font-bold mb-1">Aaj Hi Contact Karein</h3>
        <p className="text-sm mb-4" style={{color: '#c9a84c'}}>Free Consultation • Site Visit • Best Price Guaranteed</p>
        <div className="flex gap-4 justify-center flex-wrap mb-4">
          <a href="tel:+917820008509" className="flex items-center gap-2 px-6 py-3 rounded-full font-bold" style={{background: '#c9a84c', color: '#0a1628'}}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="#0a1628"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            +91 7820008509
          </a>
          <a href="https://wa.me/917820008509" className="flex items-center gap-2 text-white px-6 py-3 rounded-full font-bold" style={{background: '#25D366'}}>
            <WhatsAppIcon /> WhatsApp
          </a>
        </div>
        <p className="text-xs mb-4" style={{color: '#e8d5a3'}}>📧 propertyindiahubs@gmail.com</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href="https://youtube.com/@propertyindiahub" target="_blank" className="flex items-center gap-2 text-xs px-4 py-2 rounded-full font-bold" style={{background: '#FF0000', color: 'white'}}>
            <YouTubeIcon /> YouTube
          </a>
          <a href="https://www.instagram.com/propertyindiahub" target="_blank" className="flex items-center gap-2 text-xs px-4 py-2 rounded-full font-bold" style={{background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', color: 'white'}}>
            <InstagramIcon /> Instagram
          </a>
          <a href="https://www.facebook.com/share/19HMKt3MWr/" target="_blank" className="flex items-center gap-2 text-xs px-4 py-2 rounded-full font-bold" style={{background: '#1877F2', color: 'white'}}>
            <FacebookIcon /> Facebook
          </a>
        </div>
      </section>

      <footer className="text-center py-4 text-xs" style={{background: '#060e1a', color: '#c9a84c'}}>
        <p>© 2026 <span className="font-bold">PROPERTY INDIA HUB</span> | All Rights Reserved</p>
        <p className="mt-1" style={{color: '#e8d5a3'}}>Your Trusted Real Estate Partner Across India</p>
      </footer>

      <div className="fixed bottom-6 right-4 flex flex-col gap-3 z-50">
        <a href="tel:+917820008509" className="text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl" style={{background: '#0a1628'}}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
        </a>
        <a href="https://wa.me/917820008509" className="text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl" style={{background: '#25D366'}}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </div>
    </main>
  );
} 
