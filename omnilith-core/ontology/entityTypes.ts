type FieldBase = {
  name: string;
  deriveFrom?: string;
  defaultFrom?: string;
};

export type FieldDefinition =
  | (FieldBase & { kind: "primitive"; type: "string" | "number" | "boolean" })
  | (FieldBase & { kind: "reference"; type: string }) // EntityType
  | (FieldBase & { kind: "object"; type: string }) // ObjectType
  | (FieldBase & { kind: "concept"; type: string }); // ConceptType

export type EntityType = {
  id: string;
  name: string;
  fields: FieldDefinition[];
};

export const entityTypes: Record<string, EntityType> = {
  Song: {
    id: "Song",
    name: "Song",
    fields: [
      { kind: "primitive", name: "title", type: "string" },
      { kind: "primitive", name: "duration", type: "number" },
      { kind: "reference", name: "artist", type: "Artist" },
      { kind: "concept", name: "songType", type: "SongType" },
    ],
  },
  View: {
    id: "View",
    name: "View",
    fields: [
      { kind: "primitive", name: "name", type: "string" },
      { kind: "reference", name: "targetEntityType", type: "EntityType" },
      { kind: "concept", name: "layoutType", type: "LayoutType" },
    ],
  },
  Form: {
    id: "Form",
    name: "Form",
    fields: [
      { kind: "primitive", name: "title", type: "string" },
      { kind: "reference", name: "targetEntityType", type: "EntityType" },
      { kind: "object", name: "sections", type: "FormSection" },
    ],
  },
  Renderer: {
    id: "Renderer",
    name: "Renderer",
    fields: [
      { kind: "primitive", name: "label", type: "string" },
      { kind: "concept", name: "rendererType", type: "RendererType" },
      { kind: "primitive", name: "entryPoint", type: "string" },
    ],
  },
  Behavior: {
    id: "Behavior",
    name: "Behavior",
    fields: [
      { kind: "primitive", name: "name", type: "string" },
      { kind: "concept", name: "behaviorType", type: "BehaviorType" },
      { kind: "object", name: "inputs", type: "BehaviorInputs" },
      { kind: "object", name: "steps", type: "BehaviorStep" },
    ],
  },
};
