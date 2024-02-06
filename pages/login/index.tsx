import Clickable from "@/components/atoms/Clickable";

function Login() {
  return (
    <div>
      <Clickable color="white">
        <button>구글 로그인</button>
      </Clickable>
      <Clickable color="kakao" size="medium">
        <button>카카오 로그인</button>
      </Clickable>
      <Clickable color="naver">
        <button>네이버 로그인</button>
      </Clickable>
    </div>
  );
}

export default Login;
