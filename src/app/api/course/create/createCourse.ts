import instance from "../../axios";

export const createCourse = async ({ name }: { name: string }) => {
  try {
    const response = await instance.post("/api/course/create", {
      name,
    });
    console.log("반 생성 성공:", response.data);
  } catch (error) {
    return error;
    // 필요 시 에러 메시지 보여주기
  }
};
