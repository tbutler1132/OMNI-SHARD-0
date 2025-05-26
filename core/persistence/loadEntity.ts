import { query } from "./db";

/**
 * @semantic Behavior
 * @id behavior-load-entities
 * @description Loads entities from the database.
 */
export async function loadEntities(targetEntity: string) {
  const rows = await query(`SELECT * FROM entity WHERE type = $1`, [
    targetEntity,
  ]);
  return rows;
}

export async function loadEntityById(id: string) {
  const rows = await query(`SELECT * FROM entity WHERE id = $1`, [id]);
  return rows;
}
