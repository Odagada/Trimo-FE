import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
  code: string | undefined | string[];
  provider: string | undefined | string[];
}
//usegetAccessToken
function useGetUserSocialInfo({ code, provider }: Props) {
  const router = useRouter();
  const [data, setData] = useState({});
  // const fetchUserSocialData = async (code: string | string[]) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () =>
      axios.post(
        `http://ec2-13-124-115-4.ap-northeast-2.compute.amazonaws.com:8080/login/oauth/${provider}?code=${code}&state=null`
      ),
    onSuccess: (data) => {
      setData(data);
    },
    onError: (error) => {
      alert(
        `${error.message} \n회원가입 중 에러가 발생했습니다. 다시 시도해주세요.\n에러가 지속되면 관리자에게 문의하세요.`
      );
      router.push("/login");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["inviteItem"] });
    },
  });

  useEffect(() => {
    if (!code) return;
    mutate();
  }, [code]);

  return data;
}

export default useGetUserSocialInfo;
