"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
const QRCode = require("qrcode");

export default function CardPage() {
  const [qr, setQr] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function run() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      setEmail(user.email || "");

      const url = `${window.location.origin}/verify/${user.id}`;
      const qrCode = await QRCode.toDataURL(url);
      setQr(qrCode);
    }

    run();
  }, []);

  // 🔥 QUESTA È LA FUNZIONE CHE TI MANCAVA
  async function goToCheckout() {
    const res = await fetch("/api/checkout", {
      method: "POST",
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Errore Stripe");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">Tessera</h1>
      <p>{email}</p>

      {qr ? (
        <img src={qr} alt="QR Code" className="w-[260px] h-[260px]" />
      ) : (
        <p>Caricamento...</p>
      )}

      {/* 🔥 BOTTONE STRIPE */}
      <button
        onClick={goToCheckout}
        className="mt-6 w-[260px] rounded-xl bg-white px-5 py-4 font-bold text-black"
      >
        Attiva abbonamento 9,99€/mese
      </button>
    </main>
  );
}