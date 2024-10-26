import { Button, Descriptions, Form, Input, message, Modal, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./index.scss";

function DetailUser() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [form] = Form.useForm();

  
  const fetchUserById = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/${id}/detail`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setUserDetails(response.data);
      setLoading(false); 
    } catch (error) {
      console.log(error.toString());
      setLoading(false); 
    }
  };

  
  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    form.resetFields();
  };

  
  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
    form.setFieldsValue({
      ...userDetails,
    });
  };

  
  const handleUpdate = async (values) => {
    setLoading(true); 
    try {
      // Gửi yêu cầu update
      const response = await axios.put(
        `http://localhost:8080/api/user/${id}/customer-update`,
        {
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        ...values,
      }));

      setIsEditModalOpen(false); 
      message.success("User updated successfully!");
    } catch (error) {
      message.error("Failed to update user.");
      console.error("Error updating user:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserById(id);
    }
  }, [id]);

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  return (
    <div className="user-detail">
      <h1>Welcome, {userDetails?.userName}</h1>
      {userDetails && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="User Name">
            {userDetails.userName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {userDetails.email}
          </Descriptions.Item>
          <Descriptions.Item label="Phone">
            {userDetails.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Balance">
            {userDetails.pointsBalance}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {userDetails.address}
          </Descriptions.Item>
        </Descriptions>
      )}
      <div className="action">
        <Link className="link" to="/orderHistory">
          <Button>Lịch sử mua hàng</Button>
        </Link>
        <Button
          type="default"
          style={{ marginLeft: 8 }}
          onClick={handleEditModalOpen}
        >
          Update
        </Button>
        <Button
          className="bttnn"
          type="primary"
          onClick={() => navigate("/home")}
        >
          Trang chủ
        </Button>

        <Button onClick={() => navigate("/changePassword")} type="primary">Đổi mật khẩu</Button>
      </div>

      <Modal
        title="Edit User Details"
        open={isEditModalOpen}
        onOk={form.submit}
        onCancel={handleEditModalClose}
      >
        <Form
          form={form}
          onFinish={handleUpdate}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item
            label="User Name"
            name="userName"
            rules={[{ required: true, message: "Please input user name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input email!" }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: "Please input phone number!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input address!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default DetailUser;
