"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, phone: phone }
      }
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm text-center">
          <h1 className="text-2xl font-bold mb-4" style={{color: '#0a1628'}}>Signup Successful!</h1>
          <p className="text-sm text-gray-600 mb-4">Apna email check karein aur verification link par click karein.</p>
          <a href="/login" style={{color: '#c9a84c'}} className="font-bold">Login page par jaayein</a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center" style={{color: '#0a1628'}}>Signup</h1>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Poora Naam"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="w-full border rounded-lg px-4 py-2 mb-4"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full border rounded-lg px-4 py-2 mb-4"
        />
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
          minLength={6}
          className="w-full border rounded-lg px-4 py-2 mb-4"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-lg font-bold text-white"
          style={{background: '#0a1628'}}
        >
          {loading ? "Signup ho raha hai..." : "Signup"}
        </button>
        <p className="text-sm text-center mt-4">
          Pehle se account hai? <a href="/login" style={{color: '#c9a84c'}}>Login karein</a>
        </p>
      </form>
    </main>
  );
}
