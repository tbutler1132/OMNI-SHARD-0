import { Behavior, ExecutionContext } from "./types";
import { actionRegistry } from "../actions/actionRegistry";

export const executeBehavior = async (
  behavior: Behavior,
  inputs: Record<string, string>
) => {
  //Initialize the execution context with inputs and an empty steps object
  const context: ExecutionContext = { $inputs: inputs, $steps: {} };

  //Loop through each step in the behavior's essence
  for (const step of behavior.essence.steps) {
    if (!(step.action in actionRegistry)) {
      throw new Error(`Unknown action: ${step.action}`);
    }
    const action = actionRegistry[step.action as keyof typeof actionRegistry];

    if (!action) throw new Error(`Unknown action: ${step.action}`);

    const resolvedInput = resolveInput(step.input || {}, context);
    const output = await (
      action as (input: unknown, context: ExecutionContext) => Promise<unknown>
    )(resolvedInput, context);

    context.$steps[step.id] = output;
  }

  const lastStep = behavior.essence.steps.at(-1);
  return { result: context.$steps[lastStep!.id], success: true };
};

function resolveInput(
  input: Record<string, unknown>,
  context: ExecutionContext
) {
  const resolved: Record<string, unknown> = {};
  for (const key in input) {
    resolved[key] = resolveValue(input[key], context);
  }
  return resolved;
}

function resolveValue(val: unknown, context: ExecutionContext): unknown {
  if (
    typeof val === "string" &&
    (val.startsWith("$inputs.") || /^[a-zA-Z0-9_-]+(\.|$)/.test(val))
  ) {
    const [source, ...path] = val.split(".");
    const base =
      source === "$inputs" ? context.$inputs : context.$steps[source];

    let result = base;
    for (const key of path) {
      if (typeof result === "object" && result !== null && key in result) {
        result = (result as Record<string, unknown>)[key];
      } else {
        return undefined;
      }
    }
    return result;
  }

  console.log("Returning value directly:", val);

  return val;
}
