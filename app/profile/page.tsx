"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

const CLOUD_NAME = "ruxawtgn";
const UPLOAD_PRESET = "Upload";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const router = useRouter();

  const [form, setForm] = useState({
    name: "", phone: "", upi_id: "", bank_account_holder: "", bank_account_number: "", bank_ifsc: ""
  });

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) { router.push("/login"); return; }
      setUser(data.user);
      const { data: p } = await supabase.from("user_profiles").select("*").eq("id", data.user.id).single();
      setProfile(p);
      setForm({
        name: p?.name || "", phone: p?.phone || "",
        upi_id: p?.upi_id || "", bank_account_holder: p?.bank_account_holder || "",
        bank_account_number: p?.bank_account_number || "", bank_ifsc: p?.bank_ifsc || ""
      });
      setImagePreview(p?.profile_image || "");
      setLoading(false);
    };
    load();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg("");
    try {
      let imageUrl = profile?.profile_image || "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", UPLOAD_PRESET);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: "POST", body: formData });
        const data = await res.json();
        imageUrl = data.secure_url || imageUrl;
      }
      const { error } = await supabase.from("user_profiles").update({
        name: form.name, phone: form.phone, profile_image: imageUrl,
        upi_id: form.upi_id, bank_account_holder: form.bank_account_holder,
        bank_account_number: form.bank_account_number, bank_ifsc: form.bank_ifsc
      }).eq("id", user.id);
      if (error) throw error;
      setMsg("Profile updated successfully!");
      setEditing(false);
      const { data: p } = await supabase.from("user_profiles").select("*").eq("id", user.id).single();
      setProfile(p);
      setTimeout(() => setMsg(""), 3000);
    } catch (err: any) {
      setMsg("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) return <main className="min-h-screen flex items-center justify-center"><p>Loading...</p></main>;

  const initial = (profile?.name?.[0] || user?.email?.[0] || "?").toUpperCase();

  return (
    <main className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-lg mx-auto">
        <div className="bg-white p-6 rounded-xl shadow mt-6 text-center">
          <div className="relative w-20 h-20 mx-auto mb-3">
            {imagePreview ? (
              <img src={imagePreview} className="w-20 h-20 rounded-full object-cover" />
            ) : (
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{ background: "#0a1628" }}>{initial}</div>
            )}
            {editing && (
              <label className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow cursor-pointer border">
                <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                <span className="text-xs">📷</span>
              </label>
            )}
          </div>

          {!editing ? (
            <>
              <h1 className="text-lg font-bold" style={{ color: "#0a1628" }}>{profile?.name || "No name set"}</h1>
              <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
              {profile?.phone && <p className="text-sm text-gray-500">📞 {profile.phone}</p>}
            </>
          ) : (
            <div className="space-y-2 text-left mt-3">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="w-full border rounded-lg px-3 py-2 text-sm" />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
          )}

          <div className="mt-4 flex justify-center gap-2 flex-wrap">
            <span className="text-xs px-3 py-1 rounded-full font-bold" style={{ background: "#e0e7ff", color: "#3730a3" }}>
              {profile?.role === "partner" ? "Partner" : profile?.role === "admin" ? "Admin" : "User"}
            </span>
            {profile?.role === "partner" && (
              <span className={`text-xs px-3 py-1 rounded-full font-bold ${profile.partner_active === false ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                {profile.partner_active === false ? "Deactivated" : "Active Partner"}
              </span>
            )}
          </div>

          {msg && <p className={`text-sm font-bold mt-4 ${msg.startsWith("Error") ? "text-red-600" : "text-green-600"}`}>{msg}</p>}

          {profile?.role === "admin" && !editing && (
            <a href="/admin" className="block mb-3 py-3 rounded-lg font-bold text-white text-center" style={{ background: "#0a1628" }}>Go to Admin Dashboard</a>
          )}
          <button onClick={() => editing ? handleSave() : setEditing(true)} disabled={saving} className="mt-5 w-full py-3 rounded-lg font-bold text-white" style={{ background: "#c9a84c", color: "#0a1628" }}>
            {saving ? "Saving..." : editing ? "Save Changes" : "Edit Profile"}
          </button>
          {editing && (
            <button onClick={() => setEditing(false)} className="mt-2 w-full py-2 rounded-lg font-bold bg-gray-200 text-sm">Cancel</button>
          )}
        </div>

        {profile?.role === "partner" && (
          <div className="bg-white p-5 rounded-xl shadow mt-4">
            <h2 className="font-bold mb-3" style={{ color: "#0a1628" }}>Partner Application Details</h2>
            <div className="space-y-1 text-sm text-gray-600">
              <p><b>City:</b> {profile.partner_city || "N/A"}</p>
              <p><b>Experience:</b> {profile.partner_experience || "N/A"}</p>
              <p><b>Reason to Join:</b> {profile.partner_reason || "N/A"}</p>
              {profile.referral_code && <p><b>Referral Code:</b> <span style={{ color: "#c9a84c" }}>{profile.referral_code}</span></p>}
            </div>
          </div>
        )}

        {profile?.role === "partner" && (
          <div className="bg-white p-5 rounded-xl shadow mt-4">
            <h2 className="font-bold mb-3" style={{ color: "#0a1628" }}>Commission Payout Details</h2>
            <p className="text-xs text-gray-400 mb-3">Add your UPI or bank details so we can send your commission payments.</p>
            {editing ? (
              <div className="space-y-2">
                <input name="upi_id" value={form.upi_id} onChange={handleChange} placeholder="UPI ID (e.g. name@upi)" className="w-full border rounded-lg px-3 py-2 text-sm" />
                <input name="bank_account_holder" value={form.bank_account_holder} onChange={handleChange} placeholder="Account Holder Name" className="w-full border rounded-lg px-3 py-2 text-sm" />
                <input name="bank_account_number" value={form.bank_account_number} onChange={handleChange} placeholder="Bank Account Number" className="w-full border rounded-lg px-3 py-2 text-sm" />
                <input name="bank_ifsc" value={form.bank_ifsc} onChange={handleChange} placeholder="IFSC Code" className="w-full border rounded-lg px-3 py-2 text-sm" />
              </div>
            ) : (
              <div className="space-y-1 text-sm text-gray-600">
                <p><b>UPI ID:</b> {profile.upi_id || "Not added"}</p>
                <p><b>Account Holder:</b> {profile.bank_account_holder || "Not added"}</p>
                <p><b>Account Number:</b> {profile.bank_account_number || "Not added"}</p>
                <p><b>IFSC:</b> {profile.bank_ifsc || "Not added"}</p>
              </div>
            )}
          </div>
        )}

        <button onClick={handleLogout} className="mt-4 w-full py-3 rounded-lg font-bold text-white bg-red-600">Logout</button>
      </div>
    </main>
  );
}
