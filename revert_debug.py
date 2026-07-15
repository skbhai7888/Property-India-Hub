path = "app/projects/[slug]/page.tsx"
with open(path, "r") as f:
    content = f.read()

old = "if (error) { alert('DEBUG ERROR: ' + JSON.stringify(error)); return; }"
new = "if (error) { alert('Something went wrong, please try again.'); console.log(error); return; }"

if old in content:
    content = content.replace(old, new)
    with open(path, "w") as f:
        f.write(content)
    print("SUCCESS - reverted to normal error message")
else:
    print("FAILED - text not found")
