"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

const SITE_URL = "https://property-india-hub.vercel.app";

export default function PartnerPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [checking, setChecking] = useState(true);
  const [applying, setApplying] = useState(false);
  const [leads, setLeads] = useState(0);
  const [commissions, setCommissions] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({ name: "", phone: "", city: "", experience: "Fresher", reason: "" });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) { setChecking(false); return; }
    setUser(data.user);
    const { data: p } = await supabase.from("user_profiles").select("*").eq("id", data.user.id).single();
    setProfile(p);
    setForm({ name: p?.name || "", phone: p?.phone || "", city: "", experience: "Fresher", reason: "" });
    setChecking(false);
    if (p?.role === "partner") {
      loadLeadsAndCommissions(data.user.id);
    }
  };

  const loadLeadsAndCommissions = async (userId: string) => {
    const { count } = await supabase.from("referral_leads").select("*", { count: "exact", head: true }).eq("partner_id", userId);
    setLeads(count || 0);
    const { data } = await supabase.from("partner_commissions").select("*").eq("partner_id", userId).order("created_at", { ascending: false });
    setCommissions(data || []);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const applyForPartner = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!termsAccepted) {
      setError("Please accept the Partner Terms & Conditions to continue.");
      return;
    }
    setApplying(true);
    await supabase.from("user_profiles").update({
      name: form.name,
      phone: form.phone,
      partner_city: form.city,
      partner_experience: form.experience,
      partner_reason: form.reason,
      terms_accepted: true,
      partner_status: "pending"
    }).eq("id", user.id);
    setApplying(false);
    checkUser();
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`${SITE_URL}/?ref=${profile.referral_code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (checking) return <main className="min-h-screen flex items-center justify-center"><p>Loading...</p></main>;

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pb-20">
        <div className="max-w-sm w-full bg-white p-6 rounded-xl shadow text-center">
          <h1 className="text-xl font-bold mb-2" style={{ color: "#0a1628" }}>Become Our Partner</h1>
          <p className="text-sm text-gray-500 mb-5">Login required to apply as a broker/partner and earn commissions.</p>
          <button onClick={() => router.push("/login")} className="w-full py-3 rounded-lg font-bold text-white" style={{ background: "#0a1628" }}>Login / Register</button>
        </div>
      </main>
    );
  }

  const totalCommission = commissions.reduce((sum, c) => sum + Number(c.amount), 0);

  return (
    <main className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mt-6 mb-4" style={{ color: "#0a1628" }}>Partner Program</h1>

        {(!profile?.partner_status || profile.partner_status === "none" || profile.partner_status === "rejected") && (
          <form onSubmit={applyForPartner} className="bg-white p-6 rounded-xl shadow space-y-3">
            <h2 className="font-bold text-lg mb-1" style={{ color: "#0a1628" }}>Channel Partner Application</h2>
            <p className="text-sm text-gray-500 mb-3">Fill in your details to apply. Our team will review and approve within 24-48 hours.</p>

            {profile?.partner_status === "rejected" && profile.partner_reject_reason && (
              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3">
                <p className="text-sm text-red-700"><b>Previous application rejected:</b> {profile.partner_reject_reason}</p>
              </div>
            )}
            {error && <p className="text-red-600 text-sm font-bold">{error}</p>}

            <input name="name" value={form.name} onChange={handleFormChange} placeholder="Full Name" required className="w-full border rounded-lg px-3 py-2" />
            <input name="phone" value={form.phone} onChange={handleFormChange} placeholder="Phone Number" required className="w-full border rounded-lg px-3 py-2" />
            <input name="city" value={form.city} onChange={handleFormChange} placeholder="City / Area of Operation" required className="w-full border rounded-lg px-3 py-2" />
            <select name="experience" value={form.experience} onChange={handleFormChange} className="w-full border rounded-lg px-3 py-2">
              <option value="Fresher">Fresher (No prior experience)</option>
              <option value="1-3 years">1–3 years in real estate</option>
              <option value="3+ years">3+ years in real estate</option>
            </select>
            <textarea name="reason" value={form.reason} onChange={handleFormChange} placeholder="Why do you want to join as a partner?" rows={3} className="w-full border rounded-lg px-3 py-2" />

            <div className="bg-gray-50 border rounded-lg p-3">
              <button type="button" onClick={() => setShowTerms(!showTerms)} className="text-sm font-bold underline" style={{ color: "#0a1628" }}>
                {showTerms ? "Hide" : "Read"} Partner Terms & Conditions
              </button>
              {showTerms && (
                <div className="text-xs text-gray-600 mt-2 space-y-1">
                  <p>1. Partner will only share official project listings via their referral link.</p>
                  <p>2. Commission is paid only after a deal is confirmed and payment is received by Property India Hub.</p>
                  <p>3. Property India Hub reserves the right to approve, reject, or suspend any partner account at its discretion.</p>
                  <p>4. Partners must not misrepresent themselves as employees of Property India Hub.</p>
                  <p>5. Commission rates and terms may be revised by Property India Hub at any time with prior notice.</p>
                </div>
              )}
              <label className="flex items-start gap-2 mt-3 text-sm">
                <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-1" />
                <span>I have read and agree to the Partner Terms & Conditions.</span>
              </label>
            </div>

            <button type="submit" disabled={applying} className="w-full py-3 rounded-lg font-bold text-white" style={{ background: "#c9a84c", color: "#0a1628" }}>
              {applying ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        )}

        {profile?.partner_status === "pending" && (
          <div className="bg-yellow-50 border-2 border-yellow-400 p-6 rounded-xl text-center">
            <p className="font-bold text-yellow-700">Your application is under review</p>
            <p className="text-sm text-yellow-600 mt-1">Admin will approve your partner account soon.</p>
          </div>
        )}

        {profile?.role === "partner" && (
          <>
            <div className="bg-white p-5 rounded-xl shadow mb-4">
              <p className="text-sm font-bold mb-2" style={{ color: "#0a1628" }}>Your Referral Link</p>
              <div className="flex gap-2">
                <input readOnly value={`${SITE_URL}/?ref=${profile.referral_code}`} className="flex-1 border rounded-lg px-3 py-2 text-xs bg-gray-50" />
                <button onClick={copyLink} className="px-4 py-2 rounded-lg font-bold text-white text-sm" style={{ background: "#0a1628" }}>{copied ? "Copied!" : "Copy"}</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white p-4 rounded-xl shadow text-center">
                <p className="text-2xl font-bold" style={{ color: "#c9a84c" }}>{leads}</p>
                <p className="text-xs text-gray-500">Total Leads</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow text-center">
                <p className="text-2xl font-bold" style={{ color: "#22c55e" }}>₹{totalCommission.toLocaleString("en-IN")}</p>
                <p className="text-xs text-gray-500">Total Commission Earned</p>
              </div>
            </div>

            <h2 className="font-bold mb-2" style={{ color: "#0a1628" }}>Commission History</h2>
            <div className="space-y-2">
              {commissions.length === 0 && <p className="text-gray-400 text-sm bg-white p-4 rounded-xl shadow">No commissions recorded yet.</p>}
              {commissions.map((c) => (
                <div key={c.id} className="bg-white p-3 rounded-xl shadow flex justify-between items-center">
                  <div>
                    <p className="font-bold text-sm" style={{ color: "#0a1628" }}>₹{Number(c.amount).toLocaleString("en-IN")}</p>
                    {c.note && <p className="text-xs text-gray-500">{c.note}</p>}
                  </div>
                  <p className="text-xs text-gray-400">{new Date(c.created_at).toLocaleDateString("en-IN")}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
