"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();
    setLoading(false);
    if (profile?.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center" style={{color: '#0a1628'}}>Login</h1>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border rounded-lg px-4 py-2 mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border rounded-lg px-4 py-2 mb-4"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-lg font-bold text-white"
          style={{background: '#0a1628'}}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-sm text-center mt-4">
          Account nahi hai? <a href="/signup" style={{color: '#c9a84c'}}>Signup karein</a>
        </p>
      </form>
    </main>
  );
}
