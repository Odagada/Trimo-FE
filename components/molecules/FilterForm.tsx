import { useForm } from "react-hook-form";
import Clickable from "../atoms/Clickable";
import TagRadioButton from "./TagRadioButton";
import useGetForm from "../atoms/useGetForm";
import { Review } from "@/types/client.types";

interface Props {
  closeDropdown: () => void;
}

export default function FilterForm({ closeDropdown }: Props) {
  const defaultValues: Review = {
    title: "",
    content: "",
    weather: "",
    companion: "",
    placeType: "",
    visitingTime: "",
  };
  const { handleSubmit, control, register } = useForm({ defaultValues });
  const { month, placeType, companion, weather } = useGetForm(control);
  const postForm = (data) => {
    console.log(data);
    closeDropdown();
  };
  return (
    <form onSubmit={handleSubmit(postForm)}>
      {/* <TagRadioButton {...month} tag="month" />
      <TagRadioButton {...placeType} tag="placeType" />
      <TagRadioButton {...companion} tag="companion" /> */}
      <TagRadioButton {...weather} tag="weather" />
      <div className="flex justify-end">
        <button>
          <Clickable shape="capsule" size="small">
            <div className="w-70">확인</div>
          </Clickable>
        </button>
      </div>
    </form>
  );
}
