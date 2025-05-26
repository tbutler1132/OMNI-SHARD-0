import { Behavior } from "../interpreter/types";

export const behaviors: Behavior[] = [
  {
    id: "behavior-get-high-priority-convergences",
    type: "Behavior",
    essence: {
      input: {},
      output: ["sorted"],
      steps: [
        {
          id: "convergences",
          action: "fetch",
          input: {
            type: "Convergence",
          },
        },
        {
          id: "sorted",
          action: "emit",
          input: {
            message: "Fetched convergences.",
          },
        },
      ],
    },
  },
  {
    id: "behavior-get-entityTypes",
    type: "Behavior",
    essence: {
      input: {
        type: "string",
      },
      output: ["entityTypes"],
      steps: [
        {
          id: "entityTypes",
          action: "fetch",
          input: {
            id: "$inputs.type",
          },
        },
      ],
    },
  },
  {
    id: "behavior-fetch-entities-by-view",
    type: "Behavior",
    essence: {
      input: {
        viewId: "string",
      },
      output: ["entities", "view"],
      steps: [
        {
          id: "view",
          action: "fetch",
          input: {
            id: "$inputs.viewId",
          },
        },
        {
          id: "entities",
          action: "fetch",
          input: {
            type: "view.0.essence.targetEntityType", // e.g. "Convergence"
          },
        },
        {
          id: "result",
          action: "emit",
          input: {
            view: "view.0",
            entities: "entities",
          },
        },
      ],
    },
  },
];
