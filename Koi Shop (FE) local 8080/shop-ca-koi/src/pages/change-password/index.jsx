import { Button, Form, Input } from "antd";
import HeaderLoged from "../../components/header(loged)";
import api from "../../config/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function ChangePassword() {
  const user = useSelector((state) => state.user);

  const handleChange = async (values) => {
    try {
      const oldPassword = values.oldPassword; // Lấy giá trị của oldPassword từ form
      const newPassword = { password: values.password }; // Tạo object chứa mật khẩu mới

      // Gọi API với oldPassword dưới dạng query parameter
      const response = await api.put(
        `user/reset-password?oldPassword=${oldPassword}`,
        newPassword,
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Gửi token trong header
          },
        }
      );

      toast.success("Đổi mật khẩu thành công");
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi đổi mật khẩu");
    }
  };

  return (
    <div className="login-page">
      <HeaderLoged />
      <div className="login-form">
        <h1>Đổi mật khẩu</h1>
        <Form
          onFinish={handleChange}
          labelCol={{
            span: 24,
          }}
        >
          <Form.Item
            name="oldPassword"
            label="Mật khẩu cũ"
            rules={[
              {
                required: true,
                message: "Nhập mật khẩu cũ",
              },
            ]}
          >
            <Input placeholder="Nhập mật khẩu cũ" style={{ width: "500px" }} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu mới"
            rules={[
              {
                required: true,
                message: "Nhập mật khẩu mới",
              },
            ]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu mới"
              style={{ width: "500px" }}
            />
          </Form.Item>

          <Button style={{ width: "500px" }} type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ChangePassword;
