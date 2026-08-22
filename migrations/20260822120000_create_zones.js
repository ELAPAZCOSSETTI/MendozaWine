exports.up = function (knex) {
  return knex.schema.createTable("zones", (table) => {
    table.increments("id").primary();
    table.text("name").notNullable().unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("zones");
};
