import fs from "fs/promises";
import path from "path";

/* ---------- Typed helpers ---------- */

interface RawField {
  name: string;
}

interface RawSchemaFile {
  entity: string;
  version?: number;
  description?: string;
  fields?: RawField[];
}

interface SchemaObj {
  id: string;
  targetEntity: string;
  version: number;
  description: string;
  fields: string[];
  path: string;
  createdAt: string;
  updatedAt: string;
  schemaVersion: number;
}

interface SchemaStoreFile {
  schemas?: SchemaObj[];
}

interface SchemaVersionObj {
  id: string;
  targetEntity: string;
  version: number;
  schema: string;
  changeSummary: string;
  precededBy?: string | null;
  supersededBy?: string | null;
  createdAt: string;
  schemaVersion: number;
}

interface VersionStoreFile {
  schemaVersions?: SchemaVersionObj[];
}

/* ---------- FS helpers ---------- */

const readJSON = async <T>(p: string): Promise<T> =>
  JSON.parse(await fs.readFile(p, "utf-8")) as T;

const writeJSON = (p: string, data: unknown) =>
  fs.writeFile(p, JSON.stringify(data, null, 2) + "\n");

/* ---------- Constants ---------- */

const SCHEMA_DIR = path.resolve("schema", "ontology");
const SCHEMA_STORE = path.resolve(
  "data",
  "entities",
  "schema",
  "schema.local.json"
); //TODO: Variable for local
const VERSION_STORE = path.resolve(
  "data",
  "entities",
  "schemaVersion",
  "schemaVersion.local.json"
); //TODO: Same as above

/* ---------- Main runner ---------- */

/**
 * @semantic Function
 * @id function-sync-schema-objects
 * @brief Scan /schema/ontology and update Schema + SchemaVersion entities.
 * @inputType FileSystem.path
 * @outputType Artifact[]            // the store files that change
 */
async function syncSchemaObjects() {
  // Load current stores (or initialise)
  const schemaStore = (await safeReadJSON<SchemaStoreFile>(SCHEMA_STORE)) ?? {
    schemas: [],
  };
  const versionStore = (await safeReadJSON<VersionStoreFile>(
    VERSION_STORE
  )) ?? { schemaVersions: [] };

  const schemas = schemaStore.schemas ?? [];
  const versions = versionStore.schemaVersions ?? [];

  const schemaFiles = (await fs.readdir(SCHEMA_DIR)).filter((f) =>
    f.endsWith(".json")
  );

  let changed = false;

  for (const file of schemaFiles) {
    const filePath = path.join(SCHEMA_DIR, file);
    const raw = await readJSON<RawSchemaFile>(filePath);

    const entity = raw.entity;
    const ver = raw.version ?? 1;
    const schemaId = `schema-${entity.toLowerCase()}-v${ver}`;
    const fieldIds = (raw.fields ?? []).map(
      (f) => `field-${entity.toLowerCase()}-${f.name}`
    );

    /* -- Ensure Schema object -- */
    let schemaObj = schemas.find((s) => s.id === schemaId);
    if (!schemaObj) {
      schemaObj = {
        id: schemaId,
        targetEntity: entity,
        version: ver,
        description: raw.description ?? "",
        fields: fieldIds,
        path: path.relative(process.cwd(), filePath),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        schemaVersion: 1,
      };
      schemas.push(schemaObj);
      changed = true;
      console.log("🆕  Added Schema:", schemaId);
    } else {
      const newPath = path.relative(process.cwd(), filePath);
      const fieldsStr = JSON.stringify(fieldIds);
      if (
        schemaObj.path !== newPath ||
        JSON.stringify(schemaObj.fields) !== fieldsStr
      ) {
        schemaObj.path = newPath;
        schemaObj.fields = fieldIds;
        schemaObj.updatedAt = new Date().toISOString();
        changed = true;
        console.log("✏️  Updated Schema:", schemaId);
      }
    }

    /* -- Ensure SchemaVersion snapshot -- */
    const versionId = `schemaVersion-${entity.toLowerCase()}-v${ver}`;
    if (!versions.some((v) => v.id === versionId)) {
      versions.push({
        id: versionId,
        targetEntity: entity,
        version: ver,
        schema: schemaId,
        changeSummary: "Auto‑generated snapshot.",
        precededBy: null,
        supersededBy: null,
        createdAt: new Date().toISOString(),
        schemaVersion: 1,
      });
      changed = true;
      console.log("🆕  Added SchemaVersion:", versionId);
    }
  }

  if (changed) {
    await writeJSON(SCHEMA_STORE, { schemas });
    await writeJSON(VERSION_STORE, { schemaVersions: versions });
    console.log("✅  Schema sync completed.");
  } else {
    console.log("✅  Nothing to update — schemas are already in sync.");
  }
}

/* ---------- Utility to read JSON or initialise ---------- */

async function safeReadJSON<T>(filePath: string): Promise<T | null> {
  try {
    return await readJSON<T>(filePath);
  } catch {
    return null;
  }
}

syncSchemaObjects().catch((err) => {
  console.error("❌  Schema sync failed:", err);
  process.exit(1);
});
