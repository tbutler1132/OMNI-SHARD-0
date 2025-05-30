import { query } from "../db";
/**
 * @semantic Behavior
 * @id behavior-save-entity
 * @description Saves the entity in the database.
 */
export async function insertEntity(
  targetEntity: string,
  entity: Record<string, unknown>
) {
  const fields = Object.keys(entity);
  const values = Object.values(entity);

  const fieldNames = fields.map((f) => `"${f.toLowerCase()}"`).join(", ");
  const placeholders = fields.map((_, i) => `$${i + 1}`).join(", ");

  const text = `INSERT INTO ${targetEntity} (${fieldNames}) VALUES (${placeholders})`;

  await query(text, values);
}
