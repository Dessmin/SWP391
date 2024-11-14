import { Button, Card, Descriptions, Form, Input, Modal, message } from "antd";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function BreedDetail() {
  const [breed, setBreed] = useState(null); // State để lưu thông tin chi tiết của breed
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { breedName } = useParams(); // Lấy breedName từ URL params
  const user = useSelector((state) => state.user); // Lấy thông tin người dùng từ Redux
  const navigate = useNavigate(); // Hook để điều hướng giữa các trang

  // Fetch thông tin breed khi component được tải
  useEffect(() => {
    async function fetchBreedDetails() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/breeds/${breedName}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setBreed(response.data);
      } catch (error) {
        console.error("Error fetching breed details:", error);
      }
    }
    fetchBreedDetails();
  }, [breedName, user.token]);

  // Mở và đóng modal chỉnh sửa
  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
    form.setFieldsValue(breed); // Thiết lập giá trị của form với breed hiện tại
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  // Xử lý gửi form để cập nhật thông tin breed
  const handleUpdate = async (values) => {
    try {
      await axios.put(
        `http://localhost:8080/api/breeds/${breedName}/update`, // Cập nhật URL API
        values,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Cập nhật breed details trong state sau khi cập nhật thành công
      setBreed({ ...breed, ...values });
      setIsEditModalOpen(false);
      message.success("Breed updated successfully!");
    } catch (error) {
      message.error("Failed to update breed.");
      console.error("Error updating breed:", error);
    }
  };

  return (
    <div>
      {breed && (
        <Card
          title={
            <div style={{ textAlign: "center" }}>
              {`Details of ${breed.breedName}`}
            </div>
          }
        >
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Breed ID">
              {breed.breedID}
            </Descriptions.Item>
            <Descriptions.Item label="Breed Name">
              {breed.breedName}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {breed.description}
            </Descriptions.Item>
          </Descriptions>

          <div style={{ marginTop: 20 }}>
            <Button
              type="primary"
              onClick={() => navigate("/home/dashboard/breeds")} // Quay lại trang danh sách breed
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

          {/* Modal chỉnh sửa thông tin breed */}
          <Modal
            title="Edit Breed Details"
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
                label="Breed Name"
                name="breedName"
                rules={[
                  { required: true, message: "Please input breed name!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please input description!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      )}
    </div>
  );
}

export default BreedDetail;
