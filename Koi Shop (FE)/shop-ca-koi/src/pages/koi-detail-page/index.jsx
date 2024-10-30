import {
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  DatePicker,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";

function KoiDetail() {
  const [koi, setKoi] = useState(null); // State to store Koi details
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { koiID } = useParams(); // Get koiID from URL params
  const user = useSelector((state) => state.user); // Get user from Redux
  const navigate = useNavigate(); // Hook to navigate between pages

  // Fetch Koi details when component loads
  useEffect(() => {
    async function fetchKoiDetails() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/koi-fishes/koiFish/${koiID}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setKoi(response.data);
      } catch (error) {
        console.error("Error fetching koi details:", error);
      }
    }
    fetchKoiDetails();
  }, [koiID, user.token]);

  // Handle opening and closing the edit modal
  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
    form.setFieldsValue({
      ...koi,
      birthDate: moment(koi.birthDate), // Convert birthDate to moment for DatePicker
    });
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  // Handle form submission to update Koi details
  const handleUpdate = async (values) => {
    try {
      await axios.put(
        `http://localhost:8080/api/koi-fishes/${koiID}/update`, // Cập nhật URL API
        {
          ...values,
          birthDate: values.birthDate ? values.birthDate.toISOString() : null, // Đảm bảo giá trị birthDate là chuỗi ISO
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Update koi details in state after successful update
      setKoi({ ...koi, ...values });
      setIsEditModalOpen(false);
      message.success("Koi Fish updated successfully!");
    } catch (error) {
      message.error("Failed to update user.");
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      {koi && (
        <Card
          title={
            <div style={{ textAlign: "center" }}>
              {`Details of ${koi.fishName}`}
            </div>
          }
        >
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Fish Name">
              {koi.fishName}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {koi.description}
            </Descriptions.Item>
            <Descriptions.Item label="Breed">{koi.breed}</Descriptions.Item>
            <Descriptions.Item label="Origin">{koi.origin}</Descriptions.Item>
            <Descriptions.Item label="Gender">
              {koi.gender ? "Male" : "Female"}
            </Descriptions.Item>
            <Descriptions.Item label="Birth Date">
              {moment(koi.birthDate).format("YYYY-MM-DD")}
            </Descriptions.Item>
            <Descriptions.Item label="Diet">{koi.diet}</Descriptions.Item>
            <Descriptions.Item label="Size">{koi.size} cm</Descriptions.Item>
            <Descriptions.Item label="Price">${koi.price}</Descriptions.Item>
            <Descriptions.Item label="Food">{koi.food}</Descriptions.Item>
            <Descriptions.Item label="Screening Rate">
              {koi.screeningRate}
            </Descriptions.Item>
            <Descriptions.Item label="Image">
              <img
                src={koi.image}
                alt={koi.fishName}
                style={{ width: "200px" }}
              />
            </Descriptions.Item>
          </Descriptions>

          <div style={{ marginTop: 20 }}>
            <Button
              type="primary"
              onClick={() => navigate("/home/dashboard/koi")}
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

          {/* Edit Koi Modal */}
          <Modal
            title="Edit Koi Details"
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
                label="Fish Name"
                name="fishName"
                rules={[{ required: true, message: "Please input fish name!" }]}
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

              <Form.Item
                label="Breed"
                name="breed"
                rules={[{ required: true, message: "Please input breed!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Origin"
                name="origin"
                rules={[{ required: true, message: "Please input origin!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={true}>Male</Radio>
                  <Radio value={false}>Female</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label="Birth Date"
                name="birthDate"
                rules={[
                  { required: true, message: "Please select birth date!" },
                ]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                label="Diet"
                name="diet"
                rules={[{ required: true, message: "Please input diet!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Size"
                name="size"
                rules={[{ required: true, message: "Please input size!" }]}
              >
                <InputNumber min={0} />
              </Form.Item>

              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please input price!" }]}
              >
                <InputNumber min={0} />
              </Form.Item>

              <Form.Item
                label="Food"
                name="food"
                rules={[{ required: true, message: "Please input food type!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Screening Rate"
                name="screeningRate"
                rules={[
                  { required: true, message: "Please input screening rate!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Image"
                name="image"
                rules={[{ required: true, message: "Please input image URL!" }]}
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

export default KoiDetail;
