path = "app/admin/page.tsx"
with open(path, "r") as f:
    content = f.read()

# 1. Add selectedPerms state
old_state = 'const [admins, setAdmins] = useState<any[]>([]);'
new_state = '''const [admins, setAdmins] = useState<any[]>([]);
  const [selectedPerms, setSelectedPerms] = useState<string[]>([]);'''
state_ok = old_state in content
if state_ok:
    content = content.replace(old_state, new_state)

# 2. Replace handlePromote to use new function with permissions, add togglePerm helper
old_fn = '''async function handlePromote() {
    if (!promoteEmail) return;
    const { data, error } = await supabase.rpc("promote_to_admin", { target_email: promoteEmail });
    if (error) { setPromoteMsg("Error: " + error.message); return; }
    setPromoteMsg(data);
    setPromoteEmail("");
    loadAdmins();
  }'''
new_fn = '''async function handlePromote() {
    if (!promoteEmail) return;
    const permsObj: Record<string, boolean> = {};
    selectedPerms.forEach(p => { permsObj[p] = true; });
    const { data, error } = await supabase.rpc("promote_to_admin_with_permissions", { target_email: promoteEmail, perms: permsObj });
    if (error) { setPromoteMsg("Error: " + error.message); return; }
    setPromoteMsg(data);
    setPromoteEmail("");
    setSelectedPerms([]);
    loadAdmins();
  }

  function togglePerm(perm: string) {
    setSelectedPerms(prev => prev.includes(perm) ? prev.filter(p => p !== perm) : [...prev, perm]);
  }'''
fn_ok = old_fn in content
if fn_ok:
    content = content.replace(old_fn, new_fn)

# 3. Add checkboxes UI right before the "Make Admin" button div
old_ui = '''<input placeholder="user@email.com" value={promoteEmail} onChange={e => setPromoteEmail(e.target.value)}
              className="flex-1 border rounded-lg p-2 text-sm" style={{borderColor: "#0a1628"}} />
            <button onClick={handlePromote} className="px-4 py-2 rounded-lg font-bold text-sm text-white" style={{background: "#0a1628"}}>Make Admin</button>
          </div>'''
new_ui = '''<input placeholder="user@email.com" value={promoteEmail} onChange={e => setPromoteEmail(e.target.value)}
              className="flex-1 border rounded-lg p-2 text-sm" style={{borderColor: "#0a1628"}} />
            <button onClick={handlePromote} className="px-4 py-2 rounded-lg font-bold text-sm text-white" style={{background: "#0a1628"}}>Make Admin</button>
          </div>

          <p className="text-xs font-semibold mt-3 mb-1" style={{color: "#0a1628"}}>Select access for this admin:</p>
          <div className="grid grid-cols-2 gap-2 mb-2">
            {["property_ads", "partners", "users", "projects", "site_visits", "promote_admin"].map(perm => (
              <label key={perm} className="flex items-center gap-2 text-xs">
                <input type="checkbox" checked={selectedPerms.includes(perm)} onChange={() => togglePerm(perm)} />
                {perm.replace("_", " ")}
              </label>
            ))}
          </div>'''
ui_ok = old_ui in content
if ui_ok:
    content = content.replace(old_ui, new_ui)

with open(path, "w") as f:
    f.write(content)

print("state_ok:", state_ok)
print("fn_ok:", fn_ok)
print("ui_ok:", ui_ok)
