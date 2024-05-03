import { useRouter } from "next/router";
import { useCallback, useState } from "react";

const useSearchValue = () => {
  const router = useRouter();
  const { searchValue: initialValue } = router.query;

  // 검색 결과가 있을 때 계산된 값을 input에 주입
  const calculatedValue = useCallback(() => {
    if (initialValue) {
      return `"${initialValue}"에 대한 검색 결과입니다`;
    } else {
      return "";
    }
  }, [initialValue])();

  // 제어 컴포넌트를 위한 state 리턴
  return useState(calculatedValue);
};

export default useSearchValue;
