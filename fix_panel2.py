path = "app/admin/SiteVisitsPanel.tsx"
with open(path, "r") as f:
    content = f.read()

old = '''                    <p className="text-xs text-gray-500 mt-1">📍 {v.project_name}</p>
                    <p className="text-xs mt-1" style={{color: '#c9a84c'}}>📅 {v.preferred_date}</p>'''

new = '''                    <p className="text-xs text-gray-500 mt-1">📍 {v.project_name}</p>
                    {v.poster_name ? (
                      <p className="text-xs mt-1 font-bold" style={{color: '#0a1628'}}>👤 Poster: {v.poster_name} ({v.poster_phone})</p>
                    ) : (
                      <p className="text-xs mt-1 text-gray-400">👤 Poster: Not linked (admin-added listing)</p>
                    )}
                    <p className="text-xs mt-1" style={{color: '#c9a84c'}}>📅 {v.preferred_date}</p>'''

if old in content:
    content = content.replace(old, new)
    with open(path, "w") as f:
        f.write(content)
    print("SUCCESS - poster info block added")
else:
    print("FAILED - exact text not found, checking current state...")
    idx = content.find("preferred_date")
    print(content[max(0,idx-300):idx+100])
