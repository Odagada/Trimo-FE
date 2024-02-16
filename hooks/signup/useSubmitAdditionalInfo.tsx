import { request } from "@/apis/axios";
import { useMutation } from "@tanstack/react-query";
import { UserAdditionalInfo, birthdateValType } from "@/types/client.types";
import { SignupContentProps } from "@/pages/signup/components/TermsAgreements";

function useSubmitAdditionalInfo({ progressStatus }: SignupContentProps) {
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
      url: `http://ec2-13-124-115-4.ap-northeast-2.compute.amazonaws.com:8080/api/guest/update`,
      method: "post",
      data: userSignUpData,
    });

    return signup.data;
  };

  const { mutate: signUp, error } = useMutation({
    mutationFn: handleSignUp,
    onSuccess: (data: { data: boolean; status: number }) => {
      console.log(); //jwt토큰으로 저장
      progressStatus();
    },
    onError: (error) => alert(error),
  });

  return {
    onSubmit,
  };
}

export default useSubmitAdditionalInfo;
