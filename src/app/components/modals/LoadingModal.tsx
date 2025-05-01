import Modal from "react-modal";

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
  },
  content: {
    width: "300px",
    height: "180px",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "0px",
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    padding: "30px",
  },
};

interface LoadingModalProps {
  isModalOpen: boolean;
}

function LoadingModal({ isModalOpen }: LoadingModalProps) {
  return (
    <Modal
      isOpen={isModalOpen}
      style={customModalStyles}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={false} // 로딩 중 닫히지 않도록
    >
      <div className="flex flex-col items-center justify-center">
        {/* Spinner */}
        <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
      </div>
    </Modal>
  );
}

export default LoadingModal;
