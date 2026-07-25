import sys
path = "components/ProjectsSection.tsx"
with open(path, "r", encoding="utf-8") as f:
    lines = f.readlines()

idx_img = 126  # line 127
if "<img" not in lines[idx_img]:
    print("FAILED line127 mismatch: " + lines[idx_img])
    sys.exit(1)
indent = lines[idx_img][:len(lines[idx_img]) - len(lines[idx_img].lstrip())]
lines[idx_img] = indent + "<Image\n"

idx_alt = 128  # line 129 (alt line)
if "alt={project.name}" not in lines[idx_alt]:
    print("FAILED line129 mismatch: " + lines[idx_alt])
    sys.exit(1)
insert_text = indent + "  fill\n" + indent + "  sizes=\"(max-width: 768px) 100vw, 33vw\"\n"
lines.insert(idx_alt + 1, insert_text)

idx_class = 130  # shifted by 1 after insert
if "w-full h-full object-contain" not in lines[idx_class]:
    print("FAILED className mismatch: " + lines[idx_class])
    sys.exit(1)
lines[idx_class] = lines[idx_class].replace("w-full h-full object-contain", "object-contain")

with open(path, "w", encoding="utf-8") as f:
    f.writelines(lines)

with open(path, "r", encoding="utf-8") as f:
    c = f.read()
if 'import Image from "next/image";' not in c:
    c = 'import Image from "next/image";\n' + c
    with open(path, "w", encoding="utf-8") as f:
        f.write(c)

print("DONE_IMAGE_A")
