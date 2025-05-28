import { validateEntityAgainstType } from "../schema/schemaValidator";
import { applyDerivations } from "../schema/deriveEngine";

export type Entity = {
  id: string;
  type: string; // must match an EntityType
  fields: Record<string, unknown>;
};

const entityStore: Record<string, Entity> = {};

export function createEntity(entity: Entity): {
  success: boolean;
  errors?: string[];
} {
  const derived = applyDerivations(entity);
  const errors = validateEntityAgainstType(derived);
  if (errors.length > 0) return { success: false, errors };
  entityStore[derived.id] = derived;
  return { success: true };
}

export function getEntity(id: string): Entity | undefined {
  return entityStore[id];
}

export function updateEntity(
  id: string,
  newFields: Record<string, unknown>
): { success: boolean; errors?: string[] } {
  const existing = entityStore[id];
  if (!existing) return { success: false, errors: ["Entity not found"] };
  const updated: Entity = {
    ...existing,
    fields: { ...existing.fields, ...newFields },
  };
  const derived = applyDerivations(updated);
  const errors = validateEntityAgainstType(derived);
  if (errors.length > 0) return { success: false, errors };
  entityStore[id] = derived;
  return { success: true };
}

export function deleteEntity(id: string): boolean {
  return delete entityStore[id];
}

export function listEntities(): Entity[] {
  return Object.values(entityStore);
}
