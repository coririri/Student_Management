import { Suspense } from "react";
import LoginForm from "../components/organism/LoginForm";

function LoginPage() {
  return (
    <div className="w-[500px] mx-auto mt-24 p-6 border border-gray-300 rounded-lg shadow-sm bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>
      <Suspense fallback={<div className="text-center mt-24">로딩 중...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

export default LoginPage;
