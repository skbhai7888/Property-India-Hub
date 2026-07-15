path = "app/admin/SiteVisitsPanel.tsx"
with open(path, "r") as f:
    lines = f.readlines()

new_lines = []
inserted = False
for line in lines:
    if "preferred_date" in line and not inserted:
        indent = line[:len(line) - len(line.lstrip())]
        icon = "\U0001F464"
        poster_block = (
            indent + "{v.poster_name ? (\n"
            + indent + "  <p className=\"text-xs mt-1 font-bold\" style={{color: '#0a1628'}}>" + icon + " Poster: {v.poster_name} ({v.poster_phone})</p>\n"
            + indent + ") : (\n"
            + indent + "  <p className=\"text-xs mt-1 text-gray-400\">" + icon + " Poster: Not linked (admin-added listing)</p>\n"
            + indent + ")}\n"
        )
        new_lines.append(poster_block)
        inserted = True
    new_lines.append(line)

if inserted:
    with open(path, "w") as f:
        f.writelines(new_lines)
    print("SUCCESS - poster info block inserted before preferred_date line")
else:
    print("FAILED - preferred_date line not found at all")
