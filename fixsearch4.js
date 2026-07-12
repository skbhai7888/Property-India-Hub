const fs = require('fs');
const file = 'components/ProjectsSection.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldFilter = `    return words.some((w) => haystack.includes(w));`;

const newFilter = `    return words.some((w) => {
      const escaped = w.replace(/[.*+?^\${}()|[\\]\\\\]/g, "\\\\$&");
      const regex = new RegExp("\\\\b" + escaped, "i");
      return regex.test(haystack);
    });`;

if (content.includes(oldFilter)) {
  content = content.replace(oldFilter, newFilter);
  console.log("word-boundary matching applied OK");
} else {
  console.log("WARNING: old filter line not found");
}

fs.writeFileSync(file, content);
console.log("DONE");
