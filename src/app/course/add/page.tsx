"use client";
import { useRouter } from "next/navigation";

export default function CourseAdd() {
  const router = useRouter();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const titleInput = form.elements.namedItem("title") as HTMLInputElement;
        const title = titleInput.value;

        const res = await fetch("/api/course", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title }),
        });

        const result = await res.json();
        if (res.ok) {
          alert("반 생성 성공! ID: " + result.id);
          router.refresh();
        } else {
          alert("에러: " + result.error);
        }
      }}
      className="bg-white  p-8 w-96"
    >
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
        반 추가
      </h2>

      {/* 입력 필드 */}
      <div className="mb-6">
        <label
          htmlFor="title"
          className="block text-gray-600 text-lg font-medium mb-2"
        >
          반 이름
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="반 이름을 입력하세요"
          className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* 버튼 */}
      <input
        type="submit"
        className="w-full bg-blue-500 text-white py-3 text-lg rounded-xl font-semibold hover:bg-blue-600 transition"
        value="추가하기"
      />
    </form>
  );
}
