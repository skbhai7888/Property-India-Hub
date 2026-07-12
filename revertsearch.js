const fs = require('fs');
const file = 'app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(`"use client";\nimport { useState } from "react";\n`, '');

fs.writeFileSync(file, content);
console.log("DONE - reverted");
