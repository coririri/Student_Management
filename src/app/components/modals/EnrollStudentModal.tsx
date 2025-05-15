import { useEntireStudentListStore } from "@/app/store/useEntireStudentList";
import { useState } from "react";
import Modal from "react-modal";

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
    width: "350px",
    height: "260px",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
    justifyContent: "center",
    overflow: "auto",
    padding: "30px",
  },
};

const formatPhoneNumber = (value: string) => {
  const onlyNums = value.replace(/\D/g, "");
  if (onlyNums.length <= 3) return onlyNums;
  if (onlyNums.length <= 7)
    return onlyNums.replace(/(\d{3})(\d{1,4})/, "$1-$2");
  return onlyNums.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3");
};

interface EnrollStudentModalProps {
  courseId: string;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

function EnrollStudentModal({
  courseId,
  isModalOpen,
  setIsModalOpen,
}: EnrollStudentModalProps) {
  const { setStudentList, setCheckedList } = useEntireStudentListStore();
  console.log(courseId);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState(0);
  const [phonenumber, setPhonenumber] = useState("");
  const [parentPhonenumber, setParentPhonenumber] = useState("");

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => {
        setIsModalOpen(false);
        setName("");
        setPhonenumber("");
        setParentPhonenumber("");
        setGrade(0);
      }}
      style={customModalStyles}
      ariaHideApp={false}
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex justify-between items-center w-[270px] mx-auto">
          <p className="w-[70px] text-left font-bold mr-4">이름</p>
          <input
            type="text"
            className="w-[180px] border-1 border-solid border-black rounded-md pl-2"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center w-[270px]">
          <p className="w-[70px] text-left font-bold">학년</p>
          <select
            value={grade}
            onChange={(e) => setGrade(Number(e.target.value))}
            className="w-[75px] ml-[20px] p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="0">초1</option>
            <option value="1">초2</option>
            <option value="2">초3</option>
            <option value="3">초4</option>
            <option value="4">초5</option>
            <option value="5">초6</option>
            <option value="6">중1</option>
            <option value="7">중2</option>
            <option value="8">중3</option>
            <option value="9">고1</option>
            <option value="10">고2</option>
            <option value="11">고3</option>
          </select>
        </div>
        <div className="flex items-center w-[270px]">
          <p className="text-left font-bold w-[70px] mr-6">연락처</p>
          <input
            type="text"
            className="w-[180px] border-1 border-solid border-black rounded-lg pl-2"
            value={formatPhoneNumber(phonenumber)}
            inputMode="numeric"
            placeholder="010-1234-5678"
            onChange={(e) => {
              setPhonenumber(e.target.value);
            }}
          />
        </div>

        <div className="flex items-center w-[270px]">
          <p className="text-left font-bold w-[70px] mr-6">부모 번호</p>
          <input
            type="text"
            className="w-[180px] border-1 border-solid border-black rounded-lg pl-2"
            value={formatPhoneNumber(parentPhonenumber)}
            inputMode="numeric"
            placeholder="010-1234-5678"
            onChange={(e) => {
              setParentPhonenumber(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center w-full mt-4">
          <button
            type="button"
            className="text-white bg-[#3D3D3D] font-xs py-1 px-6 rounded-3xl ml-4 cursor-pointer"
            onClick={async () => {
              const res = await fetch("/api/student/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name,
                  grade,
                  phonenumber: phonenumber.replaceAll("-", ""),
                  parent_phonenumber: parentPhonenumber.replaceAll("-", ""),
                }),
              });

              const result = await res.json();

              if (res.ok) {
                setIsModalOpen(false);

                const res = await fetch(`/api/student/all`);
                const data = await res.json();
                setStudentList(data);
                setCheckedList();
                setIsModalOpen(false);
                setName("");
                setPhonenumber("");
                setParentPhonenumber("");
                setGrade(0);
              } else {
                alert("에러: " + result.error);
              }
            }}
          >
            확인
          </button>
          <button
            type="button"
            className="text-white bg-[#3D3D3D] font-xs py-1 px-6 rounded-3xl ml-4 cursor-pointer"
            onClick={() => {
              setIsModalOpen(false);
              setName("");
              setPhonenumber("");
              setParentPhonenumber("");
              setGrade(0);
            }}
          >
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default EnrollStudentModal;
