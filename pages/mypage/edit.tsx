import ShadowBox from "@/components/atoms/ShadowBox";
import Nav from "@/components/molecules/NavigationBar";
import Footer from "@/components/atoms/Footer";
import UpdateUserInfoForm from "./component/UpdateUserInfoForm";

// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//   try {
//     const accessToken = await getAccessTokenFromCookie(context);

//     return {
//       props: { dehydratedState: dehydrate(queryClient), isLoggedIn: isLoggedIn(accessToken) },
//     };
//   } catch {
//     return { notFound: true };
//   }
// };

function EditUserInfo() {
  return (
    <div className="h-screen flex w-full flex-col -mt-25 ">
      <Nav />
      <ShadowBox>
        <UpdateUserInfoForm />
      </ShadowBox>
    </div>
  );
}

export default EditUserInfo;
