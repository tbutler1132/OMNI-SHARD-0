import ListRenderer from "./ListRenderer";

type RendererWrapperProps = {
  viewId: string;
};

const RendererWrapper = async ({ viewId }: RendererWrapperProps) => {
  const data = await fetch(
    `http://localhost:3000/api/entities/views/${viewId}`
  );
  const { view, entities } = await data.json();
  const { layout } = view.essence;
  console.log("RendererWrapper", entities);

  switch (layout) {
    case "list":
      return <ListRenderer />;
    default:
      return <div>⚠️ No renderer found for layout: {layout}</div>;
  }
};

export default RendererWrapper;
