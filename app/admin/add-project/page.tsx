"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

const CLOUD_NAME = "ruxawtgn";
const UPLOAD_PRESET = "Upload";

export default function AddProjectPage() {
  const [form, setForm] = useState({
    slug: "", name: "", location: "", price: "", tag: "", type: "Apartment",
    builder: "", rera: "", region: "", map_link: "", description: "",
    sizes: "", amenities: "", highlights: "", payment: ""
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!imageFile) {
      setError("Kripya ek photo select karein.");
      return;
    }
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", UPLOAD_PRESET);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const uploadData = await uploadRes.json();

      if (!uploadData.secure_url) {
        throw new Error("Image upload fail ho gaya. Preset check karein.");
      }

      const { error: insertError } = await supabase.from("projects").insert({
        ...form,
        image: uploadData.secure_url,
        status: "active"
      });

      if (insertError) throw insertError;

      setSuccess(true);
      setTimeout(() => router.push("/admin"), 1500);
    } catch (err: any) {
      setError(err.message || "Kuch galat ho gaya.");
    } finally {
      setUploading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl font-bold text-green-600">Project add ho gaya! Redirect ho raha hai...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6" style={{color: '#0a1628'}}>Naya Project Add Karein</h1>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">

          <div>
            <label className="text-sm font-bold">Photo</label>
            <input type="file" accept="image/*" onChange={handleImageSelect} className="w-full border rounded-lg px-3 py-2 mt-1" />
            {imagePreview && <img src={imagePreview} alt="preview" className="mt-2 w-full h-40 object-cover rounded-lg" />}
          </div>

          <input name="slug" placeholder="Slug (e.g. green-valley-homes)" onChange={handleChange} required className="w-full border rounded-lg px-3 py-2" />
          <input name="name" placeholder="Project Name" onChange={handleChange} required className="w-full border rounded-lg px-3 py-2" />
          <input name="location" placeholder="Location" onChange={handleChange} required className="w-full border rounded-lg px-3 py-2" />
          <input name="price" placeholder="Price (e.g. ₹50 Lac onwards)" onChange={handleChange} required className="w-full border rounded-lg px-3 py-2" />
          <input name="tag" placeholder="Tag (e.g. Ready to Move)" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />

          <select name="type" onChange={handleChange} className="w-full border rounded-lg px-3 py-2">
            <option value="Apartment">Apartment</option>
            <option value="Plot">Plot</option>
            <option value="Villa">Villa</option>
            <option value="Commercial">Commercial</option>
          </select>

          <input name="builder" placeholder="Builder Name" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
          <input name="rera" placeholder="RERA Number" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
          <input name="region" placeholder="Region (e.g. ghaziabad)" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
          <input name="map_link" placeholder="Google Maps Link" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
          <textarea name="description" placeholder="Description" onChange={handleChange} required rows={3} className="w-full border rounded-lg px-3 py-2" />
          <input name="sizes" placeholder="Sizes (e.g. 2 BHK - 1000 Sq.Ft|3 BHK - 1500 Sq.Ft)" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
          <input name="amenities" placeholder="Amenities (pipe | separated)" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
          <input name="highlights" placeholder="Highlights (pipe | separated)" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
          <input name="payment" placeholder="Payment Plan" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />

          <button type="submit" disabled={uploading} className="w-full py-3 rounded-lg font-bold text-white" style={{background: '#0a1628'}}>
            {uploading ? "Upload ho raha hai..." : "Project Add Karein"}
          </button>
        </form>
      </div>
    </main>
  );
}
