"use client";

import { useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const params = useSearchParams();
  const id = params.get("id");

  return (
    <div style={{ padding: 40 }}>
      <h1>Verifica</h1>
      <p>ID: {id}</p>
      <p style={{ color: "green", fontWeight: 700 }}>✔ Tessera ATTIVA</p>
    </div>
  );
}