import { query } from "../db";

/**
 * @semantic Behavior
 * @id behavior-save-entity
 * @description Saves an entity in the database.
 */
export async function saveEntity(
  entity: Record<string, unknown>,
  schemaId: string
): Promise<void> {
  const id = entity.id ?? crypto.randomUUID();
  const version = entity.schema_version ?? 1;

  await query(
    `
      INSERT INTO entity (id, schema_id, data, schema_version)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id) DO UPDATE
      SET data = EXCLUDED.data,
          schema_version = EXCLUDED.schema_version
    `,
    [id, schemaId, JSON.stringify(entity), version]
  );
}
