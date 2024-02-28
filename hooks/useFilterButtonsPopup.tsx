import { TagCompanion, TagMonth, TagPlaceType, TagWeather } from "@/types/client.types";
import useComponentPopup from "./useComponentPopup";
import { useEffect, useState } from "react";
import useManageUserAccessToken from "./useManageUserAccessToken";
import { QueryClient } from "@tanstack/react-query";
import { getFilteredMyPlaces } from "@/apis/capsulesQuery";
import { useMediaQuery } from "react-responsive";

const useSearchFilterOptions = ({ pageNum, setQuery }: { pageNum: number; setQuery: (query: string) => void }) => {
  const [checkedMenu, setCheckedMenu] = useState<string | null>();
  const [checkedOptions, setCheckedOptions] = useState<{
    날짜: TagMonth;
    유형: TagPlaceType;
    동행: TagCompanion;
    날씨: TagWeather;
  }>({ 날짜: "", 유형: "", 동행: "", 날씨: "" });
  const [isMediaQueryChanged, setIsMediaQueryChange] = useState(false);

  const queryClient = new QueryClient();

  const { userAccessToken } = useManageUserAccessToken();

  const isBelowDesktop = useMediaQuery(
    {
      query: "(max-width: 1440px)",
    },
    undefined,
    () => setIsMediaQueryChange((prev) => !prev)
  );

  const Dates = useComponentPopup();
  const Types = useComponentPopup();
  const Weathers = useComponentPopup();
  const Crews = useComponentPopup();

  const OptionPopups = [
    {
      btnRef: Dates.buttonRef,
      popupRef: Dates.popupRef,
      isOpen: Dates.isOpen,
      setIsOpen: Dates.setIsOpen,
      popupLeft: 0,
    },
    {
      btnRef: Types.buttonRef,
      popupRef: Types.popupRef,
      isOpen: Types.isOpen,
      setIsOpen: Types.setIsOpen,
      popupLeft: 20,
    },
    {
      btnRef: Crews.buttonRef,
      popupRef: Crews.popupRef,
      isOpen: Crews.isOpen,
      setIsOpen: Crews.setIsOpen,
      popupLeft: 40,
    },
    {
      btnRef: Weathers.buttonRef,
      popupRef: Weathers.popupRef,
      isOpen: Weathers.isOpen,
      setIsOpen: Weathers.setIsOpen,
      popupLeft: 60,
    },
  ];

  useEffect(() => {
    const calcQuery = (page: number) =>
      `${checkedOptions.날씨 && "weather=" + checkedOptions.날씨 + "&"}${
        checkedOptions.동행 && "companion=" + checkedOptions.동행 + "&"
      }${checkedOptions.유형 && "placeType=" + checkedOptions.유형 + "&"}${
        checkedOptions.날짜 && "month=" + checkedOptions.날짜 + "&"
      }page=${page}&size=${isBelowDesktop ? 4 : 6}`;

    if (checkedOptions.날씨 || checkedOptions.날짜 || checkedOptions.동행 || checkedOptions.유형) {
      setQuery(calcQuery(pageNum));
      queryClient.prefetchQuery(getFilteredMyPlaces(userAccessToken, calcQuery(pageNum + 1)));
    } else {
      const calcNoFilterQuery = (page: number) => `page=${page}&size=${isBelowDesktop ? 4 : 6}`;
      setQuery(calcNoFilterQuery(pageNum));
      queryClient.prefetchQuery(getFilteredMyPlaces(userAccessToken, calcNoFilterQuery(pageNum + 1)));
    }
  }, [checkedOptions, pageNum, isMediaQueryChanged]);
  return { OptionPopups, checkedMenu, setCheckedMenu, checkedOptions, setCheckedOptions };
};

export default useSearchFilterOptions;
