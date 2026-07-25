import sys

def fix_file(path):
    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()
    if lines[0].strip() == 'import Image from "next/image";' and lines[1].strip() == '"use client";':
        lines.pop(0)
        lines.insert(1, 'import Image from "next/image";\n')
        with open(path, "w", encoding="utf-8") as f:
            f.writelines(lines)
        print("FIXED: " + path)
    else:
        print("SKIPPED (already ok or different structure): " + path + " | first2: " + repr(lines[0]) + repr(lines[1]))

fix_file("components/ProjectsSection.tsx")
fix_file("app/projects/[slug]/page.tsx")
