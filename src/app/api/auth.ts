import { supabase } from "./subabase";

export const loginUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error("로그인에 실패하셨습니다.");
    } else {
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  }
};
