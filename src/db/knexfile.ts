import type { Knex } from "knex";
import initializeENV from "../envloader";
initializeENV();
// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: process.env.connection_client,
    connection: {
      connectionString: process.env.connection_string,
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

export default config;
