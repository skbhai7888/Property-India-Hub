"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871-.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289-.173-1.413-.124-.272-.198-.57-.347M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0012.05 0z"/>
  </svg>
);

const GoogleMapsIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
    <path d="M12 0C7.802 0 4 3.403 4 7.602 4 11.8 7.469 16.8 12 24c4.531-7.188 8-12.2 8-16.398C20 3.403 16.199 0 12 0zm0 11a3 3 0 110-6 3 3 0 010 6z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

function getHaystackWords(p: any): string[] {
  const text = [p.location, p.type, p.name, p.title, p.description, p.region, p.tag, p.highlights, p.amenities]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return text.split(/[^a-z0-9]+/).filter(Boolean);
}

export default function ProjectsSection({ projects }: { projects: any[] }) {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    const urlSearch = searchParams.get("search");
    if (urlSearch) {
      setSearchTerm(urlSearch);
      setTimeout(() => {
        const el = document.getElementById("projects-section");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, [searchParams]);

  const ranked = projects
    .map((p: any) => {
      if (!searchTerm.trim()) return { p, score: 1, match: true };
      const haystackWords = getHaystackWords(p);
      const haystackText = haystackWords.join(" ");
      const searchWords = searchTerm.toLowerCase().trim().split(/\s+/).filter(Boolean);
      let score = 0;
      let match = false;
      searchWords.forEach((w) => {
        if (haystackWords.includes(w)) {
          score += 2;
          match = true;
        } else if (haystackText.indexOf(w) !== -1) {
          score += 1;
          match = true;
        }
      });
      return { p, score, match };
    })
    .filter((x) => x.match)
    .sort((a, b) => b.score - a.score);

  const filtered = ranked.map((x) => x.p);

  const handleSearchSubmit = () => {
    setRefreshTick((t) => t + 1);
    if (typeof document !== "undefined") {
      const el = document.activeElement as HTMLElement | null;
      if (el && el.blur) el.blur();
    }
  };

  return (
    <section id="projects-section" className="py-10 px-4 max-w-6xl mx-auto">
      <h3 className="text-2xl font-bold text-center mb-1" style={{color: '#0a1628'}}>Our Live Projects</h3>
      <p className="text-center text-gray-500 mb-4 text-sm">Tap any project to view full details</p>
      <div className="mb-6 max-w-xl mx-auto relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: '16px' }}>🔍</span>
        <input
          type="text"
          placeholder="Search by location, project name, or type"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSearchSubmit(); }}
          className="w-full border rounded-full pl-11 pr-10 py-3 text-sm shadow-sm"
          style={{ borderColor: '#c9a84c' }}
        />
        {searchTerm.length > 0 && (
          <button
            onClick={() => { setSearchTerm(""); handleSearchSubmit(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            style={{ fontSize: '16px' }}
          >
            ✕
          </button>
        )}
      </div>
      <p className="text-center text-xs text-gray-400 mb-4" key={refreshTick}>
        {filtered.length} {filtered.length === 1 ? "property found" : "properties found"}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project: any, i: number) => {
          const isSoldOut = project.status === "sold_out";
          return (
            <div key={i} className={`bg-white border rounded-xl shadow-md overflow-hidden relative ${isSoldOut ? "opacity-90" : ""}`}>
              {isSoldOut && (
                <div className="absolute top-3 left-0 right-0 z-20 flex justify-center">
                  <span className="bg-red-600 text-white font-extrabold text-sm px-6 py-1.5 rounded-full shadow-lg tracking-wide">
                    SOLD OUT
                  </span>
                </div>
              )}
              <Link href={`/projects/${project.slug}`} className="block">
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.name}
                    className={`w-full h-full object-contain bg-gray-100 ${isSoldOut ? "grayscale" : ""}`}
                  />
                  {!isSoldOut && (
                    <div className="absolute top-2 left-2">
                      <span className="text-xs px-2 py-1 rounded-full font-bold" style={{background: '#c9a84c', color: '#0a1628'}}>{project.tag}</span>
                    </div>
                  )}
                </div>
                {isSoldOut ? (
                  <div className="p-4 text-center">
                    <h4 className="font-bold text-sm text-gray-400">SOLD OUT</h4>
                    <p className="text-xs text-red-600 font-bold mt-1">This property is no longer available</p>
                  </div>
                ) : (
                  <div className="p-4">
                    <span className="text-xs px-2 py-1 rounded-full" style={{background: '#e0e7ff', color: '#3730a3'}}>{project.type}</span>
                    <h4 className="font-bold text-sm mt-2" style={{color: '#0a1628'}}>{project.name}</h4>
                    <p className="text-gray-500 text-xs mt-1">📍 {project.location}</p>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">{project.description}</p>
                    <p className="font-bold mt-2 text-sm" style={{color: '#c9a84c'}}>{project.price}</p>
                    <p className="text-xs mt-1 font-semibold" style={{color: '#0a1628'}}>View Full Details →</p>
                  </div>
                )}
              </Link>
              {!isSoldOut && (
                <div className="px-4 pb-4 flex gap-2">
                  <a href={`https://wa.me/${project.poster_phone || '917820008509'}?text=I am interested in ${project.name}`} className="flex-1 flex items-center justify-center gap-1 text-white text-center py-2 rounded-lg text-xs font-bold" style={{background: '#25D366'}}>
                    <WhatsAppIcon /> WhatsApp
                  </a>
                  <a href={project.map_link} target="_blank" className="flex items-center justify-center text-white px-3 py-2 rounded-lg text-xs font-bold" style={{background: '#4285F4'}}>
                    <GoogleMapsIcon />
                  </a>
                  <a href={`tel:+${project.poster_phone || '917820008509'}`} className="flex items-center justify-center text-white px-3 py-2 rounded-lg text-xs font-bold" style={{background: '#22c55e'}}>
                    <PhoneIcon />
                  </a>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-gray-400 py-10">No matching properties found. Try a different search term.</p>
        )}
      </div>
    </section>
  );
}
