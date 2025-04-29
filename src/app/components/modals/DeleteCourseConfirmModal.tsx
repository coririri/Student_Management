import { useMyCourseListStore } from "@/app/store/useMyCourseList";
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

interface DeleteCourseConfirmModalProps {
  courseId: string;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

function DeleteCourseConfirmModal({
  courseId,
  isModalOpen,
  setIsModalOpen,
}: DeleteCourseConfirmModalProps) {
  const { setCourseList, setIsloadingCourseList } = useMyCourseListStore();

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
                setIsloadingCourseList(true);
                const response = await fetch(
                  `/api/course/delete?courseId=${courseId}`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );

                if (!response.ok) {
                  throw new Error(`서버 응답 실패: ${response.status}`);
                }
                const res = await fetch(`/api/course/my`);
                const data = await res.json();
                setCourseList(data);
                setIsloadingCourseList(false);

                if (!res.ok) {
                  throw new Error(`서버 응답 실패: ${res.status}`);
                }

                setIsModalOpen(false);
                window.location.href = "/";
              } catch (e) {
                console.log(e);
              }
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

export default DeleteCourseConfirmModal;
