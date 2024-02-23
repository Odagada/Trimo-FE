export default function formatHours(date: Date) {
  if (date === undefined || date === null) return undefined;
  const hours = String(date.getHours()).padStart(2, "0");
  const format = hours + "00";
  return format;
}
