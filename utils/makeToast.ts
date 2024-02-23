import toast from "react-hot-toast";

const makeToast = (msg: string, type?: "error" | "noIcon" | null) => {
  return type === "noIcon"
    ? toast(msg, {
        style: {
          borderRadius: "999px",
        },
      })
    : type === "error"
    ? toast.error(msg, {
        style: {
          borderRadius: "999px",
        },
      })
    : toast.success(msg, {
        style: {
          borderRadius: "999px",
        },
      });
};

export default makeToast;
