"use client";

import { gradeTransform } from "@/app/utils/gradeTransform";
import { studentRecordItem } from "@/app/types/studentRecordItem";

interface StudentRecordProps {
  recordId: string;
  index: number;
  date: Date;
  studentId: string;
  name: string;
  grade: 0 | 2 | 1 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  attendance: string;
  late_time: number;
  homework_completion: number;
  notes: string;
  progress: string;
  phonenumber: string;
  parent_phonenumber: string;
  setCourseStudentList: React.Dispatch<
    React.SetStateAction<studentRecordItem[]>
  >;
  handleCheckStudent: (id: string) => void;
  checkedList: Set<string>;
  setSaveCourseStudentListDebounce: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

function StudentRecord({
  index,
  date,
  studentId,
  name,
  grade,
  attendance,
  late_time,
  homework_completion,
  notes,
  progress,
  phonenumber,
  parent_phonenumber,
  setCourseStudentList,
  handleCheckStudent,
  checkedList,
  setSaveCourseStudentListDebounce,
}: StudentRecordProps) {
  console.log(date, phonenumber);

  const sendMessage = async () => {
    let lateText = "";
    if (attendance == "late") {
      lateText = `지각 (${late_time}분)`;
    } else if (attendance == "attendance") lateText = "출석";
    else lateText = "결석";

    let text = `${name}(${
      date.getMonth() + 1
    }.${date.getDate()})\n출결: ${lateText}\n숙제 이행률: ${homework_completion}%`;

    if (progress != "" && progress !== null) {
      console.log("ㅋㅋ");
      text += `\n진도[과제]: ${progress}`;
    }
    if (notes != "" && progress !== null) {
      text += `\n특이사항: ${notes}`;
    }

    try {
      const res = await fetch("/api/message/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: parent_phonenumber,
          from: "01054158269", // ★ 여기 "인증된 발신번호"를 넣어야 해!
          text,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert("메시지 전송이 성공적으로 완료되었습니다.");
    } catch (err) {
      if (err instanceof Error) {
        alert(`${err.message}`);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="flex items-center border-b-1 border-[#D9D9D9] border-solid py-2">
      <input
        type="checkbox"
        className="w-6 h-6 mx-2"
        onChange={() => {
          setSaveCourseStudentListDebounce((prev) => !prev);
          if (studentId) handleCheckStudent(studentId);
        }}
        checked={checkedList.has(studentId)}
      />
      <span className="w-[100px] text-center font-bold">
        {gradeTransform(grade)}
      </span>
      <span className="w-[150px] text-center font-bold">{name}</span>
      <span className="w-[150px] text-center font-bold">
        {attendance === "late" ? (
          <span className="flex justify-between space-x-2">
            <select
              value={attendance}
              onChange={(e) => {
                const newAttendance = e.target.value;

                setCourseStudentList((prev) =>
                  prev.map((item, i) =>
                    i === index ? { ...item, attendance: newAttendance } : item
                  )
                );
                setSaveCourseStudentListDebounce((prev) => !prev);
              }}
              className="w-[75px] p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="attendance">등원</option>
              <option value="late">지각</option>
              <option value="absent">결석</option>
            </select>
            <select
              value={late_time}
              onChange={(e) => {
                const newLatetime = Number(e.target.value);

                setCourseStudentList((prev) =>
                  prev.map((item, i) =>
                    i === index ? { ...item, late_time: newLatetime } : item
                  )
                );
                setSaveCourseStudentListDebounce((prev) => !prev);
              }}
              className="w-[75px] p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="10">10분</option>
              <option value="20">20분</option>
              <option value="30">30분</option>
              <option value="40">40분</option>
              <option value="50">50분</option>
              <option value="60">60분</option>
            </select>
          </span>
        ) : (
          <select
            value={attendance ?? ""}
            onChange={(e) => {
              const newAttendance = e.target.value;

              setCourseStudentList((prev) =>
                prev.map((item, i) =>
                  i === index ? { ...item, attendance: newAttendance } : item
                )
              );
              setSaveCourseStudentListDebounce((prev) => !prev);
            }}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="attendance">등원</option>
            <option value="late">지각</option>
            <option value="absent">결석</option>
          </select>
        )}
      </span>

      <span className="w-[300px] text-center font-bold">
        <input
          type="text"
          className="w-[240px] border-1 border-solid border-black rounded-lg pl-2"
          value={progress ?? ""}
          maxLength={50}
          onChange={(e) => {
            const newProgress = e.target.value;

            setCourseStudentList((prev) =>
              prev.map((item, i) =>
                i === index ? { ...item, progress: newProgress } : item
              )
            );
            setSaveCourseStudentListDebounce((prev) => !prev);
          }}
        />
      </span>
      <span className="w-[150px] text-center font-bold">
        <select
          value={homework_completion ?? ""}
          onChange={(e) => {
            const newHomework_completion = Number(e.target.value);

            setCourseStudentList((prev) =>
              prev.map((item, i) =>
                i === index
                  ? { ...item, homework_completion: newHomework_completion }
                  : item
              )
            );
            setSaveCourseStudentListDebounce((prev) => !prev);
          }}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="100">100%</option>
          <option value="80">80%</option>
          <option value="60">60%</option>
          <option value="40">40%</option>
          <option value="20">20%</option>
          <option value="0">0%</option>
        </select>
      </span>
      <span className="w-[300px] text-center font-bold">
        <input
          type="text"
          className="w-[240px] border-1 border-solid border-black rounded-lg pl-2"
          value={notes ?? ""}
          maxLength={100}
          onChange={(e) => {
            const newNotes = e.target.value;

            setCourseStudentList((prev) =>
              prev.map((item, i) =>
                i === index ? { ...item, notes: newNotes } : item
              )
            );
            setSaveCourseStudentListDebounce((prev) => !prev);
          }}
        />
      </span>
      <span className="w-[160px] text-center font-bold">
        <button
          type="button"
          className="text-white bg-[#3D3D3D] font-xs py-1 px-8 rounded-3xl cursor-pointer"
          onClick={async () => {
            await sendMessage();
          }}
        >
          전송
        </button>
      </span>
    </div>
  );
}

export default StudentRecord;
