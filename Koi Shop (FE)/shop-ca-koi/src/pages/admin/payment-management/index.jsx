import { Descriptions } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function PaymentAdmin() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [payment, setPayment] = useState([]);

  const fetchPaymentByOrderId = async (id) => {
    try {
      const response = await axios.get(
        `http://14.225.210.143:8080/api/payments/${id}/order-payment`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setPayment(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    if (id) {
      fetchPaymentByOrderId(id);
    }
  }, [id]);

  return (
    <div>
      <h2>Payment</h2>
      {payment ? (
        <Descriptions
          bordered
          column={1}
          style={{ marginBottom: '20px' }}
          
        >
          <Descriptions.Item label="Description">
            {payment.description}
          </Descriptions.Item>
          <Descriptions.Item label="Create Date">
            {new Date(payment.createAt).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Payment Method">
            {payment.paymentMethod}
          </Descriptions.Item>
          <Descriptions.Item label="Order ID">
            {payment.orderId}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <p>No payments found.</p>
      )}
    </div>
  );
}

export default PaymentAdmin;
