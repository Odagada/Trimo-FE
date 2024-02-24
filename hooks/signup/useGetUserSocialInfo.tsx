import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { SIGNUP_SERVER_ERROR } from "@/constants/signupConstants";
import { LoginOauthType } from "@/types/server.types";
import makeToast from "@/utils/makeToast";

interface Props {
  code: string | undefined | string[];
  provider: string | undefined | string[];
}
function useGetUserSocialInfo({ code, provider }: Props) {
  const router = useRouter();
  const [data, setData] = useState<LoginOauthType>();

  const { mutate, error } = useMutation({
    mutationFn: () =>
      axios.post(
        `http://ec2-13-124-115-4.ap-northeast-2.compute.amazonaws.com:8080/login/oauth/${provider}?code=${code}`,
        { data: null },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      ),
    onSuccess: (data: { data: LoginOauthType }) => {
      setData(data.data);
    },
    onError: (error) => {
      makeToast(`${error.message} ${SIGNUP_SERVER_ERROR}`, "error");
      router.push("/login");
    },
    onSettled: () => {},
  });

  useEffect(() => {
    if (!code) return;
    mutate();
  }, [code]);

  return data;
}

export default useGetUserSocialInfo;
