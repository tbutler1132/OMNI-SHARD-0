import ListRenderer from "./ListRenderer";
import FormRenderer from "./FormRenderer";
import { AnyEntity, Entity } from "@/types/entity";
import { invokeBehavior } from "@/core/utils/invokeBehavior";

type RendererWrapperProps = {
  viewId: string;
};

const layoutBehaviorMap = {
  list: {
    behavior: "behavior-fetch-entities",
    getInputs: (view: Entity<"View">) => ({
      type: view.essence.targetEntityType,
    }),
  },
  form: {
    behavior: "behavior-load-form-view",
    getInputs: (view: Entity<"View">) => ({
      viewId: view.id,
    }),
  },
  board: {
    behavior: "behavior-fetch-entities",
    getInputs: (view: Entity<"View">) => ({
      type: view.essence.targetEntityType,
    }),
  },
  calendar: {
    behavior: "behavior-fetch-entities",
    getInputs: (view: Entity<"View">) => ({
      type: view.essence.targetEntityType,
    }),
  },
};

const layoutRendererMap = {
  list: (data: { entities: AnyEntity[] }) => (
    <ListRenderer data={data.entities} />
  ),
  form: (data: { entities: AnyEntity[] }) => (
    <FormRenderer data={data.entities} />
  ),
  board: (data: { entities: AnyEntity[] }) => (
    <ListRenderer data={data.entities} />
  ),
  calendar: (data: { entities: AnyEntity[] }) => (
    <ListRenderer data={data.entities} />
  ),
};

const RendererWrapper = async ({ viewId }: RendererWrapperProps) => {
  const { entity: view } = await invokeBehavior<{ entity: Entity<"View"> }>(
    "behavior-fetch-entity-by-id",
    { id: viewId }
  );

  const layout = view.essence.layout || "list";
  const layoutEntry = layoutBehaviorMap[layout];
  const renderer = layoutRendererMap[layout];

  if (!layoutEntry || !renderer) {
    return <div>⚠️ No renderer or behavior for layout: {layout}</div>;
  }

  const data = await invokeBehavior(
    layoutEntry.behavior,
    layoutEntry.getInputs(view)
  );

  return renderer(data as { entities: AnyEntity[] });
};

export default RendererWrapper;
