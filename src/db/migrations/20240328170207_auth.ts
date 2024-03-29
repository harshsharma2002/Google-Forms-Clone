import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("auth", async (table) => {
    table.uuid("id").notNullable().index().primary();
    table.string("email").notNullable().index();
    table.string("password").notNullable().index();
    table.unique(["email"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("auth");
}
