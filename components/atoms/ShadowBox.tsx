import { Children } from "@/types/client.types";

interface Props extends Children {
  className?: string;
}
function ShadowBox({ className = "", children }: Props) {
  return (
    <div
      className={` ${className} m-auto flex h-fit w-800 flex-col items-center justify-center rounded-30 bg-white  px-130 pb-55 pt-10 shadow-[0_4px_15px_rgb(0,0,0,0.13)]`}
    >
      {children}
    </div>
  );
}

export default ShadowBox;
