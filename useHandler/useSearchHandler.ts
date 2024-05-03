import useSearchValue from "@/hooks/useSearchValue";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent } from "react";

const useSearchHandler = ([value, setValue]: ReturnType<typeof useSearchValue>) => {
  const router = useRouter();
  let { order } = router.query;

  const handleFocus = () => {
    setValue("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (order === undefined) {
      order = "POPULAR";
    }

    router.push({
      pathname: "/search",
      query: { order: order, searchValue: value },
    });
  };

  return { handleFocus, handleChange, handleSubmit };
};

export default useSearchHandler;
