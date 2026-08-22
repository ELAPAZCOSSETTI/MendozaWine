import db from "@/lib/db";

function mapRowToBooking(row) {
  return {
    id: row.id,
    listingId: row.listing_id,
    listingNombre: row.listing_nombre,
    listingType: row.listing_type,
    nombreCliente: row.nombre_cliente,
    telefonoCliente: row.telefono_cliente,
    emailCliente: row.email_cliente,
    fechaSolicitada: row.fecha_solicitada,
    personas: Number(row.personas),
    mensaje: row.mensaje,
    estado: row.estado,
    createdAt: row.created_at,
  };
}

export async function createBooking({
  listingId,
  nombreCliente,
  telefonoCliente,
  emailCliente,
  fechaSolicitada,
  personas,
  mensaje,
}) {
  const [row] = await db("bookings")
    .insert({
      listing_id: listingId,
      nombre_cliente: nombreCliente,
      telefono_cliente: telefonoCliente,
      email_cliente: emailCliente || null,
      fecha_solicitada: fechaSolicitada,
      personas,
      mensaje: mensaje || null,
    })
    .returning("*");
  return mapRowToBooking(row);
}

export async function getBookings({ estado } = {}) {
  let query = db("bookings")
    .join("listings", "listings.id", "bookings.listing_id")
    .select(
      "bookings.*",
      "listings.nombre as listing_nombre",
      "listings.type as listing_type",
    );
  if (estado) query = query.where("bookings.estado", estado);
  const rows = await query.orderBy("bookings.created_at", "desc");
  return rows.map(mapRowToBooking);
}

export async function updateBookingEstado(id, estado) {
  const [row] = await db("bookings")
    .where({ id })
    .update({ estado, updated_at: db.fn.now() })
    .returning("*");
  return row ? mapRowToBooking(row) : null;
}
