path = "components/ProjectsSection.tsx"
with open(path, "r") as f:
    content = f.read()

old_wa = '''<a href={`https://wa.me/917820008509?text=I am interested in ${project.name}`} className="flex-1 flex items-center justify-center gap-1 text-white text-center py-2 rounded-lg text-xs font-bold" style={{background: '#25D366'}}>'''
new_wa = '''<a href={`https://wa.me/${project.poster_phone || '917820008509'}?text=I am interested in ${project.name}`} className="flex-1 flex items-center justify-center gap-1 text-white text-center py-2 rounded-lg text-xs font-bold" style={{background: '#25D366'}}>'''

wa_ok = old_wa in content
if wa_ok:
    content = content.replace(old_wa, new_wa)

old_tel = '''<a href="tel:+917820008509" className="flex items-center justify-center text-white px-3 py-2 rounded-lg text-xs font-bold" style={{background: '#22c55e'}}>'''
new_tel = '''<a href={`tel:+${project.poster_phone || '917820008509'}`} className="flex items-center justify-center text-white px-3 py-2 rounded-lg text-xs font-bold" style={{background: '#22c55e'}}>'''

tel_ok = old_tel in content
if tel_ok:
    content = content.replace(old_tel, new_tel)

with open(path, "w") as f:
    f.write(content)

print("wa_ok:", wa_ok)
print("tel_ok:", tel_ok)
