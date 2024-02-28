import ReactDOM from "react-dom";

interface Props {
  isOpen: boolean;
  title: string;
  description: string;
  buttonText?: string | string[];
  onClick: () => void;
  onClose: () => void;
}

function Modal({ isOpen = false, title, description, buttonText = "확인", onClick, onClose }: Props) {
  if (typeof document === "undefined") return;
  const portalDiv = document.querySelector("#modal");

  if (!portalDiv) return null;

  const hasCancelBtn = typeof buttonText !== "string";

  const onConfirmClick = () => {
    onClick();
    onClose();
  };

  return isOpen ? (
    ReactDOM.createPortal(
      <div>
        <div className="fixed left-0 top-0 z-10 h-full w-full bg-[rgba(0,0,0,0.2)]" onClick={onClose}></div>
        <div className="z-100 fixed left-1/2 top-1/2 z-[100] flex h-220 w-440 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-5 rounded-[15px] bg-white pb-58 shadow-main">
          <span className="text-zinc-800 text-lg font-bold ">{title}</span>
          {description}
          <div className="fixed top-162 flex h-60 w-full overflow-hidden rounded-b-[15px]">
            {hasCancelBtn && (
              <button className="top-162 w-full bg-gray-20 text-black" onClick={onClose}>
                {buttonText[1]}
              </button>
            )}
            <button className={`w-full bg-black text-white`} onClick={onConfirmClick}>
              {hasCancelBtn ? buttonText[0] : buttonText}
            </button>
          </div>
        </div>
      </div>,
      portalDiv
    )
  ) : (
    <></>
  );
}

export default Modal;
