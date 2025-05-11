// lib/utils/toRenderableEntity.ts

export type Primitive = string | number | boolean | null | undefined;

export function toRenderableEntity(
  entity: Record<string, unknown> | undefined | null
): Record<string, Primitive> {
  const result: Record<string, Primitive> = {};

  if (!entity || typeof entity !== "object") {
    console.warn("toRenderableEntity received invalid input:", entity);
    return result;
  }

  for (const key in entity) {
    const value = entity[key];
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      value === null ||
      value === undefined
    ) {
      result[key] = value;
    }
  }

  return result;
}
