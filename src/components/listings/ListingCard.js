import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { TAG_LABELS, TIPO_LABELS } from "@/lib/data/constants";

export default function ListingCard({ listing }) {
  return (
    <Link
      href={`/listings/${listing.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-primary-100 bg-background shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={listing.imagenes[0]}
          alt={listing.nombre}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground">
          {TIPO_LABELS[listing.type]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground">{listing.nombre}</h3>
          <Badge variant="rating" label={`★ ${listing.rating.toFixed(1)}`} />
        </div>

        <p className="text-sm text-stone-500">{listing.zona}</p>
        <p className="line-clamp-2 text-sm text-stone-500">{listing.descripcionCorta}</p>

        <div className="mt-1 flex flex-wrap gap-1.5">
          {listing.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} label={TAG_LABELS[tag] ?? tag} />
          ))}
        </div>

        <p className="mt-auto pt-2 text-sm">
          <span className="font-semibold text-primary-700 dark:text-primary-300">Desde USD {listing.precioDesde}</span>{" "}
          <span className="text-stone-500">· {listing.rangoPrecio}</span>
        </p>
      </div>
    </Link>
  );
}
