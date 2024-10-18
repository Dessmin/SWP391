import { Col, Row } from "antd"
import Footer from "../../components/footer"
import Header from "../../components/header(def)"
import "./index.scss"
import Carousel from "../../components/carousel"

function Home() {
  return (

    <div className="body">
      <Header/>
      <div className="body__banner">
        <div className="body__slogan">
          <span className="slogan1">Cá koi</span>
          <hr />
          <span className="slogan2">Biểu tượng</span>
          <span className="slogan2">của</span>
          <span className="slogan2">may mắn</span>
          <span className="slogan2">và</span>
          <span className="slogan2">thịnh vượng</span>
        </div>

      </div>
      <div className="body__content">
        <h2>Shop Koi</h2>
        <Row className="body__info" align={"middle"} gutter={30}>
          <Col span={14}>
            <div className="body__description">
              Shop cá Koi của chúng tôi tự hào mang đến cho bạn những chú cá Koi
              chất lượng cao, đa dạng về chủng loại và màu sắc, giúp không gian
              hồ cá của bạn trở nên sinh động và phong thủy hơn. Với niềm đam mê
              và kinh nghiệm trong việc chăm sóc cá Koi, chúng tôi cam kết cung
              cấp những chú cá khỏe mạnh, đã được nuôi dưỡng trong môi trường
              đạt chuẩn, cùng với dịch vụ tư vấn tận tình về cách nuôi và chăm
              sóc. Hãy đến với chúng tôi để chọn cho mình những chú cá Koi đẹp
              nhất và trải nghiệm sự thư giãn tuyệt vời từ vẻ đẹp của loài cá
              đặc biệt này.
            </div>
          </Col>

          <Col span={10}>
            <div className="body__logo">
              <img
                width={400}
                src="https://gudlogo.com/wp-content/uploads/2019/05/logo-ca-Koi-37.png"
                alt=""
              />
            </div>
          </Col>
        </Row>
        <hr />
        <div className="body__carousel">
        <h2>Các loại cá Koi</h2>
        <Carousel />
        </div>
        
      </div>
      <Footer/>
    </div>
  )
}

export default Home