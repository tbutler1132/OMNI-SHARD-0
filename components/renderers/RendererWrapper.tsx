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
    behavior: "behavior-fetch-entities",
    getInputs: (view: Entity<"View">) => ({
      type: "EntityType",
      filters: { name: view.essence.targetEntityType },
    }),
  },
};

const layoutRendererMap = {
  list: (data: { entities: AnyEntity[] }) => (
    <ListRenderer data={data.entities} />
  ),
  form: (data: { entities: AnyEntity[] }) => (
    <FormRenderer entityType={data.entities as Entity<"EntityType">[]} />
  ),
  board: (data: { entities: AnyEntity[] }) => (
    <ListRenderer data={data.entities} />
  ),
  calendar: (data: { entities: AnyEntity[] }) => (
    <ListRenderer data={data.entities} />
  ),
};

const RendererWrapper = async ({ viewId }: RendererWrapperProps) => {
  const { entity } = await invokeBehavior<{ entity: Entity<"View"> }>(
    "behavior-fetch-entity-by-id",
    { id: viewId }
  );

  const layout = entity.essence.layout || "list"; // Default to "list" if not specified
  const renderer = layoutRendererMap[layout];
  const layoutEntry = layoutBehaviorMap[layout];

  if (!layoutEntry) {
    return <div>⚠️ No behavior for layout: {layout}</div>;
  }

  const data = (await invokeBehavior(
    layoutEntry.behavior,
    layoutEntry.getInputs(entity)
  )) as { entities: AnyEntity[] };

  return renderer(data);
};

export default RendererWrapper;
