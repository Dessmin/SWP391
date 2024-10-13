import { Button, Descriptions, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function DetailUser() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { id } = useParams(); // Lấy id từ URL
  const [userId, setUserId] = useState(null); // Thay đổi từ mảng thành null
  const [loading, setLoading] = useState(true);

  const fetchUserById = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/${id}/detail`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Gửi token trong header
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.toString());
      return null; // Trả về null nếu có lỗi
    }
  };

  useEffect(() => {
    fetchUserById(id).then((data) => {
      if (data) {
        setUserId(data);
      }
      setLoading(false); // Cập nhật trạng thái loading sau khi nhận dữ liệu
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  return (
    <div>
      <h1>Detail User ID: {id}</h1>
      {userId && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="User Name">
            {userId.userName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{userId.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">
            {userId.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Balance">
            {userId.pointsBalance}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {userId.address}
          </Descriptions.Item>
          
          
          
        </Descriptions>
      )}
      <Button type="primary" onClick={() => navigate("/home")}>Trở về</Button>
    </div>
  );
}

export default DetailUser;
