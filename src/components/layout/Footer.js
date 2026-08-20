import Link from "next/link";
import HomeLink from "@/components/layout/HomeLink";
import { ZONAS, TIPOS, TIPO_LABELS } from "@/lib/data/constants";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-primary-100 bg-primary-900 text-cream-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <span className="text-lg font-bold">BodegaPass</span>
            <p className="mt-3 text-sm text-primary-100/80">
              Turismo enológico en Mendoza: bodegas, restaurantes y experiencias
              en Luján de Cuyo, Valle de Uco, Maipú y Ciudad.
            </p>
          </div>

          <nav>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-primary-100/60">
              Explorar
            </h3>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              <li>
                <HomeLink className="hover:text-accent-300">Inicio</HomeLink>
              </li>
              <li>
                <Link href="/buscar" className="hover:text-accent-300">
                  Buscar
                </Link>
              </li>
              <li>
                <Link href="/itinerario" className="hover:text-accent-300">
                  Itinerario IA
                </Link>
              </li>
            </ul>
          </nav>

          <nav>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-primary-100/60">
              Categorías
            </h3>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {TIPOS.map((tipo) => (
                <li key={tipo}>
                  <Link href={`/buscar?tipo=${tipo}`} className="hover:text-accent-300">
                    {TIPO_LABELS[tipo]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-primary-100/60">
              Zonas
            </h3>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {ZONAS.map((zona) => (
                <li key={zona}>
                  <Link
                    href={`/buscar?zona=${encodeURIComponent(zona)}`}
                    className="hover:text-accent-300"
                  >
                    {zona}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-cream-50/10 pt-6 text-xs text-primary-100/60 sm:flex-row sm:items-start sm:justify-between">
          <p>© {new Date().getFullYear()} BodegaPass. Todos los derechos reservados.</p>
          <p className="sm:max-w-md sm:text-right">
            Los itinerarios de &ldquo;Itinerario IA&rdquo; son generados por un
            modelo de lenguaje y pueden contener imprecisiones — verificá
            horarios y disponibilidad antes de viajar.
          </p>
        </div>
      </div>
    </footer>
  );
}
