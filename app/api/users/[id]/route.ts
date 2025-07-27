import { NextResponse } from "next/server";
import data from "../../_data/generated.json"; // adjust this path as needed

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const user = data.find((user) => user.user_id === id);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
