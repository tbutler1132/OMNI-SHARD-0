import RendererWrapper from "@/components/renderers/RendererWrapper";

interface PageProps {
  params: { id: string };
}

export default async function EditConvergencePage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="p-6">
      <RendererWrapper viewId="view-edit-convergence" entityId={id} />
    </div>
  );
}
