import { createClient } from "../../supabase/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const updates: { id: string; order: number }[] = body.updates;

  if (!Array.isArray(updates) || updates.length === 0) {
    return NextResponse.json(
      { error: "Invalid update format" },
      { status: 400 }
    );
  }

  for (const { id, order } of updates) {
    const { error } = await supabase
      .from("course")
      .update({ order })
      .eq("id", id)
      .eq("teacher_id", user.id);

    if (error) {
      console.error(`Failed to update course ${id}:`, error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
