import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Spin, Alert } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import apiOrder from "../../config/api-order";

const PaymentSuccess = () => {
  const user = useSelector((state) => state.user);
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const vnpResponseCode = searchParams.get("vnp_ResponseCode");

    // Nếu thanh toán thất bại hoặc bị hủy
    if (vnpResponseCode !== "00") {
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
      } catch (err) {
        setError("Không thể tải thông tin đơn hàng.");
        setLoading(false);
      }
    };

    const addTransaction = async () => {
      try {
        await apiOrder.post(
          `${orderId}/transaction`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`, // Gửi token trong header
            },
          }
        );
      } catch (error) {
        console.log("Error adding transaction:", error);
        // Có thể thêm thông báo lỗi nếu cần
      }
    };

    // Fetch order details only if payment was successful
    fetchOrder();
  }, [orderId, navigate, user.token]);

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
        Cảm ơn bạn đã mua hàng. Đơn hàng của bạn có mã:{" "}
        <strong>{orderId}</strong> đã được thanh toán thành công.
      </p>
      {order && (
        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Tổng tiền:</strong> {order.totalAmount} VND
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
    </div>
  );
};

export default PaymentSuccess;
