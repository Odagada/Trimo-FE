import { Tag } from "@/types/client.types";

const getImoji = (tag: Tag) => {
  let imoji;

  switch (tag) {
    // 날씨 태그 스위쳐
    case "맑음":
      imoji = "☀️";
      break;
    case "흐림":
      imoji = "☁️";
      break;

    case "우천":
      imoji = "☔";
      break;
    case "눈":
      imoji = "❄️";
      break;

    // 타입 태그 스위쳐
    case "맛집":
      imoji = "🌭";
      break;
    case "관광":
      imoji = "🎡";
      break;
    case "휴양":
      imoji = "🏝";
      break;
    case "명소":
      imoji = "🗻";
      break;

    // 동행 태그 스위쳐
    case "가족":
      imoji = "👨‍👩‍👧";
      break;
    case "친구":
      imoji = "👬";
      break;
    case "연인":
      imoji = "💏";
      break;
    case "혼자":
      imoji = "🕺";
      break;

    default:
      imoji = "";
      break;
  }

  return imoji;
};

export default getImoji;
