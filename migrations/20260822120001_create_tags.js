exports.up = function (knex) {
  return knex.schema.createTable("tags", (table) => {
    table.increments("id").primary();
    table.text("slug").notNullable().unique();
    table.text("label").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("tags");
};
