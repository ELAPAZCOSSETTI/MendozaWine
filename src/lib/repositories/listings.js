import { LISTINGS } from "@/lib/data/listings";

const DIACRITICOS = /[̀-ͯ]/g;

function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(DIACRITICOS, "");
}

export async function getListings({
  tipo,
  zona,
  tags,
  precioMax,
  q,
  page = 1,
  pageSize = 12,
} = {}) {
  let resultado = LISTINGS;

  if (tipo) {
    resultado = resultado.filter((l) => l.type === tipo);
  }

  if (zona) {
    resultado = resultado.filter((l) => l.zona === zona);
  }

  if (tags && tags.length > 0) {
    resultado = resultado.filter((l) => tags.every((tag) => l.tags.includes(tag)));
  }

  if (precioMax) {
    resultado = resultado.filter((l) => l.precioDesde <= Number(precioMax));
  }

  if (q) {
    const busqueda = normalizar(q);
    resultado = resultado.filter(
      (l) =>
        normalizar(l.nombre).includes(busqueda) ||
        normalizar(l.descripcionCorta).includes(busqueda),
    );
  }

  const total = resultado.length;
  const inicio = (page - 1) * pageSize;
  const items = resultado.slice(inicio, inicio + pageSize);

  return { items, total, page, pageSize };
}

export async function getListingById(id) {
  return LISTINGS.find((l) => l.id === id) ?? null;
}

export async function getFeaturedListings(limit = 8) {
  return LISTINGS.filter((l) => l.destacado).slice(0, limit);
}
