import Clickable from "./Clickable";
import TimePicker from "./TimePicker";
import { useForm } from "react-hook-form";
import TextArea from "./Inputs/TextArea";
import InputWrapper from "./Inputs/InputWapper";
import Input from "./Inputs/Input";
import ReactGoogleAutocomplete from "react-google-autocomplete";

export default function ReviewFrom() {
  const { register, handleSubmit } = useForm();
  return (
    <>
      <div className="heading1">
        <div> 장소</div>
        <ReactGoogleAutocomplete
          apiKey="AIzaSyBcIqwDpNYJQW4v6_q9rkX7zEJXCJN2Znc"
          onPlaceSelected={(place) => {
            console.log(place);
            console.log(place.geometry.location.lat());
            console.log(place.geometry.location.lng());
          }}
          options={{
            types: [],
            fields: ["name", "geometry.location", "place_id", "formatted_address", "types"],
          }}
        />
      </div>
      <form className="heading1" onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="heading4">내 리뷰 작성</div>
        <div>
          <InputWrapper htmlFor="title" title="제목">
            <Input {...register("title")} id="title" placeholder="제목 입력" />
          </InputWrapper>
        </div>
        <div>
          <InputWrapper htmlFor="description" title="내용">
            <TextArea {...register("description")} id="description" placeholder="내용 입력" />
          </InputWrapper>
        </div>
        <div>날짜</div>
        <div>유형</div>
        <div>날씨</div>
        <div>
          방문시간
          <TimePicker />
        </div>
        <div>태그</div>
        <div>평점</div>
        <button className="w-210 h-46" type="submit">
          <Clickable color="black" size="medium">
            등록
          </Clickable>
        </button>
      </form>
    </>
  );
}
