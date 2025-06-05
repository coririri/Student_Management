"use client";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import { AiOutlineInbox } from "react-icons/ai";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface CourseItemProps {
  id: UUID;
  name: string;
}

function CourseItem({ id, name }: CourseItemProps) {
  const router = useRouter();
  // ✅ 마우스 센서에 클릭 지연 설정 (예: 200ms)

  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    transform,
  } = useDraggable({
    id,
  });
  const { setNodeRef: setDroppableRef } = useDroppable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: "box-shadow 0.2s, opacity 0.2s",
  }; // 최소한만 인라인 style로

  // Draggable과 Droppable을 함께 적용
  const combinedRef = (node: HTMLElement | null) => {
    setDraggableRef(node);
    setDroppableRef(node);
  };

  return (
    <li
      key={id}
      ref={combinedRef}
      style={style}
      className={`mx-2 bg-[#F6F6F6] rounded-lg my-1 transition-all duration-200 ease-out
  ${
    transform
      ? "z-[9999] cursor-grabbing opacity-90 shadow-2xl scale-[0.96] rotate-[0.5deg]"
      : "cursor-grab hover:shadow-md"
  }`}
      {...listeners}
      {...attributes}
    >
      <button
        type="button"
        className="flex items-center cursor-pointer px-3 py-3 w-full"
        onClick={() => {
          router.push(`/course/${id}`);
        }}
      >
        <AiOutlineInbox size="22px" className="mr-2 flex-shrink-0" />
        <span className="font-bold text-md">{name}</span>
      </button>
    </li>
  );
}

export default CourseItem;
