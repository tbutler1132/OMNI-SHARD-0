import { NextResponse } from "next/server";
import { getViewWithEntities } from "@/core/persistence/getViewWithEntities";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;
  const entity = await getViewWithEntities(id);
  return NextResponse.json(entity);
};
