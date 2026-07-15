path = "app/page.tsx"
with open(path, "r") as f:
    content = f.read()

old_fn = '''export default async function Home() {
  const { data: projects } = await supabase.from("projects").select("*");
  return ('''

new_fn = '''export default async function Home() {
  const { data: projects } = await supabase.from("projects").select("*");
  const userIds = Array.from(new Set((projects || []).map((p: any) => p.user_id).filter(Boolean)));
  let phoneMap: Record<string, string> = {};
  if (userIds.length > 0) {
    const { data: posters } = await supabase.from("user_profiles").select("id, phone").in("id", userIds);
    if (posters) {
      posters.forEach((p: any) => { if (p.phone) phoneMap[p.id] = p.phone; });
    }
  }
  const projectsWithPoster = (projects || []).map((p: any) => ({
    ...p,
    poster_phone: p.user_id && phoneMap[p.user_id] ? phoneMap[p.user_id] : null
  }));
  return ('''

fn_ok = old_fn in content
if fn_ok:
    content = content.replace(old_fn, new_fn)

old_comp = "<ProjectsSection projects={projects} />"
new_comp = "<ProjectsSection projects={projectsWithPoster} />"
comp_ok = old_comp in content
if comp_ok:
    content = content.replace(old_comp, new_comp)

with open(path, "w") as f:
    f.write(content)

print("fn_ok:", fn_ok)
print("comp_ok:", comp_ok)

# Now remove floating bottom-right icons block
lines = content.split("\n")
start_idx = None
for i, l in enumerate(lines):
    if "fixed bottom-6 right-4" in l:
        start_idx = i
        break

removed = False
if start_idx is not None:
    a_close_count = 0
    end_idx = None
    for j in range(start_idx, len(lines)):
        if "</a>" in lines[j]:
            a_close_count += 1
            if a_close_count == 2:
                end_idx = j + 1
                break
    if end_idx is not None:
        del lines[start_idx:end_idx+1]
        removed = True

if removed:
    with open(path, "w") as f:
        f.write("\n".join(lines))

print("floating_icons_removed:", removed)
