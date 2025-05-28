import { Entity } from "../runtime/entities";
import { entityTypes } from "../ontology/entityTypes";
import { objectTypes } from "../ontology/objectTypes";
import { conceptTypes } from "../ontology/conceptTypes";

export function validateEntityAgainstType(entity: Entity): string[] {
  const errors: string[] = [];
  const typeDef = entityTypes[entity.type];
  if (!typeDef) return ["Unknown entity type: " + entity.type];

  for (const field of typeDef.fields) {
    const value = entity.fields[field.name];
    if (value === undefined) {
      errors.push(`Missing required field: ${field.name}`);
      continue;
    }

    switch (field.kind) {
      case "primitive":
        if (typeof value !== field.type) {
          errors.push(`Field '${field.name}' should be of type ${field.type}`);
        }
        break;

      case "reference":
        if (typeof value !== "string") {
          errors.push(`Field '${field.name}' must be a reference ID (string)`);
        }
        break;

      case "object":
        const objectType = objectTypes[field.type];
        if (!objectType) {
          errors.push(`Unknown ObjectType: ${field.type}`);
          break;
        }
        for (const objField of objectType.fields) {
          const objValue = (value as Record<string, unknown>)[objField.name];
          if (objValue === undefined) {
            errors.push(
              `Missing '${objField.name}' in object field '${field.name}'`
            );
            continue;
          }
          if (
            objField.kind === "primitive" &&
            typeof objValue !== objField.type
          ) {
            errors.push(
              `Object field '${objField.name}' in '${field.name}' should be ${objField.type}`
            );
          }
        }
        break;

      case "concept":
        const conceptType = conceptTypes[field.type];
        if (!conceptType) {
          errors.push(`Unknown ConceptType: ${field.type}`);
          break;
        }
        if (!conceptType.values.find((v) => v.id === value)) {
          errors.push(
            `Invalid concept value '${value}' for field '${field.name}'`
          );
        }
        break;
    }
  }

  return errors;
}
