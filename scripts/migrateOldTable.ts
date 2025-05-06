import { query } from "../lib/db"; // your db wrapper

async function migrateLegacyTableToEntity(
  legacyTable: string,
  schemaId: string
) {
  const rows = await query(`SELECT * FROM ${legacyTable}`);

  for (const row of rows) {
    const { id, created_at, created_by, schema_version, ...rest } = row;

    const finalId = id ?? crypto.randomUUID();
    const version = schema_version ?? 1;
    const createdAt = created_at ?? new Date().toISOString();
    const createdBy = created_by ?? "system";

    await query(
      `
      INSERT INTO entity (id, schema_id, data, schema_version, created_at, created_by)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (id) DO NOTHING
      `,
      [
        finalId,
        schemaId,
        JSON.stringify({ id: finalId, ...rest }),
        version,
        createdAt,
        createdBy,
      ]
    );
  }

  console.log(
    `✅ Migrated ${rows.length} rows from ${legacyTable} into entity table as ${schemaId}`
  );
}

async function main() {
  await migrateLegacyTableToEntity("convergence", "convergence");
  await migrateLegacyTableToEntity("field_definition", "field");
  await migrateLegacyTableToEntity("entity_schema", "schema");
  await migrateLegacyTableToEntity("views", "view");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
