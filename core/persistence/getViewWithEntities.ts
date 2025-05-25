import { loadEntityById, loadEntitiesWithView } from "./loadEntity";

export const getViewWithEntities = async (viewId: string) => {
  const view = await loadEntityById(viewId);
  if (!view) {
    throw new Error(`View with ID ${viewId} not found`);
  }

  const entities = await loadEntitiesWithView(view);
  if (!entities) {
    throw new Error(`Entities for view with ID ${viewId} not found`);
  }
  return {
    view,
    entities,
  };
};
