"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";

function UserProfile() {
  const [isClickProfile, setIsClickProfile] = useState(false);
  const router = useRouter();
  return (
    <button
      className="cursor-pointer"
      onClick={() => {
        setIsClickProfile((prev) => !prev);
      }}
    >
      <AiOutlineSetting size="16px" className="mr-8 mt-[1px]" />
      {isClickProfile && (
        <span
          onClick={async () => {
            await fetch("/api/logout", {
              method: "POST",
            });

            router.push("/login"); // 또는 원하는 페이지로 리디렉션
          }}
          className="absolute top-18 right-12 text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md cursor-pointer transition-colors"
        >
          로그아웃
        </span>
      )}
    </button>
  );
}

export default UserProfile;
