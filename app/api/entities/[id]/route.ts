import { NextResponse } from "next/server";
import { loadEntityById } from "@/core/persistence/loadEntity";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;
  const entity = await loadEntityById(id);
  return NextResponse.json(entity);
};
