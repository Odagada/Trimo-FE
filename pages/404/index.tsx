import Clickable from "@/components/atoms/Clickable";
import Footer from "@/components/atoms/Footer";
import Nav from "@/components/molecules/NavigationBar";
import Link from "next/link";

function NotFoundPage() {
  return (
    <>
      <Nav />
      <main className="flex flex-col items-center text-center mt-200 mb-142">
        <h2 className="text-100 font-bold leading-70">404</h2>
        <p className="text-36 font-bold leading-54 text-gray-30 mb-64">Not Found</p>

        <h3 className="text-28 font-bold leading-42 mb-8">죄송합니다. 페이지를 찾을 수 없습니다.</h3>
        <p className="text-16 leading-24 mb-28 text-gray-50">
          페이지의 주소가 잘못 입력 되었거나,
          <br />
          주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
        </p>

        <Link className="w-550" href="/">
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
