import type { Knex } from "knex";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
//dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgres",
    connection: {
      host: process.env.LOCAL_HOST,
      port: 5432,
      database: process.env.LOCAL_DATABASE,
      user: process.env.LOCAL_USER,
      password: process.env.LOCAL_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
  production: {
    client: "postgres",
    connection: {
      host: process.env.HOST,
      port: 5432,
      database: process.env.DATABASE,
      user: process.env.USER,
      password: process.env.PASSWORD,
      ssl: true,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

module.exports = config;
