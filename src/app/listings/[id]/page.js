import { notFound } from "next/navigation";
import Gallery from "@/components/listings/Gallery";
import Badge from "@/components/ui/Badge";
import { TAG_LABELS, TIPO_LABELS } from "@/lib/data/constants";
import { getListingById } from "@/lib/repositories/listings";

export default async function ListingDetalle({ params }) {
  const { id } = await params;
  const listing = await getListingById(id);

  if (!listing) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Gallery imagenes={listing.imagenes} alt={listing.nombre} />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <span className="text-sm font-semibold text-primary-600 dark:text-primary-300">
            {TIPO_LABELS[listing.type]}
          </span>
          <h1 className="mt-1 text-3xl font-bold text-foreground">{listing.nombre}</h1>
          <p className="mt-1 text-stone-500">
            {listing.zona} · {listing.direccion}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge variant="rating" label={`★ ${listing.rating.toFixed(1)} (${listing.reviews})`} />
            {listing.tags.map((tag) => (
              <Badge key={tag} label={TAG_LABELS[tag] ?? tag} />
            ))}
          </div>

          <p className="mt-6 leading-relaxed text-foreground">{listing.descripcionLarga}</p>

          <p className="mt-6 text-sm text-stone-500">
            <span className="font-semibold text-foreground">Horario:</span>{" "}
            {listing.horario}
          </p>
        </div>

        <aside className="h-fit rounded-2xl border border-primary-100 bg-background p-5 shadow-sm">
          <p className="text-2xl font-bold text-primary-700 dark:text-primary-300">
            USD {listing.precioDesde}
            <span className="text-sm font-normal text-stone-500"> desde / {listing.rangoPrecio}</span>
          </p>
          <p className="mt-4 text-sm text-stone-500">
            Esta etapa de BodegaPass es solo de descubrimiento — la reserva en
            línea todavía no está disponible.
          </p>
        </aside>
      </div>
    </main>
  );
}
