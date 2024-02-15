/* eslint-disable no-console */
import { useController, useForm } from "react-hook-form";

function useSubmitAdditionalInfo() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    shouldFocusError: true,
    reValidateMode: "onChange",
    defaultValues: { nickName: "", gender: "남성", birthyear: null, birthmonth: null, birthdate: null },
  });

  const {
    field: { value: birthyearVal, onChange: onBirthYearChange, ...restField1 },
  } = useController({ name: "birthyear", control });

  const {
    field: { value: birthmonthVal, onChange: onBirthMonthChange, ...restField2 },
  } = useController({ name: "birthmonth", control });

  const {
    field: { value: birthdateVal, onChange: onBirthDateChange, ...restField3 },
  } = useController({ name: "birthdate", control });

  const birthyearList: { value: number; label: number }[] = [];
  for (let i = 1960; i < 2015; i++) {
    birthyearList.push({ value: i, label: i });
  }

  const birthmonthList: { value: number; label: number }[] = [];
  for (let i = 1; i < 13; i++) {
    birthmonthList.push({ value: i, label: i });
  }

  const birthdateList: { value: number; label: number }[] = [];
  for (let i = 1; i < 32; i++) {
    birthdateList.push({ value: i, label: i });
  }

  const onSubmit = (data: {
    nickName: string;
    gender: string;
    birthdate: number | null;
    birthyear: number | null;
    birthmonth: number | null;
  }) => {
    console.log("data: ", data);
    console.log(typeof data);
  };

  return {
    onSubmit,
    handleSubmit,
    register,
    restField1,
    restField2,
    restField3,
    birthmonthList,
    birthyearList,
    birthdateList,
    birthdateVal,
    birthmonthVal,
    birthyearVal,
    errors,
    onBirthDateChange,
    onBirthMonthChange,
    onBirthYearChange,
  };
}

export default useSubmitAdditionalInfo;
