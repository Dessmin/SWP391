// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./index.scss";
// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { Image } from "antd";

export default function Carousel() {
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Autoplay, Navigation, Pagination]}
        className="Carousel"
        slidesPerView={4}
        spaceBetween={30}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide className="slide">
          <Image
            src="https://koilover.vn/uploads/images/nguon-goc-kohaku.jpg"
            alt="Certificate"
          />
        </SwiperSlide>
        <SwiperSlide className="slide">
          <Image
            src="https://koilover.vn/uploads/images/nguon-goc-kohaku.jpg"
            alt="Certificate"
          />
        </SwiperSlide>
        <SwiperSlide className="slide">
          <Image
            src="https://koilover.vn/uploads/images/nguon-goc-kohaku.jpg"
            alt="Certificate"
          />
        </SwiperSlide>
        <SwiperSlide className="slide">
          <Image
            src="https://koilover.vn/uploads/images/nguon-goc-kohaku.jpg"
            alt="Certificate"
          />
        </SwiperSlide>
        <SwiperSlide className="slide">
          <Image
            src="https://koilover.vn/uploads/images/nguon-goc-kohaku.jpg"
            alt="Certificate"
          />
        </SwiperSlide>
        <SwiperSlide className="slide">
          <Image
            src="https://koilover.vn/uploads/images/nguon-goc-kohaku.jpg"
            alt="Certificate"
          />
        </SwiperSlide>
        <SwiperSlide className="slide">
          <Image
            src="https://koilover.vn/uploads/images/nguon-goc-kohaku.jpg"
            alt="Certificate"
          />
        </SwiperSlide>
        <SwiperSlide className="slide">
          <Image
            src="https://koilover.vn/uploads/images/nguon-goc-kohaku.jpg"
            alt="Certificate"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
