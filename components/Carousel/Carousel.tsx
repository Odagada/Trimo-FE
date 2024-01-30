import "@splidejs/react-splide/css";
//@ts-ignore
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
          heightRatio: 0.225,
        }}
      >
        <SplideTrack className="flex items-center">
          {data.resources.map((singleImgSlide, index) => (
            <SplideSlide key={index}>
              <img
                className="w-full h-full object-cover rounded-[20px] border-[1.5px] border-black"
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
