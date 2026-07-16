import re

# Fix 1: app/page.tsx
path1 = "app/page.tsx"
with open(path1, "r") as f:
    c1 = f.read()
old1 = 'await supabase.from("user_profiles").select("id, phone").in("id", userIds);'
new1 = 'await supabase.from("public_poster_contact").select("id, phone").in("id", userIds);'
ok1 = old1 in c1
if ok1:
    c1 = c1.replace(old1, new1)
    with open(path1, "w") as f:
        f.write(c1)

# Fix 2: app/projects/[slug]/page.tsx
path2 = "app/projects/[slug]/page.tsx"
with open(path2, "r") as f:
    c2 = f.read()
old2 = "await supabase.from('user_profiles').select('phone').eq('id', projectData.user_id).single();"
new2 = "await supabase.from('public_poster_contact').select('phone').eq('id', projectData.user_id).single();"
ok2 = old2 in c2
if ok2:
    c2 = c2.replace(old2, new2)
    with open(path2, "w") as f:
        f.write(c2)

print("page_tsx_fixed:", ok1)
print("project_slug_page_fixed:", ok2)
