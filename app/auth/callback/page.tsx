import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center px-6">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">Italian Paris Club</p>
        <h1 className="mt-4 text-4xl font-bold leading-tight">
          La tessera digitale per gli italiani a Parigi.
        </h1>
        <p className="mt-4 text-white/60">
          Accedi agli sconti nei ristoranti partner con un QR verificabile.
        </p>

        <div className="mt-8 grid gap-3">
          <Link href="/login" className="rounded-xl bg-white px-5 py-4 text-center font-bold text-black">
            Accedi / Iscriviti
          </Link>
          <Link href="/card" className="rounded-xl border border-white/15 px-5 py-4 text-center font-bold">
            Apri tessera
          </Link>
        </div>
      </section>
    </main>
  );
}