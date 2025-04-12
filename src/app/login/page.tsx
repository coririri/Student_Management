"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const errorMessage =
    errorParam === "invalid" ? "아이디 또는 비밀번호가 올바르지 않습니다." : "";

  const [userForm, setUserForm] = useState({
    id: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-[500px] mx-auto mt-24 p-6 border border-gray-300 rounded-lg shadow-sm bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="id" className="block mb-1 font-medium">
            아이디
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={userForm.id}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="username"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 font-medium">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={userForm.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="current-password"
          />
        </div>

        {errorMessage && (
          <div className="mb-4 text-red-600 text-sm text-center">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          onClick={async (e) => {
            e.preventDefault();

            const res = await fetch("/api/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: userForm.id,
                password: userForm.password,
              }),
            });

            const result = await res.json();

            if (res.ok) {
              alert("로그인 성공");
              router.push("/");
              router.refresh();
            } else {
              alert("에러: " + result.error);
            }
          }}
        >
          로그인
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
