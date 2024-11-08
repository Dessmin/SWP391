import {
  Avatar,
  Button,
  Col,
  Descriptions,
  Form,
  Input,
  message,
  Modal,
  Row,
  Spin,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./index.scss";
import { ClockCircleOutlined, EditOutlined } from "@ant-design/icons";

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
        `http://14.225.210.143:8080/api/user/${id}/detail`,
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
        `http://14.225.210.143:8080/api/user/${id}/customer-update`,
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
      <h1>Hồ sơ của {userDetails?.userName}</h1>
      <div className="user-info">
        

        <Row >
          <Col className="table-user" span={16}>
            {userDetails && (
              <Descriptions className="tble"  bordered column={1}>
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
                <Descriptions.Item label="Chỉnh sửa">
                  <div className="action1">
                    <Button type="primary" onClick={handleEditModalOpen}>
                      Update <EditOutlined />
                    </Button>

                    <Button
                      onClick={() => navigate("/changePassword")}
                      type="primary"
                    >
                      Đổi mật khẩu <EditOutlined />
                    </Button>
                  </div>
                </Descriptions.Item>
                {/* <Descriptions.Item label="Lịch sử mua hàng">
                  <Link className="link" to="/orderHistory">
                    <Button>
                      Lịch sử mua hàng <ClockCircleOutlined />
                    </Button>
                  </Link>
                </Descriptions.Item> */}
              </Descriptions>
            )}
          </Col>
          <Col className="img-cnt" span={8}>
            <img className="profile-img"
              height={200}
              width={200}
              src="https://i.pinimg.com/736x/da/0d/69/da0d698073a0074d641c8ab579188904.jpg"
              alt=""
            />
          </Col>
        </Row>

        
      </div>
      <Button
          style={{ width: 200 }}
          className="bttnn"
          type="primary"
          onClick={() => navigate("/home")}
        >
          Trang chủ
        </Button>

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
