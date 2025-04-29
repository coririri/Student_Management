"use client";

import { useUserProfileStore } from "@/app/store/useUserProfile";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";

function UserProfile() {
  const [isClickProfile, setIsClickProfile] = useState(false);
  const { role, name, setName, setRole } = useUserProfileStore();

  const router = useRouter();
  return (
    <header className="h-16 flex items-start justify-end px-4 pt-12">
      <p className="text-sm font-bold pr-2 relative">{name}</p>
      <button
        className="cursor-pointer"
        onClick={async () => {
          const res = await fetch(`/api/name`);
          const data = await res.json();
          setRole(data.role);
          setName(data.name);
          setIsClickProfile((prev) => !prev);
        }}
      >
        <AiOutlineSetting size="16px" className="mr-8 mt-[1px]" />
        {isClickProfile &&
          (role == "teacher" ? (
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
          ) : (
            <div>
              <span
                onClick={async () => {
                  router.push("/management"); // 또는 원하는 페이지로 리디렉션
                }}
                className="absolute top-18 right-12 text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md cursor-pointer transition-colors"
              >
                전체 계정 관리
              </span>
              <span
                onClick={async () => {
                  await fetch("/api/logout", {
                    method: "POST",
                  });

                  router.push("/login"); // 또는 원하는 페이지로 리디렉션
                }}
                className="absolute top-26 right-12 text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md cursor-pointer transition-colors"
              >
                로그아웃
              </span>
            </div>
          ))}
      </button>
    </header>
  );
}

export default UserProfile;
