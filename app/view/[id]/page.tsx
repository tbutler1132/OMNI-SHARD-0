// app/view/[viewId]/page.tsx

import RendererWrapper from "@/components/renderers/RendererWrapper";

export default async function ViewPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { id } = await params;
  let { entityId, mode } = await searchParams;
  entityId = typeof entityId === "string" ? entityId : undefined;
  mode = typeof mode === "string" ? mode : undefined;

  return (
    <RendererWrapper
      viewId={id}
      entityId={entityId}
      extraRendererProps={{ mode }}
    />
  );
}
