"use client";

import { useState } from "react";
import { loginUser } from "../api/auth";
import { useRouter } from "next/navigation";

function LoginPage() {
  const router = useRouter();

  const [userForm, setUserForm] = useState({
    id: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      console.log("Login info:", userForm);

      const user = await loginUser(userForm.id, userForm.password);
      console.log(user);
      return router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("알 수 없는 오류가 발생했어요");
      }
    }
  };

  return (
    <div className="w-[500px] mx-auto mt-24 p-6 border border-gray-300 rounded-lg shadow-sm bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>
      <form onSubmit={handleSubmit}>
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
        >
          로그인
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
