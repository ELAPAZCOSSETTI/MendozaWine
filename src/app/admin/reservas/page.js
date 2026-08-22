import Link from "next/link";
import BookingActions from "@/components/admin/BookingActions";
import { TIPO_LABELS } from "@/lib/data/constants";
import { getBookings } from "@/lib/repositories/bookings";

const FILTROS = [
  { estado: undefined, label: "Todas" },
  { estado: "pendiente", label: "Pendientes" },
  { estado: "confirmada", label: "Confirmadas" },
  { estado: "cancelada", label: "Canceladas" },
];

const ESTADO_ESTILOS = {
  pendiente: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  confirmada: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  cancelada: "bg-red-500/15 text-red-700 dark:text-red-300",
};

function linkWhatsapp(telefono, nombreListing) {
  const digitos = telefono.replace(/\D/g, "");
  const texto = encodeURIComponent(
    `Hola! Te escribo de ${nombreListing} por tu solicitud de reserva en BodegaPass.`,
  );
  return `https://wa.me/${digitos}?text=${texto}`;
}

export default async function AdminReservasPage({ searchParams }) {
  const { estado } = await searchParams;
  const bookings = await getBookings({ estado });

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-foreground">Reservas</h1>
        <div className="flex gap-2">
          {FILTROS.map((f) => (
            <Link
              key={f.label}
              href={f.estado ? `/admin/reservas?estado=${f.estado}` : "/admin/reservas"}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                (estado ?? undefined) === f.estado
                  ? "bg-primary-500 text-background"
                  : "border border-primary-100 text-foreground hover:border-primary-300"
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>
      </div>
      <p className="mb-6 text-xs text-stone-500">
        Página interna sin autenticación todavía — no compartir el link públicamente mientras se usen datos de clientes reales.
      </p>

      {bookings.length === 0 ? (
        <p className="text-sm text-stone-500">No hay reservas para este filtro.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="flex flex-col gap-3 rounded-2xl border border-primary-100 bg-background p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-foreground">{b.nombreCliente}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${ESTADO_ESTILOS[b.estado]}`}
                  >
                    {b.estado}
                  </span>
                </div>
                <p className="mt-1 text-sm text-stone-500">
                  {TIPO_LABELS[b.listingType]?.replace(/s$/, "")} · {b.listingNombre}
                </p>
                <p className="text-sm text-foreground">
                  {new Date(b.fechaSolicitada).toLocaleDateString("es-AR", { timeZone: "UTC" })} ·{" "}
                  {b.personas} persona{b.personas === 1 ? "" : "s"}
                </p>
                {b.mensaje && <p className="mt-1 text-sm text-stone-500">&ldquo;{b.mensaje}&rdquo;</p>}
                <a
                  href={linkWhatsapp(b.telefonoCliente, b.listingNombre)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm font-medium text-primary-600 hover:underline dark:text-primary-300"
                >
                  Escribir por WhatsApp ({b.telefonoCliente})
                </a>
                {b.emailCliente && <p className="text-sm text-stone-500">{b.emailCliente}</p>}
              </div>

              <BookingActions bookingId={b.id} estado={b.estado} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
