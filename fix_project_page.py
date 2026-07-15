path = "app/projects/[slug]/page.tsx"
with open(path, "r") as f:
    content = f.read()

# Step 1: Add posterPhone state + fetch it in loadProject
old_load = '''  const loadProject = async () => {
    const { data: projectData } = await supabase.from('projects').select('*').eq('slug', slug).single();
    setProject(projectData);
    if (projectData) {'''

new_load = '''  const loadProject = async () => {
    const { data: projectData } = await supabase.from('projects').select('*').eq('slug', slug).single();
    setProject(projectData);
    if (projectData) {
      if (projectData.user_id) {
        const { data: posterProfile } = await supabase.from('user_profiles').select('phone').eq('id', projectData.user_id).single();
        if (posterProfile && posterProfile.phone) {
          setPosterPhone(posterProfile.phone.replace(/[^0-9]/g, ''));
        }
      }'''

if old_load in content:
    content = content.replace(old_load, new_load)
    load_ok = True
else:
    load_ok = False

# Step 2: Add posterPhone useState near other useState declarations (find setProject usage as anchor)
old_state = "const [project, setProject] = useState<any>(null);"
new_state = "const [project, setProject] = useState<any>(null);\n  const [posterPhone, setPosterPhone] = useState('');"
if old_state in content:
    content = content.replace(old_state, new_state)
    state_ok = True
else:
    state_ok = False

# Step 3: Replace all 4 hardcoded number usages
content = content.replace(
    "https://wa.me/?text=${encodeURIComponent(text)}",
    "https://wa.me/${posterPhone || '917820008509'}?text=${encodeURIComponent(text)}"
)
content = content.replace(
    '''href={`https://wa.me/917820008509?text=I am interested in ${project.name}, ${project.location}. Please share details.`}''',
    '''href={`https://wa.me/${posterPhone || '917820008509'}?text=I am interested in ${project.name}, ${project.location}. Please share details.`}'''
)
content = content.replace(
    'href="tel:+917820008509"',
    'href={`tel:+${posterPhone || \'917820008509\'}`}'
)
content = content.replace(
    'href="https://wa.me/917820008509"',
    'href={`https://wa.me/${posterPhone || \'917820008509\'}`}'
)

with open(path, "w") as f:
    f.write(content)

print("load_ok:", load_ok)
print("state_ok:", state_ok)
print("DONE - check counts below")
