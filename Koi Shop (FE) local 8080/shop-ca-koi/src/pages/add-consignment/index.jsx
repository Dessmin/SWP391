import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import apiKoi from "../../config/koi-api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import axios from "axios";


function AddConsignment() {
  const [koisId, setKoisId] = useState(""); // Thay đổi tên biến để phản ánh rằng nó chứa ID
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [breeds, setBreeds] = useState([]); // State để lưu danh sách breed
  const [origins, setOrigins] = useState([]);


  const handleAddConsignment = async (values) => {
    try {
      const response = await apiKoi.post("fish-consign", values, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Gửi token trong header
        },
      });
      setKoisId(response.data); // Giả định rằng API trả về id
      toast.success("Add successfully!");


      // Điều hướng đến đường dẫn với ID
      navigate(`/confirm/${response.data}`);
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  const fetchBreeds = async () => {
    try {
      const response = await apiKoi.get(
        "http://localhost:8080/api/breeds/list-breedName",
        {
          // Giả sử API lấy danh sách breed là /breeds
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setBreeds(response.data); // Giả sử response.data là mảng danh sách breed
    } catch (e) {
      console.log(e);
    }
  };


  const fetchOrigins = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/origin/list-originName",
        {
          // Giả sử API lấy danh sách breed là /origin
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setOrigins(response.data); // Giả sử response.data là mảng danh sách origin
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchBreeds();
    fetchOrigins();
  }, []);


  return (
    <div className="background">
      <div className="add-consignment">
        <h1>Đăng ký ký gửi</h1>
        <div className="Consign-form">
          <Form
            onFinish={handleAddConsignment}
            labelCol={{
              span: 24,
            }}
          >
            {/* Fish Name */}
            <Form.Item
              label="Fish Name"
              name="fishName"
              rules={[
                {
                  required: true,
                  message: "Please enter the fish name",
                },
              ]}
            >
              <Input placeholder="Enter the fish name" />
            </Form.Item>


            {/* Description */}
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please enter a description",
                },
              ]}
            >
              <Input.TextArea placeholder="Enter a description" />
            </Form.Item>


            {/* Gender */}
            <Form.Item
              label="Gender"
              name="gender"
              rules={[
                {
                  required: true,
                  message: "Please select the gender",
                },
              ]}
            >
              <Select placeholder="Select gender">
                <Select.Option value={true}>Male</Select.Option>
                <Select.Option value={false}>Female</Select.Option>
              </Select>
            </Form.Item>


            {/* Birth Date */}
            <Form.Item
              label="Birth Date"
              name="birthDate"
              rules={[
                {
                  required: true,
                  message: "Please enter the birth date",
                },
              ]}
            >
              <DatePicker placeholder="Select birth date" />
            </Form.Item>


            {/* Diet */}
            <Form.Item
              label="Diet"
              name="diet"
              rules={[
                {
                  required: true,
                  message: "Please enter the diet",
                },
              ]}
            >
              <Input placeholder="Enter the diet" />
            </Form.Item>


            {/* Size */}
            <Form.Item
              label="Size"
              name="size"
              rules={[
                {
                  required: true,
                  message: "Please enter the size",
                },
              ]}
            >
              <InputNumber min={1} placeholder="Enter the size" />
            </Form.Item>


            {/* Breed */}
            <Form.Item
              label="Breed"
              name="breed"
              rules={[{ required: true, message: "Please select breed!" }]}
            >
              <Select placeholder="Select Breed">
                {breeds.map((breed) => (
                  <Select.Option key={breed} value={breed}>
                    {breed}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>


            {/* Origin */}
            <Form.Item
              label="Origin"
              name="origin"
              rules={[{ required: true, message: "Please select origin!" }]}
            >
              <Select placeholder="Select Origin">
                {origins.map((origin) => (
                  <Select.Option key={origin} value={origin}>
                    {origin}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>


            {/* Food */}
            <Form.Item
              label="Food"
              name="food"
              rules={[
                {
                  required: true,
                  message: "Please enter the food",
                },
              ]}
            >
              <Input placeholder="Enter the food" />
            </Form.Item>


            {/* Screening Rate */}
            <Form.Item
              label="Screening Rate"
              name="screeningRate"
              rules={[
                {
                  required: true,
                  message: "Please enter the screening rate",
                },
              ]}
            >
              <Input placeholder="Enter the screening rate" />
            </Form.Item>


            {/* Image URL */}
            <Form.Item
              label="Image URL"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Please enter the image URL",
                },
              ]}
            >
              <Input placeholder="Enter the image URL" />
            </Form.Item>


            {/* Submit Button */}
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}


export default AddConsignment;