const fs = require('fs');
const file = 'app/admin/add-project/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldHandleChange = `setForm({ ...form, [e.target.name]: e.target.value });`;
const newHandleChange = `const { name, value } = e.target;
    if (name === "name") {
      const autoSlug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setForm({ ...form, name: value, slug: autoSlug });
    } else {
      setForm({ ...form, [name]: value });
    }`;

if (content.includes(oldHandleChange)) {
  content = content.replace(oldHandleChange, newHandleChange);
  console.log("handleChange updated OK");
} else {
  console.log("WARNING: handleChange pattern not found");
}

const oldSlugInput = `<input name="slug" placeholder="Slug (e.g. green-valley-homes)" onChange={handleChange} required className="w-full border rounded-lg px-3 py-2" />`;
const newSlugInput = `<input name="slug" value={form.slug} placeholder="Auto-generated from Project Name" readOnly required className="w-full border rounded-lg px-3 py-2 bg-gray-100" />`;

if (content.includes(oldSlugInput)) {
  content = content.replace(oldSlugInput, newSlugInput);
  console.log("slug input updated OK");
} else {
  console.log("WARNING: slug input pattern not found");
}

fs.writeFileSync(file, content);
console.log("DONE - file saved");
