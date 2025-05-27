export type ExecutionContext = {
  $inputs: Record<string, unknown>;
  $steps: Record<string, unknown>;
};

export type Step = {
  id: string;
  action: string;
  input?: Record<string, unknown>;
  condition?: string;
};

export type Behavior = {
  id: string;
  type: "Behavior";
  essence: {
    input?: Record<string, unknown>;
    output?: string[];
    steps: Step[];
  };
};
