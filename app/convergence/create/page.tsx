import { loadView } from "../../../lib/loadView"; // Helper to load View JSON
import { FormRenderer } from "@/components/renderers/FormRenderer";

export default async function CreateConvergencePage() {
  const view = await loadView("view-create-convergence"); // Load your form View

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">{view.name}</h1>
      <FormRenderer view={view} />
    </main>
  );
}
