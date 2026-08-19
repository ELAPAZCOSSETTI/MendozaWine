"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TIPO_LABELS } from "@/lib/data/constants";

const INTERVALO_MS = 5000;

export default function HighlightsCarousel({ items }) {
  const [indice, setIndice] = useState(0);
  const [enPausa, setEnPausa] = useState(false);
  const cantidad = items.length;

  const irA = useCallback(
    (i) => setIndice(((i % cantidad) + cantidad) % cantidad),
    [cantidad],
  );
  const siguiente = useCallback(() => irA(indice + 1), [indice, irA]);
  const anterior = useCallback(() => irA(indice - 1), [indice, irA]);

  const timerRef = useRef(null);

  useEffect(() => {
    if (enPausa || cantidad <= 1) return;

    const prefiereMenosMovimiento =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefiereMenosMovimiento) return;

    timerRef.current = setInterval(siguiente, INTERVALO_MS);
    return () => clearInterval(timerRef.current);
  }, [enPausa, cantidad, siguiente]);

  if (cantidad === 0) return null;

  const actual = items[indice];

  return (
    <div
      className="group relative overflow-hidden rounded-2xl"
      role="region"
      aria-roledescription="carousel"
      aria-label="Paisajes y experiencias de enoturismo en Mendoza"
      onMouseEnter={() => setEnPausa(true)}
      onMouseLeave={() => setEnPausa(false)}
      onFocus={() => setEnPausa(true)}
      onBlur={() => setEnPausa(false)}
    >
      <Link
        href={`/listings/${actual.id}`}
        className="relative block aspect-[16/9] w-full sm:aspect-[21/9]"
        aria-roledescription="slide"
        aria-label={`${indice + 1} de ${cantidad}: ${actual.nombre}, ${actual.zona}`}
      >
        <Image
          src={actual.imagenes[0]}
          alt={actual.nombre}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary-900/90 via-primary-900/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-5 text-cream-50 sm:p-8">
          <span className="w-fit rounded-full bg-cream-50/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            {TIPO_LABELS[actual.type]} · {actual.zona}
          </span>
          <h3 className="text-xl font-bold sm:text-3xl">{actual.nombre}</h3>
          <p className="max-w-xl text-sm text-cream-50/90 sm:text-base">
            {actual.descripcionCorta}
          </p>
        </div>
      </Link>

      {cantidad > 1 && (
        <>
          <button
            type="button"
            onClick={anterior}
            aria-label="Anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-cream-50/20 p-2 text-cream-50 opacity-100 backdrop-blur transition-opacity hover:bg-cream-50/30 focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={siguiente}
            aria-label="Siguiente"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-cream-50/20 p-2 text-cream-50 opacity-100 backdrop-blur transition-opacity hover:bg-cream-50/30 focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="absolute inset-x-0 bottom-2 flex justify-center gap-2">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => irA(i)}
                aria-label={`Ir a ${item.nombre}`}
                aria-current={i === indice}
                className={
                  i === indice
                    ? "h-2 w-6 rounded-full bg-cream-50 transition-all"
                    : "h-2 w-2 rounded-full bg-cream-50/50 transition-all hover:bg-cream-50/80"
                }
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
