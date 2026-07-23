import sys
path = "app/projects/[slug]/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    lines = f.readlines()
idx = 132
target = '<main className="min-h-screen bg-gray-50">'
if target not in lines[idx]:
    print("FAILED line133 mismatch: " + lines[idx])
    sys.exit(1)
indent = lines[idx][:len(lines[idx]) - len(lines[idx].lstrip())]
inner = indent + "  "
schema_block = (
    inner + "{project && (\n" +
    inner + "  <script\n" +
    inner + "    type=\"application/ld+json\"\n" +
    inner + "    dangerouslySetInnerHTML={{\n" +
    inner + "      __html: JSON.stringify({\n" +
    inner + "        \"@context\": \"https://schema.org\",\n" +
    inner + "        \"@type\": \"Product\",\n" +
    inner + "        name: project.name,\n" +
    inner + "        description: project.description,\n" +
    inner + "        image: project.image,\n" +
    inner + "        url: `https://property-india-hub.vercel.app/projects/${project.slug}`,\n" +
    inner + "        brand: { \"@type\": \"Organization\", name: \"Property India Hub\" },\n" +
    inner + "        category: project.type,\n" +
    inner + "        offers: {\n" +
    inner + "          \"@type\": \"Offer\",\n" +
    inner + "          price: (project.price || \"\").toString().replace(/[^0-9.]/g, \"\"),\n" +
    inner + "          priceCurrency: \"INR\",\n" +
    inner + "          availability: project.status === \"sold_out\" ? \"https://schema.org/SoldOut\" : \"https://schema.org/InStock\",\n" +
    inner + "          url: `https://property-india-hub.vercel.app/projects/${project.slug}`,\n" +
    inner + "          areaServed: project.location,\n" +
    inner + "        },\n" +
    inner + "        additionalProperty: [\n" +
    inner + "          { \"@type\": \"PropertyValue\", name: \"Location\", value: project.location },\n" +
    inner + "          { \"@type\": \"PropertyValue\", name: \"Builder\", value: project.builder },\n" +
    inner + "          { \"@type\": \"PropertyValue\", name: \"RERA\", value: project.rera },\n" +
    inner + "        ],\n" +
    inner + "      }),\n" +
    inner + "    }}\n" +
    inner + "  />\n" +
    inner + ")}\n"
)
lines.insert(idx + 1, schema_block)
with open(path, "w", encoding="utf-8") as f:
    f.writelines(lines)
print("DONE_SCHEMA")
