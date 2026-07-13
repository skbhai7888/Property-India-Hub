"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function SiteVisitForm({ projectName }: { projectName?: string }) {
  const [form, setForm] = useState({ name: "", phone: "", preferred_date: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const { error } = await supabase.from("site_visits").insert({
      name: form.name, phone: form.phone,
      project_name: projectName || "General Enquiry",
      preferred_date: form.preferred_date || null,
      message: form.message
    });
    setSubmitting(false);
    if (error) { setError(error.message); return; }
    setSuccess(true);
    setForm({ name: "", phone: "", preferred_date: "", message: "" });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="font-bold text-lg mb-1" style={{ color: "#0a1628" }}>Book a Free Site Visit</h3>
      <p className="text-sm text-gray-500 mb-4">Our team will call you to schedule a convenient time.</p>

      {success && (
        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-3 mb-3">
          <p className="text-green-700 text-sm font-bold">Request submitted! Our team will contact you shortly.</p>
        </div>
      )}
      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required className="w-full border rounded-lg px-3 py-2 text-sm" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required className="w-full border rounded-lg px-3 py-2 text-sm" />
        <input name="preferred_date" type="date" value={form.preferred_date} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm" />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Any specific requirements? (optional)" rows={2} className="w-full border rounded-lg px-3 py-2 text-sm" />
        <button type="submit" disabled={submitting} className="w-full py-3 rounded-lg font-bold text-white" style={{ background: "#c9a84c", color: "#0a1628" }}>
          {submitting ? "Submitting..." : "Book Free Site Visit"}
        </button>
      </form>
    </div>
  );
}
