import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function OrderDetailAdmin() {
    const { id } = useParams(); // Lấy id từ URL
    const user = useSelector((state) => state.user);
    const [orderDetai, setOrderDetail] = useState([]);
    

    const fetchOrderDetailByOrderId = async (id) => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/order-details/${id}/list-order-orderDetails`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setOrderDetail(response.data);
        } catch (error) {
          console.log(error);
          
        }
      };

      useEffect(() => {
        fetchOrderDetailByOrderId(id);
      }, [id]);

      const columns = [
        {
          title: 'ID Chi tiết đơn hàng',
          dataIndex: 'orderDetailID',
          key: 'orderDetailID',
        },
        {
          title: 'ID Sản phẩm',
          dataIndex: 'productId',
          key: 'productId',
        },
        {
          title: 'Loại sản phẩm',
          dataIndex: 'productType',
          key: 'productType',
        },
        {
          title: 'Số lượng',
          dataIndex: 'quantity',
          key: 'quantity',
        },
        {
          title: 'Đơn giá',
          dataIndex: 'unitPrice',
          key: 'unitPrice',
          render: (price) => `${price.toLocaleString()} VND`, // Hiển thị đơn giá theo format tiền tệ
        },
      ];
  return (
    <div>
    <h2>Chi tiết đơn hàng: {id}</h2>
    <Table 
      columns={columns} 
      dataSource={orderDetai} 
      rowKey={(record) => record.orderDetailID} // Đặt rowKey theo orderDetailID
      bordered 
    />
  </div>
  )
}

export default OrderDetailAdmin