/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import { AiOutlineSmile } from "react-icons/ai";
import SearchBar from "./components/atoms/SearchBar";
import "./globals.css";
import Navlist from "./components/molecule/Navlist";
import UserProfile from "./components/atoms/UserProfile";

export const metadata: Metadata = {
  title: "한편의 수학",
  description: "학생의 기록을 간단하게 관리하세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex h-screen">
        {/* 왼쪽 네비게이션 바 */}
        <nav className="flex-none w-[300px] bg-[#FBFCFE] rounded-4xl p-2 text-black shadow-[2px_2px_8px_0px_rgba(0,0,0,0.3)]">
          <a href="/">
            <h2 className="flex text-xl font-bold my-10 pl-1">
              <AiOutlineSmile size="42px" className="mr-3" />
              <div>
                <span className="block">한편의 수학</span>
                <span className="block text-sm font-normal">
                  학생의 기록을 간단하게 관리하세요
                </span>
              </div>
            </h2>
          </a>
          <div className="mb-10">
            <SearchBar placeholder="반 이름" />
          </div>
          <div>
            <Navlist />
          </div>
        </nav>

        {/* 오른쪽 영역 (Header + Contents) */}
        <div className="grow flex flex-col">
          {/* 상단 헤더 */}
          <UserProfile />
          {/* 메인 콘텐츠 영역 */}
          <main>
            <div className="w-[1350px] mx-auto flex justify-center items-center h-full text-center mt-24">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
