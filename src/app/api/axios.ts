// lib/axios.ts
import axios from "axios";
import { supabase } from "./subabase";
import router from "next/router";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SUPABASE_URL,
});

instance.interceptors.request.use(async (config) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;

    // 로그인 관련 에러 감지
    if (status === 401 || status === 403) {
      // 리다이렉트
      await supabase.auth.signOut();
      router.push("/login");
    }

    return Promise.reject(error);
  }
);

export default instance;
