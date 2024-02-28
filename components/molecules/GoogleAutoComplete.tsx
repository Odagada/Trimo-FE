import ReactGoogleAutocomplete from "react-google-autocomplete";
import { useMutation } from "@tanstack/react-query";
import { postSpots } from "@/apis/reviewPost";

interface Props {
  setSpotId: React.Dispatch<React.SetStateAction<string>>;
  spotError: string;
  setSpotError: React.Dispatch<React.SetStateAction<string>>;
}

export default function GoogleAutoComplete({ setSpotId, spotError, setSpotError }: Props) {
  const { mutate: postSpotsMutate } = useMutation({
    mutationFn: postSpots,
    onSuccess(data) {
      setSpotId(data.placeId);
      setSpotError("");
    },
    onError() {
      setSpotError("장소를 다시 입력해주세요");
    },
  });
  async function handlePlace(place: google.maps.places.PlaceResult) {
    const { name, place_id, formatted_address, geometry } = place;
    let latitude = "";
    let longitude = "";

    if (geometry && geometry.location) {
      latitude = geometry?.location.lat().toString();
      longitude = geometry?.location.lng().toString();
    }
    postSpotsMutate({
      name: name!,
      placeId: place_id!,
      formattedAddress: formatted_address!,
      location: { latitude, longitude },
    });
  }

  return (
    <div>
      <ReactGoogleAutocomplete
        apiKey="AIzaSyBcIqwDpNYJQW4v6_q9rkX7zEJXCJN2Znc"
        onPlaceSelected={handlePlace}
        options={{
          types: [],
          fields: ["name", "geometry.location", "place_id", "formatted_address"],
        }}
        placeholder="어느곳을 다녀오셨나요?"
        className="tablet:heading4 w-full focus:outline-none heading5"
      />
      {spotError !== "" && <p className="middle-text mt-10 font-bold text-error">{spotError}</p>}
    </div>
  );
}
