"use client";
import { BsBox } from "react-icons/bs";
import { useSearchParams } from "next/navigation";
import Calendar from "../molecule/Calendar";
import { useCallback, useEffect, useState } from "react";
import EnrollStudentModal from "@/app/components/modals/EnrollStudentModal";
import StudentListModal from "@/app/components/modals/StudentListModal";
import DeleteStudentRecordConfirmModal from "@/app/components/modals/DeleteStudentRecordConfirmModal";
import DeleteCourseConfirmModal from "@/app/components/modals/DeleteCourseConfirmModal";
import StudentRecord from "@/app/components/atoms/StudentRecord";
import { studentRecordItem } from "@/app/types/studentRecordItem";
import { debounce } from "lodash";
import StudentRecordSkeleton from "@/app/components/skeletons/StudentRecordSkeleton";
import ProgressEntireInputModal from "@/app/components/modals/ProgressEntireInputModal";
import NotesEntireInputModal from "@/app/components/modals/NotesEntireInputModal";
import LoadingModal from "../modals/LoadingModal";

function CourseRecordPage() {
  const searchParams = useSearchParams();
  const [isProgressEntireInputModalOpen, setIsProgressEntireInputModalOpen] =
    useState(false);
  const [isNotesEntireInputModalOpen, setIsNotesEntireInputModalOpen] =
    useState(false);
  const [isOpenEnrollStudentModal, setIsOpenEnrollStudentModal] =
    useState(false);
  const [isOpenStudentListModal, setIsOpenStudentListModal] = useState(false);
  const [
    isOpenDeleteStudentRecordConfirmModal,
    setIsOpenDeleteStudentRecordConfirmModal,
  ] = useState(false);
  const [isOpenDeleteCourseConfirmModal, setIsOpenDeleteCourseConfirmModal] =
    useState(false);
  const [courseId, setCourseId] = useState("0");
  const [courseName, setCourseName] = useState("");
  const [courseStudentList, setCourseStudentList] = useState<
    studentRecordItem[]
  >([]);
  const [isLoadingCourseStudentList, setIsLoadingCourseStudentList] =
    useState(true);
  const [checkedList, setCheckedList] = useState<Set<string>>(new Set());
  const [saveCourseStudentListDebounce, setSaveCourseStudentListDebounce] =
    useState(true);

  const handleCheckStudent = (id: string) => {
    const newSet = new Set(checkedList);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    return setCheckedList(newSet);
  };

  const toggleCheckAll = () => {
    const allIds = courseStudentList
      .filter((s) => s.student_id !== null)
      .map((s) => s.student_id);
    const isAllChecked = allIds.every((id) => checkedList.has(id));
    setCheckedList(isAllChecked ? new Set() : new Set(allIds));
  };

  const [startDate, setStartDate] = useState<Date>(() => {
    const dateStr = searchParams.get("date");
    const date = dateStr ? new Date(dateStr) : new Date();
    return date;
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (extractedId: string) => {
      setIsLoading(true);
      const cousreStudentListres = await fetch(
        `/api/course/${extractedId}?date=${startDate}`
      );
      const cousreStudentListresdData = await cousreStudentListres.json();
      console.log("받아온 데이터:", cousreStudentListresdData);
      setCourseStudentList(cousreStudentListresdData);
      setCheckedList(new Set());

      const courseNameRes = await fetch(`/api/course/${extractedId}/getName`);
      const { name } = await courseNameRes.json();

      setCourseName(name);
      setIsLoading(false);
    };
    if (typeof window !== "undefined") {
      console.log("초기화");
      const url = window.location.pathname;
      const match = url.match(/\/course\/([a-f0-9\-]{36})/);
      const extractedId = match ? match[1] : "0";
      setCourseId(extractedId);
      setIsLoadingCourseStudentList(true);
      fetchData(extractedId);
      setIsLoadingCourseStudentList(false);
    }
  }, [startDate]);

  const saveData = async () => {
    console.log("저장");
    const url = window.location.pathname;
    const match = url.match(/\/course\/([a-f0-9\-]{36})/);
    const extractedId = match ? match[1] : "0";

    // 한국 시간으로 변환된 ISO 문자열 생성
    const kstDate = new Date(
      startDate.getTime() + 9 * 60 * 60 * 1000
    ).toISOString();

    try {
      await fetch("/api/course/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          courseStudentList.map((record) => ({
            student_id: record.student_id,
            course_id: extractedId,
            record_date: kstDate, // 한국 시간 기준 날짜
            id: record.record_id,
            attendance: record.attendance,
            late_time: record.late_time,
            homework_completion: record.homework_completion,
            notes: record.notes,
            progress: record.progress,
          }))
        ),
      });

      const cousreStudentListres = await fetch(
        `/api/course/${extractedId}?date=${startDate}`
      );
      const cousreStudentListresdData = await cousreStudentListres.json();
      setCourseStudentList(cousreStudentListresdData);
    } catch (e) {
      console.log(e);
    }
  };

  const debouncedSaveData = useCallback(debounce(saveData, 1000), [
    saveCourseStudentListDebounce,
  ]);

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false); // 다음 렌더부터는 false
      return; // 초기 마운트 시에는 saveData 실행 안 함
    }

    if (courseStudentList.length > 0 && !isInitialLoad) {
      debouncedSaveData();
    }

    return () => {
      debouncedSaveData.cancel();
    };
  }, [debouncedSaveData]);

  const sendMessage = async (to: string, text: string) => {
    try {
      const res = await fetch("/api/message/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to,
          from: "0516317111", // ★ 여기 "인증된 발신번호"를 넣어야 해!
          text,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
    } catch (err) {
      if (err instanceof Error) {
        alert(`${err.message}`);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };
  console.log(courseStudentList);
  return (
    <div className="w-full">
      <ProgressEntireInputModal
        setSaveCourseStudentListDebounce={setSaveCourseStudentListDebounce}
        setCourseStudentList={setCourseStudentList}
        isModalOpen={isProgressEntireInputModalOpen}
        setIsModalOpen={setIsProgressEntireInputModalOpen}
      />
      <NotesEntireInputModal
        setSaveCourseStudentListDebounce={setSaveCourseStudentListDebounce}
        setCourseStudentList={setCourseStudentList}
        isModalOpen={isNotesEntireInputModalOpen}
        setIsModalOpen={setIsNotesEntireInputModalOpen}
      />
      <EnrollStudentModal
        courseId={courseId}
        isModalOpen={isOpenEnrollStudentModal}
        setIsModalOpen={setIsOpenEnrollStudentModal}
      />
      <StudentListModal
        date={startDate}
        courseId={courseId}
        isModalOpen={isOpenStudentListModal}
        setIsModalOpen={setIsOpenStudentListModal}
        setCourseStudentList={setCourseStudentList}
      />
      <DeleteStudentRecordConfirmModal
        courseId={courseId}
        isModalOpen={isOpenDeleteStudentRecordConfirmModal}
        setIsModalOpen={setIsOpenDeleteStudentRecordConfirmModal}
        deletedCheckedList={checkedList}
        setCourseStudentList={setCourseStudentList}
        startDate={startDate}
      />
      <DeleteCourseConfirmModal
        courseId={courseId}
        isModalOpen={isOpenDeleteCourseConfirmModal}
        setIsModalOpen={setIsOpenDeleteCourseConfirmModal}
      />
      <LoadingModal isModalOpen={isLoading} />
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <BsBox size="24px" className="mr-4" />
          <span className="font-bold text-2xl mr-4">{courseName}</span>
          <button
            type="button"
            className="text-white bg-[#3D3D3D] font-xs py-1 px-6 rounded-3xl cursor-pointer"
            onClick={() => {
              setIsOpenDeleteCourseConfirmModal(true);
            }}
          >
            반 삭제
          </button>
        </div>
        <div>
          <button
            type="button"
            className="text-white bg-[#3D3D3D] font-xs py-1 px-6 rounded-3xl cursor-pointer"
            onClick={() => {
              setIsOpenEnrollStudentModal(true);
            }}
          >
            학생 추가
          </button>
          <button
            type="button"
            className="text-white bg-[#3D3D3D] font-xs py-1 px-6 rounded-3xl ml-4 cursor-pointer"
            onClick={() => {
              setIsOpenDeleteStudentRecordConfirmModal(true);
            }}
          >
            학생 삭제
          </button>
          <button
            type="button"
            className="text-white bg-[#3D3D3D] font-xs py-1 px-6 rounded-3xl ml-4 cursor-pointer"
            onClick={async () => {
              setIsLoading(true);
              for (const targetStudentId of checkedList) {
                let lateText = "";
                const targetRecord = courseStudentList.find(
                  (student) => student.student_id === targetStudentId
                );

                if (targetRecord) {
                  if (targetRecord.attendance == "late") {
                    lateText = `지각 (${targetRecord.late_time}분)`;
                  } else if (targetRecord.attendance == "attendance")
                    lateText = "출석";
                  else lateText = "결석";

                  let text = `${targetRecord.name}(${
                    startDate.getMonth() + 1
                  }.${startDate.getDate()})\n출결: ${lateText}\n숙제 이행률: ${
                    targetRecord.homework_completion
                  }%`;

                  if (
                    targetRecord.progress != "" &&
                    targetRecord.progress != null
                  ) {
                    text += `\n진도[과제]: ${targetRecord.progress}`;
                  }
                  if (targetRecord.notes != "" && targetRecord.notes != null) {
                    text += `\n특이사항: ${targetRecord.notes}`;
                  }

                  await sendMessage(targetRecord.parent_phonenumber, text);
                }
              }
              setIsLoading(false);
              alert("문자 전송이 끝났습니다.");
            }}
          >
            선택 전송
          </button>
          <button
            type="button"
            className="text-white bg-[#3D3D3D] font-xs py-1 px-6 rounded-3xl ml-4 cursor-pointer"
            onClick={async () => {
              setIsLoading(true);
              for (const targetRecord of courseStudentList) {
                if (targetRecord) {
                  let lateText = "";

                  if (targetRecord) {
                    if (targetRecord.attendance == "late") {
                      lateText = `지각 (${targetRecord.late_time}분)`;
                    } else if (targetRecord.attendance == "attendance")
                      lateText = "출석";
                    else lateText = "결석";

                    let text = `${targetRecord.name}(${
                      startDate.getMonth() + 1
                    }.${startDate.getDate()})\n출결: ${lateText}\n숙제 이행률: ${
                      targetRecord.homework_completion
                    }%`;

                    if (
                      targetRecord.progress != "" &&
                      targetRecord.progress != null
                    ) {
                      text += `\n진도[과제]: ${targetRecord.progress}`;
                    }
                    if (
                      targetRecord.notes != "" &&
                      targetRecord.notes != null
                    ) {
                      text += `\n특이사항: ${targetRecord.notes}`;
                    }

                    await sendMessage(targetRecord.parent_phonenumber, text);
                  }
                }
              }

              setIsLoading(false);
              alert("전체 문자 전송이 끝났습니다.");
            }}
          >
            전체 전송
          </button>
        </div>
      </div>
      <hr className="mt-4 mb-4" />
      <Calendar
        startDate={startDate}
        setStartDate={setStartDate}
        searchParams={searchParams}
      />
      <div className="w-full py-2 mt-6">
        <div className="flex items-center border-b-1 border-[#D9D9D9] border-solid py-2">
          <input
            type="checkbox"
            className="w-6 h-6 mx-2"
            onChange={() => {
              toggleCheckAll();
            }}
            checked={
              courseStudentList.length > 0 &&
              courseStudentList.every((s) => checkedList.has(s.student_id))
            }
          />
          <span className="w-[100px] text-center font-bold">학년</span>
          <span className="w-[150px] text-center font-bold">이름</span>
          <span className="w-[150px] text-center font-bold">출결</span>
          <div className="w-[300px] text-center font-bold flex items-center justify-center">
            <span className="ml-12">진도</span>
            <button
              className=" text-xs ml-4 text-white bg-[#3D3D3D] font-xs py-1 px-3 rounded-xl cursor-pointer"
              onClick={() => {
                setIsProgressEntireInputModalOpen(true);
              }}
            >
              전체 입력
            </button>
          </div>

          <span className="w-[150px] text-center font-bold">숙제 이행률</span>
          <span className="w-[300px] text-center font-bold">
            <span className="ml-12">특이사항</span>
            <button
              className=" text-xs ml-4 text-white bg-[#3D3D3D] font-xs py-1 px-3 rounded-xl cursor-pointer"
              onClick={() => {
                setIsNotesEntireInputModalOpen(true);
              }}
            >
              전체 입력
            </button>
          </span>
          <span className="w-[160px] text-center font-bold">메시지 전송</span>
        </div>
        <div className="flex flex-col items-center border-b-1 border-[#D9D9D9] border-solid py-2">
          {isLoadingCourseStudentList &&
            [...Array(5)].map((_, i) => <StudentRecordSkeleton key={i} />)}
          {!isLoadingCourseStudentList &&
            courseStudentList.map((studentRecordItem, index) => (
              <StudentRecord
                key={
                  studentRecordItem.record_id ?? studentRecordItem.student_id
                }
                recordId={studentRecordItem.record_id}
                index={index}
                name={studentRecordItem.name}
                grade={studentRecordItem.grade}
                studentId={studentRecordItem.student_id}
                date={startDate}
                attendance={studentRecordItem.attendance}
                late_time={studentRecordItem.late_time}
                homework_completion={studentRecordItem.homework_completion}
                notes={studentRecordItem.notes}
                progress={studentRecordItem.progress}
                phonenumber={studentRecordItem.phonenumber}
                parent_phonenumber={studentRecordItem.parent_phonenumber}
                setCourseStudentList={setCourseStudentList}
                handleCheckStudent={handleCheckStudent}
                checkedList={checkedList}
                setSaveCourseStudentListDebounce={
                  setSaveCourseStudentListDebounce
                }
              />
            ))}
          <button
            className="w-full bg-white hover:bg-blue-100 hover:shadow-md transition-all duration-200 rounded-md cursor-pointer"
            onClick={() => {
              setIsOpenStudentListModal(true);
            }}
          >
            <span className="font-bold text-xl text-black">+</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseRecordPage;
