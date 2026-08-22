"use client";

import { useState } from "react";

const HOY = new Date().toISOString().split("T")[0];

export default function BookingForm({ listingId }) {
  const [estado, setEstado] = useState("idle");
  const [error, setError] = useState(null);

  async function alEnviar(e) {
    e.preventDefault();
    setEstado("enviando");
    setError(null);

    const form = new FormData(e.target);
    const body = {
      listingId,
      nombreCliente: form.get("nombreCliente"),
      telefonoCliente: form.get("telefonoCliente"),
      emailCliente: form.get("emailCliente"),
      fechaSolicitada: form.get("fechaSolicitada"),
      personas: form.get("personas"),
      mensaje: form.get("mensaje"),
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "No se pudo enviar la solicitud.");
      }
      setEstado("enviado");
    } catch (err) {
      setError(err.message);
      setEstado("idle");
    }
  }

  if (estado === "enviado") {
    return (
      <div className="mt-5 rounded-2xl border border-primary-100 bg-primary-50/60 p-4 text-sm text-foreground dark:bg-primary-500/10">
        <p className="font-semibold text-primary-700 dark:text-primary-300">¡Solicitud enviada!</p>
        <p className="mt-1 text-stone-500">
          Te vamos a confirmar la disponibilidad por WhatsApp a la brevedad.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={alEnviar} className="mt-5 flex flex-col gap-3 border-t border-primary-100 pt-5">
      <p className="text-sm font-semibold text-foreground">Solicitar reserva</p>

      <input
        name="nombreCliente"
        type="text"
        required
        placeholder="Nombre y apellido"
        className="rounded-xl border border-primary-100 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary-400"
      />
      <input
        name="telefonoCliente"
        type="tel"
        required
        placeholder="WhatsApp (con código de área)"
        className="rounded-xl border border-primary-100 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary-400"
      />
      <input
        name="emailCliente"
        type="email"
        placeholder="Email (opcional)"
        className="rounded-xl border border-primary-100 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary-400"
      />
      <div className="flex gap-3">
        <input
          name="fechaSolicitada"
          type="date"
          required
          min={HOY}
          className="flex-1 rounded-xl border border-primary-100 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary-400"
        />
        <input
          name="personas"
          type="number"
          min={1}
          defaultValue={2}
          required
          className="w-20 rounded-xl border border-primary-100 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary-400"
        />
      </div>
      <textarea
        name="mensaje"
        rows={2}
        placeholder="Comentario (opcional)"
        className="resize-none rounded-xl border border-primary-100 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary-400"
      />

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="mt-1 w-full rounded-full bg-primary-500 px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-primary-500/50"
      >
        {estado === "enviando" ? "Enviando…" : "Solicitar reserva"}
      </button>
      <p className="text-xs text-stone-500">
        Es una solicitud, no una reserva confirmada — te contactamos por WhatsApp para confirmar.
      </p>
    </form>
  );
}
