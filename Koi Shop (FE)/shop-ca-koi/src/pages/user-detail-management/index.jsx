import {
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  Modal,
  Select,
  DatePicker,
  message,
  InputNumber,
} from "antd";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";

const { Option } = Select;

function UserDetail() {
  const [userDetails, setUserDetails] = useState(null); // State để lưu chi tiết người dùng
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State để điều khiển mở Modal
  const { id } = useParams(); // Lấy ID người dùng từ URL
  const user = useSelector((state) => state.user); // Lấy thông tin user từ Redux
  const navigate = useNavigate(); // Hook để điều hướng giữa các trang
  const [form] = Form.useForm(); // Ant Design form instance

  // Lấy thông tin chi tiết người dùng khi component được tải
  useEffect(() => {
    async function fetchUserDetails() {
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
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
    fetchUserDetails();
  }, [id, user.token]);

  // Hàm mở Modal và thiết lập giá trị của form
  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
    form.setFieldsValue({
      ...userDetails,
      joinDate: moment(userDetails.joinDate), // Chuyển đổi joinDate thành moment cho DatePicker
    });
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  // Hàm xử lý cập nhật thông tin người dùng
  const handleUpdate = async (values) => {
    try {
      await axios.put(
        `http://localhost:8080/api/user/${id}/update`,
        {
          ...values,
          joinDate: values.joinDate ? values.joinDate.toISOString() : null, // Chuyển đổi joinDate thành chuỗi ISO
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Cập nhật lại thông tin user sau khi update
      setUserDetails({ ...userDetails, ...values });
      setIsEditModalOpen(false);
      message.success("User updated successfully!");
    } catch (error) {
      message.error("Failed to update user.");
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      {userDetails && (
        <Card
          title={
            <div style={{ textAlign: "center" }}>
              {`Details of ${userDetails.userName}`}
            </div>
          }
        >
          <Descriptions bordered column={1}>
            <Descriptions.Item label="User Name">
              {userDetails.userName}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {userDetails.email}
            </Descriptions.Item>
            <Descriptions.Item label="Phone Number">
              {userDetails.phoneNumber}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {userDetails.address}
            </Descriptions.Item>
            <Descriptions.Item label="Points Balance">
              {userDetails.pointsBalance}
            </Descriptions.Item>
            <Descriptions.Item label="Join Date">
              {moment(userDetails.joinDate).format("YYYY-MM-DD")}
            </Descriptions.Item>
            <Descriptions.Item label="Role">
              {userDetails.role}
            </Descriptions.Item>
          </Descriptions>

          <div style={{ marginTop: 20 }}>
            <Button
              type="primary"
              onClick={() => navigate("/home/dashboard/user")}
            >
              Back
            </Button>
            <Button
              type="default"
              style={{ marginLeft: 8 }}
              onClick={handleEditModalOpen}
            >
              Update
            </Button>
          </div>

          {/* Edit User Modal */}
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
                rules={[
                  { required: true, message: "Please input phone number!" },
                ]}
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

              <Form.Item
                label="Points Balance"
                name="pointsBalance"
                initialValue={0} // Giá trị mặc định là 0
              >
                <InputNumber min={0} />
              </Form.Item>

              <Form.Item
                label="Join Date"
                name="joinDate"
                rules={[
                  { required: true, message: "Please select join date!" },
                ]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: "Please select role!" }]}
              >
                <Select>
                  <Option value="Manager">Manager</Option>
                  <Option value="Customer">Customer</Option>
                  <Option value="Staff">Staff</Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      )}
    </div>
  );
}

export default UserDetail;
