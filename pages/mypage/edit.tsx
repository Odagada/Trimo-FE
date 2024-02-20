import fetcher from "@/apis/axios";
import Input from "@/components/atoms/Inputs/Input";
import InputWrapper from "@/components/atoms/Inputs/InputWapper";
import ShadowBox from "@/components/atoms/ShadowBox";
import { INPUT_VALIDATION_MESSAGE } from "@/constants/signupConstants";
import useRegisterDropdown from "@/hooks/signup/useRegisterDropdowns";
import useValidateNickname from "@/hooks/signup/useValidateNickname";
import useManageUserLogin from "@/hooks/useManageUserLogin";
import { UserAdditionalInfo, UserInfoType } from "@/types/server.types";
import { User, birthdateValType } from "@/types/client.types";
import Image from "next/image";
import check from "@/public/images/icons/blackCheck.svg";
import Clickable from "@/components/atoms/Clickable";
import Select from "react-select";
import formatDateToStr from "@/utils/formatDateToStr";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import Nav from "@/components/molecules/NavigationBar";
import Footer from "@/components/atoms/Footer";

type age = { age: number };

async function updateUserInfo(postData: UserAdditionalInfo, accessToken: string) {
  const { data } = await fetcher<Omit<UserInfoType, "birthDate"> & age>({
    method: "post",
    url: "/users/update",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    data: postData,
  });
  return data;
}

function EditUserInfo() {
  return (
    <div className="h-screen flex w-full flex-col ">
      <Nav />
      <ShadowBox>
        <UpdateUserInfoForm />
      </ShadowBox>
      <Footer />
    </div>
  );
}

const UpdateUserInfoForm = () => {
  const { userAccessToken } = useManageUserLogin();

  const userData = useGetUserInfo();

  const onSubmit = (data: {
    nickName: string;
    birthdate: birthdateValType | null;
    birthmonth: birthdateValType | null;
    birthyear: birthdateValType | null;
    gender: string;
  }) => {
    const userBirthdate = formatDateToStr(data.birthyear?.value!, data.birthmonth?.value!, data.birthdate?.value!);
    const userData = {
      nickName: data.nickName,
      birthDate: userBirthdate,
      gender: data.gender,
    };
    console.log(userData);
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
  } = useRegisterDropdown();

  const { validateNickname, data } = useValidateNickname();

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
              {/* <div>{userData.nickName}</div> */}
              <div>{"이름입력"}</div>
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
                  validate: () =>
                    data?.status === null || data?.status === 200 ? true : INPUT_VALIDATION_MESSAGE.NICKNAME_DUPLICATED,
                })}
                id="title"
                placeholder="닉네임"
              />

              {data?.status === 200 && <Image src={check} width={20} height={20} alt="nickname validated" />}
            </InputWrapper>
          </div>
          <button onClick={() => validateNickname(getValues("nickName"))}>
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

      <button type="submit" className="w-full mt-20" disabled={!formState.isValid}>
        <Clickable size="large" className="w-full" color={formState.isValid ? "black" : "gray"}>
          확인
        </Clickable>
      </button>
    </form>
  );
};
export default EditUserInfo;
