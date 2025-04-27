export interface View {
  id: string;
  name: string;
  description?: string;
  targetEntity: string;
  layout: string; // "table", "kanban", "calendar", "form", etc.
  fields: string[]; // List of field names
  fieldOverrides?: Record<string, FieldOverride>; // Map of fieldName → override config
  filters?: Record<string, unknown>; // Optional default filters
  sort?: SortOrder[]; // Optional sort config
  groupBy?: string | null; // Field to group by
  actions?: string[]; // Linked Function IDs
  rendererComponent?: string; // Optional Artifact ID for custom renderer
  schemaVersion: number;
}

export interface FieldOverride {
  inputType: "text" | "select" | "datetime" | "number" | "textarea";
  options?: string[]; // Only for selects
}

export interface SortOrder {
  field: string;
  direction: "asc" | "desc";
}
