exports.seed = async function (knex) {
  const { LISTINGS } = await import("../src/lib/data/listings.js");
  const { ZONAS, TAGS_DISPONIBLES, TAG_LABELS } = await import(
    "../src/lib/data/constants.js"
  );

  await knex("listing_tags").del();
  await knex("listings").del();
  await knex("tags").del();
  await knex("zones").del();

  const zoneRows = await knex("zones")
    .insert(ZONAS.map((name) => ({ name })))
    .returning(["id", "name"]);
  const zoneIdByName = new Map(zoneRows.map((z) => [z.name, z.id]));

  const tagRows = await knex("tags")
    .insert(TAGS_DISPONIBLES.map((slug) => ({ slug, label: TAG_LABELS[slug] })))
    .returning(["id", "slug"]);
  const tagIdBySlug = new Map(tagRows.map((t) => [t.slug, t.id]));

  for (const listing of LISTINGS) {
    const zoneId = zoneIdByName.get(listing.zona);
    if (!zoneId) {
      throw new Error(`Zona desconocida "${listing.zona}" en listing ${listing.id}`);
    }

    await knex("listings").insert({
      id: listing.id,
      type: listing.type,
      nombre: listing.nombre,
      zone_id: zoneId,
      direccion: listing.direccion,
      precio_desde: listing.precioDesde,
      rango_precio: listing.rangoPrecio,
      rating: listing.rating,
      reviews: listing.reviews,
      descripcion_corta: listing.descripcionCorta,
      descripcion_larga: listing.descripcionLarga,
      horario: listing.horario,
      imagenes: listing.imagenes,
      destacado: listing.destacado,
      detalles: JSON.stringify(listing.detalles),
    });

    if (listing.tags?.length) {
      const rows = listing.tags.map((slug) => {
        const tagId = tagIdBySlug.get(slug);
        if (!tagId) {
          throw new Error(`Tag desconocido "${slug}" en listing ${listing.id}`);
        }
        return { listing_id: listing.id, tag_id: tagId };
      });
      await knex("listing_tags").insert(rows);
    }
  }
};
