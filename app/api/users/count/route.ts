import data from "../../_data/generated.json";
import { NextResponse } from "next/server";

export async function GET() {
  const count = Array.isArray(data) ? data.length : 0;
  return NextResponse.json({ count });
}
