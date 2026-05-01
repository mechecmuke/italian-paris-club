"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AuthCallbackPage() {
  const [message, setMessage] = useState("Accesso in corso...");

  useEffect(() => {
    async function run() {
      const code = new URL(window.location.href).searchParams.get("code");

      if (!code) {
        setMessage("Codice mancante.");
        return;
      }

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        setMessage(error.message);
        return;
      }

      window.location.href = "/card";
    }

    run();
  }, []);

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center px-6">
      <p>{message}</p>
    </main>
  );
}