"use client";
import { BsBox } from "react-icons/bs";
import { useParams, useSearchParams } from "next/navigation";
import Canlendar from "@/app/components/molecule/Canlendar";
import { useState } from "react";

function Course() {
  const params = useParams();
  const courseId = params.id;
  const searchParams = useSearchParams();

  const [startDate, setStartDate] = useState<Date>(() => {
    const dateStr = searchParams.get("date");
    console.log(dateStr);
    const date = dateStr ? new Date(dateStr) : new Date();
    console.log(date);
    // 원하는 형식으로 날짜 포맷
    const formattedDate = date.toISOString(); // "YYYY-MM-DD" 형식으로

    return new Date(formattedDate.split("T")[0]);
  });

  console.log(courseId);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <BsBox size="24px" className="mr-4" />
          <span className="font-bold text-2xl mr-4">화13</span>
          <button
            type="button"
            className="text-white bg-[#3D3D3D] font-xs py-1 px-6 rounded-3xl"
          >
            반 삭제
          </button>
        </div>
        <div>
          <button
            type="button"
            className="text-white bg-[#3D3D3D] font-xs py-1 px-6 rounded-3xl"
          >
            학생 추가
          </button>
          <button
            type="button"
            className="text-white bg-[#3D3D3D] font-xs py-1 px-6 rounded-3xl ml-4"
          >
            학생 삭제
          </button>
          <button
            type="button"
            className="text-white bg-[#3D3D3D] font-xs py-1 px-6 rounded-3xl ml-4"
          >
            전체 전송
          </button>
        </div>
      </div>
      <hr className="mt-4 mb-4" />
      <Canlendar
        startDate={startDate}
        setStartDate={setStartDate}
        searchParams={searchParams}
      />
      <div className="w-full py-2 mt-6">
        <div className="flex items-center border-b-1 border-[#D9D9D9] border-solid py-2">
          <input type="checkbox" className="w-6 h-6 mx-2" />
          <span className="w-[100px] text-center font-bold">학년</span>
          <span className="w-[150px] text-center font-bold">이름</span>
          <span className="w-[150px] text-center font-bold">출결</span>
          <span className="w-[300px] text-center font-bold">진도</span>
          <span className="w-[150px] text-center font-bold">숙제 이행률</span>
          <span className="w-[300px] text-center font-bold">특이사항</span>
          <span className="w-[200px] text-center font-bold">메시지 전송</span>
        </div>
      </div>
    </div>
  );
}

export default Course;
