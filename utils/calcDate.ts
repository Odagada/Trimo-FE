import { TagMonth } from "@/types/client.types";

const calcData = (date: string) => {
  const targetDate = new Date(date);

  const year = targetDate.getFullYear();
  const month = ("0" + (targetDate.getMonth() + 1)).slice(-2);
  const day = ("0" + targetDate.getDate()).slice(-2);

  const dateString = year + "." + month + "." + day;

  const hours = ("0" + targetDate.getHours()).slice(-2);
  const minutes = ("0" + targetDate.getMinutes()).slice(-2);

  const timeString = hours + ":" + minutes;

  const tagMonth = `${String(targetDate.getMonth() + 1)}월` as TagMonth;

  return {
    dateString,
    timeString,
    tagMonth,
  };
};

export default calcData;
