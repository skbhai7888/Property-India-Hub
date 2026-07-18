"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import SiteVisitsPanel from "./SiteVisitsPanel";

export default function AdminDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [pendingAds, setPendingAds] = useState<any[]>([]);
  const [approvedAds, setApprovedAds] = useState<any[]>([]);
  const [rejectedAds, setRejectedAds] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(true);
  const [actionMsg, setActionMsg] = useState("");
  const [actionError, setActionError] = useState("");
  const [view, setView] = useState<"main" | "allUsers" | "normalUsers" | "partners" | "userAds" | "pendingList" | "approvedList" | "rejectedList" | "partnerPending" | "partnerRejected" | "siteVisits">("main");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedUserAds, setSelectedUserAds] = useState<any[]>([]);
  const [reviewAd, setReviewAd] = useState<any>(null);
  const [showRejectBox, setShowRejectBox] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [fullscreenImg, setFullscreenImg] = useState<string | null>(null);
  const [reviewPartner, setReviewPartner] = useState<any>(null);
  const [showPartnerRejectBox, setShowPartnerRejectBox] = useState(false);
  const [partnerRejectReason, setPartnerRejectReason] = useState("");
  const [commissionAmount, setCommissionAmount] = useState("");
  const [commissionNote, setCommissionNote] = useState("");
  const [promoteEmail, setPromoteEmail] = useState("");
  const [promoteMsg, setPromoteMsg] = useState("");
  const [admins, setAdmins] = useState<any[]>([]);
  const [selectedPerms, setSelectedPerms] = useState<string[]>([]);

  async function handlePromote() {
    if (!promoteEmail) return;
    const permsObj: Record<string, boolean> = {};
    selectedPerms.forEach(p => { permsObj[p] = true; });
    const { data, error } = await supabase.rpc("promote_to_admin_with_permissions", { target_email: promoteEmail, perms: permsObj });
    if (error) { setPromoteMsg("Error: " + error.message); return; }
    setPromoteMsg(data);
    setPromoteEmail("");
    setSelectedPerms([]);
    loadAdmins();
  }

  function togglePerm(perm: string) {
    setSelectedPerms(prev => prev.includes(perm) ? prev.filter(p => p !== perm) : [...prev, perm]);
  }

  async function loadAdmins() {
    const { data } = await supabase.from("user_profiles").select("id, name, phone, role").eq("role", "admin");
    setAdmins(data || []);
  }

  async function handleDemote(id: string) {
    if (!confirm("Are you sure you want to remove admin access for this user?")) return;
    const { data, error } = await supabase.rpc("demote_admin_by_id", { target_id: id });
    if (error) { alert("Error: " + error.message); return; }
    loadAdmins();
  }
  const router = useRouter();

  useEffect(() => {
    checkAdminAndLoad();
  }, []);

  const checkAdminAndLoad = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    const { data: profile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== "admin") { router.push("/"); return; }
    setChecking(false);
    loadAdmins();
    loadAll();
  };

  const attachNames = async (ads: any[]) => {
    const userIds = [...new Set(ads.map(a => a.user_id))];
    if (userIds.length === 0) return ads;
    const { data: profiles } = await supabase.from("user_profiles").select("id, name, phone").in("id", userIds);
    return ads.map(ad => {
      const p = profiles?.find(p => p.id === ad.user_id);
      return { ...ad, poster_name: p?.name || "No name" };
    });
  };

  const loadAll = async () => {
    loadProjects();
    loadPendingAds();
    loadApprovedAds();
    loadRejectedAds();
    loadAllUsers();
  };

  const loadProjects = async () => {
    const { data } = await supabase.from("projects").select("*").order("id");
    setProjects(data || []);
    setLoading(false);
  };

  const loadPendingAds = async () => {
    const { data } = await supabase.from("user_listings").select("*").eq("status", "pending").order("created_at", { ascending: false });
    setPendingAds(await attachNames(data || []));
  };

  const loadApprovedAds = async () => {
    const { data } = await supabase.from("user_listings").select("*").eq("status", "approved").order("created_at", { ascending: false });
    setApprovedAds(await attachNames(data || []));
  };

  const loadRejectedAds = async () => {
    const { data } = await supabase.from("user_listings").select("*").eq("status", "rejected").order("created_at", { ascending: false });
    setRejectedAds(await attachNames(data || []));
  };

  const loadAllUsers = async () => {
    const { data } = await supabase.from("user_profiles").select("*").order("id");
    setAllUsers(data || []);
  };

  const loadUserAds = async (user: any) => {
    setSelectedUser(user);
    const { data } = await supabase.from("user_listings").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
    setSelectedUserAds(data || []);
    setView("userAds");
  };

  const toggleSoldOutBySlug = async (slug: string, currentStatus: string) => {
    const newStatus = currentStatus === "sold_out" ? "active" : "sold_out";
    await supabase.from("projects").update({ status: newStatus }).eq("slug", slug);
    loadAll();
  };

  const toggleSoldOut = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "sold_out" ? "active" : "sold_out";
    await supabase.from("projects").update({ status: newStatus }).eq("id", id);
    loadProjects();
  };

  const deleteProject = async (id: number, name: string) => {
    if (!confirm(`Kya aap sach mein "${name}" ko delete karna chahte hain?`)) return;
    await supabase.from("projects").delete().eq("id", id);
    loadProjects();
  };

  const deleteApprovedAd = async (ad: any) => {
    if (!confirm(`Delete "${ad.name}" permanently? It will be removed from the live website too.`)) return;
    await supabase.from("projects").delete().eq("slug", ad.slug);
    await supabase.from("user_listings").delete().eq("id", ad.id);
    setActionMsg("Ad and project deleted permanently.");
    loadAll();
    setTimeout(() => setActionMsg(""), 3000);
  };

  const approveAd = async (ad: any) => {
    setActionMsg(""); setActionError("");
    let finalSlug = ad.slug;
    const { data: existing } = await supabase.from("projects").select("slug").eq("slug", finalSlug).single();
    if (existing) finalSlug = `${ad.slug}-${Date.now().toString().slice(-4)}`;

    const { error: insertErr } = await supabase.from("projects").insert({
      slug: finalSlug, name: ad.name, title: ad.title, location: ad.location,
      price: ad.price, tag: ad.tag, type: ad.type, builder: ad.builder,
      rera: ad.rera, region: ad.region, map_link: ad.map_link,
      description: ad.description, sizes: ad.sizes, amenities: ad.amenities,
      highlights: ad.highlights, payment: ad.payment,
      image: ad.image, gallery_images: ad.gallery_images, video_url: ad.video_url,
      status: "active", source: "user", user_id: ad.user_id
    });
    if (insertErr) { setActionError("Insert failed: " + insertErr.message); return; }

    const { error: updateErr } = await supabase.from("user_listings").update({ status: "approved", approved_at: new Date().toISOString(), slug: finalSlug }).eq("id", ad.id);
    if (updateErr) { setActionError("Status update failed: " + updateErr.message); return; }

    setActionMsg("Ad approved and published live!");
    setReviewAd(null);
    loadAll();
    setTimeout(() => setActionMsg(""), 3000);
  };

  const confirmRejectAd = async () => {
    setActionError("");
    if (!rejectReason.trim()) { alert("Please enter a reason for rejection."); return; }
    const { error } = await supabase.from("user_listings").update({ status: "rejected", reject_reason: rejectReason }).eq("id", reviewAd.id);
    if (error) { setActionError("Reject failed: " + error.message); return; }
    setActionMsg("Ad rejected with feedback sent to user.");
    setReviewAd(null);
    setShowRejectBox(false);
    setRejectReason("");
    loadAll();
    setTimeout(() => setActionMsg(""), 3000);
  };

  const deleteAd = async (ad: any) => {
    if (!confirm(`Delete "${ad.name}" permanently?`)) return;
    if (ad.status === "approved") {
      await supabase.from("projects").delete().eq("slug", ad.slug);
    }
    const { error } = await supabase.from("user_listings").delete().eq("id", ad.id);
    if (error) { setActionError("Delete failed: " + error.message); return; }
    setActionMsg("Ad deleted permanently.");
    setReviewAd(null);
    loadAll();
    setTimeout(() => setActionMsg(""), 3000);
  };

  const approvePartner = async (p: any) => {
    setActionError("");
    const code = "PIH" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const { error } = await supabase.from("user_profiles").update({ role: "partner", partner_status: "approved", referral_code: code }).eq("id", p.id);
    if (error) { setActionError("Approve failed: " + error.message); return; }
    setActionMsg("Partner approved! Referral code generated.");
    setReviewPartner(null);
    loadAllUsers();
    setTimeout(() => setActionMsg(""), 3000);
  };

  const confirmRejectPartner = async () => {
    setActionError("");
    if (!partnerRejectReason.trim()) { alert("Please enter a reason."); return; }
    const { error } = await supabase.from("user_profiles").update({ partner_status: "rejected", partner_reject_reason: partnerRejectReason }).eq("id", reviewPartner.id);
    if (error) { setActionError("Reject failed: " + error.message); return; }
    setActionMsg("Partner application rejected.");
    setReviewPartner(null);
    setShowPartnerRejectBox(false);
    setPartnerRejectReason("");
    loadAllUsers();
    setTimeout(() => setActionMsg(""), 3000);
  };

  const deletePartnerApplication = async (p: any) => {
    if (!confirm(`Delete this rejected partner application for "${p.name}"? This clears their partner status.`)) return;
    const { error } = await supabase.from("user_profiles").update({ partner_status: "none", partner_reject_reason: null, partner_city: null, partner_experience: null, partner_reason: null, terms_accepted: false }).eq("id", p.id);
    if (error) { setActionError("Delete failed: " + error.message); return; }
    setActionMsg("Partner application cleared.");
    loadAllUsers();
    setTimeout(() => setActionMsg(""), 3000);
  };

  const addCommission = async (partnerId: string) => {
    if (!commissionAmount || isNaN(Number(commissionAmount))) { alert("Enter a valid amount."); return; }
    await supabase.from("partner_commissions").insert({ partner_id: partnerId, amount: Number(commissionAmount), note: commissionNote });
    setCommissionAmount("");
    setCommissionNote("");
    setActionMsg("Commission added.");
    setTimeout(() => setActionMsg(""), 3000);
  };

  const togglePartnerActive = async (p: any) => {
    const newActive = p.partner_active === false ? true : false;
    const { error } = await supabase.from("user_profiles").update({ partner_active: newActive }).eq("id", p.id);
    if (error) { setActionError("Update failed: " + error.message); return; }
    setActionMsg(newActive ? "Partner activated." : "Partner deactivated.");
    loadAllUsers();
    setTimeout(() => setActionMsg(""), 3000);
  };

  const deletePartnerAccount = async (p: any) => {
    if (!confirm(`Remove "${p.name}" as a partner? Their account will become a normal user.`)) return;
    const { error } = await supabase.from("user_profiles").update({
      role: "user", partner_status: "none", referral_code: null, partner_active: true,
      partner_city: null, partner_experience: null, partner_reason: null, terms_accepted: false
    }).eq("id", p.id);
    if (error) { setActionError("Delete failed: " + error.message); return; }
    setActionMsg("Partner removed.");
    loadAllUsers();
    setTimeout(() => setActionMsg(""), 3000);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (checking) return <div className="p-8 text-center">Checking access...</div>;
  if (loading) return <div className="p-8 text-center">Loading...</div>;

  const normalUsers = allUsers.filter(u => u.role === "user" && (!u.partner_status || u.partner_status === "none"));
  const partners = allUsers.filter(u => u.role === "partner");
  const partnerPendingList = allUsers.filter(u => u.partner_status === "pending");
  const partnerRejectedList = allUsers.filter(u => u.partner_status === "rejected");

  const projectBySlug = (slug: string) => projects.find(p => p.slug === slug);

  if (fullscreenImg) {
    return (
      <div className="fixed inset-0 bg-black z-[200] flex items-center justify-center">
        <button onClick={() => setFullscreenImg(null)} className="absolute top-4 right-4 text-white bg-black/60 rounded-full w-10 h-10 flex items-center justify-center text-xl z-10">✕</button>
        <img src={fullscreenImg} className="max-w-full max-h-full object-contain" />
      </div>
    );
  }

  if (reviewPartner) {
    return (
      <main className="min-h-screen bg-gray-50 p-4 pb-20">
        <div className="max-w-lg mx-auto bg-white p-5 rounded-xl shadow mt-4">
          <button onClick={() => { setReviewPartner(null); setShowPartnerRejectBox(false); setActionError(""); }} className="text-sm mb-4 font-bold" style={{color: "#0a1628"}}>← Back</button>
          <h1 className="text-xl font-bold mb-3" style={{color: "#0a1628"}}>Partner Details</h1>
          {actionError && <div className="mb-3 p-3 rounded-lg bg-red-50 border-2 border-red-500 text-red-700 text-sm font-bold">{actionError}</div>}
          <div className="space-y-2 text-sm">
            <p><b>Name:</b> {reviewPartner.name}</p>
            <p><b>Phone:</b> {reviewPartner.phone}</p>
            <p><b>City:</b> {reviewPartner.partner_city}</p>
            <p><b>Experience:</b> {reviewPartner.partner_experience}</p>
            <p><b>Reason to join:</b> {reviewPartner.partner_reason}</p>
            <p><b>Terms Accepted:</b> {reviewPartner.terms_accepted ? "Yes" : "No"}</p>
                <p className="pt-2 border-t"><b>UPI ID:</b> {reviewPartner.upi_id || "Not added"}</p>
                <p><b>Account Holder:</b> {reviewPartner.bank_account_holder || "Not added"}</p>
                <p><b>Account Number:</b> {reviewPartner.bank_account_number || "Not added"}</p>
                <p><b>IFSC:</b> {reviewPartner.bank_ifsc || "Not added"}</p>
            <p><b>Status:</b> {reviewPartner.partner_status}</p>
            {reviewPartner.referral_code && <p><b>Referral Code:</b> {reviewPartner.referral_code}</p>}
            {reviewPartner.partner_status === "rejected" && reviewPartner.partner_reject_reason && (
              <p className="text-red-600"><b>Rejection Reason:</b> {reviewPartner.partner_reject_reason}</p>
            )}
          </div>

          {showPartnerRejectBox && (
            <div className="mt-4 p-3 bg-red-50 border-2 border-red-300 rounded-lg">
              <label className="text-sm font-bold text-red-700">Reason for rejection</label>
              <textarea value={partnerRejectReason} onChange={(e) => setPartnerRejectReason(e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-2 text-sm" />
              <div className="flex gap-2 mt-2">
                <button onClick={confirmRejectPartner} className="flex-1 py-2 rounded-lg font-bold text-white bg-red-600 text-sm">Confirm Reject</button>
                <button onClick={() => setShowPartnerRejectBox(false)} className="flex-1 py-2 rounded-lg font-bold bg-gray-200 text-sm">Cancel</button>
              </div>
            </div>
          )}

          {!showPartnerRejectBox && reviewPartner.partner_status === "pending" && (
            <div className="flex gap-2 mt-5">
              <button onClick={() => approvePartner(reviewPartner)} className="flex-1 py-3 rounded-lg font-bold text-white" style={{background: "#22c55e"}}>Approve</button>
              <button onClick={() => setShowPartnerRejectBox(true)} className="flex-1 py-3 rounded-lg font-bold text-white bg-red-600">Reject</button>
            </div>
          )}

          {!showPartnerRejectBox && reviewPartner.partner_status === "rejected" && (
            <div className="mt-5">
              <button onClick={() => deletePartnerApplication(reviewPartner)} className="w-full py-3 rounded-lg font-bold text-white bg-gray-600">🗑 Delete Application</button>
            </div>
          )}

          {reviewPartner.role === "partner" && (
            <div className="mt-5 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-bold mb-2" style={{color: "#0a1628"}}>Add Commission</p>
              <input type="number" placeholder="Amount (₹)" value={commissionAmount} onChange={(e) => setCommissionAmount(e.target.value)} className="w-full border rounded-lg px-3 py-2 mb-2 text-sm" />
              <input placeholder="Note" value={commissionNote} onChange={(e) => setCommissionNote(e.target.value)} className="w-full border rounded-lg px-3 py-2 mb-2 text-sm" />
              <button onClick={() => addCommission(reviewPartner.id)} className="w-full py-2 rounded-lg font-bold text-white text-sm" style={{background: "#0a1628"}}>Add Commission Entry</button>
            </div>
          )}
        </div>
      </main>
    );
  }

  if (view === "partnerPending" || view === "partnerRejected") {
    const list = view === "partnerPending" ? partnerPendingList : partnerRejectedList;
    return (
      <main className="min-h-screen bg-gray-50 p-4 pb-20">
        <div className="max-w-lg mx-auto">
          <button onClick={() => setView("main")} className="text-sm mb-4 font-bold" style={{color: "#0a1628"}}>← Back to Dashboard</button>
          <h1 className="text-xl font-bold mb-4" style={{color: "#0a1628"}}>{view === "partnerPending" ? "Pending Partner Applications" : "Rejected Partner Applications"} ({list.length})</h1>
          {actionError && <div className="mb-3 p-3 rounded-lg bg-red-50 border-2 border-red-500 text-red-700 text-sm font-bold">{actionError}</div>}
          <div className="space-y-2">
            {list.length === 0 && <p className="text-gray-400 text-sm">No applications found.</p>}
            {list.map((p) => (
              <div key={p.id} className="w-full bg-white p-4 rounded-xl shadow flex justify-between items-center gap-2">
                <button onClick={() => setReviewPartner(p)} className="flex-1 text-left">
                  <p className="font-bold text-sm" style={{color: "#0a1628"}}>{p.name || "No name"}</p>
                  <p className="text-xs text-gray-500">{p.phone} | {p.partner_city}</p>
                </button>
                {view === "partnerRejected" && (
                  <button onClick={() => deletePartnerApplication(p)} className="text-xs px-3 py-2 rounded-lg font-bold text-white bg-red-600 shrink-0">Delete</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (reviewAd) {
    const allImages = [reviewAd.image, ...(reviewAd.gallery_images ? reviewAd.gallery_images.split("|").filter(Boolean) : [])];
    return (
      <main className="min-h-screen bg-gray-50 p-4 pb-20">
        <div className="max-w-lg mx-auto bg-white p-5 rounded-xl shadow mt-4">
          <button onClick={() => { setReviewAd(null); setShowRejectBox(false); setActionError(""); }} className="text-sm mb-4 font-bold" style={{color: "#0a1628"}}>← Back</button>
          <h1 className="text-xl font-bold mb-3" style={{color: "#0a1628"}}>Review Ad</h1>
          {actionError && <div className="mb-3 p-3 rounded-lg bg-red-50 border-2 border-red-500 text-red-700 text-sm font-bold">{actionError}</div>}
          <div className="flex overflow-x-auto gap-2 snap-x snap-mandatory mb-2 rounded-lg" style={{ scrollSnapType: "x mandatory" }}>
            {allImages.filter(Boolean).map((src: string, i: number) => (
              <img key={i} src={src} onClick={() => setFullscreenImg(src)} className="w-full aspect-square object-cover rounded-lg shrink-0 snap-center" style={{ scrollSnapAlign: "center" }} />
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto mb-3">
            {allImages.filter(Boolean).map((src: string, i: number) => (
              <img key={i} src={src} onClick={() => setFullscreenImg(src)} className="w-16 h-16 object-cover rounded-lg shrink-0" />
            ))}
          </div>
          {reviewAd.video_url && <video src={reviewAd.video_url} controls className="w-full rounded-lg mb-3" />}
          <div className="space-y-2 text-sm">
            <p><b>Name:</b> {reviewAd.name}</p>
            <p><b>Title:</b> {reviewAd.title}</p>
            <p><b>Location:</b> {reviewAd.location}</p>
            <p><b>Price:</b> {reviewAd.price}</p>
            <p><b>Type:</b> {reviewAd.type}</p>
            <p><b>Tag:</b> {reviewAd.tag}</p>
            <p><b>Builder:</b> {reviewAd.builder}</p>
            <p><b>RERA:</b> {reviewAd.rera}</p>
            <p><b>Region:</b> {reviewAd.region}</p>
            <p><b>Description:</b> {reviewAd.description}</p>
            <p><b>Sizes:</b> {reviewAd.sizes}</p>
            <p><b>Amenities:</b> {reviewAd.amenities}</p>
            <p><b>Highlights:</b> {reviewAd.highlights}</p>
            <p><b>Payment:</b> {reviewAd.payment}</p>
            <p className="pt-2 border-t"><b>Posted by:</b> {reviewAd.poster_name}</p>
            <p><b>Contact Phone:</b> {reviewAd.phone}</p>
            {reviewAd.status === "rejected" && reviewAd.reject_reason && (
              <p className="text-red-600"><b>Rejection Reason:</b> {reviewAd.reject_reason}</p>
            )}
          </div>
          {showRejectBox && (
            <div className="mt-4 p-3 bg-red-50 border-2 border-red-300 rounded-lg">
              <label className="text-sm font-bold text-red-700">Reason for rejection</label>
              <textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-2 text-sm" />
              <div className="flex gap-2 mt-2">
                <button onClick={confirmRejectAd} className="flex-1 py-2 rounded-lg font-bold text-white bg-red-600 text-sm">Confirm Reject</button>
                <button onClick={() => setShowRejectBox(false)} className="flex-1 py-2 rounded-lg font-bold bg-gray-200 text-sm">Cancel</button>
              </div>
            </div>
          )}
          {!showRejectBox && (
            <div className="flex gap-2 mt-5">
              {reviewAd.status === "pending" && (
                <>
                  <button onClick={() => approveAd(reviewAd)} className="flex-1 py-3 rounded-lg font-bold text-white" style={{background: "#22c55e"}}>Approve & Publish</button>
                  <button onClick={() => setShowRejectBox(true)} className="flex-1 py-3 rounded-lg font-bold text-white bg-red-600">Reject</button>
                </>
              )}
              <button onClick={() => deleteAd(reviewAd)} className="px-4 py-3 rounded-lg font-bold text-white bg-gray-600">🗑 Delete</button>
            </div>
          )}
        </div>
      </main>
    );
  }

  if (view === "siteVisits") {
    return (
      <div className="min-h-screen" style={{background: "#f8f9fa"}}>
        <div className="max-w-4xl mx-auto p-4">
          <button onClick={() => setView("main")} className="text-sm font-bold mb-4" style={{color: "#0a1628"}}>← Back to Dashboard</button>
          <SiteVisitsPanel />
        </div>
      </div>
    );
  }

  if (view === "pendingList" || view === "rejectedList") {
    const list = view === "pendingList" ? pendingAds : rejectedAds;
    const title = view === "pendingList" ? "All Pending Ads" : "All Rejected Ads";
    return (
      <main className="min-h-screen bg-gray-50 p-4 pb-20">
        <div className="max-w-lg mx-auto">
          <button onClick={() => setView("main")} className="text-sm mb-4 font-bold" style={{color: "#0a1628"}}>← Back to Dashboard</button>
          <h1 className="text-xl font-bold mb-4" style={{color: "#0a1628"}}>{title} ({list.length})</h1>
          {actionError && <div className="mb-3 p-3 rounded-lg bg-red-50 border-2 border-red-500 text-red-700 text-sm font-bold">{actionError}</div>}
          <div className="space-y-3">
            {list.length === 0 && <p className="text-gray-400 text-sm">No ads found.</p>}
            {list.map((ad) => (
              <div key={ad.id} className="bg-white p-4 rounded-xl shadow flex gap-3">
                {ad.image && <img src={ad.image} className="w-16 h-16 object-cover rounded-lg" />}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm">{ad.name}</h3>
                  <p className="text-xs text-gray-500">{ad.location}</p>
                  <p className="text-xs text-gray-400">By: {ad.poster_name} | {ad.phone}</p>
                  {view === "rejectedList" && ad.reject_reason && (
                    <p className="text-xs text-red-600 mt-1">Reason: {ad.reject_reason}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1 shrink-0">
                  <button onClick={() => setReviewAd(ad)} className="text-xs px-3 py-2 rounded-lg font-bold" style={{background: "#c9a84c", color: "#0a1628"}}>View</button>
                  <button onClick={() => deleteAd(ad)} className="text-xs px-3 py-2 rounded-lg font-bold text-white bg-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (view === "approvedList") {
    return (
      <main className="min-h-screen bg-gray-50 p-4 pb-20">
        <div className="max-w-lg mx-auto">
          <button onClick={() => setView("main")} className="text-sm mb-4 font-bold" style={{color: "#0a1628"}}>← Back to Dashboard</button>
          <h1 className="text-xl font-bold mb-4" style={{color: "#0a1628"}}>All Live Ads ({approvedAds.length})</h1>
          {actionError && <div className="mb-3 p-3 rounded-lg bg-red-50 border-2 border-red-500 text-red-700 text-sm font-bold">{actionError}</div>}
          <div className="space-y-3">
            {approvedAds.length === 0 && <p className="text-gray-400 text-sm">No live ads found.</p>}
            {approvedAds.map((ad) => {
              const proj = projectBySlug(ad.slug);
              return (
                <div key={ad.id} className="bg-white p-4 rounded-xl shadow">
                  <div className="flex gap-3 mb-3">
                    {ad.image && <img src={ad.image} className="w-16 h-16 object-cover rounded-lg" />}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm">{ad.name}</h3>
                      <p className="text-xs text-gray-500">{ad.location}</p>
                      <p className="text-xs text-gray-400">By: {ad.poster_name} | {ad.phone}</p>
                      {proj && (
                        <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${proj.status === 'sold_out' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                          {proj.status === 'sold_out' ? 'Sold Out' : 'Active'}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a href={`/admin/edit-project/${ad.slug}`} className="flex-1 text-center text-xs px-3 py-2 rounded-lg font-bold text-white bg-blue-600">Edit</a>
                    {proj && (
                      <button onClick={() => toggleSoldOutBySlug(ad.slug, proj.status)} className="flex-1 text-xs px-3 py-2 rounded-lg font-bold text-white" style={{background: proj.status === 'sold_out' ? '#22c55e' : '#f59e0b'}}>
                        {proj.status === 'sold_out' ? 'Mark Active' : 'Mark Sold Out'}
                      </button>
                    )}
                    <button onClick={() => deleteApprovedAd(ad)} className="flex-1 text-xs px-3 py-2 rounded-lg font-bold text-white bg-red-600">Delete</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    );
  }

  if (view === "userAds") {
    return (
      <main className="min-h-screen bg-gray-50 p-4 pb-20">
        <div className="max-w-lg mx-auto">
          <button onClick={() => setView("main")} className="text-sm mb-4 font-bold" style={{color: "#0a1628"}}>← Back to Dashboard</button>
          <div className="bg-white p-4 rounded-xl shadow mb-4">
            <h1 className="text-lg font-bold" style={{color: "#0a1628"}}>{selectedUser?.name || "No name"}</h1>
            <p className="text-sm text-gray-500">Phone: {selectedUser?.phone || "N/A"}</p>
            <p className="text-xs text-gray-400">Role: {selectedUser?.role}</p>
          </div>
          <h2 className="font-bold mb-2" style={{color: "#0a1628"}}>Ads Posted ({selectedUserAds.length})</h2>
          <div className="space-y-3">
            {selectedUserAds.length === 0 && <p className="text-gray-400 text-sm">No ads posted by this user.</p>}
            {selectedUserAds.map((ad) => (
              <button key={ad.id} onClick={() => setReviewAd(ad)} className="w-full bg-white p-4 rounded-xl shadow flex gap-3 text-left">
                {ad.image && <img src={ad.image} className="w-16 h-16 object-cover rounded-lg" />}
                <div className="flex-1">
                  <h3 className="font-bold text-sm">{ad.name}</h3>
                  <p className="text-xs text-gray-500">{ad.location}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${ad.status === "approved" ? "bg-green-100 text-green-700" : ad.status === "rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>{ad.status}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (view === "allUsers" || view === "normalUsers" || view === "partners") {
    const list = view === "normalUsers" ? normalUsers : view === "partners" ? partners : allUsers;
    return (
      <main className="min-h-screen bg-gray-50 p-4 pb-20">
        <div className="max-w-lg mx-auto">
          <button onClick={() => setView("main")} className="text-sm mb-4 font-bold" style={{color: "#0a1628"}}>← Back to Dashboard</button>
          <h1 className="text-xl font-bold mb-4" style={{color: "#0a1628"}}>
            {view === "normalUsers" ? "Normal Users" : view === "partners" ? "Partners / Brokers" : "All Registered Users"} ({list.length})
          </h1>
          <div className="space-y-2">
            {list.length === 0 && <p className="text-gray-400 text-sm">No users found.</p>}
            {list.map((u) => (
              <div key={u.id} className="w-full bg-white p-4 rounded-xl shadow flex justify-between items-center">
                <button onClick={() => loadUserAds(u)} className="flex-1 text-left">
                  <p className="font-bold text-sm" style={{color: "#0a1628"}}>{u.name || "No name"}</p>
                  <p className="text-xs text-gray-500">Phone: {u.phone || "N/A"}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 mt-1 inline-block">{u.role}</span>
                </button>
                {u.role === "partner" && (
                  <button onClick={() => togglePartnerActive(u)} className="text-xs px-3 py-2 rounded-lg font-bold text-white shrink-0" style={{background: u.partner_active === false ? "#22c55e" : "#f59e0b"}}>{u.partner_active === false ? "Activate" : "Deactivate"}</button>
                )}
                {u.role === "partner" && (
                  <>
                    <button onClick={() => setReviewPartner(u)} className="text-xs px-3 py-2 rounded-lg font-bold" style={{background: "#c9a84c", color: "#0a1628"}}>Partner Info</button>
                <button onClick={() => deletePartnerAccount(u)} className="text-xs px-3 py-2 rounded-lg font-bold text-white bg-red-600 shrink-0">Delete</button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold" style={{color: "#0a1628"}}>Admin Dashboard</h1>
          <div className="flex gap-2">
            <a href="/admin/add-project" className="text-sm px-4 py-2 rounded-lg font-bold text-white" style={{background: "#c9a84c"}}>+ Add Project</a>
            <button onClick={handleLogout} className="text-sm px-4 py-2 rounded-lg bg-gray-200">Logout</button>
          </div>
        </div>

        {actionMsg && <div className="mb-4 p-3 rounded-lg bg-green-50 border-2 border-green-500 text-green-700 text-sm font-bold">{actionMsg}</div>}
        {actionError && <div className="mb-4 p-3 rounded-lg bg-red-50 border-2 border-red-500 text-red-700 text-sm font-bold">{actionError}</div>}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="p-4 bg-white rounded-xl shadow text-center">
            <p className="font-bold text-xl" style={{color: "#0a1628"}}>{projects.length}</p>
            <p className="text-xs text-gray-500">Total Projects</p>
          </div>
          <button onClick={() => setView("allUsers")} className="p-4 bg-white rounded-xl shadow text-center">
            <p className="font-bold text-xl" style={{color: "#c9a84c"}}>{allUsers.length}</p>
            <p className="text-xs text-gray-500">Total Users</p>
          </button>
          <button onClick={() => setView("partners")} className="p-4 bg-white rounded-xl shadow text-center">
            <p className="font-bold text-xl" style={{color: "#0a1628"}}>{partners.length}</p>
            <p className="text-xs text-gray-500">Partners / Brokers</p>
          </button>
          <button onClick={() => setView("normalUsers")} className="p-4 bg-white rounded-xl shadow text-center">
            <p className="font-bold text-xl" style={{color: "#c9a84c"}}>{normalUsers.length}</p>
            <p className="text-xs text-gray-500">Normal Users</p>
          </button>
          <button onClick={() => setView("siteVisits")} className="p-4 bg-white rounded-xl shadow text-center" style={{border: "2px solid #0a1628"}}>
            <p className="font-bold text-xl" style={{color: "#0a1628"}}>🏠</p>
            <p className="text-xs text-gray-500">Site Visit Requests</p>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h3 className="font-bold mb-2" style={{color: "#0a1628"}}>👑 Make Someone Admin</h3>
          <p className="text-xs text-gray-500 mb-3">Enter the email of a user who has already signed up to give them admin access.</p>
          <div className="flex gap-2">
            <input placeholder="user@email.com" value={promoteEmail} onChange={e => setPromoteEmail(e.target.value)}
              className="flex-1 border rounded-lg p-2 text-sm" style={{borderColor: "#0a1628"}} />
            <button onClick={handlePromote} className="px-4 py-2 rounded-lg font-bold text-sm text-white" style={{background: "#0a1628"}}>Make Admin</button>
          </div>

          <p className="text-xs font-semibold mt-3 mb-1" style={{color: "#0a1628"}}>Select access for this admin:</p>
          <div className="grid grid-cols-2 gap-2 mb-2">
            {["property_ads", "partners", "users", "projects", "site_visits", "promote_admin"].map(perm => (
              <label key={perm} className="flex items-center gap-2 text-xs">
                <input type="checkbox" checked={selectedPerms.includes(perm)} onChange={() => togglePerm(perm)} />
                {perm.replace("_", " ")}
              </label>
            ))}
          </div>
          {promoteMsg && <p className="text-xs mt-2 font-bold" style={{color: promoteMsg.includes("Error") || promoteMsg.includes("not found") ? "#b91c1c" : "#16a34a"}}>{promoteMsg}</p>}

          <h4 className="text-sm font-bold mt-4 mb-2" style={{color: "#0a1628"}}>Current Admins</h4>
          <div className="flex flex-col gap-2">
            {admins.map(a => (
              <div key={a.id} className="flex justify-between items-center border rounded-lg p-2 text-sm">
                <div>
                  <p className="font-bold">{a.name || "No name"}</p>
                  <p className="text-xs text-gray-500">{a.phone}</p>
                </div>
                <button onClick={() => handleDemote(a.id)} className="text-xs px-3 py-1 rounded-lg font-bold text-white" style={{background: "#b91c1c"}}>Remove Admin</button>
              </div>
            ))}
            {admins.length === 0 && <p className="text-xs text-gray-400">No admins found.</p>}
          </div>
        </div>

        <h2 className="text-lg font-bold mb-2" style={{color: "#0a1628"}}>Property Ads</h2>
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button onClick={() => setView("pendingList")} className="rounded-xl p-4 text-center shadow-md text-white" style={{background: "linear-gradient(135deg, #f59e0b, #d97706)"}}>
            <p className="text-2xl font-bold">{pendingAds.length}</p>
            <p className="text-xs font-semibold mt-1">⏳ Pending</p>
          </button>
          <button onClick={() => setView("approvedList")} className="rounded-xl p-4 text-center shadow-md text-white" style={{background: "linear-gradient(135deg, #22c55e, #16a34a)"}}>
            <p className="text-2xl font-bold">{approvedAds.length}</p>
            <p className="text-xs font-semibold mt-1">✅ Live</p>
          </button>
          <button onClick={() => setView("rejectedList")} className="rounded-xl p-4 text-center shadow-md text-white" style={{background: "linear-gradient(135deg, #ef4444, #b91c1c)"}}>
            <p className="text-2xl font-bold">{rejectedAds.length}</p>
            <p className="text-xs font-semibold mt-1">❌ Rejected</p>
          </button>
        </div>

        <h2 className="text-lg font-bold mb-2" style={{color: "#0a1628"}}>Partner Applications</h2>
        <div className="grid grid-cols-3 gap-3 mb-8">
          <button onClick={() => setView("partnerPending")} className="rounded-xl p-4 text-center shadow-md text-white" style={{background: "linear-gradient(135deg, #f59e0b, #d97706)"}}>
            <p className="text-2xl font-bold">{partnerPendingList.length}</p>
            <p className="text-xs font-semibold mt-1">⏳ Pending</p>
          </button>
          <button onClick={() => setView("partners")} className="rounded-xl p-4 text-center shadow-md text-white" style={{background: "linear-gradient(135deg, #22c55e, #16a34a)"}}>
            <p className="text-2xl font-bold">{partners.length}</p>
            <p className="text-xs font-semibold mt-1">✅ Approved</p>
          </button>
          <button onClick={() => setView("partnerRejected")} className="rounded-xl p-4 text-center shadow-md text-white" style={{background: "linear-gradient(135deg, #ef4444, #b91c1c)"}}>
            <p className="text-2xl font-bold">{partnerRejectedList.length}</p>
            <p className="text-xs font-semibold mt-1">❌ Rejected</p>
          </button>
        </div>

        <h2 className="text-xl font-bold mb-3" style={{color: "#0a1628"}}>All Projects</h2>
        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="bg-white p-4 rounded-xl shadow flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm">{project.name}</h3>
                <p className="text-xs text-gray-500">{project.location}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${project.status === 'sold_out' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {project.status === 'sold_out' ? 'Sold Out' : 'Active'}
                </span>
              </div>
              <div className="flex gap-2 shrink-0">
                <a href={`/admin/edit-project/${project.slug}`} className="text-xs px-3 py-2 rounded-lg font-bold text-white bg-blue-600">Edit</a>
                <button onClick={() => toggleSoldOut(project.id, project.status)} className="text-xs px-3 py-2 rounded-lg font-bold text-white" style={{background: project.status === 'sold_out' ? '#22c55e' : '#f59e0b'}}>
                  {project.status === 'sold_out' ? 'Mark Active' : 'Mark Sold Out'}
                </button>
                <button onClick={() => deleteProject(project.id, project.name)} className="text-xs px-3 py-2 rounded-lg font-bold text-white bg-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
