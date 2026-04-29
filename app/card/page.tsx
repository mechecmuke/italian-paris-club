"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
const QRCode = require("qrcode");

export default function CardPage() {
  const [qr, setQr] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  async function goToCheckout() {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Errore Stripe checkout");
      }
    } catch (err) {
      console.error(err);
      alert("Errore richiesta checkout");
    }
  }

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
      setLoading(false);
    }

    run();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center px-6">
        <p>Caricamento...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center px-6">
      <section className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">
          Italian Paris Club
        </p>

        <h1 className="mt-4 text-3xl font-bold">
          Tessera digitale
        </h1>

        <p className="mt-3 text-white/60">
          {email}
        </p>

        <div className="mt-6 rounded-2xl bg-white p-4">
          {qr ? (
            <img
              src={qr}
              alt="QR Code"
              className="mx-auto h-[260px] w-[260px]"
            />
          ) : (
            <p className="text-black">
              QR non disponibile
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={goToCheckout}
          className="mt-6 w-full rounded-xl bg-white px-5 py-4 font-bold text-black"
        >
          Attiva abbonamento 9,99€/mese
        </button>
      </section>
    </main>
  );
}