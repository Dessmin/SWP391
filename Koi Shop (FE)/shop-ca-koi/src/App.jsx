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
import CompareKoi from "./pages/comparison";
import OrderManagement from "./pages/admin/order-management";
import OrderDetailAdmin from "./pages/admin/orderDetail-management";
import PaymentAdmin from "./pages/admin/payment-management";
import Batch from "./pages/admin/batch-management";
import Promotion from "./pages/admin/promotion-management";
import OrderHistory from "./pages/order-history";
import ManualConsignment from "./pages/manual-consignment";
import AddConsignment from "./pages/add-consignment";
import ConfirmConsign from "./pages/confirm-consign";
import ResetPassword from "./pages/reset-password";
import ConfirmResetPassword from "./pages/confirm-reset-password";
import ChangePassword from "./pages/change-password";
import Introduction from "./pages/introduction";
import RatingFeedback from "./pages/admin/rating&feedback-management";
import Koi_introduction from "./pages/Koi-introduction";

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
      path: "/home/dashboard/order",
      element: <OrderManagement />,
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
      path: "/home/dashboard/koi/certificate/:koiId",
      element: <Certificate />,
    },
    {
      path: "/koi-comparison/:id/:compareId",
      element: <CompareKoi />,
    },
    {
      path: "/orderDetail/:id",
      element: <OrderDetailAdmin />,
    },
    {
      path: "/payment/:id",
      element: <PaymentAdmin />,
    },
    {
      path: "/home/dashboard/batch",
      element: <Batch />,
    },
    {
      path: "/home/dashboard/promotion",
      element: <Promotion />,
    },
    {
      path: "/orderHistory",
      element: <OrderHistory />,
    },
    {
      path: "/consignmentKoi",
      element: <ManualConsignment />,
    },
    {
      path: "/addConsignmentKoi",
      element: <AddConsignment />,
    },
    {
      path: "/confirm/:id",
      element: <ConfirmConsign />,
    },
    {
      path: "/resetPassword",
      element: <ResetPassword />,
    },
    {
      path: "/confirmResetPassword",
      element: <ConfirmResetPassword />,
    },
    {
      path: "/changePassword",
      element: <ChangePassword />,
    },
    {
      path: "/introduce",
      element: <Introduction />,
    },
    {
      path: "/home/dashboard/rating_feedback",
      element: <RatingFeedback />,
    },
    {
      path: "/koi_introduction",
      element: <Koi_introduction />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
