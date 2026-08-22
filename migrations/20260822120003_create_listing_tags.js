exports.up = function (knex) {
  return knex.schema.createTable("listing_tags", (table) => {
    table
      .text("listing_id")
      .notNullable()
      .references("id")
      .inTable("listings")
      .onDelete("CASCADE");
    table
      .integer("tag_id")
      .notNullable()
      .references("id")
      .inTable("tags")
      .onDelete("CASCADE");
    table.primary(["listing_id", "tag_id"]);
    table.index("tag_id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("listing_tags");
};
