import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

function SignUp() {
  const router = useRouter();
  const { code } = router.query;

  console.log(code);
  console.log(router.query.provider);

  // axios.post(`http://localhost:8080/login/oauth/naver?code=${code}&state=null`);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    shouldFocusError: true,
    reValidateMode: "onChange",
    defaultValues: { nickName: "", gender: "남", age: 20 },
  });

  const onSubmit = (data: { nickName: string; gender: string; age: number }) => {
    console.log("data: ", data);
    console.log(typeof data);
  };

  //닉네임/나이/성별
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("nickName", {
          required: true,
          maxLength: { value: 5, message: "5자 이하의 닉네임을 입력 해 주세요." },
        })}
      ></input>
      <input
        {...register("gender", {
          required: true,
          maxLength: 5,
        })}
      ></input>
      <input
        {...register("age", {
          required: true,
          maxLength: 5,
        })}
      ></input>

      <button type="submit">submit</button>
    </form>
  );
}

export default SignUp;
