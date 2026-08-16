"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { TIPOS, TIPO_LABELS } from "@/lib/data/constants";

export default function CategoryPills() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tipoActivo = searchParams.get("tipo") ?? "";

  function seleccionarTipo(tipo) {
    const params = new URLSearchParams(searchParams.toString());
    if (tipo) {
      params.set("tipo", tipo);
    } else {
      params.delete("tipo");
    }
    router.push(`/buscar?${params.toString()}`);
  }

  const opciones = [{ value: "", label: "Todo" }, ...TIPOS.map((tipo) => ({
    value: tipo,
    label: TIPO_LABELS[tipo],
  }))];

  return (
    <div className="flex flex-wrap gap-2">
      {opciones.map((opcion) => {
        const activo = opcion.value === tipoActivo;
        return (
          <button
            key={opcion.value || "todo"}
            type="button"
            onClick={() => seleccionarTipo(opcion.value)}
            className={
              activo
                ? "rounded-full bg-primary-500 px-4 py-2 text-sm font-medium text-background"
                : "rounded-full border border-primary-100 bg-background px-4 py-2 text-sm font-medium text-foreground hover:border-primary-300"
            }
          >
            {opcion.label}
          </button>
        );
      })}
    </div>
  );
}
