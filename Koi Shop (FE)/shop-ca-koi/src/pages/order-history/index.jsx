import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Table } from "antd";
import "./index.scss";

function OrderHistory() {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);

  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/orders/list-user-orders/summary",
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Gửi token trong header
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
      title: "Trạng thái",
      dataIndex: "orderStatus",
      key: "orderStatus",
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
    </div>
  );
}

export default OrderHistory;
