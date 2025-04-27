"use server";

import { insertEntity } from "./insertEntity";
import { updateEntity as updateEntityPersistence } from "./updateEntity";

/**
 * @semantic Behavior
 * @id behavior-create-entity
 * @description Creates a new entity.
 */
export async function createEntity(
  targetEntity: string,
  data: Record<string, unknown>
) {
  //TODO: Add validation against the schema right here

  const entity = {
    id: `${targetEntity}-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...data,
  };

  await insertEntity(targetEntity, entity);

  return entity;
}

/**
 * @semantic Behavior
 * @id behavior-udpate-entity
 * @description Updates an entity.
 */
export async function updateEntity(
  targetEntity: string,
  id: string,
  updatedData: Record<string, unknown>
) {
  //TODO: Add validation against the schema right here
  // const schema = entitySchemas[targetEntity];

  // if (!schema) {
  //   throw new Error(`No schema registered for entity type: ${targetEntity}`);
  // }

  // validateAgainstSemanticSchema(updatedData, schema);

  await updateEntityPersistence(targetEntity, id, updatedData);

  return { id, ...updatedData };
}
