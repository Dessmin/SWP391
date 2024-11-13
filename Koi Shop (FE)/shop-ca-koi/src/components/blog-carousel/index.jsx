import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import api from "../../config/api";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "./index.scss";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

export default function Blog_Carousel() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await api.get("posting/list-postings");
      setBlogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div>
      <Swiper
        navigation={true}
        modules={[Navigation, Pagination]}
        className="carousel"
        slidesPerView={4}
        spaceBetween={20}
      >
        {blogs.map((blog) => (
          <SwiperSlide key={blog.id} className="blog-slide">
            <Link to={`/blogDetail/${blog.id}`}>
              <img
                src={blog.image}
                alt=""
                style={{ width: "100%", height: "auto" }}
              />
            </Link>
            <div className="title-content">
              <div className="title">
                <strong>{blog.title}</strong>
              </div>
              <div className="content">{blog.content}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
