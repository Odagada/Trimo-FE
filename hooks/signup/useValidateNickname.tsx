import { useState } from "react";
import axios from "axios";
import { INPUT_VALIDATION_MESSAGE } from "@/constants/signupConstants";
import { useMutation } from "@tanstack/react-query";

function useValidateNickname() {
  const [data, setData] = useState<{ data: boolean; status: number | null }>({ data: false, status: null });
  const [nickname, setNickname] = useState("");

  const validateNickname = (nickname: string) => {
    if (!nickname) {
      alert(INPUT_VALIDATION_MESSAGE.NO_NICKNAME);
      return;
    }
    setNickname(nickname);
    mutate();
  };

  const { mutate, error } = useMutation({
    mutationFn: () =>
      axios.post(`http://ec2-13-124-115-4.ap-northeast-2.compute.amazonaws.com:8080/api/nickname?nickName=${nickname}`),
    onSuccess: (data: { data: boolean; status: number }) => {
      alert(`${nickname}${INPUT_VALIDATION_MESSAGE.NICKNAME_VALIDATED}`);
      setData(data);
    },
    onError: (error) => alert(error),
  });

  return { validateNickname, data };
}

export default useValidateNickname;
