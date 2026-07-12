"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../lib/supabase";

const LOGO = "https://res.cloudinary.com/deeolaopc/image/upload/v1782739062/Property_India_Hub_jbrp94.jpg";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      setLoggedIn(!!data.user);
    };
    checkAuth();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setOpen(false);
      router.push(`/?search=${encodeURIComponent(searchTerm)}#projects-section`);
    }
  };

  const items = [
    { href: "/", label: "🏠 Home" },
    { href: "/#projects-section", label: "🏢 All Projects" },
    { href: "/calculator", label: "🧮 EMI Calculator" },
    { href: "/partner", label: "🤝 Broker / Partner" },
    { href: "/about", label: "ℹ️ About Us" },
    { href: "/contact", label: "📞 Contact" },
    { href: loggedIn ? "/profile" : "/login", label: loggedIn ? "👤 My Profile" : "🔐 Login / Register" },
  ];

  return (
    <>
      <button onClick={() => setOpen(true)} className="flex flex-col gap-1.5 p-2" aria-label="Menu">
        <span className="block w-6 h-0.5 bg-white"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="fixed inset-0 bg-black/60" onClick={() => setOpen(false)}></div>
          <div className="relative w-72 h-full shadow-2xl flex flex-col" style={{ background: "#f7f3ea" }}>
            <div className="p-5 flex items-center justify-between" style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a3a6b 100%)" }}>
              <div className="flex items-center gap-3">
                <img src={LOGO} alt="Logo" className="h-12 w-12 rounded-full object-cover border-2" style={{ borderColor: "#c9a84c" }} />
                <div>
                  <p className="text-white font-bold text-sm leading-tight">PROPERTY</p>
                  <p className="text-xs font-semibold tracking-widest" style={{ color: "#c9a84c" }}>— INDIA HUB —</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white text-2xl font-bold">✕</button>
            </div>

            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search property..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                  className="w-full border rounded-full pl-4 pr-10 py-2.5 text-sm shadow-sm bg-white"
                  style={{ borderColor: "#c9a84c" }}
                />
                <button onClick={handleSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-lg">🔍</button>
              </div>
            </div>

            <div className="flex flex-col gap-1 px-3 flex-1 overflow-y-auto">
              {items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-bold text-sm py-3 px-3 rounded-lg hover:bg-white transition"
                  style={{ color: "#0a1628" }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="p-4 text-center text-xs" style={{ color: "#8a7a55" }}>
              +91 7820008509
            </div>
          </div>
        </div>
      )}
    </>
  );
}
