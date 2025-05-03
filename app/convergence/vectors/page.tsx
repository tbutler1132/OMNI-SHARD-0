import RendererWrapper from "@/components/renderers/RendererWrapper";

const page = async () => {
  return (
    <div className="p-6">
      <RendererWrapper viewId={"view-vector-convergences"} />
    </div>
  );
};

export default page;
