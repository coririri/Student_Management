"use client";

import { useState } from "react";
import { gradeTransform } from "@/app/utils/gradeTransform";

interface StudentRecordProps {
  grade: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  name: string;
  studentId: number;
}

function StudentRecord({ grade, name, studentId }: StudentRecordProps) {
  const [attendance, setAttendance] = useState("attendance");
  const [lateTime, setLateTime] = useState(0);
  const [homeworkCompeltionRate, setHomeworkCompeltionRate] = useState(100);
  const [progess, setProgress] = useState("");
  const [notes, setNotes] = useState("");
  console.log(studentId);
  return (
    <div className="flex items-center border-b-1 border-[#D9D9D9] border-solid py-2">
      <input type="checkbox" className="w-6 h-6 mx-2" />
      <span className="w-[100px] text-center font-bold">
        {gradeTransform(grade)}
      </span>
      <span className="w-[150px] text-center font-bold">{name}</span>
      <span className="w-[150px] text-center font-bold">
        {attendance === "late" ? (
          <span className="flex justify-between space-x-2">
            <select
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              className="w-[75px] p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="attendance">등원</option>
              <option value="late">지각</option>
              <option value="absent">결석</option>
            </select>
            <select
              value={lateTime}
              onChange={(e) => setLateTime(Number(e.target.value))}
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
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
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
          className="w-[240px] border-1 border-solid border-black rounded-lg"
          value={progess}
          onChange={(e) => {
            setProgress(e.target.value);
          }}
        />
      </span>
      <span className="w-[150px] text-center font-bold">
        <select
          value={homeworkCompeltionRate}
          onChange={(e) => setHomeworkCompeltionRate(Number(e.target.value))}
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
          className="w-[240px] border-1 border-solid border-black rounded-lg"
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
          }}
        />
      </span>
      <span className="w-[200px] text-center font-bold">
        <button
          type="button"
          className="text-white bg-[#3D3D3D] font-xs py-1 px-8 rounded-3xl"
        >
          전송
        </button>
      </span>
    </div>
  );
}

export default StudentRecord;
