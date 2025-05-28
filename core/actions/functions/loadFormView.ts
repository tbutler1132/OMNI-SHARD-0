import { loadEntityById, loadEntities } from "@/core/persistence/loadEntity";
import { Entity, AnyEntity } from "@/types/entity";

export const loadFormView = async (input: {
  viewId: string;
}): Promise<AnyEntity[]> => {
  const views: Entity<"View">[] = await loadEntityById(input.viewId);
  const entityTypes = (await loadEntities("EntityType", {
    name: views[0].essence.targetEntityType,
  })) as Entity<"EntityType">[];
  const traits = await loadEntities("Trait", {
    id: entityTypes[0].essence.traits,
  });
  return [...views, ...entityTypes, ...traits];
};
