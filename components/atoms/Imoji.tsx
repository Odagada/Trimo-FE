import { Tag } from "@/types/client.types";
import getImoji from "@/utils/getImoji";

const Imoji = ({ children }: { children: Tag }) => {
  const imoji = getImoji(children);

  return (
    <>
      {children}
      <span className="text-16 ml-1 font-[PretendardCancler]">{imoji}</span>
    </>
  );
};

export default Imoji;
