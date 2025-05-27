export interface ViewEssence {
  name: string;
  layout: "list" | "form";
  targetEntityType: string;
}

export interface EntityTypeEssence {
  name: string;
  description?: string;
  traits: unknown[];
}

// The master type map — keys = .type strings, values = essence types
export interface EntityTypeMap {
  View: ViewEssence;
  EntityType: EntityTypeEssence;
}
