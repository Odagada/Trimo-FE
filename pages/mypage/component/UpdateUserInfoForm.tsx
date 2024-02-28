import fetcher from "@/apis/axios";
import Input from "@/components/atoms/Inputs/Input";
import InputWrapper from "@/components/atoms/Inputs/InputWapper";
import { INPUT_VALIDATION_MESSAGE } from "@/constants/signupConstants";
import useRegisterDropdown from "@/hooks/signup/useRegisterDropdowns";
import useValidateNickname from "@/hooks/signup/useValidateNickname";
import useManageUserAccessToken from "@/hooks/useManageUserAccessToken";
import { GetUserUpdateType, UserUpdateType } from "@/types/server.types";
import { birthdateValType } from "@/types/client.types";
import Image from "next/image";
import check from "@/public/images/icons/blackCheck.svg";
import Clickable from "@/components/atoms/Clickable";
import Select from "react-select";
import formatDateToStr from "@/utils/formatDateToStr";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import { useEffect, useState } from "react";

async function updateUserInfo(postData: UserUpdateType, accessToken: string) {
  const { data } = await fetcher<GetUserUpdateType>({
    method: "post",
    url: "/users/update",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    data: postData,
  });
  return data;
}

const UpdateUserInfoForm = () => {
  const birthdate = "2024-02-24";
  const formatBD = birthdate.split("-");

  const { userAccessToken } = useManageUserAccessToken();
  const { userDataRef, requestUserData } = useGetUserInfo();
  const [isNicknameFormValid, setIsNicknameFormValid] = useState<boolean>(false);

  const [userNickname, setUserNickname] = useState<string>();

  const onSubmit = (data: {
    nickName: string;
    birthdate: birthdateValType | null | number;
    birthmonth: birthdateValType | null | number;
    birthyear: birthdateValType | null | number;
    gender: string;
  }) => {
    if (typeof data.birthyear === "number" || typeof data.birthmonth === "number" || typeof data.birthdate === "number")
      return;
    const userBirthdate = formatDateToStr(data.birthyear?.value!, data.birthmonth?.value!, data.birthdate?.value!);

    const userData = {
      nickName: data.nickName,
      birthDate: userBirthdate,
      gender: data.gender,
    };

    // updateUserInfo(userData, userAccessToken);
  };

  const {
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
  } = useRegisterDropdown([2002, 2, 18]);

  const { validateNickname, data: isNicknameValid } = useValidateNickname();

  const fetchUserData = async () => {
    await requestUserData();
    setUserNickname(String(userDataRef.current?.nickName));
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (getValues("nickName") === userNickname || (isNicknameValid?.data && isNicknameValid.status === 200))
      setIsNicknameFormValid(true);
    else setIsNicknameFormValid(false);
  }, [getValues, isNicknameValid, userNickname]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-30">
      <div>
        <div className="flex items-end">
          <div className="w-412 mt-42">
            <InputWrapper
              className="py-17 border-gray-400 mb-8 "
              divOptions="w-412"
              htmlFor="title"
              title="닉네임 변경"
            >
              <div>{userNickname}</div>
            </InputWrapper>
            <InputWrapper
              className="py-17 border-gray-400"
              divOptions="w-412"
              htmlFor="title"
              title=""
              errors={formState.errors.nickName}
            >
              <Input
                {...register("nickName", {
                  required: true,
                  maxLength: { value: 5, message: INPUT_VALIDATION_MESSAGE.NICKNAME_TOO_LONG },
                })}
                id="title"
                placeholder="닉네임"
                onChange={async () => setIsNicknameFormValid(false)}
              />

              {isNicknameFormValid && <Image src={check} width={20} height={20} alt="nickname validated" />}
            </InputWrapper>
          </div>
          <button
            onClick={() => {
              getValues("nickName") === userNickname || validateNickname(getValues("nickName"));
            }}
          >
            <Clickable size="medium" className="px-30 py-17 ml-10 font-medium whitespace-nowrap">
              중복확인
            </Clickable>
          </button>
        </div>
      </div>

      <InputWrapper
        htmlFor="birthdate"
        title="생년월일"
        errors={formState.errors.birthdate}
        className="pl-0 pb-0 pr-0 pt-0 border-none"
      >
        <div className="flex gap-12">
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                height: "60px",
                width: "175px",
                whiteSpace: "nowrap",
                paddingLeft: 8,
                borderRadius: 10,
              }),
            }}
            instanceId="date-select"
            placeholder="출생년도"
            options={availableBirthdateList.yearList}
            value={birthyearVal ? availableBirthdateList.yearList.find((x) => x.value === birthyearVal) : birthyearVal}
            onChange={(option) => onBirthYearChange(option)}
            components={{
              IndicatorSeparator: () => null,
            }}
            {...restField1}
          />
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                height: "60px",
                width: "175px",
                whiteSpace: "nowrap",
                paddingLeft: 8,
                borderRadius: 10,
              }),
            }}
            instanceId="date-select"
            placeholder="월"
            options={availableBirthdateList.monthList}
            value={
              birthmonthVal ? availableBirthdateList.monthList.find((x) => x.value === birthmonthVal) : birthmonthVal
            }
            onChange={(option) => onBirthMonthChange(option)}
            components={{
              IndicatorSeparator: () => null,
            }}
            {...restField2}
          />
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                height: "60px",
                width: "175px",
                whiteSpace: "nowrap",
                paddingLeft: 8,
                borderRadius: 10,
              }),
            }}
            instanceId="date-select"
            placeholder="일"
            options={availableBirthdateList.dayList}
            value={birthdateVal ? availableBirthdateList.dayList.find((x) => x.value === birthdateVal) : birthdateVal}
            onChange={(option) => onBirthDateChange(option)}
            components={{
              IndicatorSeparator: () => null,
            }}
            {...restField3}
          />
        </div>
      </InputWrapper>

      <InputWrapper
        htmlFor="title"
        title="성별"
        errors={formState.errors.gender}
        className="border-none px-0 "
        divOptions="px-0"
      >
        <div className="flex items-center gap-100">
          <label className="flex items-center">
            <input
              type="radio"
              value="남자"
              {...register("gender", { required: true })}
              className="h-18 w-18 border-0 accent-black mr-12"
            />
            남성
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              value="여자"
              {...register("gender", { required: true })}
              className="h-18 w-18 border-0 accent-black mr-12"
            />
            여성
          </label>
        </div>
      </InputWrapper>

      <button type="submit" className="w-full mt-20" disabled={!formState.isValid || !isNicknameFormValid}>
        <Clickable size="large" className="w-full" color={formState.isValid && isNicknameFormValid ? "black" : "gray"}>
          확인
        </Clickable>
      </button>
    </form>
  );
};

export default UpdateUserInfoForm;