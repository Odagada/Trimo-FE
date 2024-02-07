import Clickable from "@/components/atoms/Clickable";
import Link from "next/link";
import Image from "next/image";

function Login() {
  return (
    <div>
      <Clickable color="white" size="medium" className="flex w-fit">
        <Image src={img} alt="example" width={20} height={20}></Image>
        <Link
          href={
            "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&client_id=730856835844-o09fr02aksdpk7givfn8hkrgpe21jej8.apps.googleusercontent.com&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fsignup%2Fgoogle"
          }
        >
          구글 로그인
        </Link>
      </Clickable>
      <Clickable color="kakao" size="medium" className="flex w-fit">
        <Link
          href={
            "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=a8944263d97958802c0a6c200e8cf7e8&redirect_uri=http://localhost:3000/signup/kakao"
          }
        >
          카카오 로그인
        </Link>
      </Clickable>
      <Clickable color="naver" size="medium" className="flex w-fit">
        <Link
          href={
            "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=zPNfUhg8Ln9dvOUlf7ae&redirect_uri=http://localhost:3000/signup/naver"
          }
        >
          네이버 로그인
        </Link>
      </Clickable>
    </div>
  );
}

export default Login;
