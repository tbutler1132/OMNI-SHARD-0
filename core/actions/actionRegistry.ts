// import type { ExecutionContext } from "../interpreter/types";
import { loadEntities, loadEntityById } from "../persistence/loadEntity";

export const actionRegistry = {
  fetch: async (input: { type?: string; id?: string }): Promise<unknown> => {
    if (input.id) {
      const entity = await loadEntityById(input.id);
      return entity;
    }
    if (input.type) {
      const entities = await loadEntities(input.type);
      return entities;
    }
  },

  emit: async (
    input: Record<string, unknown>
  ): Promise<Record<string, unknown>> => {
    console.log("[EMIT]", input);
    return input;
  },
};
