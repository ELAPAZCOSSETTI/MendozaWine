import { ZONAS, TIPOS, TIPO_LABELS } from "@/lib/data/constants";

export default function SearchBar({ zonaInicial = "", tipoInicial = "" }) {
  return (
    <form
      action="/buscar"
      method="GET"
      className="flex w-full flex-col gap-3 rounded-3xl border border-primary-100 bg-background p-3 shadow-md sm:flex-row sm:items-center sm:gap-2 sm:rounded-full"
    >
      <select
        name="zona"
        defaultValue={zonaInicial}
        className="flex-1 rounded-full bg-background px-4 py-2 text-sm text-foreground outline-none"
      >
        <option value="" className="bg-background text-foreground">
          Cualquier zona
        </option>
        {ZONAS.map((zona) => (
          <option key={zona} value={zona} className="bg-background text-foreground">
            {zona}
          </option>
        ))}
      </select>

      <span className="hidden h-6 w-px bg-primary-100 sm:block" aria-hidden="true" />

      <select
        name="tipo"
        defaultValue={tipoInicial}
        className="flex-1 rounded-full bg-background px-4 py-2 text-sm text-foreground outline-none"
      >
        <option value="" className="bg-background text-foreground">
          Cualquier experiencia
        </option>
        {TIPOS.map((tipo) => (
          <option key={tipo} value={tipo} className="bg-background text-foreground">
            {TIPO_LABELS[tipo]}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="rounded-full bg-primary-500 px-6 py-2 text-sm font-semibold text-background transition-colors hover:bg-primary-600"
      >
        Buscar
      </button>
    </form>
  );
}
