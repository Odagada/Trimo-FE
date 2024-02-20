import ReactDOM from "react-dom";

interface Props {
  isOpen: boolean;
  title: string;
  description: string;
  buttonText?: string;
  handleOKClick: () => void;
  handleModalClose: () => void;
}

function Modal({ isOpen = false, title, description, buttonText = "확인", handleOKClick, handleModalClose }: Props) {
  const portalDiv = document.querySelector("#modal");

  if (!portalDiv) return null;

  const onOKClick = () => {
    handleOKClick();
    handleModalClose();
  };

  return isOpen ? (
    ReactDOM.createPortal(
      <div>
        <div className="fixed w-full h-full bg-[rgba(0,0,0,0.2)] z-10 left-0 top-0" onClick={handleModalClose}></div>
        <div className="bg-white z-100 w-440 h-220 fixed pb-58 flex flex-col justify-center items-center -translate-x-1/2 -translate-y-1/2 z-[100] shadow-[0_2pc_12px_0px_rgba(0,0,0,0.08)] gap-5 rounded-[15px] left-1/2 top-1/2">
          <span className="text-zinc-800 text-lg font-bold ">{title}</span>
          {description}
          <button className="w-full h-60 fixed top-162 bg-black text-white rounded-b-[15px]" onClick={onOKClick}>
            {buttonText}
          </button>
        </div>
      </div>,
      portalDiv
    )
  ) : (
    <></>
  );
}

export default Modal;
