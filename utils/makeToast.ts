import toast from "react-hot-toast";

interface toastProps {
  msg: string;
  option?: null | "noIcon" | "isError";
}

const makeToast = ({ msg, option = null }: toastProps) => {
  toast(msg, {
    icon: option === "noIcon" ? null : option === "isError" ? "❌" : "✔️",
    style: {
      borderRadius: "999px",
    },
  });
};

export default makeToast;
