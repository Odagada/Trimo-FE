import Clickable from "@/components/atoms/Clickable";
import Input from "@/components/atoms/Inputs/Input";
import InputWrapper from "@/components/atoms/Inputs/InputWapper";
import Select from "react-select";
import useSubmitAdditionalInfo from "@/hooks/signup/useSubmitAdditionalInfo";
import useValidateNickname from "@/hooks/signup/useValidateNickname";
import check from "@/public/images/icons/blackCheck.svg";
import Image from "next/image";
import useRegisterDropdown from "@/hooks/signup/useRegisterDropdowns";
import { SignupContentProps } from "./TermsAgreements";
import { INPUT_VALIDATION_MESSAGE } from "@/constants/signupConstants";

interface Props extends SignupContentProps {
  setNickname: (value: string) => void;
  userAccessToken: string;
}

function WriteAdditionalInfo({ progressStatus, setNickname, userAccessToken }: Props) {
  const { onSubmit } = useSubmitAdditionalInfo({ progressStatus, userAccessToken });

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

  const { validateNickname, data: isNicknameValid } = useValidateNickname();

  return (
    <>
      <div className="flex flex-col"></div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-30">
        <div className="flex items-end">
          <InputWrapper
            className="border-gray-400 py-17"
            divOptions="w-412"
            htmlFor="title"
            title="닉네임"
            errors={formState.errors.nickName}
          >
            <Input
              {...register("nickName", {
                required: true,
                maxLength: { value: 5, message: INPUT_VALIDATION_MESSAGE.NICKNAME_TOO_LONG },
              })}
              id="title"
              placeholder="닉네임"
            />

            {isNicknameValid?.data && isNicknameValid.status === 200 && (
              <Image src={check} width={20} height={20} alt="nickname validated" />
            )}
          </InputWrapper>
          <button onClick={() => validateNickname(getValues("nickName"))} type="button">
            <Clickable size="medium" className="ml-10 whitespace-nowrap px-30 py-17 font-medium">
              중복확인
            </Clickable>
          </button>
        </div>

        <InputWrapper
          htmlFor="birthdate"
          title="생년월일"
          errors={formState.errors.birthdate}
          className="border-none pb-0 pl-0 pr-0 pt-0"
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
              value={
                birthyearVal ? availableBirthdateList.yearList.find((x) => x.value === birthyearVal) : birthyearVal
              }
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
                className="mr-12 h-18 w-18 border-0 accent-black"
              />
              남성
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                value="여자"
                {...register("gender", { required: true })}
                className="mr-12 h-18 w-18 border-0 accent-black"
              />
              여성
            </label>
          </div>
        </InputWrapper>

        <button
          type="submit"
          className="mt-20 w-full"
          disabled={!formState.isValid || !isNicknameValid?.data || isNicknameValid.status !== 200}
          onClick={() => setNickname(getValues("nickName"))}
        >
          <Clickable
            size="large"
            className="w-full"
            color={formState.isValid && isNicknameValid?.data && isNicknameValid.status ? "black" : "gray"}
          >
            확인
          </Clickable>
        </button>
      </form>
    </>
  );
}

export default WriteAdditionalInfo;
