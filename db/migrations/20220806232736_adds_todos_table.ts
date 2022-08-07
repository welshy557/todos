import { Knex } from "knex";
import { v4 as uuid } from "uuid";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("todos", (table) => {
    table.uuid("id").defaultTo(uuid());
    table.uuid("user_id").references("users.id").notNullable();
    table.string("todo").notNullable();
    table.boolean("completed").defaultTo(false);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("todos");
}
