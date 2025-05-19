import Modal from "react-modal";
import SearchBar from "../atoms/SearchBar";
import StudentListItem from "../atoms/StudentListItem";

import { AiFillCaretDown } from "react-icons/ai";
import { useEffect } from "react";
import { useEntireStudentListStore } from "@/app/store/useEntireStudentList";
import { studentRecordItem } from "@/app/types/studentRecordItem";

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "auto",
    height: "auto",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "780px",
    height: "700px",
    zIndex: "150",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
    justifyContent: "center",
    padding: "30px",
  },
};

interface StudentListModalProps {
  date: Date;
  courseId: string;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  setCourseStudentList: React.Dispatch<
    React.SetStateAction<studentRecordItem[]>
  >;
}

function StudentListModal({
  date,
  courseId,
  isModalOpen,
  setIsModalOpen,
  setCourseStudentList,
}: StudentListModalProps) {
  const {
    studentList,
    setStudentList,
    setCheckedList,
    checkedList,
    handleUncheckAll,
    toggleCheckAll,
    sortStudentListByName,
    sortStudentListByGrade,
  } = useEntireStudentListStore();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/student/all`);
      const data = await res.json();
      setStudentList(data);
      setCheckedList();
    };
    fetchData();
  }, []);

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={async () => {
        setIsModalOpen(false);
        handleUncheckAll();

        const res = await fetch(`/api/student/all`);
        const data = await res.json();
        setStudentList(data);
        setCheckedList();
      }}
      style={customModalStyles}
      ariaHideApp={false}
    >
      <div className="flex flex-col justify-center items-center gap-2 mb-3">
        <span className="font-bold text-2xl mr-64">학생 전체 목록</span>

        <div className="flex items-center">
          <SearchBar placeholder="" type="basic" />
          <button
            type="button"
            className="text-white bg-[#3D3D3D] font-xs py-1 px-6 rounded-3xl ml-4"
            onClick={async () => {
              try {
                await fetch("/api/student/deleteMany", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ ids: Array.from(checkedList) }),
                });

                const allStudentRes = await fetch(`/api/student/all`);
                const allStudentdata = await allStudentRes.json();

                setStudentList(allStudentdata);

                const url = window.location.pathname;
                const match = url.match(/\/course\/([a-f0-9\-]{36})/);
                const extractedId = match ? match[1] : "0";

                const courseStudentListRes = await fetch(
                  `/api/course/${extractedId}?date=${date}`
                );
                const courseStudentListData = await courseStudentListRes.json();
                setCourseStudentList(courseStudentListData);

                setCheckedList();
              } catch (e) {
                console.log(e);
              }
            }}
          >
            선택 학생 삭제
          </button>
        </div>
      </div>
      <div>
        <div className="flex items-center border-b border-[#D9D9D9] py-2">
          <input
            type="checkbox"
            className="w-[22px] h-6"
            checked={
              studentList.length > 0 &&
              studentList.every((s) => checkedList.has(s.id))
            }
            onChange={toggleCheckAll}
          />
          <span className="w-[109.5px] text-center font-bold relative">
            <AiFillCaretDown
              size="18px"
              className="absolute right-4 top-[9px] cursor-pointer"
              onClick={() => {
                sortStudentListByGrade("asc");
              }}
            />
            <span>학년</span>
            <AiFillCaretDown
              size="18px"
              className="absolute right-4 bottom-[9px] rotate-180 cursor-pointer"
              onClick={() => {
                sortStudentListByGrade("desc");
              }}
            />
          </span>
          <span className="w-[109.5px] text-center font-bold relative">
            <AiFillCaretDown
              size="18px"
              className="absolute right-4 top-[9px] cursor-pointer"
              onClick={() => {
                sortStudentListByName("asc");
              }}
            />
            <span>이름</span>
            <AiFillCaretDown
              size="18px"
              className="absolute right-4 bottom-[9px] rotate-180 cursor-pointer"
              onClick={() => {
                sortStudentListByName("desc");
              }}
            />
          </span>
          <span className="w-[219px] text-center font-bold">전화번호</span>
          <span className="w-[219px] text-center font-bold">
            부모님 전화번호
          </span>
        </div>
      </div>
      <div className="w-[679px] h-[470px] py-2 overflow-auto">
        <div>
          {studentList.map((student) => (
            <StudentListItem
              key={student.id}
              name={student.name}
              grade={student.grade}
              phonenumber={student.phonenumber}
              parentPhonenumber={student.parent_phonenumber}
              id={student.id}
            />
          ))}
        </div>
      </div>
      <div className="w-[200px] sticky bottom-[0px] left-[275px]">
        <button
          type="button"
          className="text-white bg-[#3D3D3D] font-xs py-1 px-6 rounded-3xl mr-4 cursor-pointer"
          onClick={async () => {
            try {
              const response = await fetch("/api/course/add/student", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  ids: Array.from(checkedList),
                  courseId,
                  date,
                }),
              });
              let result;
              if (response.status !== 204) result = await response.json();

              // 상태코드에 따라 처리
              if (response.status === 200) {
                alert(`${result.inserted}명이 추가되었습니다.`);
              } else if (response.status === 204) {
                alert("이미 모든 학생이 추가되어있습니다."); // 실제 응답 body 없음 주의
              } else if (response.status === 400) {
                alert("잘못된 요청입니다. 입력값을 확인해주세요.");
              } else if (response.status === 500) {
                alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
              } else {
                alert(`예상치 못한 응답: ${response.status}`);
              }

              const url = window.location.pathname;
              const match = url.match(/\/course\/([a-f0-9\-]{36})/);
              const extractedId = match ? match[1] : "0";

              const res = await fetch(
                `/api/course/${extractedId}?date=${date}`
              );
              const data = await res.json();
              setCourseStudentList(data);

              // 학생 추가 끝
              setIsModalOpen(false);
              handleUncheckAll();

              const allStudentRes = await fetch(`/api/student/all`);
              const allStudentData = await allStudentRes.json();
              setStudentList(allStudentData);
              setCheckedList();
            } catch (e) {
              console.error("요청 실패:", e);
              alert("서버 요청 중 오류가 발생했습니다.");
            }
          }}
        >
          확인
        </button>
        <button
          type="button"
          className="text-white bg-[#3D3D3D] font-xs py-1 px-6 rounded-3xl ml-4 cursor-pointer"
          onClick={async () => {
            setIsModalOpen(false);
            handleUncheckAll();

            const res = await fetch(`/api/student/all`);
            const data = await res.json();
            setStudentList(data);
            setCheckedList();
          }}
        >
          취소
        </button>
      </div>
    </Modal>
  );
}

export default StudentListModal;
