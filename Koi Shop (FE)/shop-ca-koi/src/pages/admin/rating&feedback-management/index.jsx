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
        "http://14.225.210.143:8080/api/ratings-feedbacks/list-ratingsfeedbacks",
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

  
async function deleteRatingFeedback(id) {
  try {
    await axios.delete(`http://14.225.210.143:8080/api/ratings-feedbacks/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    message.success("Xóa feedback thành công!");
    
    
    loadRatingFeedbackList();
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
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Người dùng",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Order Id",
      dataIndex: "ordersId",
      key: "ordersId",
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
          onClick={() => deleteRatingFeedback(record.id)}
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
