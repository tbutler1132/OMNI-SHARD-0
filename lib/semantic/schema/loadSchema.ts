import fs from "fs/promises";
import path from "path";

export async function loadSchema<T>(entity: string): Promise<T> {
  const schemaPath = path.resolve(
    __dirname,
    `../../../../omni_shard-0/schema/semantic/${entity}.json`
  );
  const raw = await fs.readFile(schemaPath, "utf-8");
  return JSON.parse(raw);
}
