import fs from "fs/promises";
import path from "path";
import { View } from "../types/ontology/view"; // Your generated View type

//TODO: Move this into loadEntity.ts
export async function loadView(viewId: string): Promise<View> {
  const viewStorePath = path.resolve("data/entities/view/view.local.json");

  const raw = await fs.readFile(viewStorePath, "utf-8");
  const views: View[] = JSON.parse(raw);

  const found = views.find((v) => v.id === viewId);

  if (!found) {
    throw new Error(`View not found: ${viewId}`);
  }

  return found;
}
