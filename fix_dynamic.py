path = "app/page.tsx"
with open(path, "r") as f:
    content = f.read()

old = 'export default async function Home() {'
new = 'export const dynamic = "force-dynamic";\n\nexport default async function Home() {'
ok = old in content
if ok:
    content = content.replace(old, new)
    with open(path, "w") as f:
        f.write(content)
print("dynamic_fix_ok:", ok)
