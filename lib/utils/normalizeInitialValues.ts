import { View } from "@/types/ontology/view";

export function normalizeInitialValues(
  values: Record<string, unknown>,
  view: View | null
): Record<string, unknown> {
  if (!view) return values;

  const normalized: Record<string, unknown> = { ...values };

  for (const field of view.fields) {
    const override = view.fieldOverrides?.[field];
    if (override?.inputType === "datetime") {
      const val = values[field];
      if (val instanceof Date) {
        normalized[field] = val.toISOString().slice(0, 16);
      }
    }
  }

  return normalized;
}
