import Clickable from "../atoms/Clickable";
import DatePicker from "../atoms/DatePicker";
import { useForm } from "react-hook-form";
import TextArea from "../atoms/Inputs/TextArea";
import InputWrapper from "../atoms/Inputs/InputWapper";
import TagRadioButton from "../molecules/TagRadioButton";
import StarRate from "../molecules/StarRate";
import { Review, Stars } from "@/types/client.types";
import ImagesInput from "../atoms/Inputs/ImagesInput";
import { useState } from "react";
import GoogleAutoComplete from "../molecules/GoogleAutoComplete";
import { useMutation } from "@tanstack/react-query";
import { postReviews } from "@/apis/reviewPost";

export default function ReviewFrom() {
  const defaultValues: Review = {
    title: "",
    content: "",
    tagValues: {
      weather: undefined,
      companion: undefined,
      placeType: undefined,
    },
    visitingTime: "",
    stars: 0,
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  const timeWatcher = watch("visitingTime");
  const starWatcher = watch("stars");

  const [spotId, setSpotId] = useState("");
  const [spotError, setSpotError] = useState("");

  const { mutate: postReviewsMutate } = useMutation({
    mutationFn: postReviews,
    onSuccess(data) {
      console.log(data);
    },
    onError(error, variables, context) {
      console.log(error, variables, context);
    },
  });
  function postForm(postData: Review) {
    if (spotId === "") {
      setSpotError("장소를 입력해주세요");
      setFocus("title");
      return;
    }
    postReviewsMutate({ postData, spotId });
  }

  return (
    <div className="px-120 pt-96 pb-60 flex flex-col gap-28">
      <GoogleAutoComplete setSpotId={setSpotId} spotError={spotError} setSpotError={setSpotError} />
      <form className="flex flex-col gap-28" onSubmit={handleSubmit(postForm)}>
        <div className="heading4">
          <input
            {...register("title", { required: "제목을 입력해 주세요." })}
            type="text"
            id="title"
            placeholder="제목을 작성해 주세요."
            className="heading4 focus:outline-none text-black placeholder:text-gray-40 w-full"
          />
          {errors.title && <p className="text-error middle-text font-bold mt-10">{errors.title.message}</p>}
        </div>
        <div>
          <InputWrapper htmlFor="content" className="border-gray-20">
            <TextArea
              {...register("content", {
                required: "본문을 입력해 주세요.",
                maxLength: { value: 1000, message: "1,000자 이하로 입력해 주세요" },
              })}
              id="content"
              placeholder="내용을 입력해주세요."
            />
          </InputWrapper>
          {errors.content && <p className="text-error middle-text font-bold mt-10">{errors.content.message}</p>}
        </div>
        <ImagesInput />
        <div className="grid grid-cols-2 gap-110">
          <div className="heading6 flex flex-col gap-10">
            방문시간
            <div className="flex gap-22">
              <div className="small-text text-gray-40">
                방문하신 시간을
                <br />
                선택해주세요.
              </div>
              <DatePicker setValue={setValue} value={timeWatcher} />
            </div>
          </div>
          <div className="heading6 flex flex-col gap-10">
            별점
            <div className="flex gap-22">
              <div className="small-text text-gray-40">
                그곳의 만족도는
                <br />
                어느정도 인가요?
              </div>
              <StarRate setValue={setValue} value={starWatcher as Stars} />
            </div>
          </div>
          <div className="heading6 flex flex-col gap-10">
            유형
            <div className="flex gap-22">
              <div className="small-text text-gray-40">
                그곳의 만족도는
                <br />
                어느정도 인가요?
              </div>
              <TagRadioButton {...register("tagValues.placeType")} tag="placeType" />
            </div>
          </div>
          <div className="heading6 flex flex-col gap-10">
            동행
            <div className="flex gap-22">
              <div className="small-text text-gray-40">
                누구와 함께 여행지를
                <br />
                다녀오셨나요?
              </div>
              <TagRadioButton {...register("tagValues.companion")} tag="companion" />
            </div>
          </div>
          <div className="heading6 flex flex-col gap-10">
            날씨
            <div className="flex gap-22">
              <div className="small-text text-gray-40">
                그날의 날씨는
                <br />
                어땠나요?
              </div>
              <TagRadioButton {...register("tagValues.weather")} tag="weather" />
            </div>
          </div>
        </div>
        <div className="flex gap-16 m-auto ">
          <button className="w-210 h-46" type="button">
            <Clickable color="white" size="medium">
              취소
            </Clickable>
          </button>
          <button className="w-210 h-46" type="submit">
            <Clickable color="black" size="medium">
              등록
            </Clickable>
          </button>
        </div>
      </form>
    </div>
  );
}
