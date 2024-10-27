import { Button, Form, Input } from "antd"
import Header from "../../components/header(def)"
import api from "../../config/api";
import { toast } from "react-toastify";

function ResetPassword() {

    const handleReset = async (values) => {
        try {
          const response = await api.post("user/forgot-password", values);
          toast.success("Hãy kiểm tra hộp thư email");
        } catch (error) {
          console.log(error);
          toast.error(error);
    
        }
      }

  return (
    <div className="login-page">
      <Header />
      <div className="login-form">
        <h1>Nhập email mà bạn đã đăng ký</h1>
        <Form
          onFinish={handleReset}
          labelCol={{
            span: 24,
          }}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
            ]}
          >
            <Input placeholder="Enter your email" style={{ width: "500px" }} />
          </Form.Item>

          <Button style={{ width: "500px" }} type="primary" htmlType="submit">
            Xác nhận
          </Button>
          
        </Form>
        
      </div>
    </div>
  )
}

export default ResetPassword