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
        `http://localhost:8080/api/payments/${id}/list-order-payments`,
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
      {payment.length > 0 ? (
        payment.map((pay) => (
          <Descriptions
            key={pay.paymentID}
            bordered
            column={1}
            style={{ marginBottom: '20px' }}
            title={`Payment ID: ${pay.paymentID}`}
          >
            <Descriptions.Item label="Description">
              {pay.description}
            </Descriptions.Item>
            <Descriptions.Item label="Create Date">
              {new Date(pay.createAt).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Payment Method">
              {pay.paymentMethod}
            </Descriptions.Item>
            <Descriptions.Item label="Order ID">
              {pay.orderId}
            </Descriptions.Item>
          </Descriptions>
        ))
      ) : (
        <p>No payments found.</p>
      )}
    </div>
  );
}

export default PaymentAdmin;
