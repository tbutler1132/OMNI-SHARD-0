import { loadEntities } from "@/lib/persistence/loadEntity";
import { loadView } from "@/lib/ontology/loadView";
import { CalendarGridRenderer } from "@/components/renderers/CalendarGridRenderer";

//TODO: This is temporary/incomplete
export default async function ConvergenceListPage() {
  const view = await loadView("view-calendar-monthly-convergences"); // Load your form View
  const convergences = await loadEntities(view.targetEntity);

  return (
    <div className="p-6">
      <CalendarGridRenderer
        view={view}
        data={convergences}
        date={new Date("2025-04-01")}
      />
    </div>
  );
}
