const fs = require('fs');
const file = 'components/ProjectsSection.tsx';
let content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

const startIdx = lines.findIndex(l => l.includes('const filtered = projects.filter'));
let depth = 0;
let started = false;
let endIdx = -1;
for (let i = startIdx; i < lines.length; i++) {
  for (const ch of lines[i]) {
    if (ch === '{') { depth++; started = true; }
    if (ch === '}') depth--;
  }
  if (started && depth === 0) { endIdx = i; break; }
}

console.log("Filter block found from line", startIdx + 1, "to", endIdx + 1);

const newBlock = [
  '  const filtered = projects.filter((p: any) => {',
  '    if (!searchTerm.trim()) return true;',
  '    const words = searchTerm.toLowerCase().trim().split(/\\s+/);',
  '    const haystack = [p.location, p.type, p.name, p.title, p.description, p.region]',
  '      .filter(Boolean)',
  '      .join(" ")',
  '      .toLowerCase();',
  '    function escapeRegex(str) {',
  '      return str.replace(/[.*+?^{}()|[\\]\\\\]/g, function (m) { return "\\\\" + m; });',
  '    }',
  '    return words.some((w) => {',
  '      const regex = new RegExp("\\\\b" + escapeRegex(w), "i");',
  '      return regex.test(haystack);',
  '    });',
  '  });'
].join('\n');

lines.splice(startIdx, endIdx - startIdx + 1, newBlock);
fs.writeFileSync(file, lines.join('\n'));
console.log("DONE - filter function fully rewritten cleanly");
