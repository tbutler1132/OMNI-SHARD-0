// interpreter/behaviorInterpreter.ts
import { Entity } from "../runtime/entities";
// import { getConceptCategory } from "../ontology/conceptTypes";

export async function executeBehavior(
  behavior: Entity,
  context: Record<string, unknown>
): Promise<void> {
  console.log("executeBehavior", behavior, context);
  const behaviorType = behavior.fields["behaviorType"] as string;
  const steps = behavior.fields["steps"] as {
    action: string;
    input: Record<string, unknown>;
  }[];

  if (!Array.isArray(steps)) {
    console.warn("Invalid behavior: missing or malformed steps array.");
    return;
  }

  console.log(`Executing behavior '${behavior.id}' of type '${behaviorType}'`);

  for (const step of steps) {
    const { action, input } = step;
    console.log(`  → Step action: ${action}`);
    console.log(`    Inputs:`, input);
    // Placeholder: actual action resolution would occur here
    // await actionRegistry[action]?.(input, context);
  }

  if (behaviorType === "mutation") {
    console.log("→ Behavior is a mutation — state update would occur here.");
  } else if (behaviorType === "query") {
    console.log(
      "→ Behavior is a query — response object would be constructed."
    );
  } else if (behaviorType === "validation") {
    console.log("→ Behavior is validation — errors would be checked.");
  } else if (behaviorType === "sideEffect") {
    console.log("→ Behavior has side effects — logging, notifications, etc.");
  } else {
    console.warn("→ Unknown behavior type:", behaviorType);
  }
}
