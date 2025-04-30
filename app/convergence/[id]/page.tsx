import { loadEntityById } from "@/lib/ontology/loadEntity";
import { DetailRenderer } from "@/components/renderers/DetailRenderer";
import { loadView } from "@/lib/loadView";

interface PageProps {
  params: { id: string };
}

export default async function EditConvergencePage({ params }: PageProps) {
  const view = await loadView("view-detail-convergence");
  const { id } = await params;
  const convergence = await loadEntityById("convergence", id);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{view.name}</h1>
      <DetailRenderer view={view} data={convergence} />
    </div>
  );
}
