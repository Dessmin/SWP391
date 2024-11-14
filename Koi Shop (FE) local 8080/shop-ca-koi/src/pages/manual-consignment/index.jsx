import HeaderLoged from "../../components/header(loged)";
import ConsignmentContent from "../../components/consignment-content";
import Footer from "../../components/footer";
import { Link } from "react-router-dom";
import "./index.scss";

function ManualConsignment() {
  return (
    <div className="consigntment-back">
      <HeaderLoged />
      <div className="consignment-content">
        <ConsignmentContent />
      </div>
      <div className="consignment-button">
        <span className="text-color">Ký gửi tại đây: </span>
        <Link to="/addConsignmentKoi">
          <button className="button-highlight">Ký gửi</button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}

export default ManualConsignment;
