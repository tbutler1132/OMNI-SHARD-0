import { loadEntitySchema } from "@/lib/ontology/loadEntitySchema";
import { loadFieldDefinitionsForEntity } from "@/lib/ontology/loadFieldDefinitionsForEntity";
import { validateAgainstSchema } from "@/lib/ontology/validateAgainstSchema";

/**
 * Validates user input and enriches it with ontology-based metadata.
 */
export async function validateAndPrepareEntity(
  targetEntity: string,
  data: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const schema = await loadEntitySchema(targetEntity);
  const fieldDefs = await loadFieldDefinitionsForEntity(targetEntity);
  const errors = validateAgainstSchema(data, fieldDefs);

  if (errors.length > 0) {
    throw new Error(errors.join("; "));
  }
  const generatedId = `${targetEntity}-${Date.now()}`;
  return {
    id: generatedId,
    ...data,
    schema_version: schema.schema_version,
    created_at: new Date().toISOString(),
  };
}

export async function validateAndPrepareEntityUpdate(
  targetEntity: string,
  data: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const schema = await loadEntitySchema(targetEntity);
  const fieldDefs = await loadFieldDefinitionsForEntity(targetEntity);
  const errors = validateAgainstSchema(data, fieldDefs);

  if (errors.length > 0) {
    throw new Error(errors.join("; "));
  }

  return {
    ...data,
    schema_version: schema.schema_version,
  };
}
