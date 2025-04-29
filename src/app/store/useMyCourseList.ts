import { create } from "zustand";
import { Course } from "../types/course";

interface MyCourseListState {
  courseList: Course[];
  setCourseList: (courseList: Course[]) => void;
  isLoadingCourseList: boolean;
  setIsloadingCourseList: (flag: boolean) => void;
}

export const useMyCourseListStore = create<MyCourseListState>((set) => ({
  courseList: [],
  setCourseList: (courseList) => set(() => ({ courseList: courseList })),
  isLoadingCourseList: true,
  setIsloadingCourseList: (flag: boolean) =>
    set(() => ({ isLoadingCourseList: flag })),
}));
