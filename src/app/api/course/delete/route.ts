import { createClient } from "../../supabase/server";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const supabase = await createClient();

  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get("courseId");

  if (!courseId) {
    return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
  }

  const { error } = await supabase.from("course").delete().eq("id", courseId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Course deleted successfully" });
}
