import sys
path = "app/projects/[slug]/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    lines = f.readlines()

idx_div = 369  # line 370
if 'w-28 h-24 flex-shrink-0 overflow-hidden' not in lines[idx_div]:
    print("FAILED line370 mismatch: " + lines[idx_div])
    sys.exit(1)
lines[idx_div] = lines[idx_div].replace(
    'w-28 h-24 flex-shrink-0 overflow-hidden"',
    'w-28 h-24 flex-shrink-0 overflow-hidden relative"'
)

idx_img = 370  # line 371
if '<img src={p.image}' not in lines[idx_img]:
    print("FAILED line371 mismatch: " + lines[idx_img])
    sys.exit(1)
indent = lines[idx_img][:len(lines[idx_img]) - len(lines[idx_img].lstrip())]
lines[idx_img] = indent + '<Image src={p.image} alt={p.name} fill sizes="112px" className="object-contain bg-gray-100" />\n'

with open(path, "w", encoding="utf-8") as f:
    f.writelines(lines)

with open(path, "r", encoding="utf-8") as f:
    c = f.read()
if 'import Image from "next/image";' not in c:
    c = 'import Image from "next/image";\n' + c
    with open(path, "w", encoding="utf-8") as f:
        f.write(c)

print("DONE_IMAGE_B")
