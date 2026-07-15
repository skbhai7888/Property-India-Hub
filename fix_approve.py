path = "app/admin/page.tsx"
with open(path, "r") as f:
    content = f.read()

old = '''    const { error: insertErr } = await supabase.from("projects").insert({
      slug: finalSlug, name: ad.name, title: ad.title, location: ad.location,
      price: ad.price, tag: ad.tag, type: ad.type, builder: ad.builder,
      rera: ad.rera, region: ad.region, map_link: ad.map_link,
      description: ad.description, sizes: ad.sizes, amenities: ad.amenities,
      highlights: ad.highlights, payment: ad.payment,
      image: ad.image, gallery_images: ad.gallery_images, video_url: ad.video_url,
      status: "active", source: "user"
    });'''

new = '''    const { error: insertErr } = await supabase.from("projects").insert({
      slug: finalSlug, name: ad.name, title: ad.title, location: ad.location,
      price: ad.price, tag: ad.tag, type: ad.type, builder: ad.builder,
      rera: ad.rera, region: ad.region, map_link: ad.map_link,
      description: ad.description, sizes: ad.sizes, amenities: ad.amenities,
      highlights: ad.highlights, payment: ad.payment,
      image: ad.image, gallery_images: ad.gallery_images, video_url: ad.video_url,
      status: "active", source: "user", user_id: ad.user_id
    });'''

if old in content:
    content = content.replace(old, new)
    with open(path, "w") as f:
        f.write(content)
    print("SUCCESS - approveAd updated to save user_id")
else:
    print("FAILED - exact text not found")
