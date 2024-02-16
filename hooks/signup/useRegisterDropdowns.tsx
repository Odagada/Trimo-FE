import { useController, useForm } from "react-hook-form";
import { birthdateValType } from "@/types/client.types";

function useRegisterDropdown() {
  const { register, handleSubmit, control, getValues, formState } = useForm({
    mode: "onBlur",
    shouldFocusError: true,
    reValidateMode: "onChange",
    defaultValues: { nickName: "", gender: "남성", birthyear: null, birthmonth: null, birthdate: null },
  });

  const {
    field: { value: birthyearVal, onChange: onBirthYearChange, ...restField1 },
  } = useController({ name: "birthyear", control, rules: { required: true } });

  const {
    field: { value: birthmonthVal, onChange: onBirthMonthChange, ...restField2 },
  } = useController({ name: "birthmonth", control, rules: { required: true } });

  const {
    field: { value: birthdateVal, onChange: onBirthDateChange, ...restField3 },
  } = useController({ name: "birthdate", control, rules: { required: true } });

  const availableBirthdateList: {
    yearList: birthdateValType[];
    monthList: birthdateValType[];
    dayList: birthdateValType[];
  } = { yearList: [], monthList: [], dayList: [] };
  for (let i = 1960; i < 2015; i++) {
    availableBirthdateList.yearList.push({ value: i, label: i });
  }
  for (let i = 1; i < 13; i++) {
    availableBirthdateList.monthList.push({ value: i, label: i });
  }
  for (let i = 1; i < 32; i++) {
    availableBirthdateList.dayList.push({ value: i, label: i });
  }

  return {
    register,
    handleSubmit,
    getValues,
    formState,
    onBirthYearChange,
    onBirthMonthChange,
    onBirthDateChange,
    birthyearVal,
    birthmonthVal,
    birthdateVal,
    restField1,
    restField2,
    restField3,
    availableBirthdateList,
  };
}

export default useRegisterDropdown;
