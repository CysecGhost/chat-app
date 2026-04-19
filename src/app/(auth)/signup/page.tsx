"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!name || !email || !password) {
      console.error("All field are required!");
    }

    setLoading(true);

    // POST to /api/auth/signup with credentials
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error(data.error);
      setLoading(false);
      return;
    }

    setLoading(false);

    console.log(data);

    // redirect to login
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#0a0a0a]">
      <div className="w-full max-w-sm border border-[#00ff88]/20 p-8 bg-[#0d0d0d]">
        <h1 className="text-2xl font-bold tracking-widest uppercase text-[#00ff88] mb-1 [font-family:var(--font-syne)]">
          SIGNUP
        </h1>
        <p className="text-[#ffffff30] text-xs mb-8 [font-family:var(--font-mono)]">
          create your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs text-[#ffffff50] mb-2 [font-family:var(--font-mono)]">
              NAME
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#111111] border border-[#ffffff15] hover:border-[#00ff88]/30 focus:border-[#00ff88]/60 outline-none px-4 py-3 text-sm text-white placeholder-[#ffffff20] [font-family:var(--font-mono)] transition-colors"
              placeholder="your name"
            />
          </div>

          <div>
            <label className="block text-xs text-[#ffffff50] mb-2 [font-family:var(--font-mono)]">
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#111111] border border-[#ffffff15] hover:border-[#00ff88]/30 focus:border-[#00ff88]/60 outline-none px-4 py-3 text-sm text-white placeholder-[#ffffff20] [font-family:var(--font-mono)] transition-colors"
              placeholder="ghost@mail.com"
            />
          </div>

          <div>
            <label className="block text-xs text-[#ffffff50] mb-2 [font-family:var(--font-mono)]">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#111111] border border-[#ffffff15] hover:border-[#00ff88]/30 focus:border-[#00ff88]/60 outline-none px-4 py-3 text-sm text-white placeholder-[#ffffff20] [font-family:var(--font-mono)] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#00ff88] text-black text-sm font-bold tracking-widest [font-family:var(--font-mono)] hover:bg-[#00ff88]/80 transition-colors disabled:opacity-30 mt-2"
          >
            {loading ? "CREATING ACCOUNT..." : "SIGNUP"}
          </button>
        </form>

        <p className="text-center text-xs text-[#ffffff30] mt-6 [font-family:var(--font-mono)]">
          have an account?{" "}
          <a href="/login" className="text-[#00ff88] hover:underline">
            login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
