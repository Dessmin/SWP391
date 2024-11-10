
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "./index.scss"; 

import { Pagination, Navigation } from "swiper/modules";
import { Image } from "antd";

export default function Breeds_Carousel() {
  return (
    <Swiper
      navigation={true}
      modules={[ Navigation, Pagination]}
      className="Carousel"
      slidesPerView={4}
      spaceBetween={20}
      
    >
      <SwiperSlide className="slide">
        <Image
          src="https://onkoi.vn/wp-content/uploads/2020/04/14.jpg" 
          alt="Koi 1"
        />
      </SwiperSlide>
      <SwiperSlide className="slide">
        <Image
          src="https://onkoi.vn/wp-content/uploads/2020/04/12.jpg" 
          alt="Koi 2"
        />
      </SwiperSlide>
      <SwiperSlide className="slide">
        <Image
          src="https://onkoi.vn/wp-content/uploads/2020/04/13.jpg" 
          alt="Koi 3"
        />
      </SwiperSlide>
      <SwiperSlide className="slide">
        <Image
          src="https://onkoi.vn/wp-content/uploads/2020/04/16.jpg" 
          alt="Koi 4"
        />
      </SwiperSlide>
      <SwiperSlide className="slide">
        <Image
          src="https://onkoi.vn/wp-content/uploads/2020/04/14.jpg" 
          alt="Koi 1"
        />
      </SwiperSlide>
      <SwiperSlide className="slide">
        <Image
          src="https://onkoi.vn/wp-content/uploads/2020/04/12.jpg" 
          alt="Koi 2"
        />
      </SwiperSlide>
      <SwiperSlide className="slide">
        <Image
          src="https://onkoi.vn/wp-content/uploads/2020/04/13.jpg" 
          alt="Koi 3"
        />
      </SwiperSlide>
      <SwiperSlide className="slide">
        <Image
          src="https://onkoi.vn/wp-content/uploads/2020/04/16.jpg" 
          alt="Koi 4"
        />
      </SwiperSlide>
    </Swiper>
  );
}
