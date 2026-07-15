path = "app/admin/page.tsx"
with open(path, "r") as f:
    content = f.read()

changes_made = []

# 1. Add import for SiteVisitsPanel
old1 = 'import { supabase } from "../../lib/supabase";'
new1 = 'import { supabase } from "../../lib/supabase";\nimport SiteVisitsPanel from "./SiteVisitsPanel";'
if old1 in content:
    content = content.replace(old1, new1, 1)
    changes_made.append("import added")
else:
    print("STEP 1 FAILED - import line not found")

# 2. Add "siteVisits" to view type union
old2 = '''useState<"main" | "allUsers" | "normalUsers" | "partners" | "userAds" | "pendingList" | "approvedList" | "rejectedList" | "partnerPending" | "partnerRejected">("main");'''
new2 = '''useState<"main" | "allUsers" | "normalUsers" | "partners" | "userAds" | "pendingList" | "approvedList" | "rejectedList" | "partnerPending" | "partnerRejected" | "siteVisits">("main");'''
if old2 in content:
    content = content.replace(old2, new2, 1)
    changes_made.append("view type updated")
else:
    print("STEP 2 FAILED - view type line not found")

# 3. Add promote-admin state variables after commissionNote
old3 = '  const [commissionNote, setCommissionNote] = useState("");'
new3 = old3 + '\n  const [promoteEmail, setPromoteEmail] = useState("");\n  const [promoteMsg, setPromoteMsg] = useState("");\n\n  async function handlePromote() {\n    if (!promoteEmail) return;\n    const { data, error } = await supabase.rpc("promote_to_admin", { target_email: promoteEmail });\n    if (error) { setPromoteMsg("Error: " + error.message); return; }\n    setPromoteMsg(data);\n    setPromoteEmail("");\n  }'
if old3 in content:
    content = content.replace(old3, new3, 1)
    changes_made.append("promote admin state + function added")
else:
    print("STEP 3 FAILED - commissionNote line not found")

# 4. Add Site Visits button in stats grid (after Normal Users button)
old4 = '''          <button onClick={() => setView("normalUsers")} className="p-4 bg-white rounded-xl shadow text-center">
            <p className="font-bold text-xl" style={{color: "#c9a84c"}}>{normalUsers.length}</p>
            <p className="text-xs text-gray-500">Normal Users</p>
          </button>
        </div>'''
new4 = '''          <button onClick={() => setView("normalUsers")} className="p-4 bg-white rounded-xl shadow text-center">
            <p className="font-bold text-xl" style={{color: "#c9a84c"}}>{normalUsers.length}</p>
            <p className="text-xs text-gray-500">Normal Users</p>
          </button>
          <button onClick={() => setView("siteVisits")} className="p-4 bg-white rounded-xl shadow text-center" style={{border: "2px solid #0a1628"}}>
            <p className="font-bold text-xl" style={{color: "#0a1628"}}>🏠</p>
            <p className="text-xs text-gray-500">Site Visit Requests</p>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h3 className="font-bold mb-2" style={{color: "#0a1628"}}>👑 Make Someone Admin</h3>
          <p className="text-xs text-gray-500 mb-3">Enter the email of a user who has already signed up to give them admin access.</p>
          <div className="flex gap-2">
            <input placeholder="user@email.com" value={promoteEmail} onChange={e => setPromoteEmail(e.target.value)}
              className="flex-1 border rounded-lg p-2 text-sm" style={{borderColor: "#0a1628"}} />
            <button onClick={handlePromote} className="px-4 py-2 rounded-lg font-bold text-sm text-white" style={{background: "#0a1628"}}>Make Admin</button>
          </div>
          {promoteMsg && <p className="text-xs mt-2 font-bold" style={{color: promoteMsg.includes("Error") || promoteMsg.includes("not found") ? "#b91c1c" : "#16a34a"}}>{promoteMsg}</p>}
        </div>'''
if old4 in content:
    content = content.replace(old4, new4, 1)
    changes_made.append("Site Visits button + Make Admin card added")
else:
    print("STEP 4 FAILED - normalUsers button block not found")

# 5. Add the siteVisits view block, before pendingList/rejectedList check
old5 = '  if (view === "pendingList" || view === "rejectedList") {'
new5 = '''  if (view === "siteVisits") {
    return (
      <div className="min-h-screen" style={{background: "#f8f9fa"}}>
        <div className="max-w-4xl mx-auto p-4">
          <button onClick={() => setView("main")} className="text-sm font-bold mb-4" style={{color: "#0a1628"}}>← Back to Dashboard</button>
          <SiteVisitsPanel />
        </div>
      </div>
    );
  }

''' + old5
if old5 in content:
    content = content.replace(old5, new5, 1)
    changes_made.append("siteVisits view block added")
else:
    print("STEP 5 FAILED - pendingList check not found")

with open(path, "w") as f:
    f.write(content)

print("\n--- SUMMARY ---")
for c in changes_made:
    print("✅ " + c)
print(f"\nTotal changes applied: {len(changes_made)} / 5")
