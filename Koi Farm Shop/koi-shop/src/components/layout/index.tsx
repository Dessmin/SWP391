import { Outlet } from "react-router-dom"
import Header from "../header(def)"
import Footer from "../footer"

function Layout() {
  return (
    <>
      <Header />

      {/* content của page */}
      <Outlet />

      <Footer />
    </>
  )
}

export default Layout