import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Spin, Alert, Form, Rate, Input } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import apiOrder from "../../config/api-order";
import { toast } from "react-toastify";
import './index.scss'

const PaymentSuccess = () => {
  const user = useSelector((state) => state.user);
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState();
  const [value, setValue] = useState();
  const desc = ["1", "2", "3", "4", "5"];

  const points = sessionStorage.getItem("point")

  const updateUserPoints = async (points) => {
    try {
      await axios.put(
        `http://localhost:8080/api/user/usePoint`,
        {
          point: points,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("User points updated successfully");
    } catch (error) {
      console.error("Error updating user points", error);
    }
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
        
      }
    } catch (error) {
      console.log(error.toString());
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const vnpResponseCode = searchParams.get("vnp_ResponseCode");

    const updateOrderStatus = async (status) => {
      try {
        await axios.put(
          `http://localhost:8080/api/orders/${orderId}/update-status`,
          null, // Tham số body không cần thiết ở đây
          {
            params: { status }, // Truyền tham số status qua query params
            headers: {
              Authorization: `Bearer ${user.token}`, // Gửi token trong header
            },
          }
        );
      } catch (error) {
        console.log("Error updating order status:", error);
        setError("Cập nhật trạng thái đơn hàng thất bại.");
      }
    };

    // Nếu thanh toán thất bại hoặc bị hủy
    if (vnpResponseCode !== "00") {
      // Cập nhật trạng thái đơn hàng là "FAIL"
      updateOrderStatus("FAIL"); 
      navigate("/payment-failed", { replace: true });
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setOrder(response.data);
        setLoading(false);

        // Gọi hàm thêm giao dịch
        await addTransaction(); // Gọi hàm thêm giao dịch sau khi nhận được đơn hàng
        await updateOrderStatus("PAID"); // Giả sử trạng thái là PAID
        if (points) {
          await updateUserPoints(points);
        }
      } catch (err) {
        setError("Không thể tải thông tin đơn hàng.");
        setLoading(false);
      }
    };

    const addTransaction = async () => {
      try {
        await apiOrder.post(`${orderId}/transaction`, {}, {
          headers: {
            Authorization: `Bearer ${user.token}`, // Gửi token trong header
          },
        });
      } catch (error) {
        console.log("Error adding transaction:", error);
        // Có thể thêm thông báo lỗi nếu cần
      }
    };

    

    // Fetch order details only if payment was successful
    fetchOrder();
  }, [orderId, navigate, user.token, points]);

  const handleContinueShopping = () => {
    navigate("/home");
  };

  const handleViewOrderDetails = () => {
    navigate(`/orders/${orderId}`);
  };

  if (loading) {
    return <Spin tip="Đang tải..." />;
  }

  if (error) {
    return <Alert message="Lỗi" description={error} type="error" showIcon />;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Thanh toán thành công!</h1>
      <p>
        Cảm ơn bạn đã mua hàng. Đơn hàng 
         đã được thanh toán thành công.
      </p>
      {order && (
        <div style={{ marginTop: "20px" }}>
          
            <p><strong>Loại: </strong>{order.type}</p>
          
          
          <p>
            <strong>Tổng tiền:</strong> {order.totalAmount.toLocaleString()} VND
          </p>
          <p>
            <strong>Ngày tạo:</strong>{" "}
            {new Date(order.orderDate).toLocaleString()}
          </p>
        </div>
      )}
      <div style={{ marginTop: "30px" }}>
        <Button
          type="primary"
          onClick={handleContinueShopping}
          style={{ marginRight: "10px" }}
        >
          Tiếp tục mua sắm
        </Button>
        <Button onClick={handleViewOrderDetails}>Xem chi tiết đơn hàng</Button>
      </div>
      <div className="form-ctn">
      <div className="form-fb">
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
      </div>
      </div>
      
      
    </div>
  );
};

export default PaymentSuccess;
