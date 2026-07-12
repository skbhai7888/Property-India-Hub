const fs = require('fs');
const file = 'app/page.tsx';
let lines = fs.readFileSync(file, 'utf8').split('\n');

// Lines 101 to 137 (1-indexed) => index 100 to 136
const startIdx = 100;
const endIdx = 136;

const oldBlock = lines.slice(startIdx, endIdx + 1).join('\n');
console.log("--- OLD BLOCK (first 3 lines) ---");
console.log(lines.slice(startIdx, startIdx + 3).join('\n'));
console.log("--- OLD BLOCK (last 3 lines) ---");
console.log(lines.slice(endIdx - 2, endIdx + 1).join('\n'));

const newBlock = `        <ProjectsSection projects={projects} icons={{ WhatsAppIcon, GoogleMapsIcon, PhoneIcon }} />`;

lines.splice(startIdx, endIdx - startIdx + 1, newBlock);
let content = lines.join('\n');

// Add import at top
if (!content.includes("import ProjectsSection")) {
  content = content.replace(
    `import Link from 'next/link';`,
    `import Link from 'next/link';\nimport ProjectsSection from '../components/ProjectsSection';`
  );
  console.log("import added OK");
}

fs.writeFileSync(file, content);
console.log("DONE - grid replaced with ProjectsSection component");
