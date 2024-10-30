import { useLocation } from "react-router-dom";
import OrderDetails from "../orderDetail";

const OrderDetailsPage = () => {
  const location = useLocation();
  const returnPath = location.state?.returnPath; // Lấy returnPath từ state nếu có

  return <OrderDetails returnPath={returnPath} />;
};

export default OrderDetailsPage;
