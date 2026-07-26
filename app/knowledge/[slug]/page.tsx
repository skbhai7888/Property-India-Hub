"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getGuideBySlug } from "../../../lib/knowledgeData";

export default function KnowledgeGuidePage() {
  const params = useParams();
  const slug = params.slug as string;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return (
      <main className="min-h-screen bg-gray-50 p-4 pb-20">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-gray-600">Guide not found.</p>
          <Link href="/knowledge" className="text-sm font-semibold" style={{ color: "#0a1628" }}>← Back to Knowledge Base</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 pb-20">
      {guide && (
        <link rel="canonical" href={`https://property-india-hub.vercel.app/knowledge/${guide.slug}`} />
      )}
      {guide && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: guide.title,
              author: { "@type": "Organization", name: "Property India Hub" },
              publisher: { "@type": "Organization", name: "Property India Hub" },
              description: guide.directAnswer,
            }),
          }}
        />
      )}
      {guide && guide.faqs?.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: guide.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      )}
      <div className="max-w-2xl mx-auto">
        <Link href="/knowledge" className="text-xs font-semibold" style={{ color: "#0a1628" }}>← All Guides</Link>
        <h1 className="text-2xl font-bold mt-2 mb-4" style={{ color: "#0a1628" }}>{guide.title}</h1>

        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <p className="text-sm font-bold mb-1">{guide.question}</p>
          <p className="text-sm text-gray-700">{guide.directAnswer}</p>
        </div>

        {guide.sections.map((section, i) => (
          <div key={i} className="mb-4">
            <h2 className="font-bold text-sm mb-1" style={{ color: "#0a1628" }}>{section.heading}</h2>
            <p className="text-sm text-gray-600">{section.content}</p>
          </div>
        ))}

        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h2 className="font-bold text-lg mb-3" style={{ color: "#0a1628" }}>Frequently Asked Questions</h2>
          <div className="space-y-3">
            {guide.faqs.map((f, i) => (
              <div key={i}>
                <p className="text-sm font-bold">{f.q}</p>
                <p className="text-sm text-gray-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-sm text-gray-600 mb-3">Looking for verified property listings? Browse our current projects or talk to our team.</p>
          <div className="flex gap-2 justify-center">
            <Link href="/projects" className="px-4 py-2 rounded-lg font-bold text-sm text-white" style={{ background: "#0a1628" }}>Browse Projects</Link>
            <a href="https://wa.me/917820008509" className="px-4 py-2 rounded-lg font-bold text-sm text-white" style={{ background: "#25D366" }}>WhatsApp</a>
          </div>
        </div>
      </div>
    </main>
  );
}
