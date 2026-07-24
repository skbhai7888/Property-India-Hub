"use client";
import Link from "next/link";
import { locations } from "../../lib/locationsData";

export default function LocationsIndexPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2" style={{ color: "#0a1628" }}>
          Property Locations We Cover
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Property India Hub lists verified projects across the following cities and regions in NCR, Uttar Pradesh, Rajasthan, and Uttarakhand.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {locations.map((loc) => (
            <Link
              key={loc.slug}
              href={`/locations/${loc.slug}`}
              className="block bg-white rounded-xl shadow p-4 hover:shadow-md transition"
            >
              <h2 className="font-bold text-sm" style={{ color: "#0a1628" }}>{loc.name}</h2>
              <p className="text-xs text-gray-500 mt-1">{loc.state}</p>
              <p className="text-xs text-gray-600 mt-2 line-clamp-2">{loc.overview}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
