"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function VerifyPage() {
  const params = useParams();
  const code = params.code as string;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <div style={{ padding: 40 }}>Verifica...</div>;

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center px-6">
      <section className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">
          Italian Paris Club
        </p>
        <h1 className="mt-4 text-3xl font-bold text-green-400">
          Tessera valida ✅
        </h1>
        <p className="mt-4 text-white/60">Codice: {code}</p>
      </section>
    </main>
  );
}