import db from "@/lib/db";

const TAGS_PAISAJE = ["vistas-cordillera", "vistas-vinedos", "aire-libre"];

function mapRowToListing(row, tags = []) {
  return {
    id: row.id,
    type: row.type,
    nombre: row.nombre,
    zona: row.zona,
    direccion: row.direccion,
    precioDesde: Number(row.precio_desde),
    rangoPrecio: row.rango_precio,
    rating: Number(row.rating),
    reviews: Number(row.reviews),
    tags,
    descripcionCorta: row.descripcion_corta,
    descripcionLarga: row.descripcion_larga,
    horario: row.horario,
    imagenes: row.imagenes,
    destacado: row.destacado,
    detalles: row.detalles,
  };
}

async function getTagsForListingIds(ids) {
  if (ids.length === 0) return new Map();

  const rows = await db("listing_tags")
    .join("tags", "tags.id", "listing_tags.tag_id")
    .whereIn("listing_tags.listing_id", ids)
    .select("listing_tags.listing_id as listing_id", "tags.slug as slug");

  const map = new Map();
  for (const row of rows) {
    if (!map.has(row.listing_id)) map.set(row.listing_id, []);
    map.get(row.listing_id).push(row.slug);
  }
  return map;
}

function buildBaseQuery({ tipo, zona, tags, precioMax, q }) {
  let query = db("listings").join("zones", "zones.id", "listings.zone_id");

  if (tipo) query = query.where("listings.type", tipo);
  if (zona) query = query.where("zones.name", zona);
  if (precioMax) query = query.where("listings.precio_desde", "<=", Number(precioMax));

  if (q) {
    query = query.where((builder) => {
      builder
        .whereILike("listings.nombre", `%${q}%`)
        .orWhereILike("listings.descripcion_corta", `%${q}%`);
    });
  }

  if (tags && tags.length > 0) {
    query = query.whereIn("listings.id", function () {
      this.select("listing_tags.listing_id")
        .from("listing_tags")
        .join("tags", "tags.id", "listing_tags.tag_id")
        .whereIn("tags.slug", tags)
        .groupBy("listing_tags.listing_id")
        .havingRaw("count(distinct tags.slug) = ?", [tags.length]);
    });
  }

  return query;
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
  const filters = { tipo, zona, tags, precioMax, q };

  const countRow = await buildBaseQuery(filters).countDistinct("listings.id as count").first();
  const total = Number(countRow.count);

  const rows = await buildBaseQuery(filters)
    .select("listings.*", "zones.name as zona")
    .orderBy("listings.destacado", "desc")
    .orderBy("listings.rating", "desc")
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const tagsByListing = await getTagsForListingIds(rows.map((r) => r.id));
  const items = rows.map((row) => mapRowToListing(row, tagsByListing.get(row.id) ?? []));

  return { items, total, page, pageSize };
}

export async function getListingById(id) {
  const row = await db("listings")
    .join("zones", "zones.id", "listings.zone_id")
    .where("listings.id", id)
    .select("listings.*", "zones.name as zona")
    .first();

  if (!row) return null;

  const tagsByListing = await getTagsForListingIds([id]);
  return mapRowToListing(row, tagsByListing.get(id) ?? []);
}

export async function getFeaturedListings(limit = 8) {
  const rows = await db("listings")
    .join("zones", "zones.id", "listings.zone_id")
    .where("listings.destacado", true)
    .select("listings.*", "zones.name as zona")
    .orderBy("listings.rating", "desc")
    .limit(limit);

  const tagsByListing = await getTagsForListingIds(rows.map((r) => r.id));
  return rows.map((row) => mapRowToListing(row, tagsByListing.get(row.id) ?? []));
}

export async function getCarouselHighlights(limit = 6) {
  const rows = await db("listings")
    .join("zones", "zones.id", "listings.zone_id")
    .where((builder) => {
      builder.where("listings.type", "experiencia").orWhereIn("listings.id", function () {
        this.select("listing_tags.listing_id")
          .from("listing_tags")
          .join("tags", "tags.id", "listing_tags.tag_id")
          .whereIn("tags.slug", TAGS_PAISAJE);
      });
    })
    .select("listings.*", "zones.name as zona")
    .orderBy("listings.destacado", "desc")
    .orderBy("listings.rating", "desc")
    .limit(limit);

  const tagsByListing = await getTagsForListingIds(rows.map((r) => r.id));
  return rows.map((row) => mapRowToListing(row, tagsByListing.get(row.id) ?? []));
}
