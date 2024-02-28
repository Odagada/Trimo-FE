const formatDateToStr = (year: number, month: number, date: number) => {
  const formateDate = String(year) + "-" + String(month).padStart(2, "0") + "-" + String(date).padStart(2, "0");
  return formateDate;
};

export default formatDateToStr;
