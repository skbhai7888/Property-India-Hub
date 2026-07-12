"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchPage() {
  const [term, setTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (term.trim()) {
      router.push(`/?search=${encodeURIComponent(term)}#projects-section`);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-lg mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: "#0a1628" }}>Property Search Karein</h1>
        <div className="relative">
          <input
            type="text"
            autoFocus
            placeholder="Location, project name, type..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
            className="w-full border rounded-full pl-5 pr-12 py-4 text-sm shadow-sm bg-white"
            style={{ borderColor: "#c9a84c" }}
          />
          <button onClick={handleSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-xl">🔍</button>
        </div>
        <p className="text-xs text-gray-400 mt-3 text-center">Jaise: "Mathura", "Plot", "Villa", "Noida Airport"</p>
      </div>
    </main>
  );
}
