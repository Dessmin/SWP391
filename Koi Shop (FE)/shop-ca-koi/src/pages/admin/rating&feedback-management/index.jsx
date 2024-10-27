import { Table, Button, message } from "antd";
import Dashboard from "../../../components/dashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function RatingFeedback() {
  const [dataSource, setDataSource] = useState([]);
  const user = useSelector((state) => state.user);

  // Hàm tải danh sách Rating_Feedback
  async function loadRatingFeedbackList() {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/ratings-feedbacks/list-ratingsfeedbacks",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setDataSource(response.data);
    } catch (error) {
      message.error("Lỗi khi tải danh sách feedback.");
    }
  }

  // Hàm xóa Rating_Feedback
  async function deleteRatingFeedback(id) {
    try {
      await axios.delete(`http://localhost:8080/api/ratings-feedbacks/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setDataSource(dataSource.filter((rating) => rating.ratingID !== id));
      message.success("Xóa feedback thành công!");
    } catch (error) {
      message.error("Lỗi khi xóa feedback.");
    }
  }

  useEffect(() => {
    loadRatingFeedbackList();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "ratingID",
      key: "ratingID",
    },
    {
      title: "Người dùng",
      dataIndex: ["user", "username"],
      key: "user",
    },
    {
      title: "Số điện thoại",
      dataIndex: ["user", "phoneNumber"],
      key: "phoneNumber",
    },
    {
      title: "Địa chỉ",
      dataIndex: ["user", "address"],
      key: "address",
    },
    {
      title: "Cá Koi",
      dataIndex: ["koiFish", "fishName"],
      key: "koiFish",
    },
    {
      title: "Giới tính",
      dataIndex: ["koiFish", "gender"],
      key: "gender",
      render: (gender) => (gender ? "Đực" : "Cái"), // true là Đực, false là Cái
    },
    {
      title: "Giống cá",
      dataIndex: ["koiFish", "breed", "breedName"],
      key: "breedName",
    },
    {
      title: "Điểm",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
    },
    {
      title: "Ngày gửi",
      dataIndex: "feedbackDate",
      key: "feedbackDate",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (text, record) => (
        <Button
          type="primary"
          danger
          onClick={() => deleteRatingFeedback(record.ratingID)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Dashboard>
        <Table dataSource={dataSource} columns={columns} rowKey="ratingID" />
      </Dashboard>
    </div>
  );
}

export default RatingFeedback;
