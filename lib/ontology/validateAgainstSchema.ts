import { FieldDefinition } from "@/types/ontology/fieldDefinition";

function validateRequired(
  field: FieldDefinition,
  value: unknown
): string | null {
  if (
    !field.optional &&
    (value === undefined || value === null || value === "")
  ) {
    return `Missing required field: ${field.name}`;
  }
  return null;
}

function validateType(field: FieldDefinition, value: unknown): string | null {
  console.log(
    "Validating",
    field.name,
    "with value:",
    value,
    "and type:",
    typeof value
  );

  if (value === undefined || value === null) return null;

  const typeMap: Record<string, string> = {
    string: "string",
    number: "number",
    boolean: "boolean",
    datetime: "string",
    reference: "string",
    "reference[]": "object",
    enum: "string",
  };

  const expected = typeMap[field.type];
  if (expected && typeof value !== expected) {
    return `Field '${field.name}' must be of type ${expected}`;
  }
  return null;
}

function validateEnum(field: FieldDefinition, value: unknown): string | null {
  if (
    field.enum_values &&
    (typeof value === "string" || typeof value === "number") &&
    !field.enum_values.includes(String(value))
  ) {
    return `Field '${field.name}' must be one of: ${field.enum_values.join(
      ", "
    )}`;
  }
  return null;
}

function validateMaxLength(
  field: FieldDefinition,
  value: unknown
): string | null {
  if (typeof value === "string" && typeof field.max_length === "number") {
    if (value.length > field.max_length) {
      return `Field '${field.name}' exceeds max length of ${field.max_length}`;
    }
  }
  return null;
}

export function validateAgainstSchema(
  entity: Record<string, unknown>,
  fields: FieldDefinition[]
): string[] {
  const errors: string[] = [];

  for (const field of fields) {
    if (field.auto_populated) continue;

    const value = entity[field.name];

    const checks = [
      validateRequired,
      validateType,
      validateEnum,
      validateMaxLength,
    ];

    for (const check of checks) {
      const error = check(field, value);
      if (error) errors.push(error);
    }
  }

  return errors;
}
