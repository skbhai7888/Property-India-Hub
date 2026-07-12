const fs = require('fs');
const file = 'app/projects/[slug]/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<button\s+onClick=\{\(\) => setShowFullImage\(false\)\}[\s\S]*?<\/button>/;

const newBtn = `<button onClick={() => setShowFullImage(false)} className="absolute top-4 right-4 text-white z-10 flex flex-col items-center justify-center px-3 py-2 bg-black bg-opacity-70 rounded-2xl border-2 border-white">
              <span style={{ fontSize: '26px', fontWeight: 'bold', lineHeight: 1 }}>X</span>
              <span style={{ fontSize: '10px', marginTop: '2px' }}>close</span>
            </button>`;

if (regex.test(content)) {
  content = content.replace(regex, newBtn);
  console.log("close button replaced OK");
} else {
  console.log("WARNING: no button matched regex");
}

fs.writeFileSync(file, content);
console.log("DONE");
