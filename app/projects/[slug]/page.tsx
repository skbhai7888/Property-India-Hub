"use client";
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

const LOGO = "https://res.cloudinary.com/deeolaopc/image/upload/v1782739062/Property_India_Hub_jbrp94.jpg";

const WhatsAppIcon = ({size = 16}: {size?: number}) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871-.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
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

function getYouTubeEmbed(url: string) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<any>(null);
  const [posterPhone, setPosterPhone] = useState('');
  const [nearbyProjects, setNearbyProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ firstName: '', lastName: '', mobile: '', email: '', visitDate: 'This Week', submitted: false });
  const [showFullImage, setShowFullImage] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [allImages, setAllImages] = useState<string[]>([]);

  useEffect(() => {
    loadProject();
  }, [slug]);

  useEffect(() => {
    const handlePopState = () => {
      setShowFullImage(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const loadProject = async () => {
    const { data: projectData } = await supabase.from('projects').select('*').eq('slug', slug).single();
    setProject(projectData);
    if (projectData) {
      if (projectData.user_id) {
        const { data: posterProfile } = await supabase.from('user_profiles').select('phone').eq('id', projectData.user_id).single();
        if (posterProfile && posterProfile.phone) {
          let cleanPhone = posterProfile.phone.replace(/[^0-9]/g, '');
          if (cleanPhone.length === 10) { cleanPhone = '91' + cleanPhone; }
          setPosterPhone(cleanPhone);
        }
      }
      const gallery = projectData.gallery_images ? projectData.gallery_images.split('|').filter(Boolean) : [];
      const images = [projectData.image, ...gallery].filter(Boolean);
      setAllImages(images);
      const { data: nearby } = await supabase.from('projects').select('*').eq('region', projectData.region).neq('slug', slug).limit(4);
      setNearbyProjects(nearby || []);
    }
    setLoading(false);
  };

  const handleShare = async () => {
    const text = `${project.name}\n📍 ${project.location}\n💰 ${project.price}\n📞 +91 7820008509\n🔗 ${window.location.href}`;
    if (navigator.share) {
      await navigator.share({ title: project.name, text, url: window.location.href });
    } else {
      window.open(`https://wa.me/${posterPhone || '917820008509'}?text=${encodeURIComponent(text)}`);
    }
  };

  const handleSubmit = async () => {
    if (!form.firstName || !form.mobile) { alert('Please fill Name and Mobile'); return; }
    let posterName = null;
    let posterPhone = null;
    if (project.user_id) {
      const { data: posterProfile } = await supabase.from('user_profiles').select('name, phone').eq('id', project.user_id).single();
      if (posterProfile) {
        posterName = posterProfile.name;
        posterPhone = posterProfile.phone;
      }
    }
    const { error } = await supabase.from('site_visits').insert({
      name: `${form.firstName} ${form.lastName}`.trim(),
      phone: form.mobile,
      project_name: project.name,
      preferred_date: form.visitDate,
      message: form.email ? `Email: ${form.email}` : null,
      status: 'pending',
      poster_name: posterName,
      poster_phone: posterPhone
    });
    if (error) { alert('Something went wrong, please try again.'); console.log(error); return; }
    const msg = `New Site Visit Inquiry!\nProject: ${project.name}\nLocation: ${project.location}\nName: ${form.firstName} ${form.lastName}\nMobile: ${form.mobile}\nEmail: ${form.email || 'Not provided'}\nVisit: ${form.visitDate}`;
    const whatsappNumber = posterPhone ? posterPhone.replace(/[^0-9]/g, '') : '917820008509';
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`);
    setForm({...form, submitted: true});
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: '#0a1628'}}>
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{background: '#0a1628'}}>
        <p className="text-white text-xl mb-4">Project not found</p>
        <Link href="/" className="px-6 py-2 rounded-full text-black font-bold" style={{background: '#c9a84c'}}>← Back to Home</Link>
      </div>
    );
  }

  const sizesArr = project.sizes ? project.sizes.split('|') : [];
  const amenitiesArr = project.amenities ? project.amenities.split('|') : [];
  const highlightsArr = project.highlights ? project.highlights.split('|') : [];
  const videoEmbed = project.video_url || "";

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
          <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
            <button onClick={() => setShowFullImage(false)} className="absolute top-4 right-4 text-white z-10 flex flex-col items-center justify-center px-3 py-2 bg-black bg-opacity-70 rounded-2xl border-2 border-white">
              <span style={{ fontSize: '26px', fontWeight: 'bold', lineHeight: 1 }}>X</span>
              <span style={{ fontSize: '10px', marginTop: '2px' }}>close</span>
            </button>
            <div
              className="w-full h-full flex overflow-x-auto snap-x snap-mandatory"
              style={{ scrollSnapType: 'x mandatory' }}
              onScroll={(e) => {
                const el = e.currentTarget;
                const idx = Math.round(el.scrollLeft / el.clientWidth);
                if (idx !== activeImageIndex) setActiveImageIndex(idx);
              }}
            >
              {allImages.map((img, i) => (
                <div key={`full-${i}`} className="w-full h-full flex-shrink-0 snap-center flex items-center justify-center">
                  <img src={img} alt={`${project.name} ${i}`} className="max-w-full max-h-[85vh] object-contain" />
                </div>
              ))}
              {videoEmbed && (
                <div className="w-full h-full flex-shrink-0 snap-center flex items-center justify-center">
                  <video src={videoEmbed} controls className="max-w-full max-h-[85vh] object-contain" />
                </div>
              )}
            </div>
            {(allImages.length > 1 || videoEmbed) && (
              <div className="flex gap-2 mt-4">
                {allImages.map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full" style={{ background: i === activeImageIndex ? '#c9a84c' : '#555' }} />
                ))}
                {videoEmbed && (
                  <div className="w-2 h-2 rounded-full" style={{ background: '#555' }} />
                )}
              </div>
            )}
          </div>
        )}

        <div className="max-w-4xl mx-auto p-4">
          <div className="mb-4">
            <div
              className="flex gap-2 overflow-x-auto snap-x snap-mandatory rounded-xl"
              style={{ scrollSnapType: 'x mandatory' }}
              onScroll={(e) => {
                const el = e.currentTarget;
                const idx = Math.round(el.scrollLeft / el.clientWidth);
                if (idx !== activeImageIndex) setActiveImageIndex(idx);
              }}
            >
              {allImages.map((img, i) => (
                <div key={`slide-${i}`} className="w-full flex-shrink-0 aspect-square snap-center" onClick={() => { window.history.pushState({modal:true}, ''); setShowFullImage(true); }}>
                  <img src={img} alt={`${project.name} ${i}`} className="w-full h-full object-contain bg-gray-100" />
                </div>
              ))}
              {videoEmbed && (
                <div className="w-full flex-shrink-0 aspect-square snap-center" style={{ aspectRatio: '1/1' }}>
                  <video src={videoEmbed} controls className="w-full h-full object-contain bg-black" />
                </div>
              )}
            </div>
            {(allImages.length > 1 || videoEmbed) && (
              <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`thumb-${i}`}
                    onClick={() => setActiveImageIndex(i)}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer"
                    style={{ border: i === activeImageIndex ? '3px solid #c9a84c' : '3px solid transparent' }}
                  />
                ))}
                {videoEmbed && (
                  <div className="w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center bg-black text-white text-xs">
                    ▶ Video
                  </div>
                )}
              </div>
            )}
          </div>


        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <span className="text-xs px-2 py-1 rounded-full font-bold" style={{background: '#c9a84c', color: '#0a1628'}}>{project.tag}</span>
          <h1 className="text-xl font-bold mt-2" style={{color: '#0a1628'}}>{project.name}</h1>
          <p className="text-gray-500 text-sm mt-1">📍 {project.location}</p>
          <p className="text-2xl font-bold mt-2" style={{color: '#c9a84c'}}>{project.price}</p>
          {project.description && <p className="text-xs text-gray-600 mt-2 leading-relaxed border-t pt-2">{project.description}</p>}
        </div>

        {sizesArr.length > 0 && (
          <div className="bg-white rounded-xl shadow p-4 mb-4">
            <h3 className="font-bold mb-3" style={{color: '#0a1628'}}>📐 Unit Sizes</h3>
            <div className="divide-y">
              {sizesArr.map((size: string, i: number) => (
                <div key={i} className="flex items-center gap-2 py-2 border-b last:border-0">
                  <span style={{color: '#c9a84c'}}>▪</span>
                  <span className="text-sm text-gray-700">{size}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {amenitiesArr.length > 0 && (
          <div className="bg-white rounded-xl shadow p-4 mb-4">
            <h3 className="font-bold mb-3" style={{color: '#0a1628'}}>✨ Amenities</h3>
            <div className="grid grid-cols-2 gap-2">
              {amenitiesArr.map((a: string, i: number) => (
                <div key={i} className="text-xs bg-blue-50 rounded-lg p-2 text-center text-blue-800">✓ {a}</div>
              ))}
            </div>
          </div>
        )}

        {highlightsArr.length > 0 && (
          <div className="bg-white rounded-xl shadow p-4 mb-4">
            <h3 className="font-bold mb-3" style={{color: '#0a1628'}}>📍 Location Highlights</h3>
            {highlightsArr.map((h: string, i: number) => (
              <div key={i} className="flex items-center gap-2 py-1">
                <span className="text-green-500">✓</span>
                <span className="text-sm text-gray-700">{h}</span>
              </div>
            ))}
          </div>
        )}

        {project.payment && (
          <div className="rounded-xl p-4 mb-4" style={{background: '#0a1628'}}>
            <h3 className="font-bold mb-2" style={{color: '#c9a84c'}}>💰 Payment Plan</h3>
            <p className="text-white text-sm">{project.payment}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 mb-3">
          <a href={`https://wa.me/${posterPhone || '917820008509'}?text=I am interested in ${project.name}, ${project.location}. Please share details.`} className="flex items-center justify-center gap-1 text-white py-3 rounded-xl font-bold text-xs" style={{background: '#25D366'}}>
            <WhatsAppIcon size={14} /> WhatsApp
          </a>
          <a href={`tel:+${posterPhone || '917820008509'}`} className="flex items-center justify-center gap-1 text-white py-3 rounded-xl font-bold text-xs" style={{background: '#0a1628'}}>
            <PhoneIcon size={14} /> Call
          </a>
          <button onClick={handleShare} className="flex items-center justify-center gap-1 text-black py-3 rounded-xl font-bold text-xs" style={{background: '#c9a84c'}}>
            <ShareIcon size={14} /> Share
          </button>
        </div>

        {project.map_link && (
          <a href={project.map_link} target="_blank" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white text-sm mb-6" style={{background: '#4285F4'}}>
            <MapsIcon size={18} /> Open in Google Maps
          </a>
        )}

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

        {nearbyProjects.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-1" style={{color: '#0a1628'}}>🔥 Nearby Live Projects</h3>
            <p className="text-xs text-gray-500 mb-4">Same area mein aur bhi options dekhein</p>
            <div className="flex flex-col gap-3">
              {nearbyProjects.map((p) => (
                <Link href={`/projects/${p.slug}`} key={p.slug}>
                  <div className="bg-white rounded-xl shadow overflow-hidden flex">
                    <div className="w-28 h-24 flex-shrink-0 overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-contain bg-gray-100" />
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
        <a href={`tel:+${posterPhone || '917820008509'}`} className="text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl" style={{background: '#0a1628'}}>
          <PhoneIcon size={24} />
        </a>
        <a href={`https://wa.me/${posterPhone || '917820008509'}`} className="text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl" style={{background: '#25D366'}}>
          <WhatsAppIcon size={24} />
        </a>
      </div>
    </main>
  );
}
