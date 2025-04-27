// app/convergence/[id]/edit/page.tsx

import { loadEntityById } from "@/lib/ontology/loadEntity";
import { FormRenderer } from "@/components/renderers/FormRenderer";
import { loadView } from "@/lib/loadView";

interface PageProps {
  params: { id: string };
}

export default async function EditConvergencePage({ params }: PageProps) {
  const view = await loadView("view-edit-convergence");
  const { id } = await params;
  const convergence = await loadEntityById("convergence", id);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Convergence</h1>
      <FormRenderer view={view} initialValues={convergence} mode="edit" />
    </div>
  );
}
