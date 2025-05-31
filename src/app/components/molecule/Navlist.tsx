"use client";

import { AiOutlineBook, AiFillCaretDown } from "react-icons/ai";
import CourseItem from "../atoms/CourseItem";
import { useEffect, useState } from "react";
import { useMyCourseListStore } from "@/app/store/useMyCourseList";
import { useRouter } from "next/navigation";
import CourseItemSkeleton from "../skeletons/CourseItemSkeleton";
import { useUserProfileStore } from "@/app/store/useUserProfile";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Course } from "@/app/types/course";
import LoadingModal from "../modals/LoadingModal";

function Navlist() {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { name, setName } = useUserProfileStore();

  const {
    courseList,
    setCourseList,
    isLoadingCourseList,
    setIsloadingCourseList,
  } = useMyCourseListStore();
  const router = useRouter();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor);

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

  const arrayMoveAndReorder = (
    courseList: Course[],
    oldIndex: number,
    newIndex: number
  ): Course[] => {
    const updatedList = [...courseList];
    const [movedItem] = updatedList.splice(oldIndex, 1);
    updatedList.splice(newIndex, 0, movedItem);

    return updatedList.map((course, index) => ({
      ...course,
      order: index, // 0부터 순서 재정의
    }));
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = courseList.findIndex((c) => c.id === active.id);
    const newIndex = courseList.findIndex((c) => c.id === over.id);
    const reordered = arrayMoveAndReorder(courseList, oldIndex, newIndex);
    // 서버에 변경사항 반영 요청
    try {
      setIsLoading(true);
      await fetch("/api/course/order", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updates: reordered.map((course) => ({
            id: course.id,
            order: course.order,
          })),
        }),
      });

      setIsLoading(false);

      // 로컬 상태 업데이트
      setCourseList(reordered);
    } catch (error) {
      console.error("순서 변경 실패:", error);
      // 실패 시 사용자에게 알림 표시하거나 이전 상태로 롤백할 수 있음
    }
  };

  return (
    <div>
      <LoadingModal isModalOpen={isLoading} />
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
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <ul className="overflow-auto h-[720px]">
            {courseList
              .sort((a, b) => a.order - b.order)
              .map((course) => (
                <CourseItem key={course.id} id={course.id} name={course.name} />
              ))}
          </ul>
        </DndContext>
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
