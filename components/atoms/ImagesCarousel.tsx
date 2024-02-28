import Image from "next/image";
import { useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ImagesCarousel = ({ imageArray }: { imageArray: string[] }) => {
  const [isCover, setIsCover] = useState(true);

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper h-[40vh] w-full bg-gray-40"
      >
        {imageArray.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <div className="relative flex h-[40vh] w-full items-center justify-center">
                <Image
                  onClick={() => {
                    setIsCover((prevValue) => !prevValue);
                  }}
                  className={`${isCover ? "object-cover" : "object-contain"}`}
                  src={item}
                  alt=""
                  fill
                ></Image>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};
export default ImagesCarousel;
