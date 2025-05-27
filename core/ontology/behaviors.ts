import { Behavior } from "../interpreter/types";

export const behaviors: Behavior[] = [
  {
    id: "behavior-fetch-entities",
    type: "Behavior",
    essence: {
      input: {
        type: "string",
        filters: { optional: "object" },
      },
      output: ["entities"],
      steps: [
        {
          id: "entities",
          action: "fetch",
          input: {
            type: "$inputs.type",
            filters: "$inputs.filters",
          },
        },
        {
          id: "result",
          action: "emit",
          input: {
            entities: "entities",
          },
        },
      ],
    },
  },
  {
    id: "behavior-fetch-entity-by-id",
    type: "Behavior",
    essence: {
      input: {
        id: "string",
      },
      output: ["entity"],
      steps: [
        {
          id: "entity",
          action: "fetch",
          input: {
            id: "$inputs.id",
          },
        },
        {
          id: "result",
          action: "emit",
          input: {
            entity: "entity.0",
          },
        },
      ],
    },
  },
  {
    id: "behavior-load-form-view",
    type: "Behavior",
    essence: {
      input: {
        viewId: "string",
      },
      output: ["view", "entityType", "traits"],
      steps: [
        // 1. Load the view
        {
          id: "view",
          action: "fetch",
          input: {
            id: "$inputs.viewId",
          },
        },

        // 2. Load the entity type (by name match)
        {
          id: "entityType",
          action: "fetch",
          input: {
            type: "EntityType",
            filters: {
              name: "view.0.essence.targetEntityType",
            },
          },
        },

        // 3. Resolve traits using reference resolver behavior
        {
          id: "traitResolution",
          action: "invoke",
          input: {
            behaviorId: "behavior-resolve-references",
            inputs: {
              entity: "entityType.0",
              fieldPath: "essence.traits",
              type: "Trait",
            },
          },
        },

        // 4. Emit result
        {
          id: "emit",
          action: "emit",
          input: {
            view: "view.0",
            entityType: "entityType.0",
            traits: "traitResolution.result.references",
          },
        },
      ],
    },
  },
];
