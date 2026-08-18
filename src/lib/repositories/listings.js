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

const TAGS_PAISAJE = ["vistas-cordillera", "vistas-vinedos", "aire-libre"];

export async function getCarouselHighlights(limit = 6) {
  const candidatos = LISTINGS.filter(
    (l) => l.type === "experiencia" || l.tags.some((tag) => TAGS_PAISAJE.includes(tag)),
  );

  const ordenados = [...candidatos].sort((a, b) => {
    if (a.destacado !== b.destacado) return a.destacado ? -1 : 1;
    return b.rating - a.rating;
  });

  return ordenados.slice(0, limit);
}
