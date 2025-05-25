export interface BaseEntity<TEssence = Record<string, unknown>> {
  id: string;
  type: string;
  essence: TEssence;
  created_at: string;
  updated_at: string;
}
