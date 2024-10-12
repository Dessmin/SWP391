import Footer from "../../components/footer"
import Header from "../../components/header(def)"
import "./index.scss"

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
      <Footer/>
    </div>
  )
}

export default Home