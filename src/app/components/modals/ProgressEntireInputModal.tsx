import { studentRecordItem } from "@/app/types/studentRecordItem";
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
    height: "140px",
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
    padding: "10px",
  },
};

interface ProgressEntireInputModalProps {
  setSaveCourseStudentListDebounce: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setCourseStudentList: React.Dispatch<
    React.SetStateAction<studentRecordItem[]>
  >;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

function ProgressEntireInputModal({
  setSaveCourseStudentListDebounce,
  setCourseStudentList,
  isModalOpen,
  setIsModalOpen,
}: ProgressEntireInputModalProps) {
  const [entireProgress, setEntireProgress] = useState("");

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => {
        setIsModalOpen(false);
        setEntireProgress("");
      }}
      style={customModalStyles}
      ariaHideApp={false}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex justify-between items-center w-[270px] mx-auto">
          <p className="w-[70px] text-left font-bold mr-4">전체 진도</p>
          <input
            type="text"
            className="w-[180px] border-1 border-solid border-black rounded-md pl-2"
            value={entireProgress}
            onChange={(e) => {
              setEntireProgress(e.target.value);
            }}
          />
        </div>

        <div className="flex justify-center w-full mt-4">
          <button
            type="button"
            className="text-white bg-[#3D3D3D] font-xs py-1 px-6 rounded-3xl ml-4 cursor-pointer"
            onClick={async () => {
              setCourseStudentList((prev) =>
                prev.map((item) => ({ ...item, progress: entireProgress }))
              );
              setSaveCourseStudentListDebounce((prev) => !prev);
              setIsModalOpen(false);
              setEntireProgress("");
            }}
          >
            확인
          </button>
          <button
            type="button"
            className="text-white bg-[#3D3D3D] font-xs py-1 px-6 rounded-3xl ml-4 cursor-pointer"
            onClick={() => {
              setIsModalOpen(false);
              setEntireProgress("");
            }}
          >
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ProgressEntireInputModal;
