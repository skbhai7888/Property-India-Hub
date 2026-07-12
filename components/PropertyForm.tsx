"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

const CLOUD_NAME = "ruxawtgn";
const UPLOAD_PRESET = "Upload";

export default function PropertyForm({
  mode,
  userId,
  onSuccess,
  editData,
}: {
  mode: "admin" | "user";
  userId?: string;
  onSuccess?: () => void;
  editData?: any;
}) {
  const router = useRouter();
  const [form, setForm] = useState({
    slug: editData?.slug || "", name: editData?.name || "", title: editData?.title || "",
    location: editData?.location || "", price: editData?.price || "", tag: editData?.tag || "",
    type: editData?.type || "Apartment", builder: editData?.builder || "", rera: editData?.rera || "",
    region: editData?.region || "", map_link: editData?.map_link || "", description: editData?.description || "",
    sizes: editData?.sizes || "", amenities: editData?.amenities || "", highlights: editData?.highlights || "",
    payment: editData?.payment || "", phone: editData?.phone || ""
  });
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState(editData?.image || "");
  const [existingGallery, setExistingGallery] = useState<string[]>(editData?.gallery_images ? editData.gallery_images.split("|").filter(Boolean) : []);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [existingVideo, setExistingVideo] = useState(editData?.video_url || "");
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      const autoSlug = value.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
      setForm({ ...form, name: value, slug: autoSlug });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleMainImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImageFile(file);
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(f => f.type.startsWith("image/"));
    const videoFiles = files.filter(f => f.type.startsWith("video/"));
    setGalleryFiles(imageFiles);
    setGalleryPreviews(imageFiles.map(f => URL.createObjectURL(f)));
    if (videoFiles.length > 0) setVideoFile(videoFiles[0]);
  };

  const removeExistingImage = (index: number) => {
    setExistingGallery(existingGallery.filter((_, i) => i !== index));
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: "POST", body: formData });
    const data = await res.json();
    if (!data.secure_url) throw new Error("Image upload failed");
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!mainImagePreview && !mainImageFile) {
      setError("Please select a main photo.");
      return;
    }
    setUploading(true);
    try {
      let mainImageUrl = mainImagePreview;
      if (mainImageFile) {
        setUploadStatus("Uploading main photo...");
        mainImageUrl = await uploadToCloudinary(mainImageFile);
      }

      let newGalleryUrls: string[] = [];
      for (let i = 0; i < galleryFiles.length; i++) {
        setUploadStatus(`Uploading gallery photo ${i + 1}/${galleryFiles.length}...`);
        const url = await uploadToCloudinary(galleryFiles[i]);
        newGalleryUrls.push(url);
      }
      const finalGalleryUrls = [...existingGallery, ...newGalleryUrls];

      let videoUrl = existingVideo;
      if (videoFile) {
        setUploadStatus("Uploading video...");
        const vFormData = new FormData();
        vFormData.append("file", videoFile);
        vFormData.append("upload_preset", UPLOAD_PRESET);
        const vRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`, { method: "POST", body: vFormData });
        const vData = await vRes.json();
        videoUrl = vData.secure_url || "";
      }

      const baseData = {
        slug: form.slug, name: form.name, title: form.title, location: form.location,
        price: form.price, tag: form.tag, type: form.type, builder: form.builder,
        rera: form.rera, region: form.region, map_link: form.map_link,
        description: form.description, sizes: form.sizes, amenities: form.amenities,
        highlights: form.highlights, payment: form.payment,
        image: mainImageUrl, gallery_images: finalGalleryUrls.join("|"), video_url: videoUrl
      };

      if (mode === "admin") {
        setUploadStatus("Saving project...");
        if (editData?.id) {
          const { error: updateErr } = await supabase.from("projects").update(baseData).eq("id", editData.id);
          if (updateErr) throw updateErr;
        } else {
          const { error: insertError } = await supabase.from("projects").insert({ ...baseData, status: "active" });
          if (insertError) throw insertError;
        }
        setSuccess(true);
        setUploadStatus("");
        setTimeout(() => router.push("/admin"), 1800);
      } else {
        setUploadStatus("Submitting your ad...");
        if (editData?.id) {
          const { error: updateErr } = await supabase.from("user_listings").update({
            ...baseData, phone: form.phone, status: "pending", reject_reason: null
          }).eq("id", editData.id);
          if (updateErr) throw updateErr;
        } else {
          const { error: insertError } = await supabase.from("user_listings").insert({
            ...baseData, user_id: userId, phone: form.phone, status: "pending"
          });
          if (insertError) throw insertError;
        }
        setSuccess(true);
        setUploadStatus("");
        if (!editData?.id) {
          setForm({ slug: "", name: "", title: "", location: "", price: "", tag: "", type: "Apartment", builder: "", rera: "", region: "", map_link: "", description: "", sizes: "", amenities: "", highlights: "", payment: "", phone: "" });
          setMainImageFile(null);
          setMainImagePreview("");
          setGalleryFiles([]);
          setGalleryPreviews([]);
          setVideoFile(null);
        }
        if (onSuccess) onSuccess();
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setUploadStatus("");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {success && (
        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 flex items-center gap-3">
          <span className="text-2xl">✅</span>
          <p className="text-green-700 text-sm font-bold">
            {mode === "admin" ? "Project saved successfully!" : editData?.id ? "Ad updated and resubmitted for review!" : "Ad submitted successfully! It will be reviewed by admin before going live."}
          </p>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 flex items-center gap-3">
          <span className="text-2xl">❌</span>
          <p className="text-red-700 text-sm font-bold">{error}</p>
        </div>
      )}

      <div>
        <label className="text-sm font-bold">Main Photo (Cover Image)</label>
        <input type="file" accept="image/*" onChange={handleMainImage} className="w-full border rounded-lg px-3 py-2 mt-1" />
        {mainImagePreview && <img src={mainImagePreview} alt="preview" className="mt-2 w-full h-40 object-cover rounded-lg" />}
      </div>

      {existingGallery.length > 0 && (
        <div>
          <label className="text-sm font-bold">Existing Gallery Photos</label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {existingGallery.map((src, i) => (
              <div key={i} className="relative">
                <img src={src} className="w-full h-20 object-cover rounded-lg" />
                <button type="button" onClick={() => removeExistingImage(i)} className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs">✕</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="text-sm font-bold">Gallery Photos / Video (multiple select karein)</label>
        <input type="file" accept="image/*,video/*" multiple onChange={handleGalleryImages} className="w-full border rounded-lg px-3 py-2 mt-1" />
        {galleryPreviews.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {galleryPreviews.map((src, i) => (
              <img key={i} src={src} alt={`gallery-${i}`} className="w-full h-20 object-cover rounded-lg" />
            ))}
          </div>
        )}
        {existingVideo && !videoFile && <p className="text-xs text-green-600 mt-1">Existing video attached</p>}
        {videoFile && <p className="text-xs text-green-600 mt-1">New video selected: {videoFile.name}</p>}
      </div>

      <input name="slug" value={form.slug} readOnly placeholder="Auto-generated from name" className="w-full border rounded-lg px-3 py-2 bg-gray-100" />
      <input name="name" value={form.name} placeholder="Property Name" onChange={handleChange} required className="w-full border rounded-lg px-3 py-2" />
      <input name="title" value={form.title} placeholder="Search Title" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
      <input name="location" value={form.location} placeholder="Location" onChange={handleChange} required className="w-full border rounded-lg px-3 py-2" />
      <input name="price" value={form.price} placeholder="Price" onChange={handleChange} required className="w-full border rounded-lg px-3 py-2" />
      <input name="tag" value={form.tag} placeholder="Tag (e.g. Ready to Move)" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />

      <select name="type" value={form.type} onChange={handleChange} className="w-full border rounded-lg px-3 py-2">
        <option value="Apartment">Apartment</option>
        <option value="Plot">Plot</option>
        <option value="Villa">Villa</option>
        <option value="Commercial">Commercial</option>
      </select>

      <input name="builder" value={form.builder} placeholder="Builder Name" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
      <input name="rera" value={form.rera} placeholder="RERA Number" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
      <input name="region" value={form.region} placeholder="Region" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
      <input name="map_link" value={form.map_link} placeholder="Google Maps Link" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
      <textarea name="description" value={form.description} placeholder="Description" onChange={handleChange} required rows={3} className="w-full border rounded-lg px-3 py-2" />
      <input name="sizes" value={form.sizes} placeholder="Sizes" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
      <input name="amenities" value={form.amenities} placeholder="Amenities" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
      <input name="highlights" value={form.highlights} placeholder="Highlights" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
      <input name="payment" value={form.payment} placeholder="Payment Plan" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
      {mode === "user" && (
        <input name="phone" value={form.phone} placeholder="Your Contact Number" onChange={handleChange} required className="w-full border rounded-lg px-3 py-2" />
      )}

      <button type="submit" disabled={uploading} className="w-full py-3 rounded-lg font-bold text-white" style={{ background: "#0a1628" }}>
        {uploading ? uploadStatus || "Submitting..." : mode === "admin" ? (editData?.id ? "Update Project" : "Add Project") : (editData?.id ? "Resubmit for Approval" : "Submit Ad for Approval")}
      </button>
    </form>
  );
}
