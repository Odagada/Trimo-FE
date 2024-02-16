import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

function useValidateNickname() {
  const [data, setData] = useState<{ data: boolean; status: number | null }>({ data: false, status: null });
  const [nickname, setNickname] = useState("");

  const queryClient = useQueryClient();

  const validateNickname = (nickname: string) => {
    if (!nickname) {
      alert("닉네임을 입력 해 주세요.");
      return;
    }
    setNickname(nickname);
    mutate();
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () =>
      axios.post(`http://ec2-13-124-115-4.ap-northeast-2.compute.amazonaws.com:8080/api/nickname?nickName=${nickname}`),
    onSuccess: (data: { data: boolean; status: number }) => {
      // eslint-disable-next-line no-console
      console.log(data);
      alert(`${nickname}은(는) 사용 가능한 닉네임입니다!`);
      setData(data);
    },
    onError: (error) => alert(error),
  });

  return { validateNickname, data };
}

export default useValidateNickname;
