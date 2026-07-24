"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getLocationBySlug } from "../../../lib/locationsData";
import { supabase } from "../../../lib/supabase";

export default function LocationPage() {
  const params = useParams();
  const slug = params.slug as string;
  const location = getLocationBySlug(slug);
  const [relatedProjects, setRelatedProjects] = useState<any[]>([]);

  useEffect(() => {
    if (!location) return;
    loadRelated();
  }, [slug]);

  const loadRelated = async () => {
    const { data } = await supabase.from("projects").select("*");
    if (!data) return;
    const keywords = location!.matchKeywords;
    const filtered = data.filter((p: any) =>
      keywords.some((k) => (p.location || "").toLowerCase().includes(k.toLowerCase()))
    );
    setRelatedProjects(filtered);
  };

  if (!location) {
    return (
      <main className="min-h-screen bg-gray-50 p-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-600">Location not found.</p>
          <Link href="/locations" className="text-sm font-semibold" style={{ color: "#0a1628" }}>← Back to all locations</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 pb-20">
      {location && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Place",
              name: location.name,
              address: { "@type": "PostalAddress", addressRegion: location.state, addressCountry: "IN" },
              description: location.overview,
            }),
          }}
        />
      )}
      {location && location.faqs?.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: location.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      )}
      <div className="max-w-4xl mx-auto">
        <Link href="/locations" className="text-xs font-semibold" style={{ color: "#0a1628" }}>← All Locations</Link>
        <h1 className="text-2xl font-bold mt-2 mb-1" style={{ color: "#0a1628" }}>
          Property in {location.name}, {location.state}
        </h1>
        <p className="text-sm text-gray-600 mb-6">{location.overview}</p>

        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <h2 className="font-bold text-sm mb-1" style={{ color: "#0a1628" }}>Connectivity</h2>
          <p className="text-sm text-gray-600">{location.connectivity}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h2 className="font-bold text-sm mb-1" style={{ color: "#0a1628" }}>Infrastructure</h2>
          <p className="text-sm text-gray-600">{location.infrastructure}</p>
        </div>

        {relatedProjects.length > 0 && (
          <div className="mb-6">
            <h2 className="font-bold text-lg mb-3" style={{ color: "#0a1628" }}>Live Projects in {location.name}</h2>
            <div className="space-y-3">
              {relatedProjects.map((p: any) => (
                <Link key={p.id} href={`/projects/${p.slug}`} className="block bg-white rounded-xl shadow p-4">
                  <h3 className="font-bold text-sm">{p.name}</h3>
                  <p className="text-xs text-gray-500">{p.location}</p>
                  <p className="text-xs font-bold mt-1" style={{ color: "#c9a84c" }}>{p.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h2 className="font-bold text-lg mb-3" style={{ color: "#0a1628" }}>Frequently Asked Questions</h2>
          <div className="space-y-3">
            {location.faqs.map((f, i) => (
              <div key={i}>
                <p className="text-sm font-bold">{f.q}</p>
                <p className="text-sm text-gray-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-sm text-gray-600 mb-3">Looking for a property in {location.name}? Talk to our team for a free consultation and site visit.</p>
          <div className="flex gap-2 justify-center">
            <a href="tel:+917820008509" className="px-4 py-2 rounded-lg font-bold text-sm text-white" style={{ background: "#0a1628" }}>Call Now</a>
            <a href="https://wa.me/917820008509" className="px-4 py-2 rounded-lg font-bold text-sm text-white" style={{ background: "#25D366" }}>WhatsApp</a>
          </div>
        </div>
      </div>
    </main>
  );
}
