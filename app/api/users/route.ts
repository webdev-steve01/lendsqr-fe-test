import data from "../_data/generated.json";
import { NextResponse } from "next/server";

export async function GET() {
  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(a.date_joined).getTime();
    const dateB = new Date(b.date_joined).getTime();
    return dateB - dateA;
  });

  return NextResponse.json(sortedData, {
    status: 200,
  });
}
