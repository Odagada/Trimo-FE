//http://localhost:3000/signup/google?code=4%2F0AfJohXkZ6kYxGOeqTJMqq3E1QiD_V2Jf1rmTA9RLP9YTOSvJpqrHLcz0aePj7Sm1X7fF7A&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&prompt=consenthttp://localhost:3000/signup/google?code=4%2F0AfJohXkZ6kYxGOeqTJMqq3E1QiD_V2Jf1rmTA9RLP9YTOSvJpqrHLcz0aePj7Sm1X7fF7A&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&prompt=consent
import axios from "axios";
import { useRouter } from "next/router";
import { useController, useForm } from "react-hook-form";
import Select from "react-select";

function SignUp() {
  const router = useRouter();
  const { code } = router.query;
  const provider = router.query.provider;

  // console.log(code);
  // console.log(router.query.provider);

  // axios.post(`http://localhost:8080/login/oauth/${provider}?code=${code}&state=null`);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    shouldFocusError: true,
    reValidateMode: "onChange",
    defaultValues: { nickName: "", gender: "남성", birthdate: 2000 },
  });

  const {
    field: { value: birthdateVal, onChange: onBirthdateChange, ...restField },
  } = useController({ name: "birthdate", control });

  const birthdateList: { value: number; label: number }[] = [];
  for (let i = 1960; i < 2015; i++) {
    birthdateList.push({ value: i, label: i });
  }

  const onSubmit = (data: { nickName: string; gender: string; birthdate: number }) => {
    // console.log("data: ", data);
    // console.log(typeof data);
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

      <Select
        instanceId="long-value-select"
        placeholder="생년월일 입력"
        isClearable
        options={birthdateList}
        value={birthdateVal ? birthdateList.find((x) => x.value === birthdateVal) : birthdateVal}
        onChange={(option) => onBirthdateChange(option)}
        {...restField}
      />

      <div>
        <input type="radio" value="male" {...register("gender")} />
        남성
        <input type="radio" value="female" {...register("gender")} />
        여성
      </div>

      <button type="submit">submit</button>
    </form>
  );
}

export default SignUp;
