"use client";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import { AiOutlineInbox } from "react-icons/ai";

interface CourseItemProps {
  id: UUID;
  name: string;
}

function CourseItem({ id, name }: CourseItemProps) {
  const router = useRouter();
  return (
    <li className="mx-2 bg-[#F6F6F6] rounded-lg my-1">
      <button
        type="button"
        className="flex items-center cursor-pointer px-3 py-3"
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
