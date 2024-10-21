import { Button, Form, Input } from "antd";
import "./index.scss";

import { useNavigate } from "react-router-dom";
import api from "../../config/api";
import { toast } from "react-toastify";
import Header from "../../components/header(def)";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "../../config/firebase";
function Login() {
  // const handleLoginGoogle = () => {
  //   signInWithPopup(auth, googleProvider)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       console.log(credential);
  //       sessionStorage.setItem(
  //         "googleUser",
  //         JSON.stringify(credential.idToken)
  //       );
  //       navigate("/home");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

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

          <Button style={{ width: "500px" }} type="primary" htmlType="submit">
            Log in
          </Button>
          {/* <Button onClick={handleLoginGoogle} className="login-google">
            <img
              width={25}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
              alt=""
            />
            <span>Login with Google</span>
          </Button> */}
        </Form>
      </div>
    </div>
  );
}

export default Login;
