import { useLocation } from "react-router-dom";
import OrderDetails from "../orderDetail";

const OrderDetailsPage = () => {
  const location = useLocation();
  const returnPath = location.state?.returnPath; 

  return <OrderDetails returnPath={returnPath} />;
};

export default OrderDetailsPage;
