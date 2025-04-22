import { useEntireStudentListStore } from "@/app/store/useEntireStudentList";
import { formatPhoneNumber } from "@/app/utils/formatPhoneNumber";
import { gradeTransform } from "@/app/utils/gradeTransform";
import React from "react";

interface StudentListItemProps {
  grade: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  name: string;
  phonenumber: string;
  parentPhonenumber: string;
  id: string;
}

function StudentListItem({
  grade,
  name,
  phonenumber,
  parentPhonenumber,
  id,
}: StudentListItemProps) {
  const { checkedList, handleCheckStudent } = useEntireStudentListStore();
  return (
    <div className="flex items-center border-b border-[#D9D9D9] py-2">
      <input
        type="checkbox"
        className="w-[22px] h-6"
        checked={checkedList.has(id)}
        onChange={() => {
          handleCheckStudent(id);
        }}
      />
      <span className="w-[109.5px] text-center font-bold">
        {gradeTransform(grade)}
      </span>
      <span className="w-[109.5px] text-center font-bold">{name}</span>
      <span className="w-[219px] text-center font-bold">
        {formatPhoneNumber(phonenumber)}
      </span>
      <span className="w-[219px] text-center font-bold">
        {formatPhoneNumber(parentPhonenumber)}
      </span>
    </div>
  );
}

export default StudentListItem;
