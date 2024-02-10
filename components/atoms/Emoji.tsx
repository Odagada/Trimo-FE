import { Tag } from "@/types/client.types";
import getEmoji from "@/utils/getEmoji";

const Emoji = ({ children }: { children: Tag }) => {
  const Emoji = getEmoji(children);

  return (
    <>
      {children}
      <span className="text-16 ml-1 font-[PretendardCancler]">{Emoji}</span>
    </>
  );
};

export default Emoji;
