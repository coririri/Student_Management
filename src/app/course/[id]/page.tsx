"use client";

import { useParams } from "next/navigation";

function Course() {
  const params = useParams();
  const courseId = params.id;
  return <div>Course{courseId}</div>;
}

export default Course;
