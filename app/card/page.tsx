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

  return (
    <div style={{ padding: 40 }}>
      <h1>Tessera</h1>
      <p>{email}</p>
      {qr ? <img src={qr} alt="QR Code" style={{ width: 280, height: 280 }} /> : <p>Caricamento...</p>}
    </div>
  );
}