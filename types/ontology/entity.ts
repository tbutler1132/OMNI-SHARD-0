// Core entity structure
export interface Entity {
  id: string;
  type: string; // e.g. "convergence", "view", "ontology"
  definition: string; // ontology ID
  fields: Record<string, unknown>; // dynamic data
  schema_version?: string;
  created_at: string;
  updated_at?: string;
  created_by?: string;
  deleted?: boolean;
}

// FieldDefinition for Ontology entities
export interface FieldDefinition {
  name: string;
  fieldType: "text" | "number" | "boolean" | "enum" | "reference" | "list"; // extendable
  required?: boolean;
  options?: string[]; // for enums
  referenceType?: string; // for reference fields
  itemType?: string; // for list fields
}
