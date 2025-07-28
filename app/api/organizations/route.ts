import data from "../_data/generated.json";
import { NextResponse } from "next/server";

export async function GET() {
  const uniqueIndustries = Array.from(
    new Set(data.map((item) => item.organization))
  ).filter(Boolean); // remove undefined/null if any

  return NextResponse.json(uniqueIndustries, {
    status: 200,
  });
}
