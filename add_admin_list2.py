path = "app/admin/page.tsx"
with open(path, "r") as f:
    lines = f.readlines()

target_idx = None
for i, line in enumerate(lines):
    if "promoteMsg &&" in line and "</p>}" in line:
        target_idx = i
        break

if target_idx is None:
    print("FAILED - target line not found")
else:
    indent = lines[target_idx][:len(lines[target_idx]) - len(lines[target_idx].lstrip())]
    block = (
        "\n"
        + indent + '<h4 className="text-sm font-bold mt-4 mb-2" style={{color: "#0a1628"}}>Current Admins</h4>\n'
        + indent + '<div className="flex flex-col gap-2">\n'
        + indent + '  {admins.map(a => (\n'
        + indent + '    <div key={a.id} className="flex justify-between items-center border rounded-lg p-2 text-sm">\n'
        + indent + '      <div>\n'
        + indent + '        <p className="font-bold">{a.name || "No name"}</p>\n'
        + indent + '        <p className="text-xs text-gray-500">{a.phone}</p>\n'
        + indent + '      </div>\n'
        + indent + '      <button onClick={() => handleDemote(a.id)} className="text-xs px-3 py-1 rounded-lg font-bold text-white" style={{background: "#b91c1c"}}>Remove Admin</button>\n'
        + indent + '    </div>\n'
        + indent + '  ))}\n'
        + indent + '  {admins.length === 0 && <p className="text-xs text-gray-400">No admins found.</p>}\n'
        + indent + '</div>\n'
    )
    lines.insert(target_idx + 1, block)
    with open(path, "w") as f:
        f.writelines(lines)
    print("SUCCESS - admin list UI inserted after line", target_idx + 1)
