import data from "../_data/generated.json";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(data, {
    status: 200,
  });
}
