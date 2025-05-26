import { behaviors } from "@/core/ontology/behaviors";
import { executeBehavior } from "@/core/interpreter/executeBehavior";

export async function POST(
  req: Request,
  { params }: { params: { behaviorId: string } }
) {
  const { behaviorId } = await params;
  const body = await req.json();
  const behavior = behaviors.find((b) => b.id === behaviorId);
  if (!behavior) return new Response("Behavior not found", { status: 404 });

  const result = await executeBehavior(behavior, body.inputs || {});
  return Response.json(result.result);
}
