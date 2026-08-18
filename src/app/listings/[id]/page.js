import { notFound } from "next/navigation";
import Gallery from "@/components/listings/Gallery";
import Badge from "@/components/ui/Badge";
import ListingGrid from "@/components/listings/ListingGrid";
import { TAG_LABELS, TIPO_LABELS } from "@/lib/data/constants";
import { getListingById, getListings } from "@/lib/repositories/listings";

function datosPracticos(listing) {
  const d = listing.detalles ?? {};

  if (listing.type === "bodega") {
    return [
      d.varietales?.length && { label: "Varietales", value: d.varietales.join(", ") },
      d.duracionVisitaMin && { label: "Duración de la visita", value: `${d.duracionVisitaMin} min` },
      { label: "Reserva", value: d.reservaRequerida ? "Requiere reserva previa" : "No requiere reserva" },
    ].filter(Boolean);
  }

  if (listing.type === "restaurante") {
    return [
      d.tipoCocina && { label: "Tipo de cocina", value: d.tipoCocina },
      {
        label: "Menú paso a paso",
        value: d.menuPasoAPaso ? `Sí, ${d.pasos} pasos` : "No ofrece",
      },
    ].filter(Boolean);
  }

  return [
    d.duracionHoras && { label: "Duración", value: `${d.duracionHoras} hs` },
    d.dificultad && { label: "Dificultad", value: d.dificultad },
    { label: "Traslado", value: d.incluyeTraslado ? "Incluido" : "No incluido" },
  ].filter(Boolean);
}

export default async function ListingDetalle({ params }) {
  const { id } = await params;
  const listing = await getListingById(id);

  if (!listing) {
    notFound();
  }

  const { items: enLaZona } = await getListings({ zona: listing.zona, pageSize: 4 });
  const sugeridos = enLaZona.filter((l) => l.id !== listing.id).slice(0, 3);
  const practicos = datosPracticos(listing);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Gallery imagenes={listing.imagenes} alt={listing.nombre} />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-8">
          <div>
            <span className="text-sm font-semibold text-primary-600 dark:text-primary-300">
              {TIPO_LABELS[listing.type]}
            </span>
            <h1 className="mt-1 text-3xl font-bold text-foreground">{listing.nombre}</h1>
            <p className="mt-1 text-stone-500">
              {listing.zona} · {listing.direccion}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge variant="rating" label={`★ ${listing.rating.toFixed(1)} (${listing.reviews} reseñas)`} />
              {listing.tags.map((tag) => (
                <Badge key={tag} label={TAG_LABELS[tag] ?? tag} />
              ))}
            </div>
          </div>

          <p className="leading-relaxed text-foreground">{listing.descripcionLarga}</p>

          <div className="border-t border-primary-100 pt-6">
            <h2 className="text-lg font-semibold text-foreground">Lo que ofrece</h2>
            <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {listing.tags.map((tag) => (
                <li key={tag} className="flex items-center gap-2 text-sm text-foreground">
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-4 w-4 shrink-0 text-primary-500"
                  >
                    <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {TAG_LABELS[tag] ?? tag}
                </li>
              ))}
            </ul>
          </div>

          {practicos.length > 0 && (
            <div className="border-t border-primary-100 pt-6">
              <h2 className="text-lg font-semibold text-foreground">Datos prácticos</h2>
              <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                {practicos.map((item) => (
                  <div key={item.label}>
                    <dt className="text-xs uppercase tracking-wide text-stone-500">{item.label}</dt>
                    <dd className="mt-0.5 text-sm text-foreground">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="border-t border-primary-100 pt-6">
            <h2 className="text-lg font-semibold text-foreground">Ubicación y horario</h2>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wide text-stone-500">Dirección</dt>
                <dd className="mt-0.5 text-sm text-foreground">
                  {listing.direccion} · {listing.zona}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-stone-500">Horario</dt>
                <dd className="mt-0.5 text-sm text-foreground">{listing.horario}</dd>
              </div>
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-primary-100 bg-background p-5 shadow-sm lg:sticky lg:top-24">
          <p className="text-2xl font-bold text-primary-700 dark:text-primary-300">
            USD {listing.precioDesde}
            <span className="text-sm font-normal text-stone-500"> desde / {listing.rangoPrecio}</span>
          </p>
          <p className="mt-1 text-sm text-stone-500">
            ★ {listing.rating.toFixed(1)} · {listing.reviews} reseñas
          </p>

          {practicos.length > 0 && (
            <ul className="mt-4 flex flex-col gap-2 border-t border-primary-100 pt-4 text-sm text-foreground">
              {practicos.slice(0, 3).map((item) => (
                <li key={item.label} className="flex justify-between gap-3">
                  <span className="text-stone-500">{item.label}</span>
                  <span className="text-right font-medium">{item.value}</span>
                </li>
              ))}
            </ul>
          )}

          <button
            type="button"
            disabled
            className="mt-5 w-full cursor-not-allowed rounded-full bg-primary-500/50 px-5 py-3 text-sm font-semibold text-background"
          >
            Reservar (muy pronto)
          </button>
          <p className="mt-3 text-xs text-stone-500">
            Esta etapa de BodegaPass es solo de descubrimiento — la reserva en
            línea todavía no está disponible.
          </p>
        </aside>
      </div>

      {sugeridos.length > 0 && (
        <div className="mt-16 border-t border-primary-100 pt-10">
          <h2 className="mb-6 text-2xl font-semibold text-foreground">
            También te puede interesar en {listing.zona}
          </h2>
          <ListingGrid listings={sugeridos} />
        </div>
      )}
    </main>
  );
}
