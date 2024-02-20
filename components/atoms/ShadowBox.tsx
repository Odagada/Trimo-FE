import { Children } from "@/types/client.types";

interface Props extends Children {
  className?: string;
}
function ShadowBox({ className = "", children }: Props) {
  return (
    <div
      className={` ${className} w-800 h-fit px-130 pb-55 pt-10 m-auto flex flex-col justify-center items-center  bg-white rounded-30 shadow-[0_4px_15px_rgb(0,0,0,0.13)] m-50`}
    >
      {children}
    </div>
  );
}

export default ShadowBox;
