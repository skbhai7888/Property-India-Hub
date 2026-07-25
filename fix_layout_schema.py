import sys
path = "app/layout.tsx"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

def must_have_one(text, label):
    n = c.count(text)
    if n != 1:
        print("FAILED at " + label + ": found " + str(n) + " occurrences (expected 1)")
        sys.exit(1)

# 1. Expand metadata block: add openGraph + other tags
old_meta_end = '''export const metadata: Metadata = {
  title: "Property India Hub - Real Estate Projects in NCR, UP, Rajasthan & Uttarakhand",
  description: "Property India Hub offers verified residential and commercial property listings across Noida, Greater Noida, Ghaziabad, Mathura, Vrindavan, Ayodhya, Jageshwar Dham, Behror, and more. Book a free site visit today.",
};'''
must_have_one(old_meta_end, "metadata-block")
new_meta = '''export const metadata: Metadata = {
  title: "Property India Hub - Real Estate Projects in NCR, UP, Rajasthan & Uttarakhand",
  description: "Property India Hub offers verified residential and commercial property listings across Noida, Greater Noida, Ghaziabad, Mathura, Vrindavan, Ayodhya, Jageshwar Dham, Behror, and more. Book a free site visit today.",
  metadataBase: new URL("https://property-india-hub.vercel.app"),
  openGraph: {
    title: "Property India Hub - Real Estate Projects Across India",
    description: "Verified residential and commercial property listings across NCR, Uttar Pradesh, Rajasthan, and Uttarakhand. Book a free site visit today.",
    url: "https://property-india-hub.vercel.app",
    siteName: "Property India Hub",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Property India Hub - Real Estate Projects Across India",
    description: "Verified residential and commercial property listings across India.",
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Property India Hub",
  url: "https://property-india-hub.vercel.app",
  logo: "https://property-india-hub.vercel.app/favicon.ico",
  telephone: "+91-7820008509",
  email: "propertyindiahubs@gmail.com",
  areaServed: ["NCR", "Uttar Pradesh", "Rajasthan", "Uttarakhand"],
  sameAs: [
    "https://instagram.com/propertyindiahub",
    "https://facebook.com/propertyindiahub",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Property India Hub",
  url: "https://property-india-hub.vercel.app",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://property-india-hub.vercel.app/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};'''
c = c.replace(old_meta_end, new_meta)

# 2. Insert schema scripts right after <body ...> opening tag
old_body = '<body className="min-h-full flex flex-col pb-16">{children}<BottomNav /></body>'
must_have_one(old_body, "body-tag")
new_body = '''<body className="min-h-full flex flex-col pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}<BottomNav /></body>'''
c = c.replace(old_body, new_body)

with open(path, "w", encoding="utf-8") as f:
    f.write(c)
print("DONE_LAYOUT_SCHEMA")
