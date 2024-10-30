import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spin, Alert, Descriptions, Button, Radio } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import "./index.scss";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [consignmentTypes, setConsignmentTypes] = useState({}); // Mặc định là "Offline"

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`, // Gửi token trong header
            },
          }
        );
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải thông tin đơn hàng.");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleConsignment = async (fishId) => {
    if (!fishId) {
      toast.error("Không có thông tin cá để ký gửi.");
      return;
    }

    const consignmentData = {
      fishId,
      requestDate: new Date().toISOString(),
      consignmentType: consignmentTypes[fishId] || "Offline",
    };

    try {
      await axios.post(
        "http://localhost:8080/api/consignments/add-consignment",
        consignmentData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success("Ký gửi thành công!");
    } catch (err) {
      toast.error("Chỉ được ký gửi một lần!");
    }
  };

  const handleConsignmentTypeChange = (productId, value) => {
    setConsignmentTypes((prev) => ({
      ...prev,
      [productId]: value, // Cập nhật consignmentType cho từng sản phẩm
    }));
  };

  if (loading) {
    return <Spin tip="Đang tải..." />;
  }

  if (error) {
    return <Alert message="Lỗi" description={error} type="error" showIcon />;
  }

  const Back = () => {
    navigate(-1);
  };

  return (
    <div style={{ marginTop: "50px", textAlign: "center" }}>
      <h1>Chi tiết đơn hàng</h1>
      {order ? (
        <Descriptions
          bordered
          style={{ textAlign: "left", display: "inline-block" }}
        >
          
          <Descriptions.Item label="Tổng tiền">
            {order.totalAmount.toLocaleString()} VND
          </Descriptions.Item>
          <Descriptions.Item label="Chi tiết sản phẩm">
            {order.orderDetails.map((item, index) => (
              <div key={index}>
                
                <p>Sản phẩm: {item.productType}</p>
                <p>Số lượng: {item.quantity}</p>
                <p>Giá: {item.unitPrice.toLocaleString()} VND</p>
                
                {item.productType === "KoiFish" &&
                  order.type !== "Consignment" && (
                    <>
                      <Radio.Group
                        onChange={(e) =>
                          handleConsignmentTypeChange(
                            item.productId,
                            e.target.value
                          )
                        }
                        value={consignmentTypes[item.productId] || "Offline"} // Lấy giá trị của sản phẩm cụ thể
                        style={{ marginBottom: "10px" }}
                      >
                        <Radio value="Online">Online</Radio>
                        <Radio value="Offline">Offline</Radio>
                      </Radio.Group>
                      <Button
                        type="default"
                        onClick={() => handleConsignment(item.productId)}
                        style={{ marginTop: "10px" }}
                      >
                        Ký gửi
                      </Button>
                    </>
                  )}

                <hr />
              </div>
            ))}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <p>Không tìm thấy đơn hàng.</p>
      )}
      <div className="bttn">
        <Button type="primary" onClick={Back}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default OrderDetails;
