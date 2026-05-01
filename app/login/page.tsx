"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setMsg(error ? error.message : "Controlla la tua email e clicca il link.");
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center px-6">
      <section className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">
          Italian Paris Club
        </p>
        <h1 className="mt-4 text-3xl font-bold">Accedi alla tessera</h1>
        <p className="mt-2 text-sm text-white/60">
          Inserisci la tua email. Riceverai un link di accesso.
        </p>

        <form onSubmit={handleLogin} className="mt-8 grid gap-4">
          <input
            type="email"
            placeholder="La tua email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none placeholder:text-white/30"
          />

          <button className="rounded-xl bg-white px-5 py-4 font-bold text-black">
            Ricevi link
          </button>
        </form>

        {msg ? <p className="mt-5 text-sm text-white/70">{msg}</p> : null}
      </section>
    </main>
  );
}