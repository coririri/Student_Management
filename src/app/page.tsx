// app/page.tsx
export default function Home() {
  return (
    <div className="flex justify-center items-center h-full text-center">
      <div>
        <h1 className="text-2xl font-bold mb-4">
          아직 가지고 계신 반이 없으시군요!
        </h1>
        <p className="text-lg mb-6">
          왼쪽 아래 반 추가 버튼을 사용해 반을 만들어보세요!
        </p>
      </div>
    </div>
  );
}
