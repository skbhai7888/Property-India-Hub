"use client";
import Link from "next/link";
import { knowledgeGuides } from "../../lib/knowledgeData";

export default function KnowledgeIndexPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2" style={{ color: "#0a1628" }}>
          Property India Hub Knowledge Base
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Verified guides on RERA, home loans, property registration, and other real estate essentials for buyers across India.
        </p>
        <div className="space-y-4">
          {knowledgeGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/knowledge/${guide.slug}`}
              className="block bg-white rounded-xl shadow p-4 hover:shadow-md transition"
            >
              <h2 className="font-bold text-sm" style={{ color: "#0a1628" }}>{guide.title}</h2>
              <p className="text-xs text-gray-500 mt-1">{guide.directAnswer}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
