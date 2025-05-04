import { query } from "../db";
import { View } from "@/types/ontology/view";

export async function loadView(viewId: string): Promise<View> {
  const result = await query(
    `SELECT content FROM views WHERE id = $1 LIMIT 1`,
    [viewId]
  );

  if (!result.length) {
    throw new Error(`View not found in DB: ${viewId}`);
  }

  return result[0].content as View;
}
