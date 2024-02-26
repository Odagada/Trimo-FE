import { getFilteredMyPlaces, getMyPlaces } from "@/apis/capsulesQuery";
import Clickable from "@/components/atoms/Clickable";
import Emoji from "@/components/atoms/Emoji";
import Footer from "@/components/atoms/Footer";
import DeleteIcon from "@/components/atoms/icons/DeleteIcon";
import Nav from "@/components/molecules/NavigationBar";
import TagRadioButton from "@/components/molecules/TagRadioButton";
import GoogleMap from "@/components/organisms/GoogleMap";
import useComponentPopup from "@/hooks/useComponentPopup";
import useManageUserAccessToken from "@/hooks/useManageUserAccessToken";
import { TagCompanion, TagMonth, TagPlaceType, TagWeather } from "@/types/client.types";
import { getAccessTokenFromCookie } from "@/utils/getAccessTokenFormCookie";
import { validateRedirectionByLoginStatus } from "@/utils/validateByLoginStatus";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { Dispatch, MutableRefObject, SetStateAction, useEffect, useReducer, useState } from "react";

// http://ec2-13-124-115-4.ap-northeast-2.compute.amazonaws.com:8080/api/user/me/reviews?weather=%EB%A7%91%EC%9D%8C&page=1
// http://ec2-13-124-115-4.ap-northeast-2.compute.amazonaws.com:8080/api/user/me/reviews?weather=%ED%9D%90%EB%A6%BC&month=1&page=1'
// 'http://ec2-13-124-115-4.ap-northeast-2.compute.amazonaws.com:8080/api/user/me/reviews?page=1'

type filterOptionType = "날짜" | "유형" | "동행" | "날씨";
type filterOptionEngType = "date" | "placeType" | "companion" | "weather";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const queryClient = new QueryClient();
    const accessToken = getAccessTokenFromCookie(context);

    const isRedirectNeeded = validateRedirectionByLoginStatus({
      statusToBlock: "Logout",
      accessToken,
    });

    if (isRedirectNeeded) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    } else {
      try {
        await queryClient.prefetchQuery(getMyPlaces(accessToken!));
      } catch {
        return { notFound: true };
      }

      return { props: { dehydratedState: dehydrate(queryClient) } };
    }
  } catch {
    return { notFound: true };
  }
}
function MyPage() {
  const filterOptions = {
    날짜: "date",
    유형: "placeType",
    동행: "companion",
    날씨: "weather",
  };

  const [checkedMenu, setCheckedMenu] = useState<string | null>();
  const [checkedOptions, setCheckedOptions] = useState<{
    날짜: TagMonth;
    유형: TagPlaceType;
    동행: TagCompanion;
    날씨: TagWeather;
  }>({ 날짜: "", 유형: "", 동행: "", 날씨: "" });

  const { userAccessToken } = useManageUserAccessToken();
  const { data } = useQuery(getMyPlaces(userAccessToken));

  const [queryStr, setQueryStr] = useState<null | string>(null);

  console.log(data?.data.placeIds);

  const {
    buttonRef: dateBtnRef,
    popupRef: datePopupRef,
    isOpen: dateIsOpen,
    setIsOpen: dateSetIsOpen,
  } = useComponentPopup();
  const {
    buttonRef: typeBtnRef,
    popupRef: typePopupRef,
    isOpen: typeIsOpen,
    setIsOpen: typeSetIsOpen,
  } = useComponentPopup();
  const {
    buttonRef: crewBtnRef,
    popupRef: crewPopupRef,
    isOpen: crewIsOpen,
    setIsOpen: crewSetIsOpen,
  } = useComponentPopup();
  const {
    buttonRef: weatherBtnRef,
    popupRef: weatherPopupRef,
    isOpen: weatherIsOpen,
    setIsOpen: weatherSetIsOpen,
  } = useComponentPopup();

  const OptionPopups = [
    { btnRef: dateBtnRef, popupRef: datePopupRef, isOpen: dateIsOpen, setIsOpen: dateSetIsOpen, popupLeft: 0 },
    { btnRef: typeBtnRef, popupRef: typePopupRef, isOpen: typeIsOpen, setIsOpen: typeSetIsOpen, popupLeft: 20 },
    { btnRef: crewBtnRef, popupRef: crewPopupRef, isOpen: crewIsOpen, setIsOpen: crewSetIsOpen, popupLeft: 40 },
    {
      btnRef: weatherBtnRef,
      popupRef: weatherPopupRef,
      isOpen: weatherIsOpen,
      setIsOpen: weatherSetIsOpen,
      popupLeft: 60,
    },
  ];
  // /api/user/me/reviews?page=1'

  const { data: queryData } = useQuery(getFilteredMyPlaces(userAccessToken, queryStr));

  useEffect(() => {
    console.log(
      `/user/me/reviews?${checkedOptions.날씨 && "weather=" + checkedOptions.날씨 + "&"}${
        checkedOptions.동행 && "companion=" + checkedOptions.동행 + "&"
      }${checkedOptions.유형 && "placeType=" + checkedOptions.유형 + "&"}${
        checkedOptions.날짜 && "month=" + checkedOptions.날짜 + "&"
      }page=${1}`
    );
    const query = `${checkedOptions.날씨 && "weather=" + checkedOptions.날씨 + "&"}${
      checkedOptions.동행 && "companion=" + checkedOptions.동행 + "&"
    }${checkedOptions.유형 && "placeType=" + checkedOptions.유형 + "&"}${
      checkedOptions.날짜 && "month=" + checkedOptions.날짜 + "&"
    }page=${1}`;
    if (checkedOptions.날씨 || checkedOptions.날짜 || checkedOptions.동행 || checkedOptions.유형) setQueryStr(query);
    else {
      setQueryStr(null);
    }
  }, [checkedOptions]);

  return (
    <>
      <Nav />
      <div className="flex gap-12">
        {Object.keys(filterOptions).map((optionText, index) => (
          <>
            <div className="relative">
              {OptionPopups[index].isOpen && (
                <div
                  className={`${
                    optionText === "날짜" ? "w-340 h-164 px-30" : "w-118 h-215 px-20"
                  } shadow-main rounded-[15px] -left-20 top-40 absolute z-10 pt-19 mt-8 ml-4 bg-white`}
                  ref={OptionPopups[index].popupRef}
                >
                  <button
                    onClick={() => {
                      OptionPopups[index].setIsOpen(false);
                      setCheckedMenu(null);
                    }}
                    type="button"
                    className={`absolute top-5 ${optionText === "날짜" ? "right-5" : "right-3"}`}
                  >
                    <DeleteIcon size="small" />
                  </button>
                  <TagRadioButton
                    onChange={(e) => {
                      if (typeof e === "undefined") e = "";
                      setCheckedOptions((prev) => ({ ...prev, [optionText]: e }));
                      console.log(checkedOptions);
                    }}
                    tag={filterOptions[optionText as filterOptionType] as filterOptionEngType}
                    value={checkedOptions[optionText as filterOptionType]}
                    isSmall
                  ></TagRadioButton>
                </div>
              )}
            </div>
            <button
              ref={OptionPopups[index].btnRef}
              type="button"
              onClick={() => {
                setCheckedMenu(optionText);
                OptionPopups[index].setIsOpen((prev) => !prev);
              }}
              key={index}
            >
              <Clickable color={checkedMenu === optionText ? "black" : "white-"} size="small" shape="capsule">
                <Emoji>{optionText}</Emoji>
              </Clickable>
            </button>
          </>
        ))}
      </div>
      <GoogleMap locationIDList={data?.data.placeIds!}></GoogleMap>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default MyPage;
