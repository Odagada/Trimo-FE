import { request } from "@/apis/axios";
import { useMutation } from "@tanstack/react-query";
import { GuestUpdateType, GetGuestUpdateType } from "@/types/server.types";
import { birthdateValType } from "@/types/client.types";
import { SignupContentProps } from "@/pages/signup/components/TermsAgreements";
import { useRouter } from "next/router";
import useManageUserAccessToken from "../useManageUserAccessToken";
import makeToast from "@/utils/makeToast";

interface SubmitAdditionalInfoProps extends SignupContentProps {
  userAccessToken: string;
}
function useSubmitAdditionalInfo({ progressStatus, userAccessToken }: SubmitAdditionalInfoProps) {
  const router = useRouter();

  const { saveUserAccessToken } = useManageUserAccessToken();

  const onSubmit = (data: {
    nickName: string;
    gender: string;
    birthdate: birthdateValType | null | number;
    birthyear: birthdateValType | null | number;
    birthmonth: birthdateValType | null | number;
  }) => {
    if (typeof data.birthyear === "number" || typeof data.birthmonth === "number" || typeof data.birthdate === "number")
      return;
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

  const handleSignUp = async (userSignUpData: GuestUpdateType) => {
    const signup = await request<any>({
      url: `/guest/update`,
      method: "post",
      data: userSignUpData,
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        withCredentials: true,
      },
    });

    return signup.data;
  };

  const { mutate: signUp, error } = useMutation({
    mutationFn: handleSignUp,
    onSuccess: (data: GetGuestUpdateType) => {
      saveUserAccessToken(userAccessToken);
      progressStatus();
    },
    onError: (error) => {
      makeToast(error.message, "error");
      router.push("/login");
    },
  });

  return {
    onSubmit,
  };
}

export default useSubmitAdditionalInfo;
