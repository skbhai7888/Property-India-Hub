"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function BottomNav() {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      setLoggedIn(!!data.user);
    };
    checkAuth();
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const isActive = (path: string) => pathname === path;

  const items = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/my-ads", label: "My Ads", icon: "📋" },
    { href: "/partner", label: "Partner", icon: "🤝" },
    { href: "/projects", label: "Projects", icon: "🏢" },
    { href: loggedIn ? "/profile" : "/login", label: loggedIn ? "Profile" : "Login", icon: "👤" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex justify-between items-center px-1 py-2 z-50"
      style={{
        background: "linear-gradient(to top, #ffffff, #fdfaf3)",
        borderTop: "1px solid #e8dfc4",
        boxShadow: "0 -4px 12px rgba(10,22,40,0.08)",
      }}
    >
      {items.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.label}
            href={item.href}
            className="flex-1 flex flex-col items-center gap-0.5 py-1 relative"
          >
            {active && (
              <span
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                style={{ background: "#c9a84c" }}
              />
            )}
            <span className="text-base" style={{ opacity: active ? 1 : 0.5 }}>{item.icon}</span>
            <span
              className="text-[11px] font-bold"
              style={{ color: active ? "#0a1628" : "#9ca3af" }}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
