"use server";

import { saveEntity } from "./saveEntity";

/**
 * @semantic Behavior
 * @id behavior-create-entity
 * @description Creates a new entity.
 */
export async function createEntity(
  targetEntity: string,
  data: Record<string, unknown>
) {
  //TODO: Add validation against the schema

  const entity = {
    id: `${targetEntity}-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...data,
  };

  await saveEntity(targetEntity, entity);

  return entity;
}
