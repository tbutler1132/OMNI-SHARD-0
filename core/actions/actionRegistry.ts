import type { ExecutionContext } from "../interpreter/types";

export const actionRegistry = {
  fetch: async (
    input: { type: string },
    context: ExecutionContext
  ): Promise<unknown> => {
    console.log(context);
    const mockData: Record<string, unknown[]> = {
      Convergence: [
        {
          id: "1",
          essence: {
            title: "Test",
            status: "not-started",
            priority: "high",
            time: "2024-01-01",
          },
        },
      ],
    };

    return mockData[input.type] || [];
  },

  emit: async (
    input: { message: string },
    context: ExecutionContext
  ): Promise<null> => {
    console.log(context);
    console.log("[EMIT]", input.message);
    return null;
  },
};
