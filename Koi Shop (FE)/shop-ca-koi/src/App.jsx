import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/dashboard';
import User from './pages/admin/management-user';
import Home from './pages/home(def)';
import HomeLoged from './pages/home(loged)';
import Login from './pages/login';
import Register from './pages/register';
import CartPage from './pages/cartPage';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
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
      path: "cart",
      element: <CartPage/>,
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
