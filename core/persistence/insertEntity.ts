import { query } from "./db";
import { AnyEntity } from "@/types/entity";

export async function insertEntity(targetEntity: string, entity: AnyEntity) {
  if (!entity.essence || typeof entity.essence !== "object") {
    throw new Error("Entity is missing a valid 'essence' object");
  }

  const text = `
    INSERT INTO ${targetEntity} (
      id,
      type,
      essence,
      created_at,
      updated_at
    ) VALUES ($1, $2, $3, $4, $5)
  `;
  const values = [
    entity.id,
    entity.type,
    entity.essence, // stored as JSONB
    entity.created_at,
    entity.updated_at,
  ];

  await query(text, values);
}
