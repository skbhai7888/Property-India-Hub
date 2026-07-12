const fs = require('fs');
const file = 'app/projects/[slug]/page.tsx';
let lines = fs.readFileSync(file, 'utf8').split('\n');

// Replace fullscreen modal block: lines 111 to 122 (1-indexed) => index 110 to 121
const startIdx = 110;
const endIdx = 121;

const oldBlock = lines.slice(startIdx, endIdx + 1).join('\n');
console.log("--- OLD BLOCK ---");
console.log(oldBlock);
console.log("--- END OLD BLOCK ---");

const newBlock = `        {showFullImage && (
          <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
            <button
              onClick={() => setShowFullImage(false)}
              className="absolute top-4 right-4 text-white text-2xl z-10 w-10 h-10 flex items-center justify-center bg-white bg-opacity-20 rounded-full"
            >
              ✕
            </button>
            <div
              className="w-full h-full flex overflow-x-auto snap-x snap-mandatory"
              style={{ scrollSnapType: 'x mandatory' }}
              onScroll={(e) => {
                const el = e.currentTarget;
                const idx = Math.round(el.scrollLeft / el.clientWidth);
                if (idx !== activeImageIndex) setActiveImageIndex(idx);
              }}
            >
              {allImages.map((img, i) => (
                <div key={\`full-\${i}\`} className="w-full h-full flex-shrink-0 snap-center flex items-center justify-center">
                  <img src={img} alt={\`\${project.name} \${i}\`} className="max-w-full max-h-[85vh] object-contain" />
                </div>
              ))}
              {videoEmbed && (
                <div className="w-full h-full flex-shrink-0 snap-center flex items-center justify-center">
                  <video src={videoEmbed} controls className="max-w-full max-h-[85vh] object-contain" />
                </div>
              )}
            </div>
            {(allImages.length > 1 || videoEmbed) && (
              <div className="flex gap-2 mt-4">
                {allImages.map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full" style={{ background: i === activeImageIndex ? '#c9a84c' : '#555' }} />
                ))}
                {videoEmbed && (
                  <div className="w-2 h-2 rounded-full" style={{ background: '#555' }} />
                )}
              </div>
            )}
          </div>
        )}`;

lines.splice(startIdx, endIdx - startIdx + 1, newBlock);
let content = lines.join('\n');

// Add history handling so back button closes modal instead of leaving page
const oldEffectEnd = `}, [slug]);`;
const newEffectEnd = `}, [slug]);

  useEffect(() => {
    const handlePopState = () => {
      setShowFullImage(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);`;

if (content.includes(oldEffectEnd)) {
  content = content.replace(oldEffectEnd, newEffectEnd);
  console.log("popstate handler added OK");
} else {
  console.log("WARNING: effect anchor not found");
}

const oldOpenClick = `onClick={() => setShowFullImage(true)}`;
const newOpenClick = `onClick={() => { window.history.pushState({modal:true}, ''); setShowFullImage(true); }}`;

if (content.includes(oldOpenClick)) {
  content = content.replace(oldOpenClick, newOpenClick);
  console.log("open click updated OK");
} else {
  console.log("WARNING: open click not found");
}

fs.writeFileSync(file, content);
console.log("DONE - fullscreen swipe + close button fixed");
