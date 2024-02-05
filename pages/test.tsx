import GoogleMap from "@/components/organisms/GoogleMap";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Landing() {
  const router = useRouter();
  const { code } = router.query;
  // console.log(code);

  return (
    <>
      <Link
        href={
          "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&client_id=730856835844-o09fr02aksdpk7givfn8hkrgpe21jej8.apps.googleusercontent.com&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fsignup%2Fgoogle"
        }
      >
        google
      </Link>
      <Link
        href={
          "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=a8944263d97958802c0a6c200e8cf7e8&redirect_uri=http://localhost:3000/signup/kakao"
        }
      >
        kakao
      </Link>
      <Link
        href={
          "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=zPNfUhg8Ln9dvOUlf7ae&redirect_uri=http://localhost:3000/signup/naver"
        }
      >
        naver
      </Link>
    </>
  );
}

// http://localhost:3000/redirect/oauth?code=4%2F0AfJohXkQuqTr3U-s2VyDhK2EdYHRodRgl0UC-YOOoEE0-yblsTWzQ9Rx5DJzwvncKoqdYQ&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&prompt=consent
// http%3A%2F%2Flocalhost%3A3000%2Fredirect%2Foauth&access_type=offline&service=lso&o2v=2&theme=glif&flowName=GeneralOAuthFlow
