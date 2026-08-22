exports.up = function (knex) {
  return knex.schema.createTable("listings", (table) => {
    table.text("id").primary();
    table
      .text("type")
      .notNullable()
      .checkIn(["bodega", "restaurante", "experiencia"], "listings_type_check");
    table.text("nombre").notNullable();
    table.integer("zone_id").notNullable().references("id").inTable("zones");
    table.text("direccion").notNullable();
    table.decimal("precio_desde", 10, 2).notNullable();
    table.text("rango_precio").notNullable();
    table.decimal("rating", 2, 1).notNullable();
    table.integer("reviews").notNullable().defaultTo(0);
    table.text("descripcion_corta").notNullable();
    table.text("descripcion_larga").notNullable();
    table.text("horario").notNullable();
    table.specificType("imagenes", "text[]").notNullable().defaultTo("{}");
    table.boolean("destacado").notNullable().defaultTo(false);
    table.jsonb("detalles").notNullable().defaultTo("{}");
    table.timestamps(true, true);

    table.index("zone_id");
    table.index("type");
    table.index("destacado");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("listings");
};
