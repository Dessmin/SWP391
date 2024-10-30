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
import StatSummary from "./pages/admin/stat-summary";
import Income from "./pages/admin/income";
import RatingFeedback from "./pages/admin/rating&feedback-management";
import Koi_introduction from "./pages/Koi-introduction";
import ProtectedRoute from "./components/phanQuyen/ProtectedRoute";
import BlogPage from "./pages/blog-detail";
import { CartProvider } from "./helper/CartContext";
import Posting from "./pages/admin/posting-management";
import FailPayment from "./components/failPayment";
import FeedBackUI from "./pages/feedBack";

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
      element: (
        <ProtectedRoute roleRequired="Manager">
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/home/dashboard/user",
      element: (
        <ProtectedRoute roleRequired="Manager">
          <User />
        </ProtectedRoute>
      ),
    },
    {
      path: "/home/dashboard/consignment",
      element: (
        <ProtectedRoute roleRequired="Manager">
          <ConsignmentManagement />
        </ProtectedRoute>
      ),
    },
    {
      path: "/home/dashboard/order",
      element: (
        <ProtectedRoute roleRequired="Manager">
          <OrderManagement />
        </ProtectedRoute>
      ),
    },
    {
      path: "cart",
      element: <CartPage />,
    },
    {
      path: "/detailKoi/:id",
      element: (
        <CartProvider>
          <DetailKoi />
        </CartProvider>
      ),
    },
    {
      path: "/detailUser/:id",
      element: <DetailUser />,
    },
    {
      path: "/home/dashboard/koi/koidetail/:koiID",
      element: (
        <ProtectedRoute roleRequired="Manager">
          <KoiDetail />
        </ProtectedRoute>
      ),
    },
    {
      path: "/home/dashboard/user/:id/detail",
      element: (
        <ProtectedRoute roleRequired="Manager">
          <UserDetail />
        </ProtectedRoute>
      ),
    },
    {
      path: "/home/dashboard/koi/origin",
      element: (
        <ProtectedRoute roleRequired="Manager">
          <Origin />
        </ProtectedRoute>
      ),
    },
    {
      path: "/home/dashboard/koi/breed",
      element: (
        <ProtectedRoute roleRequired="Manager">
          <Breed />
        </ProtectedRoute>
      ),
    },
    {
      path: "/home/dashboard/koi",
      element: (
        <ProtectedRoute roleRequired="Manager">
          <Koi />
        </ProtectedRoute>
      ),
    },
    {
      path: "/home/dashboard/stat",
      element: (
        <ProtectedRoute roleRequired="Manager">
          <StatSummary />
        </ProtectedRoute>
      ),
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
      element: (
        <ProtectedRoute roleRequired="Manager">
          <Certificate />
        </ProtectedRoute>
      ),
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
      element: (
        <ProtectedRoute roleRequired="Manager">
          <Batch />
        </ProtectedRoute>
      ),
    },
    {
      path: "/home/dashboard/promotion",
      element: (
        <ProtectedRoute roleRequired="Manager">
          <Promotion />
        </ProtectedRoute>
      ),
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
      element: (
        <ProtectedRoute roleRequired="Manager">
          <RatingFeedback />
        </ProtectedRoute>
      ),
    },
    {
      path: "/koi_introduction",
      element: <Koi_introduction />,
    },
    {
      path: "/home/dashboard/income",
      element: (
        <ProtectedRoute roleRequired="Manager">
          <Income />
        </ProtectedRoute>
      ),
    },
    {
      path: "/home/dashboard/rating_feedback",
      element: (
        <ProtectedRoute roleRequired="Manager">
          <RatingFeedback />
        </ProtectedRoute>
      ),
    },
    {
      path: "/koi_introduction",
      element: <Koi_introduction />,
    },
    {
      path: "/blogDetail/:id",
      element: <BlogPage />,
    },
    {
      path: "/home/dashboard/posting",
      element: <Posting />,
    },
    {
      path: "/feedbackUser",
      element: <FeedBackUI />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
