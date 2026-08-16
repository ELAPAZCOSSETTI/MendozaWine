"use client";

import { useState } from "react";

export default function Home() {
  const [dias, setDias] = useState(3);
  const [zona, setZona] = useState("Luján de Cuyo");
  const [presupuesto, setPresupuesto] = useState("Medio");
  const [itinerario, setItinerario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setItinerario(null);

    try {
      const res = await fetch("/api/itinerario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dias: Number(dias), zona, presupuesto }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al generar itinerario");
      setItinerario(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 px-6 py-16">
      <h1 className="text-3xl font-semibold">BodegaPass</h1>
      <p className="text-center text-zinc-500">
        Generá tu itinerario de turismo enológico en Mendoza
      </p>

      <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-4">
        <label className="flex flex-col gap-1">
          Días de estadía
          <input
            type="number"
            min={1}
            max={14}
            value={dias}
            onChange={(e) => setDias(e.target.value)}
            className="rounded border border-zinc-300 px-3 py-2"
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          Zona
          <select
            value={zona}
            onChange={(e) => setZona(e.target.value)}
            className="rounded border border-zinc-300 px-3 py-2"
          >
            <option>Luján de Cuyo</option>
            <option>Valle de Uco</option>
            <option>Maipú</option>
            <option>Ciudad</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          Presupuesto
          <select
            value={presupuesto}
            onChange={(e) => setPresupuesto(e.target.value)}
            className="rounded border border-zinc-300 px-3 py-2"
          >
            <option>Económico</option>
            <option>Medio</option>
            <option>Exclusivo</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-foreground px-5 py-3 text-background disabled:opacity-50"
        >
          {loading ? "Generando..." : "Generar Itinerario"}
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {itinerario && (
        <pre className="w-full max-w-md overflow-auto rounded bg-black/[.04] p-4 text-sm dark:bg-white/[.06]">
          {JSON.stringify(itinerario, null, 2)}
        </pre>
      )}
    </main>
  );
}
