const fs = require('fs');
const file = 'app/projects/[slug]/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldBtn = `<button
              onClick={() => setShowFullImage(false)}
              className="absolute top-4 right-4 text-white z-10 flex items-center gap-2 px-4 py-3 bg-black bg-opacity-70 rounded-full border-2 border-white"
            >
              <span style={{ fontSize: '22px', fontWeight: 'bold', lineHeight: 1 }}>✕</span>
              <span className="text-sm font-bold">Band Karein</span>
            </button>`;

const newBtn = `<button
              onClick={() => setShowFullImage(false)}
              className="absolute top-4 right-4 text-white z-10 flex flex-col items-center justify-center px-3 py-2 bg-black bg-opacity-70 rounded-2xl border-2 border-white"
            >
              <span style={{ fontSize: '26px', fontWeight: 'bold', lineHeight: 1 }}>✕</span>
              <span style={{ fontSize: '10px', marginTop: '2px' }}>close</span>
            </button>`;

if (content.includes(oldBtn)) {
  content = content.replace(oldBtn, newBtn);
  console.log("close button updated OK");
} else {
  console.log("WARNING: old button not found");
}

fs.writeFileSync(file, content);
console.log("DONE");
