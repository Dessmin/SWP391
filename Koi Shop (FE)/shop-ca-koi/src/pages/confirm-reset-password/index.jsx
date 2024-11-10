import { toast } from 'react-toastify';
import Header from '../../components/header(def)'
import { Button, Form, Input } from 'antd'
import { useLocation } from 'react-router-dom';
import api from '../../config/api';

function ConfirmResetPassword() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token'); 

    const handleConfirmReset = async (values) => {
        try {
          const response = await api.post(
            "user/reset-password-email", 
            values,
            {
              headers: {
                Authorization: `Bearer ${token}`, 
              },
            }
          );
          toast.success(response.data);
        } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      };

  return (
    <div className="login-page">
      <Header />
      <div className="login-form">
        <h1>Mật khẩu mới</h1>
        <Form
          onFinish={handleConfirmReset}
          labelCol={{
            span: 24,
          }}
        >
          

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
            Xác nhận mật khẩu mới
          </Button>
          
        </Form>
        
      </div>
    </div>
  )
}

export default ConfirmResetPassword