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
        viewId: "string", // full entity with trait IDs inside
      },
      output: ["references"],
      steps: [
        {
          id: "lord",
          action: "loadFormView",
          input: {
            viewId: "$inputs.viewId",
          },
        },
        {
          id: "emit",
          action: "emit",
          input: {
            entities: "lord",
          },
        },
      ],
    },
  },
];
