const fs = require('fs');
const file = 'components/ProjectsSection.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldFilter = `  const filtered = projects.filter((p: any) => {
    if (!searchTerm.trim()) return true;
    const words = searchTerm.toLowerCase().trim().split(/\\s+/);
    const haystack = [p.location, p.type, p.name, p.title, p.description, p.region, p.tag, p.highlights, p.amenities]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return words.some((w) => haystack.includes(w));
  });`;

const newFilter = `  const getHaystack = (p: any) =>
    [p.location, p.type, p.name, p.title, p.description, p.region, p.tag, p.highlights, p.amenities]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

  const filtered = projects
    .map((p: any) => {
      const haystack = getHaystack(p);
      if (!searchTerm.trim()) return { p, score: 1, match: true };
      const words = searchTerm.toLowerCase().trim().split(/\\s+/);
      let score = 0;
      let match = false;
      words.forEach((w) => {
        const wordBoundaryRegex = new RegExp("\\\\b" + w.replace(/[.*+?^\${}()|[\\]\\\\\\\\]/g, "\\\\\\\\$&") + "\\\\b", "i");
        if (wordBoundaryRegex.test(haystack)) {
          score += 2;
          match = true;
        } else if (haystack.includes(w)) {
          score += 1;
          match = true;
        }
      });
      return { p, score, match };
    })
    .filter((x: any) => x.match)
    .sort((a: any, b: any) => b.score - a.score)
    .map((x: any) => x.p);`;

if (content.includes(oldFilter)) {
  content = content.replace(oldFilter, newFilter);
  console.log("ranking logic applied OK");
} else {
  console.log("WARNING: old filter block not found, no changes made");
}

fs.writeFileSync(file, content);
console.log("DONE");
