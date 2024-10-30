import { useParams } from 'react-router-dom';
import api from '../../config/api';
import { useEffect, useState } from 'react';
import HeaderLoged from '../../components/header(loged)';
import { useSelector } from 'react-redux';
import './index.scss'

function BlogPage() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [blog, setBlog] = useState(null);

  const fetchBlogById = async () => {
    try {
      const response = await api.get(`posting/${id}/get-posting`, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Gửi token trong header
        },
      });
      setBlog(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogById();
  }, [id]);

  // Kiểm tra xem blog có tồn tại không trước khi render
  if (!blog) {
    return <div>Đang tải dữ liệu...</div>; // Hoặc có thể hiển thị một spinner/loading indicator
  }

  return (
    <div className='blog-full'>
      <HeaderLoged />
      <div className="blog-card">
        <img src={blog.image} alt="Blog" />
        <div className="blog-body">
          <div className="titlee"><strong>Tiêu đề: </strong>{blog.title}</div>
          <div className="contentt">{blog.content}</div>
          <div className="authorr"><strong>Tác giả: </strong>{blog.author}</div>
          <div className="datee"><strong>Ngày: </strong>{new Date(blog.date).toLocaleDateString("vi-VN")}</div>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
