import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/dashboard";
import User from "./pages/admin/management-user";
import Home from "./pages/home(def)";
import HomeLoged from "./pages/home(loged)";
import Login from "./pages/login";
import Register from "./pages/register";
import CartPage from "./pages/cartPage";
import DetailKoi from "./pages/detailKoi";
import DetailUser from "./pages/detaiUser";
import KoiDetail from "./pages/koi-detail-page";
import UserDetail from "./pages/user-detail-management";
import Breed from "./pages/admin/breed-management";
import Origin from "./pages/admin/origin-management";
import Koi from "./pages/admin/koi-management";
import PaymentSuccess from "./components/successPayment";
import FailPayment from "./components/failPayment";
import OrderDetailsPage from "./components/orderDetailPage";
import Consignment from "./pages/consignment";
import ConsignmentManagement from "./pages/admin/consignment-management";
import Certificate from "./pages/certificate-detail-page";
import Promotion from "./pages/admin/promotion-management";
import Batch from "./pages/admin/batch-management";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <HomeLoged />,
    },
    {
      path: "/home/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/home/dashboard/user",
      element: <User />,
    },
    {
      path: "/home/dashboard/consignment",
      element: <ConsignmentManagement />,
    },
    {
      path: "cart",
      element: <CartPage />,
    },
    {
      path: "/detailKoi/:id",
      element: <DetailKoi />,
    },
    {
      path: "/detailUser/:id",
      element: <DetailUser />,
    },
    {
      path: "/home/dashboard/koi/koidetail/:koiID",
      element: <KoiDetail />,
    },
    {
      path: "/home/dashboard/user/:id/detail",
      element: <UserDetail />,
    },
    {
      path: "/home/dashboard/koi/origin",
      element: <Origin />,
    },
    {
      path: "/home/dashboard/koi/breed",
      element: <Breed />,
    },
    {
      path: "/home/dashboard/koi",
      element: <Koi />,
    },
    {
      path: "/success/:orderId",
      element: <PaymentSuccess />,
    },
    {
      path: "/orders/:orderId",
      element: <OrderDetailsPage />,
    },
    {
      path: "/payment-failed",
      element: <FailPayment />,
    },
    {
      path: "/consignment",
      element: <Consignment />,
    },
    {
      path: "/home/dashboard/promotion",
      element: <Promotion />,
    },
    {
      path: "/home/dashboard/batch",
      element: <Batch />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
