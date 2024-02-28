import Clickable from "@/components/atoms/Clickable";
import Footer from "@/components/atoms/Footer";
import Nav from "@/components/molecules/NavigationBar";
import Link from "next/link";

function NotFoundPage() {
  return (
    <>
      <Nav isOnlyLogo />
      <main className="mb-608 mt-165 flex flex-col items-center text-center tablet:mb-142 tablet:mt-200">
        <h2 className="text-60 font-bold leading-30 tablet:text-100 tablet:leading-70 ">
          404
        </h2>
        <p className="mb-64 font-bold leading-54 text-gray-30 tablet:text-36">
          Not Found
        </p>

        <h3 className=" mb-4 text-18 font-bold leading-27 tablet:mb-8 tablet:text-28 tablet:leading-42">
          죄송합니다. 페이지를 찾을 수 없습니다.
        </h3>
        <p className="mb-40 text-12 leading-18 text-gray-50 tablet:mb-28 tablet:text-16 tablet:leading-24">
          페이지의 주소가 잘못 입력 되었거나,
          <br />
          주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
        </p>

        <Link className="w-full px-22 tablet:w-550" href="/">
          <Clickable size="large" color="black">
            메인으로
          </Clickable>
        </Link>
      </main>
      <Footer />
    </>
  );
}

export default NotFoundPage;
