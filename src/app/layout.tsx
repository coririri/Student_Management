import type { Metadata } from "next";
import {
  AiOutlineSmile,
  AiOutlineSetting,
  AiOutlineBook,
  AiFillCaretDown,
  AiOutlineInbox,
} from "react-icons/ai";
import { BsBookmarkFill, BsSearch } from "react-icons/bs";
import "./globals.css";

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
          <h2 className="flex text-xl font-bold my-10 pl-1">
            <AiOutlineSmile size="42px" className="mr-3" />
            <div>
              <span className="block">한편의 수학</span>
              <span className="block text-sm font-normal">
                학생의 기록을 간단하게 관리하세요
              </span>
            </div>
          </h2>
          <div className="mb-10 flex items-center">
            <BsBookmarkFill size="16px" />
            <span className="font-bold ml-4">반</span>
            <div className="relative ml-4 w-[220px]">
              <input
                type="text"
                placeholder="반 이름"
                className="w-full py-1 pl-3 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3D3D3D] focus:border-[#3D3D3D] placeholder-gray-400 shadow-sm shadow-[#3D3D3D] shadow-offset-y-2 "
              />
              <BsSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div className="mx-2 px-3 py-3 bg-[#F3F7FF] rounded-lg relative">
            <button className="flex items-center">
              <AiOutlineBook size="22px" className="mr-2 flex-shrink-0" />
              <span className="font-bold text-md pr-8">김선우 선생님 반</span>
              <AiFillCaretDown
                size="22px"
                className="absolute right-4 flex-shrink-0"
              />
            </button>
          </div>
          <ul>
            <li className="mx-2 px-3 py-3 bg-[#F6F6F6] rounded-lg my-1">
              <button className="flex items-center">
                <AiOutlineInbox size="22px" className="mr-2 flex-shrink-0" />
                <span className="font-bold text-md">화11</span>
              </button>
            </li>
            <li className="mx-2 px-3 py-3 bg-[#F6F6F6] rounded-lg my-1">
              <button className="flex items-center">
                <AiOutlineInbox size="22px" className="mr-2 flex-shrink-0" />
                <span className="font-bold text-md ">화12</span>
              </button>
            </li>
            <li className="mx-2 px-3 py-3 bg-[#F6F6F6] rounded-lg my-1">
              <button className="flex items-center">
                <AiOutlineInbox size="22px" className="mr-2 flex-shrink-0" />
                <span className="font-bold text-md">월13</span>
              </button>
            </li>
          </ul>

          {/* 버튼을 항상 아래에 고정 */}
          <button className="fixed bottom-4 left-36 transform -translate-x-1/2 text-white bg-[#3D3D3D] font-xs py-2 px-10 rounded-2xl">
            반 추가 +
          </button>
        </nav>

        {/* 오른쪽 영역 (Header + Contents) */}
        <div className="grow flex flex-col">
          {/* 상단 헤더 */}
          <header className="h-16 flex items-start justify-end px-4 mt-12">
            <p className="text-sm font-bold pr-2">김선우</p>
            <AiOutlineSetting size="16px" className="mr-8 mt-[1px]" />
          </header>
          {/* 메인 콘텐츠 영역 */}
          <main>
            <div className="w-[1350px] mx-auto mt-12">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
