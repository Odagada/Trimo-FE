import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
  code: string | undefined | string[];
  provider: string | undefined | string[];
}
//usegetAccessToken
function useGetUserSocialInfo({ code, provider }: Props) {
  const [data, setData] = useState({});
  // const fetchUserSocialData = async (code: string | string[]) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () =>
      axios.post(
        `http://ec2-13-124-115-4.ap-northeast-2.compute.amazonaws.com:8080/login/oauth/${provider}?code=${code}&state=null`
      ),
    onSuccess: (data) => {
      // eslint-disable-next-line no-console
      // console.log(data);

      setData(data);
    },
    onError: (error) => alert(error),
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
