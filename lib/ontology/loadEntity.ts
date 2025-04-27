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
