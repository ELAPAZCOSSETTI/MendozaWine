require("dotenv").config({ path: ".env.local" });

/** @type {import('knex').Knex.Config} */
const config = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};

module.exports = config;
