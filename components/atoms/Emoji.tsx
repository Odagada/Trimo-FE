import { TagWithMonth } from "@/types/client.types";
import getEmoji from "@/utils/getEmoji";

const Emoji = ({ children }: { children: TagWithMonth }) => {
  const Emoji = getEmoji(children);

  return (
    <>
      {children}
      <span className="ml-1 font-[PretendardCancler]">{Emoji}</span>
    </>
  );
};

export default Emoji;
