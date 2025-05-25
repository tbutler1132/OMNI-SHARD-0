import RendererWrapper from "@/app/components/renderers/RendererWrapper";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return <RendererWrapper viewId={id} />;
};

export default page;
