// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./index.scss"; // Đảm bảo bạn liên kết đúng với file SCSS
// import required modules
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
          src="https://onkoi.vn/wp-content/uploads/2020/04/14.jpg" // ka
          alt="Koi 1"
        />
      </SwiperSlide>
      <SwiperSlide className="slide">
        <Image
          src="https://onkoi.vn/wp-content/uploads/2020/04/12.jpg" // shp
          alt="Koi 2"
        />
      </SwiperSlide>
      <SwiperSlide className="slide">
        <Image
          src="https://onkoi.vn/wp-content/uploads/2020/04/13.jpg" // a
          alt="Koi 3"
        />
      </SwiperSlide>
      <SwiperSlide className="slide">
        <Image
          src="https://onkoi.vn/wp-content/uploads/2020/04/16.jpg" // be
          alt="Koi 4"
        />
      </SwiperSlide>
      <SwiperSlide className="slide">
        <Image
          src="https://onkoi.vn/wp-content/uploads/2020/04/14.jpg" // ka
          alt="Koi 1"
        />
      </SwiperSlide>
      <SwiperSlide className="slide">
        <Image
          src="https://onkoi.vn/wp-content/uploads/2020/04/12.jpg" // shp
          alt="Koi 2"
        />
      </SwiperSlide>
      <SwiperSlide className="slide">
        <Image
          src="https://onkoi.vn/wp-content/uploads/2020/04/13.jpg" // a
          alt="Koi 3"
        />
      </SwiperSlide>
      <SwiperSlide className="slide">
        <Image
          src="https://onkoi.vn/wp-content/uploads/2020/04/16.jpg" // be
          alt="Koi 4"
        />
      </SwiperSlide>
    </Swiper>
  );
}
