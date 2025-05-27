export async function invokeBehavior<T = unknown>(
  behaviorId: string,
  inputs: Record<string, unknown>
): Promise<T> {
  const res = await fetch(`http://localhost:3000/api/behaviors/${behaviorId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inputs }),
  });

  if (!res.ok) {
    throw new Error(`Behavior ${behaviorId} failed: ${res.statusText}`);
  }

  return res.json();
}
