"use server";

import { insertEntity } from "./persistence/insertEntity";
import { updateEntity as updateEntityPersistence } from "./persistence/updateEntity";
import { validateAndPrepareEntity } from "@/lib/ontology/validateAndPrepareEntity";
import { validateAndPrepareEntityUpdate } from "@/lib/ontology/validateAndPrepareEntity";

/**
 * @semantic Behavior
 * @id behavior-create-entity
 * @description Creates a new entity.
 */
export async function createEntity(
  targetEntity: string,
  data: Record<string, unknown>
) {
  const entity = await validateAndPrepareEntity(targetEntity, data);

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
  const updatedEntity = await validateAndPrepareEntityUpdate(
    targetEntity,
    updatedData
  );

  await updateEntityPersistence(targetEntity, id, updatedEntity);

  return { id, ...updatedData };
}
