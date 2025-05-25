// =====================
// entityTypes.ts
// =====================

export interface ViewEssence {
  name: string;
  layout: "list" | "board" | "calendar" | "form";
  targetEntityType: string;
}

export interface EntityTypeEssence {
  name: string;
  description?: string;
}

// The master type map — keys = .type strings, values = essence types
export interface EntityTypeMap {
  View: ViewEssence;
  EntityType: EntityTypeEssence;
}
