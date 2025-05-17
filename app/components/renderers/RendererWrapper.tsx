import { loadView } from "@/lib/ontology/loadView";
import { loadEntityWithView } from "@/lib/persistence/loadEntityWithView";
import { loadEntityById } from "@/lib/persistence/loadEntity";
import { getReferenceOptions } from "@/lib/ontology/loadReferenceOptions";
import { FormRenderer } from "@/app/components/renderers/FormRenderer";
import { ListRenderer } from "@/app/components/renderers/ListRenderer";
import { BoardRenderer } from "@/app/components/renderers/BoardRenderer";
import { CalendarRenderer } from "@/app/components/renderers/CalendarRenderer";
import { DetailRenderer } from "@/app/components/renderers/DetailRenderer";
import { View } from "@/types/ontology/view";
import { normalizeInitialValues } from "@/lib/utils/normalizeInitialValues";

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
      const normalizedInitialValues = normalizeInitialValues(
        initialValues,
        view
      );
      return (
        <FormRenderer
          view={view}
          referenceOptions={referenceOptions}
          mode="edit"
          initialValues={normalizedInitialValues}
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
      const entity =
        entityId && (await loadEntityById(view.targetEntity, entityId));
      return <DetailRenderer view={view} data={entity} />;
    default:
      return <div>⚠️ No renderer found for layout: {layout}</div>;
  }
}
