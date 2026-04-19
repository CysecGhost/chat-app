"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      console.error("All field are required!");
    }

    setLoading(true);

    // POST to /api/auth/login with credentials
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      console.error("Invalid credentials");
      setLoading(false);
      return;
    }

    setLoading(false);

    // redirect to home
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#0a0a0a]">
      <div className="w-full max-w-sm border border-[#00ff88]/20 p-8 bg-[#0d0d0d]">
        <h1 className="text-2xl font-bold tracking-widest uppercase text-[#00ff88] mb-1 [font-family:var(--font-syne)]">
          LOGIN
        </h1>
        <p className="text-[#ffffff30] text-xs mb-8 [font-family:var(--font-mono)]">
          enter credentials to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
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
            {loading ? "AUTHENTICATING..." : "LOGIN"}
          </button>
        </form>

        <p className="text-center text-xs text-[#ffffff30] mt-6 [font-family:var(--font-mono)]">
          no account?{" "}
          <a href="/signup" className="text-[#00ff88] hover:underline">
            signup
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
