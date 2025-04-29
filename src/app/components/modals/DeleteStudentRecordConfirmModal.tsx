import { studentRecordItem } from "@/app/types/studentRecordItem";
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
    height: "150px",
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

interface DeleteStudentRecordConfirmModalProps {
  courseId: string;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  deletedCheckedList: Set<string>;
  setCourseStudentList: React.Dispatch<
    React.SetStateAction<studentRecordItem[]>
  >;
  startDate: Date;
}

function DeleteStudentRecordConfirmModal({
  courseId,
  isModalOpen,
  setIsModalOpen,
  deletedCheckedList,
  setCourseStudentList,
  startDate,
}: DeleteStudentRecordConfirmModalProps) {
  console.log(courseId);

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => {
        setIsModalOpen(false);
      }}
      style={customModalStyles}
      ariaHideApp={false}
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <span className="text-lg font-semibold text-gray-800">
          삭제 하시겠습니까?
        </span>
        <div className="flex justify-center w-full mt-4">
          <button
            type="button"
            className="mr-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-6 rounded-full transition-all duration-200"
            onClick={async () => {
              try {
                const response = await fetch("/api/course/delete/student  ", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    course_id: courseId,
                    student_ids: [...deletedCheckedList],
                  }),
                });

                if (!response.ok) {
                  throw new Error(`서버 응답 실패: ${response.status}`);
                }
                const url = window.location.pathname;
                const match = url.match(/\/course\/([a-f0-9\-]{36})/);
                const extractedId = match ? match[1] : "0";

                const res = await fetch(
                  `/api/course/${extractedId}?date=${startDate}`
                );
                const data = await res.json();
                setCourseStudentList(data);
              } catch (e) {
                console.log(e);
              }
              setIsModalOpen(false);
            }}
          >
            확인
          </button>
          <button
            type="button"
            className="ml-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-6 rounded-full transition-all duration-200 cursor-pointer"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteStudentRecordConfirmModal;
