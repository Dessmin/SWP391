import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Descriptions, Spin } from 'antd'; // Import Descriptions và Spin từ Ant Design

function DetailKoi() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { id } = useParams(); // Lấy id từ URL
  const [koi, setKoi] = useState(null); // Thay đổi từ mảng thành null
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading

  const fetchKoiById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/koi-fishes/koiFish/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Gửi token trong header
        },
      });
      return response.data;
    } catch (error) {
      console.log(error.toString());
      return null; // Trả về null nếu có lỗi
    }
  };

  useEffect(() => {
    fetchKoiById(id).then((data) => {
      if (data) {
        setKoi(data);
      }
      setLoading(false); // Cập nhật trạng thái loading sau khi nhận dữ liệu
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Nếu đang loading, hiển thị spinner
  if (loading) {
    return <Spin tip="Loading..." />;
  }

  return (
    <div>
      <h1>Detail Koi ID: {id}</h1>
      {koi && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Fish Name">
            {koi.fishName}
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            {koi.description}
          </Descriptions.Item>
          <Descriptions.Item label="Breed">
            {koi.breed}
          </Descriptions.Item>
          <Descriptions.Item label="Origin">
            {koi.origin}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">
            {koi.gender ? "Male" : "Female"}
          </Descriptions.Item>
          <Descriptions.Item label="Birth day">
            {koi.birthDate}
          </Descriptions.Item>
          <Descriptions.Item label="Diet">
            {koi.diet}
          </Descriptions.Item>
          <Descriptions.Item label="Size">
            {koi.size}
          </Descriptions.Item>
          <Descriptions.Item label="Price">
            {koi.price}
          </Descriptions.Item>
          <Descriptions.Item label="Food">
            {koi.food}
          </Descriptions.Item>
          <Descriptions.Item label="Screening rate">
            {koi.screeningRate}
          </Descriptions.Item>
          <Descriptions.Item label="Image">
            <img width={100} src={koi.image} alt="" />
            
          </Descriptions.Item>
          {/* Thêm các thuộc tính khác nếu cần */}
        </Descriptions>
      )}
      <Button type="primary" onClick={() => navigate("/home")}>Trở về</Button>
    </div>
  );
}

export default DetailKoi;
