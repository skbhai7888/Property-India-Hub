"use client";
import Link from "next/link";
import { blogPosts } from "../../lib/blogData";

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2" style={{ color: "#0a1628" }}>
          Property India Hub Blog
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Guides and updates on real estate, infrastructure, and investment across NCR, Uttar Pradesh, Rajasthan, and Uttarakhand.
        </p>
        <div className="space-y-4">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white rounded-xl shadow p-4 hover:shadow-md transition"
            >
              <h2 className="font-bold text-sm" style={{ color: "#0a1628" }}>{post.title}</h2>
              <p className="text-xs text-gray-500 mt-1">{post.directAnswer}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
