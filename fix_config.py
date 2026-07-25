import sys
path = "next.config.ts"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()
old = '''const nextConfig: NextConfig = {
  /* config options here */
};'''
if old not in c:
    print("FAILED: config block mismatch")
    sys.exit(1)
new = '''const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};'''
c = c.replace(old, new)
with open(path, "w", encoding="utf-8") as f:
    f.write(c)
print("DONE_CONFIG")
