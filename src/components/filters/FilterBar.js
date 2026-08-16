import { ZONAS, TAGS_DISPONIBLES, TAG_LABELS } from "@/lib/data/constants";

export default function FilterBar({ filtrosActuales }) {
  const { tipo = "", zona = "", precioMax = "", tags = [] } = filtrosActuales;

  return (
    <form
      action="/buscar"
      method="GET"
      className="flex flex-col gap-6 rounded-2xl border border-primary-100 bg-background p-5"
    >
      <input type="hidden" name="tipo" value={tipo} />

      <div className="flex flex-col gap-2">
        <label htmlFor="zona" className="text-sm font-semibold text-foreground">
          Zona
        </label>
        <select
          id="zona"
          name="zona"
          defaultValue={zona}
          className="rounded-lg border border-primary-100 bg-background px-3 py-2 text-sm"
        >
          <option value="">Todas las zonas</option>
          {ZONAS.map((z) => (
            <option key={z} value={z}>
              {z}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="precioMax" className="text-sm font-semibold text-foreground">
          Precio máximo (USD)
        </label>
        <input
          id="precioMax"
          type="number"
          name="precioMax"
          min={0}
          defaultValue={precioMax}
          placeholder="Sin límite"
          className="rounded-lg border border-primary-100 bg-background px-3 py-2 text-sm"
        />
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-semibold text-foreground">Tags</legend>
        <div className="flex flex-col gap-1.5">
          {TAGS_DISPONIBLES.map((tag) => (
            <label key={tag} className="flex items-center gap-2 text-sm text-foreground">
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
    </form>
  );
}
