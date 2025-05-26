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
];
