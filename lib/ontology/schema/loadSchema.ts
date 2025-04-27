import fs from "fs/promises";
import path from "path";

//TODO: Move this into loadEntity.ts
/**
 * @semantic Function
 * @id function-load-schema
 * @description Loads a schema from the ontology directory.
 */
export async function loadSchema<T>(entity: string): Promise<T> {
  const schemaPath = path.resolve(
    __dirname,
    `../../../../omni_shard-0/schema/ontology/${entity}.json` //TODO: Reference path against ontology entity
  );
  const raw = await fs.readFile(schemaPath, "utf-8");
  return JSON.parse(raw);
}
