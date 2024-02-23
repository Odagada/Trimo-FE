import { TagMonth } from "@/types/client.types";

const calcData = (date: string) => {
  const year = date.slice(4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);

  const dateString = year + "." + month + "." + day;

  const hours = date.slice(8, 10);
  const minutes = date.slice(10, 12);

  const timeString = hours + ":" + minutes;

  const tagMonth = `${+month}월` as TagMonth;

  return {
    dateString,
    timeString,
    tagMonth,
  };
};

export default calcData;
