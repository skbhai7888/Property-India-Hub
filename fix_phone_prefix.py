path = "app/projects/[slug]/page.tsx"
with open(path, "r") as f:
    content = f.read()

old = "          setPosterPhone(posterProfile.phone.replace(/[^0-9]/g, ''));"
new = '''          let cleanPhone = posterProfile.phone.replace(/[^0-9]/g, '');
          if (cleanPhone.length === 10) { cleanPhone = '91' + cleanPhone; }
          setPosterPhone(cleanPhone);'''

if old in content:
    content = content.replace(old, new)
    with open(path, "w") as f:
        f.write(content)
    print("SUCCESS - phone prefix logic fixed")
else:
    print("FAILED - exact text not found")
