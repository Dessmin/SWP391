import { Button, Result } from "antd";
import "./index.scss";
import { Link } from "react-router-dom";
const FailPayment = () => (
  <div className="FailBox">
    <Result
      status="error"
      title="Thất Bại!"
      subTitle="Thanh toán không thành công !"
      extra={[
        <Button type="primary" key="console">
          <Link to="/home">Trở về</Link>
        </Button>,
        <Button key="buy">Buy Again</Button>,
      ]}
    ></Result>
  </div>
);
export default FailPayment;
