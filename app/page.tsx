import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Italian Paris Club</h1>
      <div style={{ display: "flex", gap: 16 }}>
        <Link href="/login">Login</Link>
        <Link href="/card">Tessera</Link>
      </div>
    </div>
  );
}