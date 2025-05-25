import { NextResponse } from "next/server";
import { loadEntityById } from "@/core/persistence/loadEntity";
import { createEntity } from "@/core/actions";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;
  const entity = await loadEntityById(id);
  return NextResponse.json(entity);
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { targetEntity, entity } = body;

    await createEntity(targetEntity, entity);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/entities error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
