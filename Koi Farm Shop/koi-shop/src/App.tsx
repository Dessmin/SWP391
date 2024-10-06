import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/home(def)";
import Login from "./pages/login";
import Register from "./pages/register";
import HomeLoged from "./pages/home(loged)";

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
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App