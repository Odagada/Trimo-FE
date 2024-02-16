import Clickable from "@/components/atoms/Clickable";
import Input from "@/components/atoms/Inputs/Input";
import InputWrapper from "@/components/atoms/Inputs/InputWapper";
import ShadowBox from "@/components/atoms/ShadowBox";
import ProgressNavigator from "@/components/molecules/ProgressNavigator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Select from "react-select";
import { useController, useForm } from "react-hook-form";
import TermsBox from "@/components/molecules/TermsBox";
import useSubmitAdditionalInfo from "@/hooks/useSubmitAdditionalInfo";
import useValidateNickname from "@/hooks/useValidateNickname";
import { UserAdditionalInfo } from "@/types/client.types";
import check from "@/public/images/icons/blackCheck.svg";
import Image from "next/image";
import useUserData from "@/hooks/useUserData";

interface Props {
  progressStatus: () => void;
  setNickname: (value: string) => void;
}

function WriteAdditionalInfo({ progressStatus, setNickname }: Props) {
  const {
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
  } = useSubmitAdditionalInfo(["nickName", "gender", "birthdate", "birthyear", "birthmonth"]);

  const { validateNickname, data } = useValidateNickname();

  // const { userData } = useUserData();

  return (
    <>
      <div className="flex flex-col"></div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-30">
        <div className="flex items-end">
          <InputWrapper
            className="w-[412px] py-17 border-gray-400"
            divOptions="w-min"
            htmlFor="title"
            title="닉네임"
            errors={formState.errors.nickName}
          >
            <Input
              {...register("nickName", {
                required: true,
                maxLength: { value: 5, message: "5자 이하의 닉네임을 입력 해 주세요." },
                validate: () =>
                  data?.status === null || data?.status === 200 ? true : "중복되지 않은 닉네임을 입력 해 주세요.",
              })}
              id="title"
              placeholder="닉네임"
            />

            {data?.status === 200 && <Image src={check} width={20} height={20} alt="nickname validated" />}
          </InputWrapper>
          <button onClick={() => validateNickname(getValues("nickName"))}>
            <Clickable size="medium" className="px-30 py-17 ml-10 font-medium">
              중복확인
            </Clickable>
          </button>
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
              instanceId="long-value-select"
              placeholder="출생년도"
              options={birthyearList}
              value={birthyearVal ? birthyearList.find((x) => x.value === birthyearVal) : birthyearVal}
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
              instanceId="long-value-select"
              placeholder="월"
              options={birthmonthList}
              value={birthmonthVal ? birthmonthList.find((x) => x.value === birthmonthVal) : birthmonthVal}
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
              instanceId="long-value-select"
              placeholder="일"
              options={birthdateList}
              value={birthdateVal ? birthdateList.find((x) => x.value === birthdateVal) : birthdateVal}
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
          className="border-none px-0"
          divOptions="px-0"
        >
          <div className="flex items-center gap-100">
            <label>
              <input
                type="radio"
                value="male"
                {...register("gender", { required: true })}
                className="h-18 w-18 border-0 accent-black mr-12"
              />
              남성
            </label>

            <label>
              <input
                type="radio"
                value="female"
                {...register("gender", { required: true })}
                className="h-18 w-18 border-0 accent-black mr-12"
              />
              여성
            </label>
          </div>
        </InputWrapper>
        <TermsBox></TermsBox>
        <button
          type="submit"
          className="w-full mt-20"
          disabled={!formState.isValid}
          onClick={() => setNickname(getValues("nickName"))}
        >
          <Clickable size="large" className="w-full" color={formState.isValid ? "black" : "gray"}>
            확인
          </Clickable>
        </button>
      </form>
    </>
  );
}

export default WriteAdditionalInfo;
