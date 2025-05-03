import { query } from "@/lib/db";

export async function loadEntitySchema(entity: string) {
  const result = await query(
    `SELECT * FROM entity_schema WHERE target_entity = $1 ORDER BY version DESC LIMIT 1`,
    [entity]
  );

  if (!result.length) {
    throw new Error(`No schema found for entity: ${entity}`);
  }

  return result[0];
}
