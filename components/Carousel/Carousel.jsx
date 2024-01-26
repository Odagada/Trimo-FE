import "@splidejs/react-splide/css";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import data from "./data.json";

function Carousel() {
  return (
    <>
      <Splide
        hasTrack={false}
        aria-label="main page carousel"
        options={{
          perPage: 4,
          perMove: 1,
          rewind: true,
          gap: "2rem",
          speed: 1800,
          // focus: "center",
          drag: "free",
          snap: true,
          autoplay: true,
          interval: 3000,
          pagination: false,
          pauseOnHover: true,
          pauseOnFocus: true,
          wheel: true,
          wheelSleep: 1000,
          trimSpace: false,
        }}
      >
        <SplideTrack className="flex items-center">
          {data.resources.map((singleImgSlide, index) => (
            <SplideSlide key={index}>
              <img
                className="min-w-full h-auto bg-cover"
                src={singleImgSlide.imageUrl}
                alt={singleImgSlide.title}
              />
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
    </>
  );
}

export default Carousel;
