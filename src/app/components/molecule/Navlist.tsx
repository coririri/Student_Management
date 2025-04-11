"use client";

import { AiOutlineBook, AiFillCaretDown } from "react-icons/ai";
import CourseItem from "../atoms/CourseItem";
import { useState } from "react";

function Navlist() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <div className="mx-2 px-3 py-3 bg-[#F3F7FF] rounded-lg relative">
        <button
          className="flex items-center"
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <AiOutlineBook size="22px" className="mr-2 flex-shrink-0" />
          <span className="font-bold text-md pr-8">김선우 선생님 반</span>
          <AiFillCaretDown
            size="22px"
            className={`absolute right-4 flex-shrink-0 transition-transform duration-200 ${
              isOpen ? "rotate-0" : "rotate-180"
            }`}
          />
        </button>
      </div>
      {isOpen && (
        <ul>
          <CourseItem />
          <CourseItem />
          <CourseItem />
        </ul>
      )}
    </div>
  );
}

export default Navlist;
