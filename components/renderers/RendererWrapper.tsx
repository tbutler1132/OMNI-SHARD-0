import { loadView } from "@/lib/loadView";
import { loadEntityWithView } from "@/lib/ontology/loadEntityWithView";
import { loadEntityById } from "@/lib/ontology/loadEntity";
import { getReferenceOptions } from "@/lib/ontology/loadReferenceOptions";
import { FormRenderer } from "@/components/renderers/FormRenderer";
import { ListRenderer } from "@/components/renderers/ListRenderer";
import { BoardRenderer } from "@/components/renderers/BoardRenderer";
import { CalendarRenderer } from "@/components/renderers/CalendarRenderer";
import { DetailRenderer } from "@/components/renderers/DetailRenderer";
import { View } from "@/types/ontology/view";

interface RendererWrapperProps {
  viewId: string;
  entityId?: string;
  extraRendererProps?: Record<string, unknown>;
}

export default async function RendererWrapper({
  viewId,
  entityId,
  extraRendererProps = {},
}: RendererWrapperProps) {
  const view: View = await loadView(viewId);
  const layout = view.rendererComponent ?? view.layout;

  if (layout === "form") {
    const referenceOptions: Record<string, { id: string; label: string }[]> =
      {};

    for (const [fieldName, override] of Object.entries(
      view.fieldOverrides || {}
    )) {
      if (override.inputType === "reference-select" && override.target) {
        referenceOptions[fieldName] = await getReferenceOptions(
          override.target
        );
      }
    }

    if (view.actions?.some((a) => a.includes("update")) && entityId) {
      const initialValues = await loadEntityById(view.targetEntity, entityId);
      return (
        <FormRenderer
          view={view}
          referenceOptions={referenceOptions}
          mode="edit"
          initialValues={initialValues}
        />
      );
    }

    return (
      <FormRenderer
        view={view}
        referenceOptions={referenceOptions}
        mode="create"
      />
    );
  }

  //TODO: Change this to use loadEntityWithView
  //   const data = await loadEntities(view.targetEntity);
  const data = await loadEntityWithView(view);

  switch (layout) {
    case "list":
      return <ListRenderer view={view} data={data} {...extraRendererProps} />;
    case "board":
      return <BoardRenderer view={view} data={data} />;
    case "calendar":
      return <CalendarRenderer view={view} data={data} />;
    case "detail":
      return <DetailRenderer view={view} data={data[0]} />;
    default:
      return <div>⚠️ No renderer found for layout: {layout}</div>;
  }
}
