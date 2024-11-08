import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Spin, Alert, Button } from "antd";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import apiOrder from "../../config/api-order";

function Consignment() {
  const user = useSelector((state) => state.user);
  const [consignments, setConsignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleConssign = async (consignment) => {
    
    const orderRequest = {
      totalAmount: consignment.shopPrice,
      type: "Consignment",
      orderDetails: [
        // Chuyển sang mảng
        {
          productId: consignment.koiFishId,
          productType: "KoiFish", 
          quantity: 1, 
          unitPrice: consignment.shopPrice,
        },
      ],
    };

    try {
      const response = await apiOrder.post("add-order", orderRequest, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const paymentUrl = response.data; 

      
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("There was an error processing the order!", error);
      alert("Error creating order. Please try again.");
    }
  };

  useEffect(() => {
    const fetchConsignment = async () => {
      try {
        const response = await axios.get(
          "http://14.225.210.143:8080/api/consignments/getforCustomer",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setConsignments(response.data);
        setLoading(false);
      } catch (error) {
        setError("Không thể tải dữ liệu consignment.");
        setLoading(false);
      }
    };

    fetchConsignment();
  }, [user.token]);

  const columns = [
    {
      title: "Tên cá",
      dataIndex: "fishName",
      key: "fishName",
    },
    {
      title: "Ngày yêu cầu",
      dataIndex: "requestDate",
      key: "requestDate",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Loại ký gửi",
      dataIndex: "consignmentType",
      key: "consignmentType",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? "Hoàn thành" : "Chưa hoàn thành"),
    },
    {
      title: "Tổng phí",
      dataIndex: "shopPrice",
      key: "shopPrice",
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Xác nhận ký gửi",
      dataIndex: "action",
      render: (text, record) => (
        <span>
          {record.status !== true && record.shopPrice !== 0 && (
            <Button type="primary" onClick={() => handleConssign(record)}>
              Ký gửi
            </Button>
          )}
        </span>
      ),
    },
  ];

  if (loading) {
    return <Spin tip="Đang tải..." />;
  }

  if (error) {
    return <Alert message="Lỗi" description={error} type="error" showIcon />;
  }

  return (
    <div className="consignment">
      <h1>Danh sách ký gửi</h1>
      <Button
        style={{ width: 100 }}
        type="primary"
        onClick={() => navigate("/consignmentKoi")}
      >
        Ký gửi
      </Button>
      <Table
        columns={columns}
        dataSource={consignments}
        rowKey={(record) => record.id}
        bordered
      />
    </div>
  );
}

export default Consignment;
