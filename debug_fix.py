path = "app/projects/[slug]/page.tsx"
with open(path, "r") as f:
    content = f.read()

old = "if (error) { alert('Something went wrong, please try again.'); console.log(error); return; }"
new = "if (error) { alert('DEBUG ERROR: ' + JSON.stringify(error)); return; }"

if old in content:
    content = content.replace(old, new)
    with open(path, "w") as f:
        f.write(content)
    print("SUCCESS - debug alert added")
else:
    print("FAILED - exact text not found, checking...")
