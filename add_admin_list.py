path = "app/admin/page.tsx"
with open(path, "r") as f:
    content = f.read()

# 1. Add admins state
old_state = 'const [promoteMsg, setPromoteMsg] = useState("");'
new_state = '''const [promoteMsg, setPromoteMsg] = useState("");
  const [admins, setAdmins] = useState<any[]>([]);'''
state_ok = old_state in content
if state_ok:
    content = content.replace(old_state, new_state)

# 2. Add loadAdmins function + call it inside handlePromote after success, and add a standalone loader
old_promote_fn = '''async function handlePromote() {
    if (!promoteEmail) return;
    const { data, error } = await supabase.rpc("promote_to_admin", { target_email: promoteEmail });
    if (error) { setPromoteMsg("Error: " + error.message); return; }
    setPromoteMsg(data);
    setPromoteEmail("");
  }'''
new_promote_fn = '''async function handlePromote() {
    if (!promoteEmail) return;
    const { data, error } = await supabase.rpc("promote_to_admin", { target_email: promoteEmail });
    if (error) { setPromoteMsg("Error: " + error.message); return; }
    setPromoteMsg(data);
    setPromoteEmail("");
    loadAdmins();
  }

  async function loadAdmins() {
    const { data } = await supabase.from("user_profiles").select("id, name, phone, role").eq("role", "admin");
    setAdmins(data || []);
  }

  async function handleDemote(id: string) {
    if (!confirm("Are you sure you want to remove admin access for this user?")) return;
    const { data, error } = await supabase.rpc("demote_admin_by_id", { target_id: id });
    if (error) { alert("Error: " + error.message); return; }
    loadAdmins();
  }'''
promote_ok = old_promote_fn in content
if promote_ok:
    content = content.replace(old_promote_fn, new_promote_fn)

# 3. Call loadAdmins() inside checkAdminAndLoad
old_check_end = 'if (profile?.role !== "admin") { router.push("/"); return; }\n    setChecking(false);'
new_check_end = 'if (profile?.role !== "admin") { router.push("/"); return; }\n    setChecking(false);\n    loadAdmins();'
check_ok = old_check_end in content
if check_ok:
    content = content.replace(old_check_end, new_check_end)

# 4. Add the Current Admins UI block right after the Make Someone Admin card's closing </div>
old_ui = '''{promoteMsg && <p className="text-xs mt-2 font-bold" style={{color: promoteMsg.includes("Error") || promoteMsg.includes("not found") ? "#b91c1c" : "#16a34a"}}>{promoteMsg}</p>}
      </div>'''
new_ui = '''{promoteMsg && <p className="text-xs mt-2 font-bold" style={{color: promoteMsg.includes("Error") || promoteMsg.includes("not found") ? "#b91c1c" : "#16a34a"}}>{promoteMsg}</p>}

        <h4 className="text-sm font-bold mt-4 mb-2" style={{color: "#0a1628"}}>Current Admins</h4>
        <div className="flex flex-col gap-2">
          {admins.map(a => (
            <div key={a.id} className="flex justify-between items-center border rounded-lg p-2 text-sm">
              <div>
                <p className="font-bold">{a.name || "No name"}</p>
                <p className="text-xs text-gray-500">{a.phone}</p>
              </div>
              <button onClick={() => handleDemote(a.id)} className="text-xs px-3 py-1 rounded-lg font-bold text-white" style={{background: "#b91c1c"}}>Remove Admin</button>
            </div>
          ))}
          {admins.length === 0 && <p className="text-xs text-gray-400">No admins found.</p>}
        </div>
      </div>'''
ui_ok = old_ui in content
if ui_ok:
    content = content.replace(old_ui, new_ui)

with open(path, "w") as f:
    f.write(content)

print("state_ok:", state_ok)
print("promote_ok:", promote_ok)
print("check_ok:", check_ok)
print("ui_ok:", ui_ok)
