import { create } from "zustand";
import { Student } from "../types/student";

interface EntireStudentListState {
  studentList: Student[];
  checkedList: Set<string>;
  setStudentList: (students: Student[]) => void;
  setCheckedList: () => void;
  handleCheckStudent: (index: string) => void;
  handleUncheckAll: () => void;
  toggleCheckAll: () => void;
  sortStudentListByName: (order: "desc" | "asc") => void;
  sortStudentListByGrade: (order: "desc" | "asc") => void;
}

export const useEntireStudentListStore = create<EntireStudentListState>(
  (set, get) => ({
    studentList: [],
    checkedList: new Set(),
    setStudentList: (students) => set(() => ({ studentList: students })),
    setCheckedList: () => set(() => ({ checkedList: new Set() })),
    handleCheckStudent: (id: string) =>
      set(() => {
        const newSet = new Set(get().checkedList);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
        return { checkedList: newSet };
      }),
    handleUncheckAll: () => set(() => ({ checkedList: new Set() })),
    toggleCheckAll: () =>
      set((state) => {
        const allIds = state.studentList.map((s) => s.id);
        const isAllChecked = allIds.every((id) => state.checkedList.has(id));
        return {
          checkedList: isAllChecked ? new Set() : new Set(allIds),
        };
      }),

    sortStudentListByName: (order: "desc" | "asc") =>
      set((state) => {
        const sorted = [...state.studentList].sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (order === "asc") return nameA.localeCompare(nameB);
          else return nameB.localeCompare(nameA);
        });
        return { studentList: sorted };
      }),

    sortStudentListByGrade: (order: "desc" | "asc") =>
      set((state) => {
        const sorted = [...state.studentList].sort((a, b) => {
          if (order === "asc") return a.grade - b.grade;
          else return b.grade - a.grade;
        });
        return { studentList: sorted };
      }),
  })
);
