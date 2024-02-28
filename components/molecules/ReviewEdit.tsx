import Clickable from "../atoms/Clickable";
import DatePicker from "../atoms/DatePicker";
import { ReviewOption } from "../atoms/ReviewOption";
import useEditForm from "@/hooks/useGetEditField";
import ImagesEditInput from "../atoms/Inputs/ImagesEditInput";

import TagRadioButton from "./TagRadioButton";
import StarRate from "./StarRate";

import { EditReview, ImageType, Review, Stars, TagCompanion, TagPlaceType, TagWeather } from "@/types/client.types";
import { editReviews } from "@/apis/reviewPost";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import useManageUserAccessToken from "@/hooks/useManageUserAccessToken";
import { SingleReviewData } from "@/types/server.types";
import { useEffect } from "react";
import makeToast from "@/utils/makeToast";

interface Props {
  spotId: string;
  review: SingleReviewData | undefined;
  reviewId: number;
}

export default function ReviewEdit({ spotId, review, reviewId }: Props) {
  let obj: ImageType[] = [];
  review?.images?.forEach((value, index) => {
    obj[index] = { name: index.toString(), url: value };
  });
  let defaultValues: EditReview = {
    title: review?.title as string,
    content: review?.content as string,
    weather: review?.tagValues?.weather as TagWeather,
    companion: review?.tagValues?.companion as TagCompanion,
    placeType: review?.tagValues?.placeType as TagPlaceType,
    visitingTime: review?.visitingTime as string,
    stars: review?.stars as Stars,
    images: obj,
    newImages: [],
    spotId: spotId,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const router = useRouter();
  const { userAccessToken: apiKey } = useManageUserAccessToken();

  const { title, content, placeType, companion, weather, visitingTime, stars, images, newImages } =
    useEditForm(control);

  const { mutate: editReviewsMutate } = useMutation({
    mutationFn: editReviews,
    onSuccess() {
      makeToast("리뷰 수정에 성공했습니다");
      router.push("search?order=POPULAR&searchValue=");
    },
    onError() {
      makeToast("리뷰 수정에 실패했습니다", "error");
    },
  });

  function postForm(postData: EditReview) {
    if (spotId === "") {
      makeToast("장소를 입력해주세요", "error");
      return;
    }
    const formData = new FormData();
    const { images, newImages, ...reviewWriteRequest } = postData;
    let key: keyof typeof reviewWriteRequest;
    for (key in reviewWriteRequest) {
      formData.append(key, reviewWriteRequest[key] as string);
    }
    const overlappingNames = images
      .map((image) => image.name)
      .filter((name) => newImages.some((newImage) => newImage.file.name === name));

    const filteredImages = images.filter((image) => !overlappingNames.includes(image.name));

    filteredImages.map((value) => {
      formData.append("images", value.url);
    });
    newImages.map((value) => {
      formData.append("newImages", value.file, value.file.name);
    });
    editReviewsMutate({ formData, reviewId, apiKey });
  }

  return (
    <form className="flex flex-col gap-28" onSubmit={handleSubmit(postForm)}>
      <div className="flex flex-col gap-10">
        <input
          {...title}
          type="text"
          id="title"
          placeholder="제목을 작성해 주세요."
          className="heading4 w-full text-black placeholder:text-gray-40 focus:outline-none"
        />
        {errors.title && <p className="middle-text font-bold text-error">{errors.title.message}</p>}
      </div>
      <div className="flex flex-col gap-10">
        <textarea
          {...content}
          className="h-350 w-full resize-none rounded-10 border border-gray-20 bg-white px-16 py-12 text-16 font-regular leading-24 text-black placeholder:text-gray-40 focus:outline-none"
          placeholder="내용을 입력해주세요."
        ></textarea>
        {errors.content && <p className="middle-text mt-10 font-bold text-error">{errors.content.message}</p>}
      </div>
      <div>
        <ImagesEditInput
          fileValue={newImages.fields}
          fileAppend={newImages.append}
          fileRemove={newImages.remove}
          showValue={images.fields}
          showAppend={images.append}
          showRemove={images.remove}
        />
        {errors.images && <p className="middle-text mt-10 font-bold text-error">이미지는 10개 이하로 가능합니다.</p>}
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
          <StarRate value={stars.value} onChange={stars.onChange} />
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
      <div className="m-auto flex w-full justify-center gap-16">
        <button className="hidden h-46 w-210 tablet:block" type="button" onClick={router.back}>
          <Clickable color="white" size="medium">
            취소
          </Clickable>
        </button>
        <button className="h-46 w-full tablet:w-210" type="submit">
          <Clickable color="black" size="medium" className="max-w-none">
            등록
          </Clickable>
        </button>
      </div>
    </form>
  );
}
