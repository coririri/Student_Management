import Modal from "react-modal";
import SearchBar from "../atoms/SearchBar";
import StudentListItem from "../atoms/StudentListItem";

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
    width: "500px",
    height: "700px",
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

interface StudentListModalProps {
  courseId: number;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

function StudentListModal({
  courseId,
  isModalOpen,
  setIsModalOpen,
}: StudentListModalProps) {
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
      <div className="flex flex-col justify-center items-center gap-2 mb-3">
        <span className="font-bold text-2xl mr-64">학생 전체 목록</span>
        <SearchBar placeholder="" type="basic" />
      </div>
      <div className="w-[438px] py-2">
        <div className="flex items-center border-b border-[#D9D9D9] py-2">
          <input type="checkbox" className="w-6 h-6 mx-2" />
          <span className="w-[109.5px] text-center font-bold">학년</span>
          <span className="w-[109.5px] text-center font-bold">이름</span>
          <span className="w-[219px] text-center font-bold">전화번호</span>
        </div>
        <div>
          <StudentListItem />
        </div>
      </div>
    </Modal>
  );
}

export default StudentListModal;
