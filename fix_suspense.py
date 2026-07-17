path = "app/page.tsx"
with open(path, "r") as f:
    content = f.read()

old_import = "import ProjectsSection from '../components/ProjectsSection';"
new_import = "import { Suspense } from 'react';\nimport ProjectsSection from '../components/ProjectsSection';"
import_ok = old_import in content
if import_ok:
    content = content.replace(old_import, new_import)

old_use = "<ProjectsSection projects={projectsWithPoster} />"
new_use = "<Suspense fallback={null}><ProjectsSection projects={projectsWithPoster} /></Suspense>"
use_ok = old_use in content
if use_ok:
    content = content.replace(old_use, new_use)

with open(path, "w") as f:
    f.write(content)

print("import_ok:", import_ok)
print("use_ok:", use_ok)
