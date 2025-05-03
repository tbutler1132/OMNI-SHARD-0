import { query } from "@/lib/db";
import { FieldDefinition } from "@/types/ontology/fieldDefinition";

//TODO: use where with index column
export async function loadFieldDefinitionsForEntity(
  entity: string
): Promise<FieldDefinition[]> {
  const result = await query(
    `SELECT * FROM field_definition WHERE id LIKE $1 ORDER BY name ASC`,
    [`field-${entity}-%`]
  );

  return result as FieldDefinition[];
}
