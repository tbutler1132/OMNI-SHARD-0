import { NextResponse } from "next/server";
import { getReferenceOptions } from "@/lib/ontology/loadReferenceOptions";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const entity = searchParams.get("entity");

  if (!entity) {
    return NextResponse.json(
      { error: "Missing entity parameter" },
      { status: 400 }
    );
  }

  try {
    const options = await getReferenceOptions(entity);
    return NextResponse.json(options);
  } catch (err) {
    console.error("Error fetching reference options:", err);
    return NextResponse.json(
      { error: "Failed to load options" },
      { status: 500 }
    );
  }
}
