"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login");
        return;
      }
      setUser(data.user);
      setLoading(false);
    };
    load();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) return <main className="min-h-screen flex items-center justify-center"><p>Loading...</p></main>;

  return (
    <main className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow mt-6 text-center">
        <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-2xl font-bold text-white mb-3" style={{ background: "#0a1628" }}>
          {user?.email?.[0]?.toUpperCase()}
        </div>
        <h1 className="text-lg font-bold" style={{ color: "#0a1628" }}>{user?.email}</h1>
        <button onClick={handleLogout} className="mt-6 w-full py-3 rounded-lg font-bold text-white bg-red-600">Logout</button>
      </div>
    </main>
  );
}
