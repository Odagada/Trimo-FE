import Clickable from "./Clickable";
import DatePicker from "./DatePicker";
import { useForm, SubmitHandler } from "react-hook-form";
import TextArea from "./Inputs/TextArea";
import InputWrapper from "./Inputs/InputWapper";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import TagRadioButton from "./TagRadioButton";
import { useState } from "react";

interface Destination {
  name: string | undefined;
  formatted_address: string | undefined;
  types: string[] | undefined;
  place_id: string | undefined;
  location: {
    lat: number;
    lng: number;
  };
}

interface FromData {
  description: string;
  people: string;
  title: string;
  type: string;
  weather: string;
}

export default function ReviewFrom() {
  const { register, handleSubmit } = useForm();
  const [date, setDate] = useState(new Date());
  const [destination, setDestination] = useState<Destination>();

  function handlePlace(place: google.maps.places.PlaceResult) {
    const { name, place_id, formatted_address, types, geometry } = place;
    setDestination({
      name,
      place_id,
      formatted_address,
      types,
      location: { lat: geometry.location.lat(), lng: geometry.location.lng() },
    });
  }
  // console.log(date.toUTCString());

  function postForm(data: SubmitHandler<FromData>) {
    console.log(data);
  }

  return (
    <div className="px-120 pt-96 pb-60 flex flex-col gap-28">
      <div className="heading4">
        <ReactGoogleAutocomplete
          apiKey="AIzaSyBcIqwDpNYJQW4v6_q9rkX7zEJXCJN2Znc"
          onPlaceSelected={handlePlace}
          options={{
            types: [],
            fields: ["name", "geometry.location", "place_id", "formatted_address", "types"],
          }}
          placeholder="어느곳을 다녀오셨나요?"
          className="focus:outline-none w-full"
        />
      </div>
      <form className="flex flex-col gap-28" onSubmit={handleSubmit(postForm)}>
        <div className="heading4">
          <input
            {...register("title")}
            type="text"
            id="title"
            placeholder="제목을 작성해 주세요"
            className="heading4 focus:outline-none text-black placeholder:text-gray-40 w-full"
          />
        </div>
        <div>
          <InputWrapper htmlFor="description" className="border-gray-20">
            <TextArea {...register("description")} id="description" placeholder="내용을 입력해주세요." />
          </InputWrapper>
        </div>
        <div>이미지 삽입 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ</div>
        <div className="grid grid-cols-2 gap-110">
          <div className="heading6 flex flex-col gap-10">
            방문시간
            <div className="flex gap-22">
              <div className="small-text text-gray-40">
                방문하신 시간을
                <br />
                선택해주세요.
              </div>
              <DatePicker setValue={setDate} value={date} />
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
              <div>별점 컴포넌트ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ</div>
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
              <TagRadioButton {...register("type")} tag="type" />
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
              <TagRadioButton {...register("people")} tag="people" />
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
              <TagRadioButton {...register("weather")} tag="weather" />
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
