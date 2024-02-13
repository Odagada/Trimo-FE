import { Children } from "@/types/client.types";

function ShadowBox(children: Children) {
  return (
    <div className="w-fit h-fit px-130 pb-80 pt-10 m-auto flex flex-col justify-center items-center  bg-white rounded-30 shadow-[0_4px_15px_rgb(0,0,0,0.13)] m-50">
      {children}
    </div>
  );
}

export default ShadowBox;
