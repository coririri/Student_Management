"use client";

import { AiOutlineBook, AiFillCaretDown } from "react-icons/ai";
import CourseItem from "../atoms/CourseItem";
import { useEffect, useState } from "react";
import { useMyCourseListStore } from "@/app/store/useMyCourseList";
import { useRouter } from "next/navigation";
import CourseItemSkeleton from "../skeletons/CourseItemSkeleton";
import { useUserProfileStore } from "@/app/store/useUserProfile";

function Navlist() {
  const [isOpen, setIsOpen] = useState(true);
  const { name, setName } = useUserProfileStore();

  const {
    courseList,
    setCourseList,
    isLoadingCourseList,
    setIsloadingCourseList,
  } = useMyCourseListStore();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsloadingCourseList(true);
      const res = await fetch(`/api/course/my`);
      const data = await res.json();
      setCourseList(data);
      setIsloadingCourseList(false);

      const nameRes = await fetch("/api/name");
      const nameData = await nameRes.json();
      setName(nameData.name);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="mx-2 px-3 py-3 bg-[#F3F7FF] rounded-lg relative">
        <button
          className="flex items-center cursor-pointer"
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <AiOutlineBook size="22px" className="mr-2 flex-shrink-0" />
          <span className="font-bold text-md pr-8">{name} 선생님 반</span>
          <AiFillCaretDown
            size="22px"
            className={`absolute right-4 flex-shrink-0 transition-transform duration-200 ${
              isOpen ? "rotate-0" : "rotate-180"
            }`}
          />
        </button>
      </div>
      {isLoadingCourseList && <CourseItemSkeleton />}
      {isOpen && !isLoadingCourseList && (
        <ul className="overflow-auto h-[720px]">
          {/* {courseList
            .sort((a, b) => {
              const numA = parseInt(a.name.replace(/\D/g, ""), 10);
              const numB = parseInt(b.name.replace(/\D/g, ""), 10);
              return numA - numB;
            })
            .map((course) => (
              <CourseItem key={course.id} id={course.id} name={course.name} />
            ))} */}
          {courseList
            .sort((a, b) => {
              const nameA = a.name;
              const nameB = b.name;

              // 한글(비숫자) 부분 추출
              const textA = nameA.replace(/[0-9]/g, "").trim();
              const textB = nameB.replace(/[0-9]/g, "").trim();

              // 숫자 부분 추출 (여러 개일 경우 첫 숫자만 기준으로)
              const numA = parseInt(nameA.replace(/\D/g, ""), 10);
              const numB = parseInt(nameB.replace(/\D/g, ""), 10);

              // 1. 한글 기준으로 정렬
              const textCompare = textA.localeCompare(textB, "ko");
              if (textCompare !== 0) return textCompare;

              // 2. 숫자 기준으로 정렬
              return numA - numB;
            })
            .map((course) => (
              <CourseItem key={course.id} id={course.id} name={course.name} />
            ))}
        </ul>
      )}
      {/* 버튼을 항상 아래에 고정 */}
      <button
        type="button"
        className="fixed bottom-4 left-36 transform -translate-x-1/2 text-white bg-[#3D3D3D] font-xs py-2 px-10 rounded-2xl cursor-pointer"
        onClick={() => {
          router.push("/course/add");
        }}
      >
        반 추가 +
      </button>
    </div>
  );
}

export default Navlist;
