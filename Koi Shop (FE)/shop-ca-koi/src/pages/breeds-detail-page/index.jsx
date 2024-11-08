import { Button, Card, Descriptions, Form, Input, Modal, message } from "antd";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function BreedDetail() {
  const [breed, setBreed] = useState(null); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { breedName } = useParams(); 
  const user = useSelector((state) => state.user); 
  const navigate = useNavigate(); 

  
  useEffect(() => {
    async function fetchBreedDetails() {
      try {
        const response = await axios.get(
          `http://14.225.210.143:8080/api/breeds/${breedName}`,
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
    form.setFieldsValue(breed); 
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  // Xử lý gửi form để cập nhật thông tin breed
  const handleUpdate = async (values) => {
    try {
      await axios.put(
        `http://14.225.210.143:8080/api/breeds/${breedName}/update`, 
        values,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      
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
              onClick={() => navigate("/home/dashboard/breeds")} 
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
