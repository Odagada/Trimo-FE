import { request } from "@/apis/axios";
import { useMutation } from "@tanstack/react-query";
import { UserAdditionalInfo, UserInfoType, birthdateValType } from "@/types/client.types";
import { SignupContentProps } from "@/pages/signup/components/TermsAgreements";
import { useRouter } from "next/router";
import useManageUserLogin from "../useManageUserLogin";

interface SubmitAdditionalInfoProps extends SignupContentProps {
  userAccessToken: string;
}
function useSubmitAdditionalInfo({ progressStatus, userAccessToken }: SubmitAdditionalInfoProps) {
  const router = useRouter();

  const { saveUserAccessToken } = useManageUserLogin();

  const onSubmit = (data: {
    nickName: string;
    gender: string;
    birthdate: birthdateValType | null;
    birthyear: birthdateValType | null;
    birthmonth: birthdateValType | null;
  }) => {
    const userBirthdate = formatDateToStr(data.birthyear?.value!, data.birthmonth?.value!, data.birthdate?.value!);
    const userSignUpData = {
      birthDate: userBirthdate,
      gender: data.gender,
      nickName: data.nickName,
    };
    signUp(userSignUpData);
  };

  const formatDateToStr = (year: number, month: number, date: number) => {
    const formateDate = String(year) + "-" + String(month).padStart(2, "0") + "-" + String(date).padStart(2, "0");
    return formateDate;
  };

  const handleSignUp = async (userSignUpData: UserAdditionalInfo) => {
    const signup = await request<any>({
      url: `/guest/update`,
      method: "post",
      data: userSignUpData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        withCredentials: true,
      },
    });

    return signup.data;
  };

  const { mutate: signUp, error } = useMutation({
    mutationFn: handleSignUp,
    onSuccess: (data: UserInfoType) => {
      saveUserAccessToken(userAccessToken);
      progressStatus();
    },
    onError: (error) => {
      alert(error);
      router.push("/login");
    },
  });

  return {
    onSubmit,
  };
}

export default useSubmitAdditionalInfo;
