"use client";

import { useEntireStudentListStore } from "@/app/store/useEntireStudentList";
import { useMyCourseListStore } from "@/app/store/useMyCourseList";
import { useState } from "react";
import { BsBookmarkFill, BsSearch } from "react-icons/bs";

interface SearchBarProps {
  type?: string;
  placeholder: string;
}

function SearchBar({ type, placeholder }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState("");
  const { setCourseList, setIsloadingCourseList } = useMyCourseListStore();
  const { setStudentList } = useEntireStudentListStore();

  // 검색 실행 함수
  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      // 검색 api 연결
    }
  };

  if (type == "basic") {
    return (
      <div className="flex items-center">
        <div className="relative ml-56 w-[220px]">
          <input
            type="text"
            placeholder={placeholder}
            className="w-full pl-3 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3D3D3D] focus:border-[#3D3D3D] placeholder-gray-400 shadow-sm shadow-[#3D3D3D] shadow-offset-y-2 "
            value={searchValue}
            onChange={async (e) => {
              setSearchValue(e.target.value);
              setIsloadingCourseList(true);
              const res = await fetch(
                `/api/student/all?keyword=${e.target.value}`
              );
              const data = await res.json();
              setStudentList(data);
              setIsloadingCourseList(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            onClick={() => {
              handleSearch();
            }}
          >
            <BsSearch />
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center">
      <BsBookmarkFill size="16px" />
      <span className="font-bold ml-4">반</span>
      <div className="relative ml-4 w-[220px]">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full py-1 pl-3 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3D3D3D] focus:border-[#3D3D3D] placeholder-gray-400 shadow-sm shadow-[#3D3D3D] shadow-offset-y-2 "
          value={searchValue}
          onChange={async (e) => {
            setSearchValue(e.target.value);
            setIsloadingCourseList(true);
            const res = await fetch(`/api/course/my?keyword=${e.target.value}`);
            const data = await res.json();
            setCourseList(data);
            setIsloadingCourseList(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          type="button"
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          onClick={() => {
            handleSearch();
          }}
        >
          <BsSearch />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
