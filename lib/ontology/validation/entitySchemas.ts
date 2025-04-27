import convergenceSchema from "@/schema/ontology/convergence.json";
import folderSchema from "@/schema/ontology/folder.json";
import viewSchema from "@/schema/ontology/view.json";

export const entitySchemas: Record<string, object> = {
  convergence: convergenceSchema,
  folder: folderSchema,
  view: viewSchema,
};
