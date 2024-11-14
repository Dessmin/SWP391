import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, Form, Input, Modal, Rate, Table } from "antd";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function OrderHistory() {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const desc = ["1", "2", "3", "4", "5"];
  const [value, setValue] = useState();
  const [feedback, setFeedback] = useState();
  const [orderId, setOrderId] = useState(null);

  const showModal = (id) => {
    setOrderId(id); // Lưu orderId khi mở modal
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFeedBack = async () => {
    const values = {
      ordersId: orderId,
      rating: value,
      feedback: feedback,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/api/ratings-feedbacks/add-ratingsfeedback",
        values,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Gửi feedback thành công");
        handleOk();
      }
    } catch (error) {
      console.log(error.toString());
    }
  };

  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/orders/list-user-orders/summary",
        {
          headers: {
            Authorization: `Bearer ${user.token}`, 
          },
        }
      );
      setOrders(response.data);
      console.log(orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, [user.token]);

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Ngày đặt",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "orderStatus",
      key: "orderStatus",
    },
    {
      title: "Trạng thái giao hàng",
      dataIndex: "deliveryStatus",
      key: "deliveryStatus",
    },
    {
      title: "Feedback",
      dataIndex: "action",
      render: (text, record) => (
        <span key={record.orderID}>
          {record.deliveryStatus === "DELIVERIED" && (
            <Button type="primary" onClick={() => showModal(record.orderID)}>
              Feedback
            </Button>
          )}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <span>
          <Button onClick={() => navigate(`/orderDetail/${record.orderID}`)}>Order detail</Button>

         
        </span>
      ),
    },
  ];

  return (
    <div className="history">
      <h1>Lịch sử đặt hàng</h1>
      <Table
        
        columns={columns}
        dataSource={orders}
        rowKey={(record) => record.id}
        bordered
      />

<>
        <Modal
          title="Feedback"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form onFinish={handleFeedBack}>
        <Form.Item>
          <Rate tooltips={desc} onChange={setValue} value={value} />
          {value ? <span>{desc[value - 1]}</span> : null}
        </Form.Item>
        <Form.Item>
          <Input
            placeholder="Feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </Form.Item>
        <Button style={{ width: "100%" }} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
          
        </Modal>
      </>
    </div>
  );
}

export default OrderHistory;
