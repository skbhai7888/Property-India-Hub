const fs = require('fs');
const file = 'components/ProjectsSection.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldFilter = `  const filtered = projects.filter((p: any) => {
    const term = searchTerm.toLowerCase();
    return (
      (p.location && p.location.toLowerCase().includes(term)) ||
      (p.type && p.type.toLowerCase().includes(term)) ||
      (p.name && p.name.toLowerCase().includes(term)) ||
      (p.title && p.title.toLowerCase().includes(term))
    );
  });`;

const newFilter = `  const filtered = projects.filter((p: any) => {
    const term = searchTerm.toLowerCase();
    return (
      (p.location && p.location.toLowerCase().includes(term)) ||
      (p.type && p.type.toLowerCase().includes(term)) ||
      (p.name && p.name.toLowerCase().includes(term)) ||
      (p.title && p.title.toLowerCase().includes(term)) ||
      (p.description && p.description.toLowerCase().includes(term))
    );
  });`;

if (content.includes(oldFilter)) {
  content = content.replace(oldFilter, newFilter);
  console.log("filter updated to include description OK");
} else {
  console.log("WARNING: filter block not found");
}

const oldInput = `      <div className="mb-6 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Location, type ya naam se search karein..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border rounded-full px-4 py-3 text-sm shadow-sm"
          style={{ borderColor: '#c9a84c' }}
        />
      </div>`;

const newInput = `      <div className="mb-6 max-w-xl mx-auto relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: '16px' }}>🔍</span>
        <input
          type="text"
          placeholder="Search property"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border rounded-full pl-11 pr-4 py-3 text-sm shadow-sm"
          style={{ borderColor: '#c9a84c' }}
        />
      </div>`;

if (content.includes(oldInput)) {
  content = content.replace(oldInput, newInput);
  console.log("search input updated with icon + placeholder OK");
} else {
  console.log("WARNING: input block not found");
}

fs.writeFileSync(file, content);
console.log("DONE");
