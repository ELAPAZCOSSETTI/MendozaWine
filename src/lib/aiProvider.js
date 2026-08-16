import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.AI_API_KEY || "ollama",
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:11434/v1"
      : process.env.AI_BASE_URL,
});

const MODEL = process.env.AI_MODEL || "llama3";

export async function generarItinerarioAI({ dias, presupuesto, zona }) {
  const prompt = `Sos un experto en turismo enológico en Mendoza, Argentina.

REGLAS ESTRICTAS (no las rompas bajo ninguna circunstancia):
1. TODO el itinerario debe transcurrir en Mendoza, Argentina, específicamente en la zona "${zona}" (Luján de Cuyo, Valle de Uco, Maipú o Ciudad de Mendoza). Prohibido mencionar lugares de Buenos Aires o cualquier otra provincia/ciudad (ej: San Telmo, Recoleta, Palermo, etc.).
2. El array "itinerario" debe tener EXACTAMENTE ${dias} elemento(s), con "dia" de 1 a ${dias}. No generes más ni menos días.
3. Cada actividad debe tener los 4 campos completos con contenido real y específico, nunca strings vacíos ("").
4. El presupuesto es "${presupuesto}": ajustá bodegas/restaurantes acorde (Económico = opciones accesibles, Exclusivo = alta gama).

Antes de responder, contá mentalmente: el día 1 tiene su propio objeto, el día 2 tiene otro objeto distinto, y así hasta llegar al día ${dias}. El array "itinerario" final debe tener longitud ${dias}, ni más ni menos.

Devolvé EXCLUSIVAMENTE un JSON válido (sin texto adicional, sin markdown) con esta forma exacta (los valores de ejemplo son solo para mostrar el formato de las claves, generá contenido distinto y real de Mendoza para cada día):
{"itinerario": [{"dia": <número>, "actividades": [{"hora": "<HH:MM>", "nombre": "<nombre real de un lugar en ${zona}, Mendoza>", "tipo": "bodega|restaurante|experiencia", "descripcion": "<descripción breve y específica>"}]}]}`;

  const completion = await client.chat.completions.create({
    model: MODEL,
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.3,
  });

  return JSON.parse(completion.choices[0].message.content);
}
