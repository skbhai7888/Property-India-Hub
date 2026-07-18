"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function ProfileAvatar() {
  const [imageUrl, setImageUrl] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return;
      setLoggedIn(true);
      const { data: profile } = await supabase.from("user_profiles").select("profile_image").eq("id", data.user.id).single();
      if (profile && profile.profile_image) {
        setImageUrl(profile.profile_image);
      }
    };
    load();
  }, []);

  if (!loggedIn) {
    return (
      <Link href="/login" className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{background: '#c9a84c'}}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.3 0-9.8 1.6-9.8 4.9V22h19.6v-2.7c0-3.3-6.5-4.9-9.8-4.9z"/></svg>
      </Link>
    );
  }

  return (
    <Link href="/profile" className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border-2" style={{borderColor: '#c9a84c'}}>
      {imageUrl ? (
        <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold" style={{background: '#0a1628'}}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.3 0-9.8 1.6-9.8 4.9V22h19.6v-2.7c0-3.3-6.5-4.9-9.8-4.9z"/></svg>
        </div>
      )}
    </Link>
  );
}
