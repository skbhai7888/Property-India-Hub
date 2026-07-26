"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getBlogBySlug } from "../../../lib/blogData";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getBlogBySlug(slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-gray-50 p-4 pb-20">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-gray-600">Article not found.</p>
          <Link href="/blog" className="text-sm font-semibold" style={{ color: "#0a1628" }}>← Back to Blog</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 pb-20">
      {post && (
        <link rel="canonical" href={`https://property-india-hub.vercel.app/blog/${post.slug}`} />
      )}
      {post && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              datePublished: post.datePublished,
              dateModified: post.datePublished,
              author: { "@type": "Organization", name: "Property India Hub" },
              publisher: { "@type": "Organization", name: "Property India Hub" },
              description: post.directAnswer,
            }),
          }}
        />
      )}
      {post && post.faqs?.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: post.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      )}
      <div className="max-w-2xl mx-auto">
        <Link href="/blog" className="text-xs font-semibold" style={{ color: "#0a1628" }}>← All Articles</Link>
        <h1 className="text-2xl font-bold mt-2 mb-1" style={{ color: "#0a1628" }}>{post.title}</h1>
        <p className="text-xs text-gray-500 mb-4">Published: {post.datePublished}</p>

        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <p className="text-sm font-bold mb-1">{post.question}</p>
          <p className="text-sm text-gray-700">{post.directAnswer}</p>
        </div>

        {post.body.map((section, i) => (
          <div key={i} className="mb-4">
            <h2 className="font-bold text-sm mb-1" style={{ color: "#0a1628" }}>{section.heading}</h2>
            <p className="text-sm text-gray-600">{section.content}</p>
          </div>
        ))}

        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h2 className="font-bold text-lg mb-3" style={{ color: "#0a1628" }}>Frequently Asked Questions</h2>
          <div className="space-y-3">
            {post.faqs.map((f, i) => (
              <div key={i}>
                <p className="text-sm font-bold">{f.q}</p>
                <p className="text-sm text-gray-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-sm text-gray-600 mb-3">Looking for properties in this area? Talk to our team for a free consultation and site visit.</p>
          <div className="flex gap-2 justify-center">
            <a href="tel:+917820008509" className="px-4 py-2 rounded-lg font-bold text-sm text-white" style={{ background: "#0a1628" }}>Call Now</a>
            <a href="https://wa.me/917820008509" className="px-4 py-2 rounded-lg font-bold text-sm text-white" style={{ background: "#25D366" }}>WhatsApp</a>
          </div>
        </div>
      </div>
    </main>
  );
}
