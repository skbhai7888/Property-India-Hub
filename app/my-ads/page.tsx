"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import PropertyForm from "../../components/PropertyForm";

export default function MyAdsPage() {
  const [user, setUser] = useState<any>(null);
  const [checking, setChecking] = useState(true);
  const [listings, setListings] = useState<any[]>([]);
  const [projectStatuses, setProjectStatuses] = useState<Record<string, string>>({});
  const [showForm, setShowForm] = useState(false);
  const [editingAd, setEditingAd] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) { setChecking(false); return; }
      setUser(data.user);
      setChecking(false);
      loadListings(data.user.id);
    };
    checkAuth();
  }, []);

  const loadListings = async (userId: string) => {
    const { data } = await supabase.from("user_listings").select("*").eq("user_id", userId).order("created_at", { ascending: false });
    setListings(data || []);
    const approvedSlugs = (data || []).filter(l => l.status === "approved").map(l => l.slug);
    if (approvedSlugs.length > 0) {
      const { data: projs } = await supabase.from("projects").select("slug, status").in("slug", approvedSlugs);
      const map: Record<string, string> = {};
      (projs || []).forEach(p => { map[p.slug] = p.status; });
      setProjectStatuses(map);
    }
  };

  const toggleSoldOut = async (slug: string) => {
    const current = projectStatuses[slug];
    const newStatus = current === "sold_out" ? "active" : "sold_out";
    const { error } = await supabase.from("projects").update({ status: newStatus }).eq("slug", slug);
    if (error) { alert("Could not update: " + error.message); return; }
    setProjectStatuses({ ...projectStatuses, [slug]: newStatus });
  };

  const deleteAd = async (id: number) => {
    if (!confirm("Delete this ad permanently?")) return;
    await supabase.from("user_listings").delete().eq("id", id);
    if (user) loadListings(user.id);
  };

  if (checking) return <main className="min-h-screen flex items-center justify-center"><p>Loading...</p></main>;

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pb-20">
        <div className="max-w-sm w-full bg-white p-6 rounded-xl shadow text-center">
          <h1 className="text-xl font-bold mb-2" style={{ color: "#0a1628" }}>Login Required</h1>
          <p className="text-sm text-gray-500 mb-5">Please log in to post and manage your property ads.</p>
          <button onClick={() => router.push("/login")} className="w-full py-3 rounded-lg font-bold text-white" style={{ background: "#0a1628" }}>Login / Register</button>
        </div>
      </main>
    );
  }

  if (editingAd) {
    return (
      <main className="min-h-screen bg-gray-50 p-4 pb-20">
        <div className="max-w-lg mx-auto">
          <button onClick={() => setEditingAd(null)} className="text-sm mb-4 font-bold" style={{ color: "#0a1628" }}>← Back</button>
          <div className="bg-white p-5 rounded-xl shadow">
            <h1 className="text-xl font-bold mb-4" style={{ color: "#0a1628" }}>Edit Ad</h1>
            <PropertyForm mode="user" userId={user.id} editData={editingAd} onSuccess={() => { loadListings(user.id); setTimeout(() => setEditingAd(null), 1800); }} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mt-6 mb-4">
          <h1 className="text-2xl font-bold" style={{ color: "#0a1628" }}>My Ads</h1>
          <button onClick={() => setShowForm(!showForm)} className="text-sm px-4 py-2 rounded-lg font-bold" style={{ background: "#c9a84c", color: "#0a1628" }}>
            {showForm ? "Close" : "+ Post New Ad"}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-5 rounded-xl shadow mb-6">
            <PropertyForm mode="user" userId={user.id} onSuccess={() => loadListings(user.id)} />
          </div>
        )}

        <div className="space-y-3">
          {listings.length === 0 && <p className="text-center text-gray-400 py-10">You haven't posted any ads yet.</p>}
          {listings.map((item) => {
            const projStatus = projectStatuses[item.slug];
            return (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow">
                <div className="flex gap-3">
                  {item.image && <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />}
                  <div className="flex-1">
                    <h3 className="font-bold text-sm" style={{ color: "#0a1628" }}>{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.location}</p>
                    <p className="text-xs font-bold mt-1" style={{ color: "#c9a84c" }}>{item.price}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block font-bold ${
                      item.status === "approved" ? "bg-green-100 text-green-700" :
                      item.status === "rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {item.status === "approved" ? (projStatus === "sold_out" ? "Sold Out" : "Live") : item.status === "rejected" ? "Rejected" : "Pending Review"}
                    </span>
                  </div>
                </div>

                {item.status === "approved" && (
                  <button onClick={() => toggleSoldOut(item.slug)} className="w-full mt-3 text-xs py-2 rounded-lg font-bold text-white" style={{ background: projStatus === "sold_out" ? "#22c55e" : "#f59e0b" }}>
                    {projStatus === "sold_out" ? "Mark Active Again" : "Mark as Sold Out"}
                  </button>
                )}

                {item.status === "rejected" && item.reject_reason && (
                  <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-xs text-red-700"><b>Reason:</b> {item.reject_reason}</p>
                  </div>
                )}
                {item.status === "rejected" && (
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => setEditingAd(item)} className="flex-1 text-xs px-3 py-2 rounded-lg font-bold text-white bg-blue-600">Edit & Resubmit</button>
                    <button onClick={() => deleteAd(item.id)} className="flex-1 text-xs px-3 py-2 rounded-lg font-bold text-white bg-red-600">Delete</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
