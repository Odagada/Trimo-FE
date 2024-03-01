import ShadowBox from "@/components/atoms/ShadowBox";
import Nav from "@/components/molecules/NavigationBar";
import UpdateUserInfoForm from "./component/UpdateUserInfoForm";

function EditUserInfo() {
  return (
    <div className="-mt-25 flex h-screen w-full flex-col ">
      <Nav />
      <ShadowBox>
        <UpdateUserInfoForm />
      </ShadowBox>
    </div>
  );
}

export default EditUserInfo;
