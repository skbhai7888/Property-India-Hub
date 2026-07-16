path = "app/page.tsx"
with open(path, "r") as f:
    content = f.read()

old = '''      posters.forEach((p: any) => { if (p.phone) phoneMap[p.id] = p.phone; });'''
new = '''      posters.forEach((p: any) => {
        if (p.phone) {
          let cleanPhone = p.phone.replace(/[^0-9]/g, '');
          if (cleanPhone.length === 10) { cleanPhone = '91' + cleanPhone; }
          phoneMap[p.id] = cleanPhone;
        }
      });'''

ok = old in content
if ok:
    content = content.replace(old, new)
    with open(path, "w") as f:
        f.write(content)

print("homepage_prefix_fixed:", ok)
