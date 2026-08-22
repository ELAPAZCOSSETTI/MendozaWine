import knex from "knex";
import pg from "pg";

// OID 1700 = numeric/decimal. node-postgres devuelve estas columnas como
// string por defecto (para no perder precisión arbitraria); sin este parser,
// listing.rating.toFixed(1) rompería en runtime porque .toFixed no existe
// en String.
pg.types.setTypeParser(1700, (value) => (value === null ? null : parseFloat(value)));

const db = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
});

export default db;
