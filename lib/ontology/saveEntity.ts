/**
 * @semantic Behavior
 * @id behavior-save-entity
 * @description Saves the entity in the database.
 */
export const saveEntity = async (
  entity: string,
  data: Record<string, unknown>
) => {
  console.log("Saving entity in saved:", entity, data);
};
