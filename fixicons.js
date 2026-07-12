const fs = require('fs');

// Step 1: Extract the three icon components from app/page.tsx
const pageFile = 'app/page.tsx';
let pageLines = fs.readFileSync(pageFile, 'utf8').split('\n');

// Lines 7-11 WhatsAppIcon, 31-35 GoogleMapsIcon, 37-41 PhoneIcon approx - let's grab by finding blocks
function extractBlock(lines, startLine) {
  let idx = startLine - 1;
  let block = [];
  let depth = 0;
  let started = false;
  for (let i = idx; i < lines.length; i++) {
    block.push(lines[i]);
    if (lines[i].includes('(')) started = true;
    if (started) {
      for (const ch of lines[i]) {
        if (ch === '(') depth++;
        if (ch === ')') depth--;
      }
      if (depth === 0 && lines[i].includes(');')) break;
    }
  }
  return block.join('\n');
}

const waIcon = extractBlock(pageLines, 7);
const gmIcon = extractBlock(pageLines, 31);
const phIcon = extractBlock(pageLines, 37);

console.log("--- Extracted WhatsAppIcon ---");
console.log(waIcon);
console.log("--- Extracted GoogleMapsIcon ---");
console.log(gmIcon);
console.log("--- Extracted PhoneIcon ---");
console.log(phIcon);

// Step 2: Insert these into ProjectsSection.tsx and update its usage
const compFile = 'components/ProjectsSection.tsx';
let compContent = fs.readFileSync(compFile, 'utf8');

const iconDefs = `\n${waIcon}\n\n${gmIcon}\n\n${phIcon}\n`;

compContent = compContent.replace(
  `import Link from "next/link";`,
  `import Link from "next/link";\n${iconDefs}`
);

compContent = compContent.replace(
  `export default function ProjectsSection({ projects, icons }: { projects: any[]; icons: any }) {\n  const [searchTerm, setSearchTerm] = useState("");\n  const { WhatsAppIcon, GoogleMapsIcon, PhoneIcon } = icons;`,
  `export default function ProjectsSection({ projects }: { projects: any[] }) {\n  const [searchTerm, setSearchTerm] = useState("");`
);

fs.writeFileSync(compFile, compContent);
console.log("ProjectsSection.tsx updated with icons OK");

// Step 3: Update app/page.tsx to remove icons prop
let pageContent = pageLines.join('\n');
pageContent = pageContent.replace(
  `<ProjectsSection projects={projects} icons={{ WhatsAppIcon, GoogleMapsIcon, PhoneIcon }} />`,
  `<ProjectsSection projects={projects} />`
);
fs.writeFileSync(pageFile, pageContent);
console.log("page.tsx updated OK");

console.log("DONE");
