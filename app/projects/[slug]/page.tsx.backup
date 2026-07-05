'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

const LOGO = "https://res.cloudinary.com/deeolaopc/image/upload/v1782739062/Property_India_Hub_jbrp94.jpg";

const WhatsAppIcon = ({size = 16}: {size?: number}) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);
const PhoneIcon = ({size = 16}: {size?: number}) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="white"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
);
const ShareIcon = ({size = 16}: {size?: number}) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
);
const MapsIcon = ({size = 16}: {size?: number}) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
);

const allProjects: Record<string, any> = {
  'fragrance-homes': { name: "Fragrance Homes", location: "Siddharth Vihar, Ghaziabad", price: "₹10,999/Sq.Ft onwards", tag: "Ready to Move", type: "Apartment", builder: "Truvae Group", rera: "UPRERAPRJ4727", region: "ghaziabad", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782727652/ChatGPT_Image_Jun_29_2026_05_33_05_AM_b0czaq.png", mapLink: "https://maps.google.com/?q=Siddharth+Vihar+Ghaziabad", description: "Luxury ready-to-move apartments by Truvae Group. Premium amenities including rooftop pool, spa & modern clubhouse. RERA approved project on prime NH-58 corridor.", sizes: ["2 BHK - 1105 Sq.Ft", "2 BHK - 1135 Sq.Ft", "3 BHK - 1350 Sq.Ft", "3 BHK - 1525 Sq.Ft"], amenities: ["Rooftop Swimming Pool", "Luxury Clubhouse", "Gym", "Amphitheater", "Jogging Track", "Yoga Lawn"], highlights: ["2 min from Metro & RRTS", "Near NH-58 & NH-24", "Near DPS Indirapuram"], payment: "10% Booking | 60% in 45 Days | 20% on Structure | 10% on Possession" },
  'garh-ganga-enclave': { name: "Garh Ganga Enclave", location: "Garhmukteshwar, UP", price: "₹18,000/Sq.Yard", tag: "Ganga View", type: "Plot", builder: "Ind Group", region: "garhmukteshwar", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782737374/ChatGPT_Image_Jun_29_2026_07_04_46_AM_eao6yf.png", mapLink: "https://maps.google.com/?q=Garhmukteshwar+UP", description: "Gated plotted township near holy Ganga river. Immediate registry & mutation available. 200m from NH-09 Delhi-Meerut corridor.", sizes: ["50 Sq.Yard", "100 Sq.Yard", "150 Sq.Yard", "200 Sq.Yard", "250 Sq.Yard"], amenities: ["Gated Society", "Swimming Pool", "Clubhouse", "CCTV", "Street Lights", "Parks"], highlights: ["200m from NH-09", "Ready for Construction", "Immediate Registry"], payment: "Immediate Registry & Mutation Available" },
  'sunshine-city-plots': { name: "Sunshine City Plots", location: "Yamuna Expressway, Greater Noida", price: "₹30.5 Lac onwards", tag: "Near Jewar Airport", type: "Plot", builder: "Aaradhya Realty", region: "jewar", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782736551/ChatGPT_Image_Jun_23_2026_04_01_17_PM_yzom54.png", mapLink: "https://maps.google.com/?q=Sector+17A+Yamuna+Expressway+Greater+Noida", description: "NOC approved freehold plots just 15 min from Jewar International Airport. 70% bank loan available from PNB Housing Finance.", sizes: ["100 Sq.Yard (20x45)", "120 Sq.Yard", "200 Sq.Yard"], amenities: ["Grand Entrance", "Concrete Roads", "Street Lights", "Green Parks", "24x7 Security", "CCTV"], highlights: ["15 min from Jewar Airport", "10 min from Film City", "70% Bank Loan Available"], payment: "Up to 70% loan from PNB Housing Finance" },
  'scc-blossom': { name: "SCC Blossom", location: "Raj Nagar Extension, Ghaziabad", price: "₹6,990/Sq.Ft onwards", tag: "RERA Approved", type: "Apartment", builder: "SCC Builders Pvt. Ltd.", rera: "UPRERAPRJ735034", region: "ghaziabad", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782736544/ChatGPT_Image_Jun_23_2026_07_30_47_AM_xhsuo0.png", mapLink: "https://maps.google.com/?q=Raj+Nagar+Extension+Ghaziabad", description: "Triple RERA approved high-rise on Main NH-58. 400% historical ROI. Near Hindon Airport & Metro. Predicted ₹9000+ by 2028.", sizes: ["2 BHK - 915 Sq.Ft", "2 BHK+Dress - 1030 Sq.Ft", "2 BHK+Kids Room - 1190 Sq.Ft"], amenities: ["Swimming Pool", "Badminton Court", "Cricket Pitch", "Clubhouse", "Power Backup", "Parking"], highlights: ["8 KM from Hindon Metro", "Near DPS & GD Goenka", "Main NH-58"], payment: "10% Booking | 60% in 45 Days | 20% on Structure | 10% on Possession" },
  'dev-bhoomi-uttarakhand': { name: "Dev Bhoomi Uttarakhand", location: "Jageshwar Dham, Almora", price: "₹9,000/Sq.Yard", tag: "Hill View", type: "Plot", builder: "Property India Hub (JV)", region: "uttarakhand", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782736569/ChatGPT_Image_Jun_24_2026_04_43_11_PM_sqr01n.png", mapLink: "https://maps.google.com/?q=Jageshwar+Dham+Almora+Uttarakhand", description: "Pre-launch hill plots near sacred Jageshwar Dham & Kasar Devi Temple. 5-star resort concept with 10-acre dense forest & Himalayan views.", sizes: ["200 Sq.Yard - ₹18 Lakh", "240 Sq.Yard - ₹21.6 Lakh", "300 Sq.Yard - ₹27 Lakh"], amenities: ["10-Acre Forest", "Himalayan Views", "Natural Mineral Water", "Water Body", "25Ft Roads", "Trekking Paths"], highlights: ["Near Jageshwar Dham Temple", "Homestay/Airbnb Potential", "Pre-Launch Price"], payment: "50% Booking | 25% in 60 Days | 25% on Possession" },
  'mapple-green': { name: "Mapple Green", location: "Behror, Rajasthan", price: "₹25,000/Sq.Yard", tag: "NH-48 Highway", type: "Plot", builder: "Epic Infrateck", region: "rajasthan", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782736571/ChatGPT_Image_Jun_24_2026_01_14_11_AM_kvcyej.png", mapLink: "https://maps.google.com/?q=Behror+Rajasthan", description: "RERA & BIDA approved township on Delhi-Jaipur NH-48. 1 min from RRTS Sotanala Station. Shop booking starts at just ₹51,000.", sizes: ["Residential - ₹25,000/Sq.Yard", "Commercial G+2 - ₹60,000/Sq.Yard", "Shop G+1 - Booking ₹51,000"], amenities: ["Grand Gated Entry", "Clubhouse", "Swimming Pool", "Gym", "8 Green Parks", "Underground Wiring"], highlights: ["1 min from RRTS Sotanala", "10 min from Neemrana", "500m from RPS School"], payment: "10% Booking | 30% in 30 Days | 30% in 60 Days | 30% on Registry" },
  'radha-krishna-vihar': { name: "Radha Krishna Vihar", location: "Mathura, UP", price: "₹21,000/Gaj", tag: "Religious Hub", type: "Plot", builder: "Shubh Labh Developers", region: "mathura", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782736571/ChatGPT_Image_Jun_25_2026_01_49_07_PM_kyluc6.png", mapLink: "https://maps.google.com/?q=Chhata+Mathura+UP", description: "Gated residential plots in divine Mathura. 1 KM from Sanskriti University. Easy 12-month EMI plan available.", sizes: ["100 Sq.Yard (900 Sq.Ft)"], amenities: ["Gated Boundary Wall", "40Ft/30Ft Roads", "Electricity", "Water Supply", "Street Lights", "Parks"], highlights: ["1 KM from Sanskriti University", "3 KM from KD Medical College", "17 KM from Prem Mandir"], payment: "20% Booking | 10% in 30 Days | 10% in 60 Days | 12 EMI of ₹97,500" },
  'radha-krishna-puram': { name: "Radha Krishna Puram", location: "Chhata, Mathura", price: "₹19,500/Gaj", tag: "12-Month EMI", type: "Plot", builder: "Shubh Labh Developers", region: "mathura", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782736578/ChatGPT_Image_Jun_24_2026_09_38_23_AM_qvfjn0.png", mapLink: "https://maps.google.com/?q=Chhata+Mathura+UP", description: "Ready-to-build gated community in Mathura. In front of Shree Ji Baba Law College. EMI starting ₹90,000/month.", sizes: ["100 Sq.Yard (900 Sq.Ft)"], amenities: ["Wide Roads", "Underground Drainage", "Street Lights", "Water & Electricity", "24x7 Security", "Park"], highlights: ["In front of Shree Ji Baba Law College", "1.5 KM from GL Bajaj University", "17 KM from Prem Mandir"], payment: "20% Booking | 10% in 30 Days | 10% in 60 Days | 12 EMI of ₹90,000" },
  'radha-krishna-brij-bhumi': { name: "Radha Krishna Brij Bhumi", location: "Chhata, Mathura", price: "₹13,500/Gaj onwards", tag: "Near Highway", type: "Plot", builder: "Shubh Labh Developers", region: "mathura", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782739089/ChatGPT_Image_Jun_25_2026_07_38_25_AM_xginoq.png", mapLink: "https://maps.google.com/?q=Nari+Simari+Chhata+Mathura", description: "Most affordable plots in Mathura Brij region. Just 400m from Delhi-Agra Highway. Phase II & III available.", sizes: ["100 Sq.Yard - Phase II ₹15,500/Gaj", "100 Sq.Yard - Phase III ₹13,500/Gaj"], amenities: ["40Ft/30Ft Roads", "Park", "Street Lights", "Drainage", "24x7 Security", "Demarcation"], highlights: ["400m from Delhi-Agra Highway", "2 KM from DPS", "2 KM from GL Bajaj University"], payment: "20% Booking | 10% in 30 Days | 10% in 60 Days | 12 EMI of ₹59,995" },
  'radhe-awadh-puri': { name: "Radhe Awadh Puri", location: "Ayodhya Dham, UP", price: "₹17,000/Gaj", tag: "Near Ram Mandir", type: "Plot", builder: "Shubh Labh Developers", region: "ayodhya", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782745110/ChatGPT_Image_Jun_26_2026_06_36_49_PM_tq8pmj.png", mapLink: "https://maps.google.com/?q=Daulatpur+Sohawal+Ayodhya+UP", description: "Gated plots in holy Ayodhya. 10 KM from Ram Mandir, 13 KM from Valmiki International Airport.", sizes: ["100 Sq.Yard (900 Sq.Ft)"], amenities: ["Gated Township", "40Ft Roads", "Electricity", "Water", "Parks", "CCTV"], highlights: ["10 KM from Ram Mandir", "13 KM from Valmiki Airport", "20 KM from Naka Chauraha"], payment: "20% Booking | 10% in 30 Days | 10% in 60 Days | 12 EMI of ₹77,495" },
  'radhe-shyam-puri': { name: "Radhe Shyam Puri", location: "Khatu Shyam Ji, Sikar", price: "₹21,000/Gaj", tag: "Spiritual Hub", type: "Plot", builder: "Shubh Labh Developers", region: "rajasthan", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782739086/ChatGPT_Image_Jun_25_2026_09_26_03_PM_ebntxb.png", mapLink: "https://maps.google.com/?q=Khatu+Shyam+Sikar+Rajasthan", description: "Premium plots near world-famous Khatu Shyam Ji Mandir. 7 KM from main temple, 300m from Karni Mata Mandir.", sizes: ["100 Sq.Yard (900 Sq.Ft)"], amenities: ["Gated Society", "40Ft/30Ft Roads", "Street Lights", "Drainage", "Water Pipelines", "24x7 Security"], highlights: ["7 KM from Khatu Shyam Mandir", "300m from Karni Mata Mandir", "7 KM from Toran Dwar"], payment: "20% Booking | 10% in 30 Days | 10% in 60 Days | 12 EMI of ₹97,500" },
  'shri-ram-janki-ayodhya-dham': { name: "Shri Ram Janki Ayodhya Dham", location: "Ayodhya, UP", price: "₹27,000/Gaj", tag: "Near 7-Star Hotel", type: "Plot", builder: "Shubh Labh Developers", region: "ayodhya", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782738727/ChatGPT_Image_Jun_26_2026_12_35_26_PM_bmeszt.png", mapLink: "https://maps.google.com/?q=Tihura+Manjha+Sadar+Ayodhya", description: "Premium plots just 400m from upcoming Leela Ambience 7-Star Hotel. 8 KM from Ram Mandir.", sizes: ["100 Sq.Yard (900 Sq.Ft)"], amenities: ["High Boundary Wall", "Security Lobby", "Wide Roads", "Park", "Sewage Line", "Street Lights"], highlights: ["400m from Leela 7-Star Hotel", "8 KM from Ram Mandir", "15 KM from Valmiki Airport"], payment: "20% Booking | 10% in 30 Days | 10% in 60 Days | 12 EMI of ₹1,27,495" },
  'radha-krishna-nagar': { name: "Radha Krishna Nagar", location: "Greater Noida, UP", price: "₹21,000/Gaj", tag: "Near KMP Expressway", type: "Plot", builder: "Shubh Labh Developers", region: "greater-noida", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782738117/ChatGPT_Image_Jun_27_2026_09_40_59_PM_jcrmvy.png", mapLink: "https://maps.google.com/?q=Dhoom+Manikpur+Dadri+Greater+Noida", description: "Strategic plots near KMP Expressway. 700m from KMP, 2 KM from Dadri Railway Station.", sizes: ["100 Sq.Yard (900 Sq.Ft)"], amenities: ["Gated Township", "24x7 Security", "Parks", "Concrete Roads", "Electricity", "Water & Sewer"], highlights: ["700m from KMP Expressway", "2 KM from Dadri Railway Station", "Near Hero Factory"], payment: "20% Booking | 10% in 30 Days | 10% in 60 Days | 12 EMI of ₹97,500" },
  'shree-govind-vatika': { name: "Shree Govind Vatika", location: "Chhata, Mathura", price: "₹12,000/Gaj", tag: "Budget Friendly", type: "Plot", builder: "Shubh Labh Developers", region: "mathura", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782738685/ChatGPT_Image_Jun_27_2026_06_14_27_PM_dxtv0l.png", mapLink: "https://maps.google.com/?q=Sankhi+Chhata+Mathura", description: "Most budget-friendly plots near Mathura Brij circuit. 18 KM from Govardhan Parbat. Perfect for long-term investment.", sizes: ["100 Sq.Yard (900 Sq.Ft)"], amenities: ["Demarcated Plots", "Broad Roads", "Water", "Street Lights", "Park", "Gated Fencing"], highlights: ["18 KM from Govardhan Parbat", "2 KM from Chhata Railway Station", "18 KM from Barsana"], payment: "20% Booking | 10% in 30 Days | 10% in 60 Days | 12 EMI of ₹52,500" },
  'radha-krishna-vrindavan-ashram': { name: "Radha Krishna Vrindavan Ashram", location: "Sadar, Mathura", price: "₹28,000/Gaj", tag: "Near Prem Mandir", type: "Plot", builder: "Shubh Labh Developers", region: "mathura", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782738519/ChatGPT_Image_Jun_27_2026_06_29_44_AM_hxabse.png", mapLink: "https://maps.google.com/?q=Devi+Atas+Sadar+Mathura", description: "Premium plots near Vrindavan's holiest temples. 6 KM from Prem Mandir, 7 KM from ISKCON.", sizes: ["100 Sq.Yard (900 Sq.Ft)"], amenities: ["Luxury Gated Boundary", "Security Lobby", "Wide Roads", "Sewerage", "Parks", "24x7 Guard"], highlights: ["6 KM from Prem Mandir", "8 KM from Banke Bihari Mandir", "7 KM from ISKCON"], payment: "20% Booking | 10% in 30 Days | 10% in 60 Days | 12 EMI of ₹1,32,495" },
  'shree-radha-krishna-enclave': { name: "Shree Radha Krishna Enclave", location: "Mant, Mathura", price: "₹17,500/Gaj", tag: "Near Jewar Airport", type: "Plot", builder: "Shubh Labh Developers", region: "jewar", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782737577/ChatGPT_Image_Jun_28_2026_04_26_24_PM_l9vhls.png", mapLink: "https://maps.google.com/?q=Chandpur+Khurad+Mant+Mathura", description: "Strategic plots connecting Mathura & Jewar Airport. 20 KM from Jewar International Airport.", sizes: ["100 Sq.Yard (900 Sq.Ft)"], amenities: ["Beautiful Park", "Street Lights", "Gated Township", "Wide Road", "Demarcation", "Full Security"], highlights: ["20 KM from Jewar Airport", "8 KM from Tappal Cut", "6 KM from Bajna Industrial Area"], payment: "20% Booking | 10% in 30 Days | 10% in 60 Days | 12 EMI of ₹80,000" },
  'shree-radha-krishna-vatika': { name: "Shree Radha Krishna Vatika", location: "Tappal, Aligarh", price: "₹25,500/Gaj", tag: "8 KM Jewar Airport", type: "Plot", builder: "Shubh Labh Developers", region: "jewar", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782738291/ChatGPT_Image_Jun_27_2026_09_06_43_PM_xziw9a.png", mapLink: "https://maps.google.com/?q=Tappal+Aligarh+UP", description: "Prime plots just 8 KM from Jewar International Airport. Fastest growing corridor post airport announcement.", sizes: ["100 Sq.Yard (900 Sq.Ft)"], amenities: ["Modern Sewage", "40/30/25Ft Roads", "Street Lights", "Park", "Sweet Water", "24x7 Security"], highlights: ["8 KM from Jewar Airport", "1.5 KM from Tappal Cut", "2 KM from Tappal Market"], payment: "20% Booking | 10% in 30 Days | 10% in 60 Days | 12 EMI of ₹1,20,000" },
  'prateek-grand-begonia': { name: "Prateek Grand Begonia", location: "Siddharth Vihar, Ghaziabad", price: "₹1.29 Cr onwards", tag: "Luxury High-Rise", type: "Apartment", builder: "Prateek Group", rera: "UPRERAPRJ790651", region: "ghaziabad", image: "https://res.cloudinary.com/deeolaopc/image/upload/v1782737453/ChatGPT_Image_Jun_28_2026_10_06_21_PM_luntnv.png", mapLink: "https://maps.google.com/?q=Siddharth+Vihar+NH24+Ghaziabad", description: "Ultra-luxury 32-floor towers in 40-acre integrated township. Golf cart, rooftop garden, EV charging at every parking.", sizes: ["2 BHK - 1075 Sq.Ft @ ₹1.29 Cr", "2 BHK+Study - 1280 Sq.Ft @ ₹1.54 Cr", "3 BHK - 1500 Sq.Ft @ ₹1.80 Cr", "3 BHK Premium - 1810 Sq.Ft @ ₹2.17 Cr"], amenities: ["Rooftop Garden", "Golf Cart", "Swimming Pool", "EV Charging", "Box Cricket", "Tennis Court"], highlights: ["32 Floor High-Rise", "2 min from Metro & RRTS", "Near Noida Sector 62"], payment: "10% Booking | 30% in 90 Days | 30% on Top Floor | 30% on Possession" },
};

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = allProjects[slug];
  const [form, setForm] = useState({ firstName: '', lastName: '', mobile: '', email: '', visitDate: 'This Week', submitted: false });
  const [showFullImage, setShowFullImage] = useState(false);

  const nearbyProjects = Object.entries(allProjects)
    .filter(([s, p]) => s !== slug && p.region === project?.region)
    .slice(0, 4);

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
    const msg = `New Site Visit Inquiry!\nProject: ${project.name}\nLocation: ${project.location}\nName: ${form.firstName} ${form.lastName}\nMobile: ${form.mobile}\nEmail: ${form.email || 'Not provided'}\nVisit: ${form.visitDate}`;
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
          <Link href="/" className="flex items-center gap-2">
            <img src={LOGO} alt="Logo" className="h-9 w-9 rounded-full object-cover" />
            <div>
              <p className="text-sm font-bold leading-tight" style={{color: '#c9a84c'}}>PROPERTY</p>
              <p className="text-xs leading-tight" style={{color: '#e8d5a3'}}>— INDIA HUB —</p>
            </div>
          </Link>
          <button onClick={handleShare} className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-black" style={{background: '#c9a84c'}}>
            <ShareIcon size={14} /> Share
          </button>
        </div>
      </header>

      {showFullImage && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center" onClick={() => setShowFullImage(false)}>
          <img src={project.image} alt={project.name} className="w-full h-full object-contain" />
          <button className="absolute top-4 right-4 text-white text-3xl font-bold bg-black bg-opacity-50 w-10 h-10 rounded-full">✕</button>
        </div>
      )}

      <div className="h-56 overflow-hidden cursor-pointer relative" onClick={() => setShowFullImage(true)}>
        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{background: 'linear-gradient(transparent, rgba(0,0,0,0.5))'}} />
        <div className="absolute top-3 left-3">
          <span className="text-xs px-2 py-1 rounded-full font-bold" style={{background: '#c9a84c', color: '#0a1628'}}>{project.tag}</span>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="text-white text-xs bg-black bg-opacity-60 px-2 py-1 rounded-full">🔍 Tap to zoom</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <h2 className="text-xl font-bold" style={{color: '#0a1628'}}>{project.name}</h2>
          <p className="text-gray-500 text-sm mt-1">📍 {project.location}</p>
          <p className="text-2xl font-bold mt-2" style={{color: '#c9a84c'}}>{project.price}</p>
          {project.builder && <p className="text-sm text-gray-600 mt-1">🏗️ Builder: {project.builder}</p>}
          {project.rera && <p className="text-xs text-green-600 mt-1">✅ RERA: {project.rera}</p>}
          {project.description && <p className="text-xs text-gray-600 mt-2 leading-relaxed border-t pt-2">{project.description}</p>}
        </div>

        <a href={project.mapLink} target="_blank" className="flex items-center gap-3 bg-white rounded-xl shadow p-4 mb-4 border-l-4" style={{borderColor: '#4285F4'}}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{background: '#4285F4'}}>
            <MapsIcon size={20} />
          </div>
          <div>
            <p className="font-bold text-sm" style={{color: '#0a1628'}}>View on Google Maps</p>
            <p className="text-xs text-gray-500">{project.location}</p>
          </div>
          <span className="ml-auto text-gray-400">→</span>
        </a>

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

        <div className="grid grid-cols-3 gap-3 mb-3">
          <a href={`https://wa.me/917820008509?text=I am interested in ${project.name}, ${project.location}. Please share details.`} className="flex items-center justify-center gap-1 text-white py-3 rounded-xl font-bold text-xs" style={{background: '#25D366'}}>
            <WhatsAppIcon size={14} /> WhatsApp
          </a>
          <a href="tel:+917820008509" className="flex items-center justify-center gap-1 text-white py-3 rounded-xl font-bold text-xs" style={{background: '#0a1628'}}>
            <PhoneIcon size={14} /> Call
          </a>
          <button onClick={handleShare} className="flex items-center justify-center gap-1 text-black py-3 rounded-xl font-bold text-xs" style={{background: '#c9a84c'}}>
            <ShareIcon size={14} /> Share
          </button>
        </div>

        <a href={project.mapLink} target="_blank" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white text-sm mb-6" style={{background: '#4285F4'}}>
          <MapsIcon size={18} /> Open in Google Maps
        </a>

        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h3 className="font-bold text-lg mb-1" style={{color: '#0a1628'}}>🏠 Book Free Site Visit</h3>
          <p className="text-xs text-gray-500 mb-4">Project: <span className="font-bold" style={{color: '#c9a84c'}}>{project.name}</span></p>
          {form.submitted ? (
            <div className="text-center py-6">
              <p className="text-3xl mb-2">🎉</p>
              <p className="font-bold text-green-600 text-lg">Request Submitted!</p>
              <p className="text-sm text-gray-500 mt-1">Hamari team 24 hours mein contact karegi</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <input placeholder="First Name *" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} className="flex-1 border rounded-lg p-3 text-sm focus:outline-none" style={{borderColor: '#0a1628'}} />
                <input placeholder="Last Name" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} className="flex-1 border rounded-lg p-3 text-sm focus:outline-none" style={{borderColor: '#0a1628'}} />
              </div>
              <input placeholder="Mobile Number *" type="tel" value={form.mobile} onChange={e => setForm({...form, mobile: e.target.value})} className="border rounded-lg p-3 text-sm w-full focus:outline-none" style={{borderColor: '#0a1628'}} />
              <input placeholder="Email ID (Optional)" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="border rounded-lg p-3 text-sm w-full focus:outline-none" style={{borderColor: '#0a1628'}} />
              <div>
                <p className="text-sm font-semibold mb-2" style={{color: '#0a1628'}}>📅 When do you want to visit?</p>
                <div className="grid grid-cols-3 gap-2">
                  {['Today', 'This Week', 'Next Week'].map(opt => (
                    <button key={opt} onClick={() => setForm({...form, visitDate: opt})} className="py-2 rounded-lg text-xs font-bold border-2" style={{ background: form.visitDate === opt ? '#0a1628' : 'white', color: form.visitDate === opt ? '#c9a84c' : '#0a1628', borderColor: '#0a1628' }}>{opt}</button>
                  ))}
                </div>
              </div>
              <button onClick={handleSubmit} className="w-full py-3 rounded-xl font-bold text-white mt-2 text-sm" style={{background: '#0a1628'}}>Submit Inquiry 🚀</button>
            </div>
          )}
        </div>

        {/* Nearby Projects */}
        {nearbyProjects.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-1" style={{color: '#0a1628'}}>🏘️ Nearby Live Projects</h3>
            <p className="text-xs text-gray-500 mb-4">Same area mein aur bhi options dekhein</p>
            <div className="flex flex-col gap-3">
              {nearbyProjects.map(([s, p]) => (
                <Link href={`/projects/${s}`} key={s}>
                  <div className="bg-white rounded-xl shadow overflow-hidden flex">
                    <div className="w-28 h-24 flex-shrink-0 overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3 flex-1">
                      <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{background: '#fef3c7', color: '#92400e'}}>{p.tag}</span>
                      <h4 className="font-bold text-sm mt-1" style={{color: '#0a1628'}}>{p.name}</h4>
                      <p className="text-gray-500 text-xs">📍 {p.location}</p>
                      <p className="font-bold text-xs mt-1" style={{color: '#c9a84c'}}>{p.price}</p>
                    </div>
                    <div className="flex items-center pr-3">
                      <span style={{color: '#c9a84c'}}>→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-6 right-4 flex flex-col gap-3 z-40">
        <a href="tel:+917820008509" className="text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl" style={{background: '#0a1628'}}>
          <PhoneIcon size={24} />
        </a>
        <a href="https://wa.me/917820008509" className="text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl" style={{background: '#25D366'}}>
          <WhatsAppIcon size={24} />
        </a>
      </div>
    </main>
  );
} 
