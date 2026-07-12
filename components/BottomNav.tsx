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

  const handleProjectsClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("projects-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const items = [
    { href: "/", label: "Home" },
    { href: "/my-ads", label: "My Ads" },
    { href: "/partner", label: "Partner" },
    { href: "/#projects-section", label: "Projects", onClick: handleProjectsClick },
    { href: loggedIn ? "/profile" : "/login", label: loggedIn ? "Profile" : "Login" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg flex justify-between items-center px-2 py-2 z-50">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={item.onClick}
          className="flex-1 text-center py-1"
        >
          <span
            className={`text-xs font-bold ${isActive(item.href) ? "" : "text-gray-500"}`}
            style={isActive(item.href) ? { color: "#0a1628" } : {}}
          >
            {item.label}
          </span>
        </Link>
      ))}
    </nav>
  );
}
