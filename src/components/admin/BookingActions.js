"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookingActions({ bookingId, estado }) {
  const router = useRouter();
  const [cargando, setCargando] = useState(false);

  async function cambiarEstado(nuevoEstado) {
    setCargando(true);
    try {
      await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
      router.refresh();
    } finally {
      setCargando(false);
    }
  }

  if (estado !== "pendiente") {
    return (
      <button
        type="button"
        disabled={cargando}
        onClick={() => cambiarEstado("pendiente")}
        className="rounded-full border border-primary-100 px-3 py-1 text-xs font-medium text-stone-500 transition-colors hover:border-primary-300 disabled:opacity-50"
      >
        Volver a pendiente
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        type="button"
        disabled={cargando}
        onClick={() => cambiarEstado("confirmada")}
        className="rounded-full bg-primary-500 px-3 py-1 text-xs font-semibold text-background transition-colors hover:bg-primary-600 disabled:opacity-50"
      >
        Confirmar
      </button>
      <button
        type="button"
        disabled={cargando}
        onClick={() => cambiarEstado("cancelada")}
        className="rounded-full border border-red-300 px-3 py-1 text-xs font-semibold text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-500/10"
      >
        Cancelar
      </button>
    </div>
  );
}
