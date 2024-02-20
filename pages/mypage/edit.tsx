import fetcher from "@/apis/axios";
import Input from "@/components/atoms/Inputs/Input";
import InputWrapper from "@/components/atoms/Inputs/InputWapper";
import ShadowBox from "@/components/atoms/ShadowBox";
import { INPUT_VALIDATION_MESSAGE } from "@/constants/signupConstants";
import useRegisterDropdown from "@/hooks/signup/useRegisterDropdowns";
import useValidateNickname from "@/hooks/signup/useValidateNickname";
import useManageUserLogin from "@/hooks/useManageUserLogin";
import { UserAdditionalInfo, UserInfoType } from "@/types/server.types";
import { birthdateValType } from "@/types/client.types";
import Image from "next/image";
import Nav from "@/components/molecules/NavigationBar";
import Footer from "@/components/atoms/Footer";
import UpdateUserInfoForm from "./component/UpdateUserInfoForm";

function EditUserInfo() {
  return (
    <div className="h-screen flex w-full flex-col ">
      <Nav />
      <ShadowBox>
        <UpdateUserInfoForm />
      </ShadowBox>
      <Footer />
    </div>
  );
}

export default EditUserInfo;
