// lib/persistence/entity.ts

import { query } from "../db";
import { View } from "@/types/ontology/view";

export async function loadEntityById(
  schemaId: string,
  id: string
): Promise<Record<string, unknown>> {
  const result = await query(
    `SELECT data FROM entity WHERE id = $1 AND schema_id = $2`,
    [id, schemaId]
  );

  if (!result.length) {
    throw new Error(`Entity not found: ${id} (schema: ${schemaId})`);
  }

  return result[0].data;
}

export async function loadEntities(
  schemaId: string
): Promise<Record<string, unknown>[]> {
  const result = await query(`SELECT data FROM entity WHERE schema_id = $1`, [
    schemaId,
  ]);

  return result.map((r) => r.data);
}

export async function saveEntity(
  entity: Record<string, unknown>,
  schemaId: string
): Promise<void> {
  const id = entity.id ?? crypto.randomUUID();
  const version = entity.schema_version ?? 1;
  const createdAt = entity.created_at ?? new Date().toISOString();
  const createdBy = entity.created_by ?? "system";

  await query(
    `INSERT INTO entity (id, schema_id, data, schema_version, created_at, created_by)
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT (id) DO UPDATE
     SET data = EXCLUDED.data,
         schema_version = EXCLUDED.schema_version`,
    [id, schemaId, JSON.stringify(entity), version, createdAt, createdBy]
  );
}

export async function loadReferenceOptions(
  targetSchemaId: string,
  labelField: string = "label"
): Promise<{ id: string; label: string }[]> {
  const items = await loadEntities(targetSchemaId);

  return items.map((item) => ({
    id: item.id as string,
    label: (item[labelField] as string) ?? `[${item.id}]`,
  }));
}

export type ViewFilter = {
  field: string;
  value?: unknown;
  operator:
    | "equals"
    | "notEquals"
    | "isNotNull"
    | "isNull"
    | "in"
    | "notIn"
    | "gt"
    | "lt"
    | "gte"
    | "lte"
    | "contains";
};

export async function loadEntityWithView(
  view: View
): Promise<Record<string, unknown>[]> {
  const data = await loadEntities(view.targetEntity);

  if (Array.isArray(view.filters)) {
    return data.filter((item) =>
      view.filters.every(({ field, value, operator }: ViewFilter) => {
        const entityValue = item[field];

        switch (operator) {
          case "equals":
            return String(entityValue) === String(value);
          case "notEquals":
            return String(entityValue) !== String(value);
          case "isNotNull":
            return entityValue !== null && entityValue !== undefined;
          case "isNull":
            return entityValue === null || entityValue === undefined;
          case "in":
            return Array.isArray(value) && value.includes(entityValue);
          case "notIn":
            return Array.isArray(value) && !value.includes(entityValue);
          case "gt":
            return (
              typeof entityValue === "number" &&
              typeof value === "number" &&
              entityValue > value
            );
          case "lt":
            return (
              typeof entityValue === "number" &&
              typeof value === "number" &&
              entityValue < value
            );
          case "gte":
            return (
              typeof entityValue === "number" &&
              typeof value === "number" &&
              entityValue >= value
            );
          case "lte":
            return (
              typeof entityValue === "number" &&
              typeof value === "number" &&
              entityValue <= value
            );
          case "contains":
            return (
              typeof entityValue === "string" &&
              typeof value === "string" &&
              entityValue.includes(value)
            );
          default:
            return true;
        }
      })
    );
  }

  return data;
}
