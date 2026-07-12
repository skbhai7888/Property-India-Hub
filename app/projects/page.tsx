"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function ProjectsListPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .or("source.is.null,source.eq.admin")
        .order("id", { ascending: false });
      setProjects(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = projects.filter((p) => {
    if (!searchTerm.trim()) return true;
    const text = [p.location, p.type, p.name, p.title, p.description, p.region, p.tag]
      .filter(Boolean).join(" ").toLowerCase();
    return text.includes(searchTerm.toLowerCase().trim());
  });

  if (loading) return <main className="min-h-screen flex items-center justify-center"><p>Loading...</p></main>;

  return (
    <main className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-center mt-6 mb-1" style={{ color: "#0a1628" }}>Our Projects</h1>
        <p className="text-center text-gray-500 text-sm mb-4">Verified projects listed directly by Property India Hub</p>

        <div className="mb-6 max-w-xl mx-auto relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: "16px" }}>🔍</span>
          <input
            type="text"
            placeholder="Search by location, project name, or type"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded-full pl-11 pr-4 py-3 text-sm shadow-sm"
            style={{ borderColor: "#c9a84c" }}
          />
        </div>
        <p className="text-center text-xs text-gray-400 mb-4">{filtered.length} {filtered.length === 1 ? "project" : "projects"}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project: any) => {
            const isSoldOut = project.status === "sold_out";
            return (
              <div key={project.id} className={`bg-white border rounded-xl shadow-md overflow-hidden relative ${isSoldOut ? "opacity-90" : ""}`}>
                {isSoldOut && (
                  <div className="absolute top-3 left-0 right-0 z-20 flex justify-center">
                    <span className="bg-red-600 text-white font-extrabold text-sm px-6 py-1.5 rounded-full shadow-lg">SOLD OUT</span>
                  </div>
                )}
                <Link href={`/projects/${project.slug}`} className="block">
                  <div className="aspect-square overflow-hidden relative">
                    <img src={project.image} alt={project.name} className={`w-full h-full object-contain bg-gray-100 ${isSoldOut ? "grayscale" : ""}`} />
                    {!isSoldOut && (
                      <div className="absolute top-2 left-2">
                        <span className="text-xs px-2 py-1 rounded-full font-bold" style={{ background: "#c9a84c", color: "#0a1628" }}>{project.tag}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs px-2 py-1 rounded-full" style={{ background: "#e0e7ff", color: "#3730a3" }}>{project.type}</span>
                    <h4 className="font-bold text-sm mt-2" style={{ color: "#0a1628" }}>{project.name}</h4>
                    <p className="text-gray-500 text-xs mt-1">📍 {project.location}</p>
                    <p className="font-bold mt-2 text-sm" style={{ color: "#c9a84c" }}>{project.price}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-10">No matching projects found.</p>
        )}
      </div>
    </main>
  );
}
