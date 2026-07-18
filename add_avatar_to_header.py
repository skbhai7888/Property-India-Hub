path = "app/page.tsx"
with open(path, "r") as f:
    content = f.read()

old_import = "import HamburgerMenu from '../components/HamburgerMenu';"
new_import = "import HamburgerMenu from '../components/HamburgerMenu';\nimport ProfileAvatar from '../components/ProfileAvatar';"
import_ok = old_import in content
if import_ok:
    content = content.replace(old_import, new_import)

old_wa = '''<WhatsAppIcon /> WA
              </a>
            </div>'''
new_wa = '''<WhatsAppIcon /> WA
              </a>
              <ProfileAvatar />
            </div>'''
wa_ok = old_wa in content
if wa_ok:
    content = content.replace(old_wa, new_wa)

with open(path, "w") as f:
    f.write(content)

print("import_ok:", import_ok)
print("wa_ok:", wa_ok)
