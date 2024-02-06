//http://localhost:3000/signup/google?code=4%2F0AfJohXkZ6kYxGOeqTJMqq3E1QiD_V2Jf1rmTA9RLP9YTOSvJpqrHLcz0aePj7Sm1X7fF7A&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&prompt=consenthttp://localhost:3000/signup/google?code=4%2F0AfJohXkZ6kYxGOeqTJMqq3E1QiD_V2Jf1rmTA9RLP9YTOSvJpqrHLcz0aePj7Sm1X7fF7A&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&prompt=consent
import axios from "axios";
import { useRouter } from "next/router";
import { useController, useForm } from "react-hook-form";
import Select from "react-select";

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
    defaultValues: { nickName: "", gender: "남성", birthdate: 20 },
  });

  // const {
  //   field: { value: langValue, onChange: langOnChange, ...restLangField },
  // } = useController({ name: "birthdate", control });

  const onSubmit = (data: { nickName: string; gender: string; birthdate: number }) => {
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
      {/* <Select
        className="select-input"
        placeholder="생년월일 입력"
        isClearable
        options={languageList}
        value={langValue ? languageList.find((x) => x.value === langValue) : langValue}
        onChange={(option) => langOnChange(option ? option.value : option)}
        {...restLangField}
      /> */}

      <div>
        <input type="radio" value="male" {...register("gender")} />
        남성
      </div>

      <div>
        <input type="radio" value="female" {...register("gender")} />
        여성
      </div>

      {/*       
      <input
        {...register("gender", {
          required: true,
          maxLength: 5,
        })}
      ></input> */}
      <input
        {...register("birthdate", {
          required: true,
          maxLength: 5,
          pattern: /^(19|20)d{2}$/,
        })}
      ></input>

      <button type="submit">submit</button>
    </form>
  );
}

export default SignUp;
