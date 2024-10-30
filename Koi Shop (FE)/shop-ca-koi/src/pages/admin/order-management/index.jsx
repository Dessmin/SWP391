import { Button, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import Dashboard from "../../../components/dashboard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function OrderManagement() {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrder = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/orders/list-orders/summary",
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
    fetchOrder();
  }, [user.token]);





  const columns = [
    {
      title: "Id",
      dataIndex: "orderID",
      key: "orderID",
    },
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
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <span>
          <Button onClick={() => navigate(`/orderDetail/${record.orderID}`)}>Order detail</Button>

          <Button  type="primary" danger style={{ marginLeft: 8 }}>Xóa</Button>
          <Button onClick={() => navigate(`/payment/${record.orderID}`)} type="primary">Payment</Button>
        </span>
      ),
    },
  ];
  return (
    <div>
      <Dashboard>
        <Table
          columns={columns}
          dataSource={orders}
          rowKey={(record) => record.id}
          bordered
        />
      </Dashboard>
      
      
    </div>
  );
}

export default OrderManagement;
