import Link from 'next/link';
import ProjectsSection from '../components/ProjectsSection';
import { supabase } from '../lib/supabase';
import HamburgerMenu from '../components/HamburgerMenu';

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


export default async function Home() {
  const { data: projects } = await supabase.from("projects").select("*");
  const userIds = Array.from(new Set((projects || []).map((p: any) => p.user_id).filter(Boolean)));
  let phoneMap: Record<string, string> = {};
  if (userIds.length > 0) {
    const { data: posters } = await supabase.from("public_poster_contact").select("id, phone").in("id", userIds);
    if (posters) {
      posters.forEach((p: any) => { if (p.phone) phoneMap[p.id] = p.phone; });
    }
  }
  const projectsWithPoster = (projects || []).map((p: any) => ({
    ...p,
    poster_phone: p.user_id && phoneMap[p.user_id] ? phoneMap[p.user_id] : null
  }));
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 shadow-lg" style={{background: '#0a1628'}}>
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <div className="flex items-center gap-3"><HamburgerMenu />
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

        <ProjectsSection projects={projectsWithPoster} />

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

    </main>
  );
} 
