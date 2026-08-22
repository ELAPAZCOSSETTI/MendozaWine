import { NextResponse } from "next/server";
import { createBooking, getBookings } from "@/lib/repositories/bookings";

export async function POST(request) {
  const body = await request.json();
  const { listingId, nombreCliente, telefonoCliente, emailCliente, fechaSolicitada, personas, mensaje } = body;

  if (!listingId || !nombreCliente || !telefonoCliente || !fechaSolicitada) {
    return NextResponse.json(
      { error: "Faltan datos obligatorios (listingId, nombreCliente, telefonoCliente, fechaSolicitada)." },
      { status: 400 },
    );
  }

  const booking = await createBooking({
    listingId,
    nombreCliente,
    telefonoCliente,
    emailCliente,
    fechaSolicitada,
    personas: Number(personas) || 1,
    mensaje,
  });

  return NextResponse.json(booking, { status: 201 });
}

export async function GET(request) {
  const estado = new URL(request.url).searchParams.get("estado") || undefined;
  const bookings = await getBookings({ estado });
  return NextResponse.json(bookings);
}
