/* eslint-disable no-console */
import { FieldValue, FieldValues, Path, useController, useForm } from "react-hook-form";
import useUserData from "./useUserData";
import { UserAdditionalInfo, UserInfoType, birthdateValType } from "@/types/client.types";
import { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useSubmitAdditionalInfo<T extends FieldValues>(userDataInputs: Path<T>[]) {
  const queryClient = useQueryClient();

  const [isBtnActive, setIsBtnActive] = useState(false);

  const { setUserData, userData } = useUserData();
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

  const birthyearList: birthdateValType[] = [];
  for (let i = 1960; i < 2015; i++) {
    birthyearList.push({ value: i, label: i });
  }

  const birthmonthList: birthdateValType[] = [];
  for (let i = 1; i < 13; i++) {
    birthmonthList.push({ value: i, label: i });
  }

  const birthdateList: birthdateValType[] = [];
  for (let i = 1; i < 32; i++) {
    birthdateList.push({ value: i, label: i });
  }

  const onSubmit = (data: {
    nickName: string;
    gender: string;
    birthdate: birthdateValType | null;
    birthyear: birthdateValType | null;
    birthmonth: birthdateValType | null;
  }) => {
    const userBirthdate = `${data.birthyear?.value}-${data.birthmonth?.value}-${data.birthdate?.value}`;
    console.log("data: ", data);
    const userSignUpData = {
      birthDate: userBirthdate,
      gender: data.gender,
      nickName: data.nickName,
    };
    setUserData(userSignUpData);
    console.log(userSignUpData);
    mutate(userSignUpData);
  };

  const handleSignUp = async (userSignUpData: UserAdditionalInfo) => {
    const data = await axios.post(
      `http://ec2-13-124-115-4.ap-northeast-2.compute.amazonaws.com:8080/api/guest/update`,
      userSignUpData
    );
    return data;
  };

  const { mutate, isError, error } = useMutation({
    mutationFn: handleSignUp,
    onSuccess: (data: { data: boolean; status: number }) => {
      // eslint-disable-next-line no-console
      console.log(data);
    },
    onError: (error) => alert(error),
  });

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
    formState,
    getValues,
    onBirthDateChange,
    onBirthMonthChange,
    onBirthYearChange,
  };
}

export default useSubmitAdditionalInfo;
