import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("todos", (table) => {
    table.increments("id").primary();
    table.integer("user_id").references("users.id").notNullable();
    table.string("todo").notNullable();
    table.boolean("completed").defaultTo(false);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("todos");
}
