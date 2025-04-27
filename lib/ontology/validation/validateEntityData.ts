// lib/ontology/validation/validateEntityData.ts

import Ajv from "ajv";
import { entitySchemas } from "./entitySchemas";

const ajv = new Ajv({ allErrors: true, strict: false });

export function validateEntityData(
  targetEntity: string,
  data: Record<string, unknown>
) {
  const schema = entitySchemas[targetEntity];
  if (!schema) {
    throw new Error(`No schema registered for entity type: ${targetEntity}`);
  }

  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    const errors = validate.errors
      ?.map((e) => `${e.instancePath} ${e.message}`)
      .join(", ");
    throw new Error(`Validation failed: ${errors}`);
  }
}
