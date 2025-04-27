import { query } from "./db";

/**
 * @semantic Behavior
 * @id behavior-load-entities
 * @description Loads entities from the database.
 */
export async function loadEntities(targetEntity: string) {
  const rows = await query(
    `SELECT * FROM ${targetEntity} ORDER BY createdAt DESC`
  );
  return rows;
}

/**
 * @semantic Behavior
 * @id behavior-load-entity-by-id
 * @description Given an ID, load an entity from the database.
 */
export async function loadEntityById(targetEntity: string, id: string) {
  const rows = await query(`SELECT * FROM ${targetEntity} WHERE id = $1`, [id]);
  return rows[0]; // return the single entity
}
