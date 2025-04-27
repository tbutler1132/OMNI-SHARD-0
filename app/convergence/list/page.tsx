import { loadEntities } from "@/lib/ontology/loadEntity";
import { ListRenderer } from "@/components/renderers/ListRenderer";
import { loadView } from "@/lib/loadView";

export default async function ConvergenceListPage() {
  const view = await loadView("view-list-convergences"); // Load your form View
  const convergences = await loadEntities(view.targetEntity);

  return (
    <div className="p-6">
      <ListRenderer view={view} data={convergences} />
    </div>
  );
}
