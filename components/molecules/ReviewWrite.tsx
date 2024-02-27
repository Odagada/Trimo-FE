import Clickable from "../atoms/Clickable";
import DatePicker from "../atoms/DatePicker";
import ImagesInput from "../atoms/Inputs/ImagesInput";
import { ReviewOption } from "../atoms/ReviewOption";
import useGetForm from "@/hooks/useGetFormField.tsx";

import TagRadioButton from "./TagRadioButton";
import StarRate from "./StarRate";

import { Review } from "@/types/client.types";
import { postReviews } from "@/apis/reviewPost";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import useManageUserAccessToken from "@/hooks/useManageUserAccessToken";
import { SingleReviewData } from "@/types/server.types";

interface Props {
  spotId: string;
  setSpotError: React.Dispatch<React.SetStateAction<string>>;
  review?: SingleReviewData | undefined;
}

export default function ReviewFrom({ spotId, setSpotError, review }: Props) {
  let defaultValues: Review = {
    title: "",
    content: "",
    weather: "",
    companion: "",
    placeType: "",
    visitingTime: "",
    stars: 0,
    images: [],
  };
  if (review !== undefined) {
    defaultValues.title = review.title;
    defaultValues.content = review.content;
    defaultValues.weather = review.tagValues?.weather;
    defaultValues.companion = review.tagValues?.companion;
    defaultValues.placeType = review.tagValues?.placeType;
    defaultValues.visitingTime = review.visitingTime;
    defaultValues.stars = review.stars;
  }

  const {
    control,
    handleSubmit,
    setFocus,
    setError,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  const router = useRouter();
  const { userAccessToken: apiKey } = useManageUserAccessToken();

  const { title, content, placeType, companion, weather, visitingTime, stars, images } = useGetForm(control);

  const { mutate: postReviewsMutate } = useMutation({
    mutationFn: postReviews,
    onSuccess() {
      router.push("/search");
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
    const formData = new FormData();
    const { images, ...reviewWriteRequest } = postData;
    let key: keyof typeof reviewWriteRequest;
    for (key in reviewWriteRequest) {
      formData.append(key, reviewWriteRequest[key] as string);
    }
    images.map((value) => {
      formData.append("images", value.file, value.file.name);
    });
    postReviewsMutate({ formData, spotId, apiKey });
  }

  return (
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
      <div>
        <ImagesInput append={images.append} remove={images.remove} />
        {errors.images && <p className="text-error middle-text font-bold mt-10">이미지는 10개 이하로 가능합니다.</p>}
      </div>

      <ReviewOption>
        <ReviewOption.section>
          <ReviewOption.info>
            <ReviewOption.title> 방문시간</ReviewOption.title>
            <ReviewOption.description>방문하신 시간을 선택해주세요.</ReviewOption.description>
          </ReviewOption.info>
          <DatePicker onChange={visitingTime.onChange} value={visitingTime.value} />
          {errors.visitingTime && <ReviewOption.error>{errors.visitingTime.message}</ReviewOption.error>}
        </ReviewOption.section>
        <ReviewOption.section>
          <ReviewOption.info>
            <ReviewOption.title> 별점</ReviewOption.title>
            <ReviewOption.description>그곳의 만족도는 어느정도 인가요?</ReviewOption.description>
          </ReviewOption.info>
          <StarRate value={stars.value} onChange={stars.onChange} defaultRate={getValues("stars")} />
        </ReviewOption.section>
        <ReviewOption.section>
          <ReviewOption.info>
            <ReviewOption.title> 유형</ReviewOption.title>
            <ReviewOption.description>어떤 타입의 여행지를 다녀오셨나요?</ReviewOption.description>
          </ReviewOption.info>
          <TagRadioButton onChange={placeType.onChange} tag="placeType" value={placeType.value} />
        </ReviewOption.section>
        <ReviewOption.section>
          <ReviewOption.info>
            <ReviewOption.title> 동행</ReviewOption.title>
            <ReviewOption.description>누구와 함께 여행지를 다녀오셨나요?</ReviewOption.description>
          </ReviewOption.info>
          <TagRadioButton onChange={companion.onChange} tag="companion" value={companion.value} />
        </ReviewOption.section>
        <ReviewOption.section>
          <ReviewOption.info>
            <ReviewOption.title> 날씨</ReviewOption.title>
            <ReviewOption.description>그날의 날씨는 어땠나요?</ReviewOption.description>
          </ReviewOption.info>
          <TagRadioButton onChange={weather.onChange} tag="weather" value={weather.value} />
        </ReviewOption.section>
      </ReviewOption>
      <div className="flex gap-16 m-auto">
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
  );
}
