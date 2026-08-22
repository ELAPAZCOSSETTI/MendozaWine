exports.up = function (knex) {
  return knex.schema.createTable("bookings", (table) => {
    table.increments("id").primary();
    table
      .text("listing_id")
      .notNullable()
      .references("id")
      .inTable("listings")
      .onDelete("CASCADE");
    table.text("nombre_cliente").notNullable();
    table.text("telefono_cliente").notNullable();
    table.text("email_cliente");
    table.date("fecha_solicitada").notNullable();
    table.integer("personas").notNullable().defaultTo(1);
    table.text("mensaje");
    table
      .text("estado")
      .notNullable()
      .defaultTo("pendiente")
      .checkIn(["pendiente", "confirmada", "cancelada"], "bookings_estado_check");
    table.timestamps(true, true);

    table.index("listing_id");
    table.index("estado");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("bookings");
};
