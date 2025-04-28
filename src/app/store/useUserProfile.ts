import { create } from "zustand";

interface UserProfileState {
  name: string;
  role: "teacher" | "admin";
  setName: (name: string) => void;
  setRole: (role: "teacher" | "admin") => void;
}

export const useUserProfileStore = create<UserProfileState>((set) => ({
  name: "",
  role: "teacher",
  setName: (name: string) => set(() => ({ name: name })),
  setRole: (role: "teacher" | "admin") => set(() => ({ role: role })),
}));
