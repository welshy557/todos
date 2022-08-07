import knex from "knex";

const knexfile = require("./knexfile");

const env =
  process.env.PRODUCTION === "TRUE"
    ? knexfile.production
    : knexfile.development;

const db = knex(env);

export default db;
