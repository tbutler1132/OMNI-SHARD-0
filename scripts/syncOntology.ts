// import fs from "fs/promises";
// import path from "path";
// import { db } from "../lib/ontology/db"; // your postgres db connection client

// async function syncOntology(schemaFilePath: string) {
//   // 1. Load the JSON file
//   const fullPath = path.resolve(schemaFilePath);
//   const raw = await fs.readFile(fullPath, "utf-8");
//   const schemaJson = JSON.parse(raw);

//   const { entity, version, description, fields: fullFields } = schemaJson;

//   // 2. Split into FieldDefinitions and Schema metadata
//   const fieldDefinitions = fullFields.map((field: any) => ({
//     id: field.id,
//     name: field.name,
//     type: field.type,
//     optional: field.optional || false,
//     requires_human: field.requires_human ?? true,
//     auto_populated: field.auto_populated || false,
//     input_type: field.input_type || null,
//     output_type: field.output_type || null,
//     max_length: field.max_length || null,
//     enum_values: field.enum_values || null,
//     determination_rules: field.determination_rules || null,
//     governed_by: field.governed_by || null,
//     description: field.description || null,
//     prompt: field.prompt || null,
//     schema_version: field.schema_version || 1,
//     created_at: new Date().toISOString(),
//     updated_at: new Date().toISOString()
//   }));

//   // 3. Insert FieldDefinitions
//   for (const field of fieldDefinitions) {
//     await db.query(`
//       INSERT INTO field_definition (
//         id, name, type, optional, requires_human, auto_populated,
//         input_type, output_type, max_length, enum_values,
//         determination_rules, governed_by, description, prompt,
//         schema_version, created_at, updated_at
//       ) VALUES (
//         $1, $2, $3, $4, $5, $6,
//         $7, $8, $9, $10,
//         $11, $12, $13, $14,
//         $15, $16, $17
//       )
//       ON CONFLICT (id) DO UPDATE SET
//         name = EXCLUDED.name,
//         type = EXCLUDED.type,
//         optional = EXCLUDED.optional,
//         requires_human = EXCLUDED.requires_human,
//         auto_populated = EXCLUDED.auto_populated,
//         input_type = EXCLUDED.input_type,
//         output_type = EXCLUDED.output_type,
//         max_length = EXCLUDED.max_length,
//         enum_values = EXCLUDED.enum_values,
//         determination_rules = EXCLUDED.determination_rules,
//         governed_by = EXCLUDED.governed_by,
//         description = EXCLUDED.description,
//         prompt = EXCLUDED.prompt,
//         schema_version = EXCLUDED.schema_version,
//         updated_at = now();
//     `, [
//       field.id,
//       field.name,
//       field.type,
//       field.optional,
//       field.requires_human,
//       field.auto_populated,
//       field.input_type,
//       field.output_type,
//       field.max_length,
//       field.enum_values,
//       field.determination_rules,
//       field.governed_by,
//       field.description,
//       field.prompt,
//       field.schema_version,
//       field.created_at,
//       field.updated_at
//     ]);
//   }

//   // 4. Insert the EntitySchema itself (just the references to fields)
//   const fieldTargets = fullFields.map((field: any) => ({
//     target: field.id
//   }));

//   await db.query(`
//     INSERT INTO entity_schema (
//       id, target_entity, version, description,
//       fields, created_at, updated_at, schema_version
//     ) VALUES (
//       $1, $2, $3, $4,
//       $5, $6, $7, $8
//     )
//     ON CONFLICT (id) DO UPDATE SET
//       target_entity = EXCLUDED.target_entity,
//       version = EXCLUDED.version,
//       description = EXCLUDED.description,
//       fields = EXCLUDED.fields,
//       updated_at = now(),
//       schema_version = EXCLUDED.schema_version;
//   `, [
//     `schema-${entity.toLowerCase()}`,
//     entity,
//     version,
//     description,
//     JSON.stringify(fieldTargets),
//     new Date().toISOString(),
//     new Date().toISOString(),
//     1
//   ]);

//   console.log(`✅ Successfully synced Ontology for entity: ${entity}`);
// }

// (async () => {
//   const schemaPath = process.argv[2];
//   if (!schemaPath) {
//     console.error("⚠️ Please pass the path to a schema JSON file.");
//     process.exit(1);
//   }
//   await syncOntology(schemaPath);
//   process.exit(0);
// })();
