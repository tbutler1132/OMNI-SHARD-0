import { objectTypes } from "../ontology/objectTypes";
import {
  entityTypes,
  EntityType,
  FieldDefinition,
} from "../ontology/entityTypes";

export function promoteObjectTypeToEntityType(
  objectTypeId: string,
  newEntityTypeId?: string
): EntityType | undefined {
  const objectType = objectTypes[objectTypeId];
  if (!objectType) return undefined;

  const entityType: EntityType = {
    id: newEntityTypeId || objectType.id,
    name: objectType.name,
    fields: objectType.fields as FieldDefinition[],
  };

  entityTypes[entityType.id] = entityType;
  return entityType;
}
