import ListRenderer from "./ListRenderer";
import { AnyEntity, Entity } from "@/types/entity";

type RendererWrapperProps = {
  viewId: string;
};

const RendererWrapper = async ({ viewId }: RendererWrapperProps) => {
  const data = await fetch(
    `http://localhost:3000/api/behaviors/behavior-fetch-entities-by-view`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: { viewId },
      }),
    }
  );
  const { view, entities }: { view: Entity<"View">; entities: AnyEntity[] } =
    await data.json();
  const layout = view.essence.layout || "list"; // Default to "list" if not specified

  switch (layout) {
    case "list":
      return <ListRenderer data={entities} />;
    default:
      return <div>⚠️ No renderer found for layout: {layout}</div>;
  }
};

export default RendererWrapper;
