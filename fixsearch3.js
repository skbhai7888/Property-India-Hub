const fs = require('fs');
const file = 'components/ProjectsSection.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldFilter = `  const filtered = projects.filter((p: any) => {
    const term = searchTerm.toLowerCase();
    return (
      (p.location && p.location.toLowerCase().includes(term)) ||
      (p.type && p.type.toLowerCase().includes(term)) ||
      (p.name && p.name.toLowerCase().includes(term)) ||
      (p.title && p.title.toLowerCase().includes(term)) ||
      (p.description && p.description.toLowerCase().includes(term))
    );
  });`;

const newFilter = `  const filtered = projects.filter((p: any) => {
    if (!searchTerm.trim()) return true;
    const words = searchTerm.toLowerCase().trim().split(/\\s+/);
    const haystack = [p.location, p.type, p.name, p.title, p.description, p.region]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return words.some((w) => haystack.includes(w));
  });`;

if (content.includes(oldFilter)) {
  content = content.replace(oldFilter, newFilter);
  console.log("filter updated to word-by-word matching OK");
} else {
  console.log("WARNING: filter block not found");
}

fs.writeFileSync(file, content);
console.log("DONE");
