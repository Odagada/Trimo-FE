import Clickable from "../atoms/Clickable";
import DatePicker from "../atoms/DatePicker";
import TextArea from "../atoms/Inputs/TextArea";
import InputWrapper from "../atoms/Inputs/InputWapper";
import ImagesInput from "../atoms/Inputs/ImagesInput";

import TagRadioButton from "../molecules/TagRadioButton";
import StarRate from "../molecules/StarRate";
import GoogleAutoComplete from "../molecules/GoogleAutoComplete";

import { Review, Stars } from "@/types/client.types";
import { postReviews } from "@/apis/reviewPost";

import { useForm, Controller, useController } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

//나중에 DevTool 지우기
import dynamic from "next/dynamic";
import useGetControl from "../atoms/useGetForm";
const DevT: React.ElementType = dynamic(() => import("@hookform/devtools").then((module) => module.DevTool), {
  ssr: false,
});

export default function ReviewFrom() {
  const defaultValues: Review = {
    title: "",
    content: "",
    weather: "",
    companion: "",
    placeType: "",
    visitingTime: "",
    stars: 0,
  };
  const {
    control,
    handleSubmit,
    setFocus,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const { title, content, placeType, companion, weather, visitingTime, stars } = useGetControl(control);

  const [spotId, setSpotId] = useState("");
  const [spotError, setSpotError] = useState("");
  const router = useRouter();

  const { mutate: postReviewsMutate } = useMutation({
    mutationFn: postReviews,
    onSuccess() {
      // router.push('/list') 추후 추가
    },
    onError() {
      setError("title", { message: "다시 시도해주세요." }, { shouldFocus: true }); // 오류메시지 어디다 띄울지?
    },
  });
  function postForm(postData: Review) {
    if (spotId === "") {
      setSpotError("장소를 입력해주세요");
      setFocus("title");
      return;
    }
    // postReviewsMutate({ postData, spotId });
  }

  return (
    <div className="px-120 pt-96 pb-60 flex flex-col gap-28">
      <GoogleAutoComplete setSpotId={setSpotId} spotError={spotError} setSpotError={setSpotError} />
      <form className="flex flex-col gap-28" onSubmit={handleSubmit(postForm)}>
        <div className="flex gap-10 flex-col">
          <input
            {...title}
            type="text"
            id="title"
            placeholder="제목을 작성해 주세요."
            className="heading4 focus:outline-none text-black placeholder:text-gray-40 w-full"
          />
          {errors.title && <p className="text-error middle-text font-bold">{errors.title.message}</p>}
        </div>
        <div className="flex gap-10 flex-col">
          <textarea
            {...content}
            className="border border-gray-20 w-full px-16 py-12 rounded-10 bg-white text-16 leading-24 font-regular focus:outline-none text-black h-350 placeholder:text-gray-40 resize-none"
            placeholder="내용을 입력해주세요."
          ></textarea>
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
              <DatePicker {...visitingTime} />
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
              <StarRate {...stars} />
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
              <TagRadioButton {...placeType} tag="placeType" />
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
              <TagRadioButton {...companion} tag="companion" />
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
              <TagRadioButton {...weather} tag="weather" />
            </div>
          </div>
        </div>
        <div className="flex gap-16 m-auto ">
          <button className="w-210 h-46" type="button" onClick={router.back}>
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
      <DevT control={control} />
    </div>
  );
}
