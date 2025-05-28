// import type { ExecutionContext } from "../interpreter/types";
import { loadEntities, loadEntityById } from "../persistence/loadEntity";
import { behaviors } from "../ontology/behaviors";
import { executeBehavior } from "../interpreter/executeBehavior";
import { loadFormView } from "./functions/loadFormView";

//TODO: Extract shared types from loadEntities
type FilterValue = string | string[];
type Filters = Record<string, FilterValue>;

export const actionRegistry = {
  fetch: async (input: {
    type: string;
    id?: string;
    filters?: Filters;
  }): Promise<unknown> => {
    if (input.id) {
      return await loadEntityById(input.id);
    }
    return await loadEntities(input.type, input.filters);
  },

  emit: async (
    input: Record<string, unknown>
  ): Promise<Record<string, unknown>> => {
    // console.log("[EMIT]", input);
    return input;
  },

  invoke: async (input: {
    behaviorId: string;
    inputs: Record<string, unknown>;
  }) => {
    const behavior = behaviors.find((b) => b.id === input.behaviorId);
    if (!behavior) {
      throw new Error("Behavior not found");
    }
    const result = await executeBehavior(behavior, input.inputs);
    return result.result;
  },

  loadFormView,
};
