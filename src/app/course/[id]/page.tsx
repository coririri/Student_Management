import CourseRecordPage from "@/app/components/organism/CourseRecordPage";
import React, { Suspense } from "react";

function Course() {
  return (
    <Suspense fallback={<div className="text-center mt-24">로딩 중...</div>}>
      <CourseRecordPage />
    </Suspense>
  );
}

export default Course;
