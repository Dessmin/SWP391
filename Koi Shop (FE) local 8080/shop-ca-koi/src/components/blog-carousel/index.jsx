import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import api from "../../config/api";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "./index.scss";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

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
      <h2 style={{color:'white'}}>Các bài viết</h2>
      <Swiper
      navigation={true}
      modules={[Navigation, Pagination]}
      className="carousel"
      slidesPerView={4}
      spaceBetween={20}
    >
      
      {blogs.map((blog) => (
        <SwiperSlide key={blog.id} className="blog-slide">
          
          <img src={blog.image} alt="" />
          <div className="title-content">
            <div className="title">
              <strong>{blog.title}</strong> 
            </div>
            <div className="content">
              
              {blog.content}
            </div>
          </div>
          <div className="bton">
            <Button onClick={() => navigate(`/blogDetail/${blog.id}`)}>Xem thêm</Button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
    
  );
}
