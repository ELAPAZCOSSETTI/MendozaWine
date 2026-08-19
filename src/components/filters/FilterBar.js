import { ZONAS, TAGS_DISPONIBLES, TAG_LABELS } from "@/lib/data/constants";

function CamposFiltro({ tipo, zona, precioMax, tags }) {
  return (
    <>
      <input type="hidden" name="tipo" value={tipo} />

      <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">
        Zona
        <select
          name="zona"
          defaultValue={zona}
          className="rounded-lg border border-primary-100 bg-background px-3 py-2 text-sm font-normal text-foreground"
        >
          <option value="" className="bg-background text-foreground">
            Todas las zonas
          </option>
          {ZONAS.map((z) => (
            <option key={z} value={z} className="bg-background text-foreground">
              {z}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">
        Precio máximo (USD)
        <input
          type="number"
          name="precioMax"
          min={0}
          defaultValue={precioMax}
          placeholder="Sin límite"
          className="rounded-lg border border-primary-100 bg-background px-3 py-2 text-sm font-normal text-foreground"
        />
      </label>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-semibold text-foreground">Tags</legend>
        <div className="flex flex-col gap-1.5">
          {TAGS_DISPONIBLES.map((tag) => (
            <label key={tag} className="flex items-center gap-2 text-sm font-normal text-foreground">
              <input
                type="checkbox"
                name="tags"
                value={tag}
                defaultChecked={tags.includes(tag)}
                className="rounded border-primary-300"
              />
              {TAG_LABELS[tag] ?? tag}
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        className="rounded-full bg-primary-500 px-5 py-2 text-sm font-semibold text-background hover:bg-primary-600"
      >
        Aplicar filtros
      </button>
    </>
  );
}

export default function FilterBar({ filtrosActuales }) {
  const { tipo = "", zona = "", precioMax = "", tags = [] } = filtrosActuales;
  const props = { tipo, zona, precioMax, tags };

  return (
    <>
      <details className="group mb-4 rounded-2xl border border-primary-100 bg-background lg:hidden">
        <summary className="flex list-none cursor-pointer select-none items-center justify-between px-5 py-4 text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
            </svg>
            Filtros
          </span>
          <span className="flex items-center gap-2">
            {zona || precioMax || tags.length > 0 ? (
              <span className="rounded-full bg-primary-500 px-2 py-0.5 text-xs text-background">
                {[zona, precioMax, ...tags].filter(Boolean).length}
              </span>
            ) : null}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180"
            >
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </summary>
        <form
          action="/buscar"
          method="GET"
          className="flex flex-col gap-6 border-t border-primary-100 p-5"
        >
          <CamposFiltro {...props} />
        </form>
      </details>

      <form
        action="/buscar"
        method="GET"
        className="hidden flex-col gap-6 rounded-2xl border border-primary-100 bg-background p-5 lg:flex"
      >
        <CamposFiltro {...props} />
      </form>
    </>
  );
}
