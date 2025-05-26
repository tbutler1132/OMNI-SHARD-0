import type { Behavior, ExecutionContext } from "./types";
import { actionRegistry } from "../actions/actionRegistry";

export async function executeBehavior(
  behavior: Behavior,
  inputs: Record<string, unknown>
): Promise<{ result: unknown; success: boolean }> {
  const context: ExecutionContext = { $inputs: inputs, $steps: {} };

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
}

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
    (val.startsWith("$inputs.") || /^[a-zA-Z0-9_-]+\./.test(val))
  ) {
    const [source, ...path] = val.split(".");
    const base =
      source === "$inputs" ? context.$inputs : context.$steps[source];
    return path.reduce((acc, key) => {
      if (typeof acc === "object" && acc !== null && key in acc) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, base);
  }
  return val;
}
