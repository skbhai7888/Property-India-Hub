path = "app/projects/[slug]/page.tsx"
with open(path, "r") as f:
    content = f.read()

old = '''  const handleSubmit = async () => {
    if (!form.firstName || !form.mobile) { alert('Please fill Name and Mobile'); return; }
    const { error } = await supabase.from('site_visits').insert({
      name: `${form.firstName} ${form.lastName}`.trim(),
      phone: form.mobile,
      project_name: project.name,
      preferred_date: form.visitDate,
      message: form.email ? `Email: ${form.email}` : null,
      status: 'pending'
    });
    if (error) { alert('Something went wrong, please try again.'); console.log(error); return; }
    const msg = `New Site Visit Inquiry!\\nProject: ${project.name}\\nLocation: ${project.location}\\nName: ${form.firstName} ${form.lastName}\\nMobile: ${form.mobile}\\nEmail: ${form.email || 'Not provided'}\\nVisit: ${form.visitDate}`;
    window.open(`https://wa.me/917820008509?text=${encodeURIComponent(msg)}`);
    setForm({...form, submitted: true});
  };'''

new = '''  const handleSubmit = async () => {
    if (!form.firstName || !form.mobile) { alert('Please fill Name and Mobile'); return; }
    let posterName = null;
    let posterPhone = null;
    if (project.user_id) {
      const { data: posterProfile } = await supabase.from('user_profiles').select('name, phone').eq('id', project.user_id).single();
      if (posterProfile) {
        posterName = posterProfile.name;
        posterPhone = posterProfile.phone;
      }
    }
    const { error } = await supabase.from('site_visits').insert({
      name: `${form.firstName} ${form.lastName}`.trim(),
      phone: form.mobile,
      project_name: project.name,
      preferred_date: form.visitDate,
      message: form.email ? `Email: ${form.email}` : null,
      status: 'pending',
      poster_name: posterName,
      poster_phone: posterPhone
    });
    if (error) { alert('Something went wrong, please try again.'); console.log(error); return; }
    const msg = `New Site Visit Inquiry!\\nProject: ${project.name}\\nLocation: ${project.location}\\nName: ${form.firstName} ${form.lastName}\\nMobile: ${form.mobile}\\nEmail: ${form.email || 'Not provided'}\\nVisit: ${form.visitDate}`;
    const whatsappNumber = posterPhone ? posterPhone.replace(/[^0-9]/g, '') : '917820008509';
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`);
    setForm({...form, submitted: true});
  };'''

if old in content:
    content = content.replace(old, new)
    with open(path, "w") as f:
        f.write(content)
    print("SUCCESS - handleSubmit updated with poster name/phone")
else:
    print("FAILED - exact text not found")
