import { Button, Form, Input } from "antd";
import "./index.scss";

import { Link, useNavigate } from "react-router-dom";
import api from "../../config/api";
import { toast } from "react-toastify";
import Header from "../../components/header(def)";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";

function Login() {
  

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    try {
      const response = await api.post("user/login", values);
      toast.success("Login successfully");
      dispatch(login(response.data));
      sessionStorage.setItem("user", JSON.stringify(response.data));
      navigate("/home");
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  return (
    <div className="login-page">
      <Header />
      <div className="login-form">
        <h1>Đăng nhập</h1>
        <Form
          onFinish={handleLogin}
          labelCol={{
            span: 24,
          }}
        >
          <Form.Item
            name="username"
            label="User name"
            rules={[
              {
                required: true,
                message: "Please enter your user name",
              },
            ]}
          >
            <Input placeholder="Enter user name" style={{ width: "500px" }} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter password"
              style={{ width: "500px" }}
            />
          </Form.Item>

          <Button className="btn" style={{ width: "500px" }} type="primary" htmlType="submit">
            Log in
          </Button>
          
        </Form>
        <Link className="link" to="/resetPassword">Quên mật khẩu?</Link>
      </div>
    </div>
  );
}

export default Login;
