import { Button, Select, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import Dashboard from "../../../components/dashboard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function OrderManagement() {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

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

  const updateShipStatus = async (orderID, status) => {
    try {
      await axios.put(
        `http://localhost:8080/api/orders/${orderID}/update-delivery-status`,
        null,
        {
          params: { status },
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success("Cập nhật trạng thái giao hàng thành công");
    } catch (error) {
      console.log("Error updating order status:", error);
      setError("Lỗi cập nhật trạng thái đơn hàng");
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
      title: "Trạng thái thanh toán",
      dataIndex: "orderStatus",
      key: "orderStatus",
    },
    {
      title: "Trạng thái giao hàng",
      dataIndex: "deliveryStatus",
      key: "deliveryStatus",
      render: (text, record) => (
        <Select
          defaultValue={text}
          style={{ width: 120 }}
          onChange={(value) => updateShipStatus(record.orderID, value)}
        >
          <Select.Option value="PENDING">PENDING</Select.Option>
          <Select.Option value="ON DELIVERY">ON DELIVERY</Select.Option>
          <Select.Option value="DELIVERIED">DELIVERIED</Select.Option>
        </Select>
      ),
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
