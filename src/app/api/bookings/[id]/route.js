import { NextResponse } from "next/server";
import { updateBookingEstado } from "@/lib/repositories/bookings";

const ESTADOS_VALIDOS = ["pendiente", "confirmada", "cancelada"];

export async function PATCH(request, { params }) {
  const { id } = await params;
  const { estado } = await request.json();

  if (!ESTADOS_VALIDOS.includes(estado)) {
    return NextResponse.json(
      { error: `Estado inválido. Debe ser uno de: ${ESTADOS_VALIDOS.join(", ")}` },
      { status: 400 },
    );
  }

  const booking = await updateBookingEstado(id, estado);
  if (!booking) {
    return NextResponse.json({ error: "Reserva no encontrada" }, { status: 404 });
  }

  return NextResponse.json(booking);
}
