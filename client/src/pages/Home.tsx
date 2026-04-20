import { useEffect, useState } from "react";

type Health = { status: string; uptime: number };

export default function Home() {
  const [health, setHealth] = useState<Health | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.statusText))))
      .then(setHealth)
      .catch((e: Error) => setError(e.message));
  }, []);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Helpdesk is running</h1>
      <p className="text-slate-600">
        Scaffolded with Bun + Express + React + Vite + Tailwind.
      </p>
      <div className="rounded border border-slate-200 bg-white p-4">
        <h2 className="font-medium mb-2">Server /health</h2>
        {health && (
          <pre className="text-sm text-slate-700">{JSON.stringify(health, null, 2)}</pre>
        )}
        {error && <p className="text-sm text-red-600">Error: {error}</p>}
        {!health && !error && <p className="text-sm text-slate-500">Checking…</p>}
      </div>
    </section>
  );
}
