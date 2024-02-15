//http://localhost:3000/signup/google?code=4%2F0AfJohXkZ6kYxGOeqTJMqq3E1QiD_V2Jf1rmTA9RLP9YTOSvJpqrHLcz0aePj7Sm1X7fF7A&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&prompt=consenthttp://localhost:3000/signup/google?code=4%2F0AfJohXkZ6kYxGOeqTJMqq3E1QiD_V2Jf1rmTA9RLP9YTOSvJpqrHLcz0aePj7Sm1X7fF7A&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&prompt=consent
import ProgressNavigator from "@/components/molecules/ProgressNavigator";
import ShadowBox from "@/components/atoms/ShadowBox";
import Nav from "@/components/molecules/NavigationBar";
import axios from "axios";
import { useRouter } from "next/router";
import { useController, useForm } from "react-hook-form";
import Select from "react-select";
import InputWrapper from "@/components/atoms/Inputs/InputWapper";
import Input from "@/components/atoms/Inputs/Input";
import Clickable from "@/components/atoms/Clickable";
import TermsBox from "@/components/molecules/TermsBox";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Camera from "@/public/images/camera.png";
import Image from "next/image";
import useGetUserSocialInfo from "@/hooks/useGetUserSocialInfo";
import TermsAgreements from "./components/TermsAgreements";

function SignUp() {
  const router = useRouter();

  const { code } = router.query;
  const provider = router.query.provider;
  // console.log(code);
  // console.log(router.query.provider);
  //http://ec2-13-124-115-4.ap-northeast-2.compute.amazonaws.com:8080 - Generated server url

  //api/nickname => ok

  const userSocialData = useGetUserSocialInfo({ code, provider });

  //닉네임/나이/성별
  return (
    <div className="h-screen flex w-full flex-col">
      <Nav navStatus="LoggedOut" />
      <ShadowBox>
        <TermsAgreements></TermsAgreements>
      </ShadowBox>
    </div>
  );
}

export default SignUp;
