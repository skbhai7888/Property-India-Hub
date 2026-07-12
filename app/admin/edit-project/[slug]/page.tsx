"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "../../../../lib/supabase";

const CLOUD_NAME = "ruxawtgn";
const UPLOAD_PRESET = "Upload";

export default function EditProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();

  const [form, setForm] = useState({
    slug: "", name: "", title: "", location: "", price: "",
    tag: "", type: "Apartment",
    builder: "", rera: "", region: "", map_link: "", description: "",
    sizes: "", amenities: "", highlights: "", payment: ""
  });

  const [loading, setLoading] = useState(true);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [existingGallery, setExistingGallery] = useState<string[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [existingVideo, setExistingVideo] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).single();
      if (error || !data) {
        setError("Project nahi mila.");
        setLoading(false);
        return;
      }
      setForm({
        slug: data.slug || "",
        name: data.name || "",
        title: data.title || "",
        location: data.location || "",
        price: data.price || "",
        tag: data.tag || "",
        type: data.type || "Apartment",
        builder: data.builder || "",
        rera: data.rera || "",
        region: data.region || "",
        map_link: data.map_link || "",
        description: data.description || "",
        sizes: data.sizes || "",
        amenities: data.amenities || "",
        highlights: data.highlights || "",
        payment: data.payment || ""
      });
      setMainImagePreview(data.image || "");
      setExistingGallery(data.gallery_images ? data.gallery_images.split("|").filter(Boolean) : []);
      setExistingVideo(data.video_url || "");
      setLoading(false);
    };
    fetchProject();
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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
    if (videoFiles.length > 0) {
      setVideoFile(videoFiles[0]);
      setVideoPreview(URL.createObjectURL(videoFiles[0]));
    }
  };

  const removeExistingImage = (index: number) => {
    setExistingGallery(existingGallery.filter((_, i) => i !== index));
  };

  const removeExistingVideo = () => {
    setExistingVideo("");
  };

  const removeNewVideo = () => {
    setVideoFile(null);
    setVideoPreview("");
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST", body: formData
    });
    const data = await res.json();
    if (!data.secure_url) throw new Error("Upload failed");
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setUploading(true);

    try {
      let mainImageUrl = mainImagePreview;
      if (mainImageFile) {
        setUploadStatus("Main photo upload ho raha hai...");
        mainImageUrl = await uploadToCloudinary(mainImageFile);
      }

      let newGalleryUrls: string[] = [];
      if (galleryFiles.length > 0) {
        for (let i = 0; i < galleryFiles.length; i++) {
          setUploadStatus(`Gallery photo ${i + 1}/${galleryFiles.length} upload ho raha hai...`);
          const url = await uploadToCloudinary(galleryFiles[i]);
          newGalleryUrls.push(url);
        }
      }

      const finalGalleryUrls = [...existingGallery, ...newGalleryUrls];

      let videoUrl = existingVideo;
      if (videoFile) {
        setUploadStatus("Video upload ho raha hai...");
        const vFormData = new FormData();
        vFormData.append("file", videoFile);
        vFormData.append("upload_preset", UPLOAD_PRESET);
        const vRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`, { method: "POST", body: vFormData });
        const vData = await vRes.json();
        videoUrl = vData.secure_url || "";
      }

      setUploadStatus("Project update ho raha hai...");
      const { error: updateError } = await supabase.from("projects").update({
        ...form,
        image: mainImageUrl,
        gallery_images: finalGalleryUrls.join("|"),
        video_url: videoUrl
      }).eq("slug", slug);

      if (updateError) throw updateError;

      setSuccess(true);
      setTimeout(() => router.push("/admin"), 1500);
    } catch (err: any) {
      setError(err.message || "Kuch galat ho gaya.");
    } finally {
      setUploading(false);
      setUploadStatus("");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg">Loading...</p>
      </main>
    );
  }

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl font-bold text-green-600">Project update ho gaya! Redirect ho raha hai...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6" style={{color: '#0a1628'}}>Project Edit Karein</h1>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">

          <div>
            <label className="text-sm font-bold">Main Photo (Cover Image)</label>
            <input type="file" accept="image/*" onChange={handleMainImage} className="w-full border rounded-lg px-3 py-2 mt-1" />
            {mainImagePreview && <img src={mainImagePreview} alt="preview" className="mt-2 w-full h-40 object-cover rounded-lg" />}
          </div>

          <div>
            <label className="text-sm font-bold">Existing Gallery Photos</label>
            {existingGallery.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {existingGallery.map((src, i) => (
                  <div key={i} className="relative">
                    <img src={src} alt={`existing-${i}`} className="w-full h-20 object-cover rounded-lg" />
                    <button type="button" onClick={() => removeExistingImage(i)} className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs">✕</button>
                  </div>
                ))}
              </div>
            )}
            {existingGallery.length === 0 && <p className="text-xs text-gray-400 mt-1">Koi gallery photo nahi hai.</p>}
          </div>

          <div>
            <label className="text-sm font-bold">Existing Video</label>
            {existingVideo && (
              <div className="relative mt-2">
                <video src={existingVideo} controls className="w-full rounded-lg" />
                <button type="button" onClick={removeExistingVideo} className="mt-2 w-full bg-red-600 text-white text-xs py-2 rounded-lg font-bold">Video Hatayein</button>
              </div>
            )}
            {!existingVideo && <p className="text-xs text-gray-400 mt-1">Koi video nahi hai.</p>}
          </div>

          <div>
            <label className="text-sm font-bold">Nayi Gallery Photos/Video Add Karein</label>
            <input type="file" accept="image/*,video/*" multiple onChange={handleGalleryImages} className="w-full border rounded-lg px-3 py-2 mt-1" />
            {galleryPreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {galleryPreviews.map((src, i) => (
                  <img key={i} src={src} alt={`new-${i}`} className="w-full h-20 object-cover rounded-lg" />
                ))}
              </div>
            )}
            {videoPreview && (
              <div className="relative mt-2">
                <video src={videoPreview} controls className="w-full rounded-lg" />
                <button type="button" onClick={removeNewVideo} className="mt-2 w-full bg-gray-400 text-white text-xs py-2 rounded-lg font-bold">Naya Video Hatayein</button>
              </div>
            )}
          </div>

          <input name="slug" value={form.slug} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-100" />
          <input name="name" value={form.name} placeholder="Project Name" onChange={handleChange} required className="w-full border rounded-lg px-3 py-2" />
          <input name="title" value={form.title} placeholder="Search Title" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
          <input name="location" value={form.location} placeholder="Location" onChange={handleChange} required className="w-full border rounded-lg px-3 py-2" />
          <input name="price" value={form.price} placeholder="Price" onChange={handleChange} required className="w-full border rounded-lg px-3 py-2" />
          <input name="tag" value={form.tag} placeholder="Tag" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />

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

          <button type="submit" disabled={uploading} className="w-full py-3 rounded-lg font-bold text-white" style={{background: '#0a1628'}}>
            {uploading ? uploadStatus || "Update ho raha hai..." : "Project Update Karein"}
          </button>
        </form>
      </div>
    </main>
  );
}
