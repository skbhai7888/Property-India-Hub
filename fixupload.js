const fs = require('fs');
const file = 'app/admin/add-project/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldHandler = `const handleGalleryImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setGalleryFiles(files);
    setGalleryPreviews(files.map(f => URL.createObjectURL(f)));
  };`;

const newHandler = `const handleGalleryImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(f => f.type.startsWith("image/"));
    const videoFiles = files.filter(f => f.type.startsWith("video/"));
    setGalleryFiles(imageFiles);
    setGalleryPreviews(imageFiles.map(f => URL.createObjectURL(f)));
    if (videoFiles.length > 0) {
      setVideoFile(videoFiles[0]);
    }
  };`;

if (content.includes(oldHandler)) {
  content = content.replace(oldHandler, newHandler);
  console.log("handler updated OK");
} else {
  console.log("WARNING: handler not found");
}

const oldInput = `<input type="file" accept="image/*" multiple onChange={handleGalleryImages} className="w-full border rounded-lg px-3 py-2 mt-1" />`;
const newInput = `<input type="file" accept="image/*,video/*" multiple onChange={handleGalleryImages} className="w-full border rounded-lg px-3 py-2 mt-1" />`;

if (content.includes(oldInput)) {
  content = content.replace(oldInput, newInput);
  console.log("gallery input updated OK");
} else {
  console.log("WARNING: gallery input not found");
}

const oldVideoDiv = `<div>
            <label className="text-sm font-bold">Video (optional)</label>
            <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} className="w-full border rounded-lg px-3 py-2 mt-1" />
          </div>`;

if (content.includes(oldVideoDiv)) {
  content = content.replace(oldVideoDiv, '');
  console.log("old video section removed OK");
} else {
  console.log("WARNING: old video section not found (may already be different)");
}

fs.writeFileSync(file, content);
console.log("DONE - file saved");
