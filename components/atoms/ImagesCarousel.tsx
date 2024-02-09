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

const ImagesCarouse = ({ imageArray }: { imageArray: string[] }) => {
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
        className="mySwiper bg-gray-40 h-[30vh] w-full"
      >
        {imageArray.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <div className="relative h-[30vh] w-full flex items-center justify-center">
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
export default ImagesCarouse;
