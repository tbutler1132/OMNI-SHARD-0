import { entityTypes } from "../ontology/entityTypes";
import { objectTypes } from "../ontology/objectTypes";
import { conceptTypes } from "../ontology/conceptTypes";

export function getOntologySummary() {
  return {
    entityTypes: Object.keys(entityTypes),
    objectTypes: Object.keys(objectTypes),
    conceptTypes: Object.keys(conceptTypes),
  };
}

export function describeEntityType(id: string) {
  const type = entityTypes[id];
  if (!type) return undefined;
  return {
    id: type.id,
    fields: type.fields.map((f) => ({
      kind: f.kind,
      name: f.name,
      type: f.type,
    })),
  };
}

export function listConceptTypeValues(typeId: string) {
  const concept = conceptTypes[typeId];
  if (!concept) return undefined;
  return concept.values.map((v) => ({
    id: v.id,
    label: v.label,
    category: v.category,
    metadata: v.metadata,
  }));
}
