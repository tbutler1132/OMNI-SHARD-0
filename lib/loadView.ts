import fs from "fs/promises";
import path from "path";
import { View } from "../types/ontology/view"; // Your generated View type

export async function loadView(viewId: string): Promise<View> {
  const viewStorePath = path.resolve("data/entities/view/view.local.json");

  const raw = await fs.readFile(viewStorePath, "utf-8");
  console.log("Raw View Store:", JSON.parse(raw));
  const views: View[] = JSON.parse(raw);

  console.log("Views:", views);

  const found = views.find((v) => v.id === viewId);

  if (!found) {
    throw new Error(`View not found: ${viewId}`);
  }

  return found;
}
