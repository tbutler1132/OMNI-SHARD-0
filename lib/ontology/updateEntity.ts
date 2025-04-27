import { query } from "./db";

/**
 * @semantic Behavior
 * @id behavior-update-entity-in-db
 * @description Update an entity in the database.
 */
export async function updateEntity(
  targetEntity: string,
  id: string,
  updatedData: Record<string, unknown>
) {
  const fields = Object.keys(updatedData);
  const values = Object.values(updatedData);

  const setClauses = fields
    .map((field, i) => `"${field}" = $${i + 1}`)
    .join(", ");
  const text = `UPDATE ${targetEntity} SET ${setClauses} WHERE id = $${
    fields.length + 1
  }`;

  await query(text, [...values, id]);
}
