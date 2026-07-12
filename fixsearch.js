const fs = require('fs');
const file = 'app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add "use client" and useState import if not present
if (!content.includes('"use client"') && !content.includes("'use client'")) {
  content = `"use client";\nimport { useState } from "react";\n` + content;
  console.log("added use client + useState import");
} else if (!content.includes('useState')) {
  content = content.replace(`import Link from 'next/link';`, `import Link from 'next/link';\nimport { useState } from "react";`);
  console.log("added useState import only");
} else {
  console.log("useState already present, skipping import step");
}

// 2. Add searchTerm state and filtered projects logic right after data fetch
const oldFetch = `const { data: projects } = await supabase.from("projects").select("*");`;
const newFetch = `const { data: projects } = await supabase.from("projects").select("*");`;
// (fetch line unchanged, we add state + filter separately below)

fs.writeFileSync(file, content);
console.log("STEP 1 DONE - saved. Run step 2 next.");
