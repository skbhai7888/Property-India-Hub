const fs = require('fs');
const file = 'app/projects/[slug]/page.tsx';
let lines = fs.readFileSync(file, 'utf8').split('\n');

// Lines 124 to 149 (1-indexed) => array index 123 to 148
const startIdx = 123;
const endIdx = 148;

const oldBlock = lines.slice(startIdx, endIdx + 1).join('\n');
console.log("--- OLD BLOCK BEING REPLACED ---");
console.log(oldBlock);
console.log("--- END OLD BLOCK ---");

const newBlock = `        <div className="max-w-4xl mx-auto p-4">
          <div className="mb-4">
            <div
              className="flex gap-2 overflow-x-auto snap-x snap-mandatory rounded-xl"
              style={{ scrollSnapType: 'x mandatory' }}
              onScroll={(e) => {
                const el = e.currentTarget;
                const idx = Math.round(el.scrollLeft / el.clientWidth);
                if (idx !== activeImageIndex) setActiveImageIndex(idx);
              }}
            >
              {allImages.map((img, i) => (
                <div key={\`slide-\${i}\`} className="w-full flex-shrink-0 aspect-square snap-center" onClick={() => setShowFullImage(true)}>
                  <img src={img} alt={\`\${project.name} \${i}\`} className="w-full h-full object-contain bg-gray-100" />
                </div>
              ))}
              {videoEmbed && (
                <div className="w-full flex-shrink-0 aspect-square snap-center" style={{ aspectRatio: '1/1' }}>
                  <video src={videoEmbed} controls className="w-full h-full object-contain bg-black" />
                </div>
              )}
            </div>
            {(allImages.length > 1 || videoEmbed) && (
              <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={\`thumb-\${i}\`}
                    onClick={() => setActiveImageIndex(i)}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer"
                    style={{ border: i === activeImageIndex ? '3px solid #c9a84c' : '3px solid transparent' }}
                  />
                ))}
                {videoEmbed && (
                  <div className="w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center bg-black text-white text-xs">
                    ▶ Video
                  </div>
                )}
              </div>
            )}
          </div>
`;

lines.splice(startIdx, endIdx - startIdx + 1, newBlock);
fs.writeFileSync(file, lines.join('\n'));
console.log("DONE - gallery+video combined into swipeable carousel");
