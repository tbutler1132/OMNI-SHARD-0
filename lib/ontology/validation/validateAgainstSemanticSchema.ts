/**
 * @semantic Behavior
 * @id validate-against-semantic-schema
 * @description Validates the structure of the data against the semantic schema.
 */
export function validateAgainstSemanticSchema(
  data: Record<string, unknown>,
  schema: unknown
) {
  if (typeof schema !== "object" || schema === null || !("fields" in schema)) {
    throw new Error(
      "Invalid schema: 'fields' property is missing or schema is not an object."
    );
  }
  const fields = (
    schema as {
      fields: Array<{
        name: string;
        type: string;
        optional?: boolean;
        maxLength?: number;
        enum?: unknown[];
      }>;
    }
  ).fields;

  for (const field of fields) {
    const value = data[field.name];

    if (!field.optional && (value === undefined || value === null)) {
      throw new Error(`Missing required field: ${field.name}`);
    }

    if (value === undefined || value === null) {
      continue;
    }

    if (field.type === "string" && typeof value !== "string") {
      throw new Error(`Field "${field.name}" must be a string.`);
    }
    if (field.type === "number" && typeof value !== "number") {
      throw new Error(`Field "${field.name}" must be a number.`);
    }
    if (field.type === "datetime" && typeof value !== "string") {
      throw new Error(`Field "${field.name}" must be a datetime string.`);
    }
    if (field.type === "reference" && typeof value !== "string") {
      throw new Error(`Field "${field.name}" must be a reference ID (string).`);
    }

    if (
      field.maxLength !== undefined &&
      typeof value === "string" &&
      value.length > field.maxLength
    ) {
      throw new Error(
        `Field "${field.name}" must not exceed ${field.maxLength} characters.`
      );
    }

    if (field.enum !== undefined && !field.enum.includes(value)) {
      throw new Error(
        `Field "${field.name}" must be one of: ${field.enum.join(", ")}.`
      );
    }
  }
}
