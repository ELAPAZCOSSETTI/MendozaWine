import { generarItinerarioAI } from "@/lib/aiProvider";

export async function POST(request) {
  const { dias, presupuesto, zona } = await request.json();

  if (!dias || !presupuesto || !zona) {
    return Response.json(
      { error: "Faltan parámetros: dias, presupuesto y zona son requeridos." },
      { status: 400 },
    );
  }

  try {
    const itinerario = await generarItinerarioAI({ dias, presupuesto, zona });
    return Response.json(itinerario);
  } catch (error) {
    console.error("Error generando itinerario:", error);
    return Response.json(
      {
        error: "No se pudo generar el itinerario.",
        detail: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    );
  }
}
