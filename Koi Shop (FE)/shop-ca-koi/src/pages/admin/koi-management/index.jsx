import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Table,
  Button,
} from "antd";
import Dashboard from "../../../components/dashboard";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Koi() {
  const [dataSource, setDatasource] = useState([]); // State lưu trữ danh sách Koi
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.user);

  // Hàm để thêm một con cá Koi mới
  async function fetchKoi(data) {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/koi-fishes/add",
        data,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Cập nhật lại dataSource với con cá mới
      setDatasource([...dataSource, response.data]);
      loadKoiList();
    } catch (error) {
      console.error("Error adding koi fish:", error);
    }
  }

  // Hàm để tải danh sách các con cá Koi
  async function loadKoiList() {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/koi-fishes/listfish",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Cập nhật state với dữ liệu nhận được từ server
      setDatasource(response.data);
    } catch (error) {
      console.error("Error fetching koi list:", error);
    }
  }

  // Hàm để xóa một con cá Koi
  async function deleteKoi(id) {
    try {
      await axios.delete(`http://localhost:8080/api/koi-fishes/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // Sau khi xóa, cập nhật lại danh sách
      setDatasource(dataSource.filter((koi) => koi.id !== id));
    } catch (error) {
      console.error("Error deleting koi fish:", error);
    }
  }

  // Hàm để lấy chi tiết một con cá Koi
  async function getKoiDetail(id) {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/koi-fishes/koiFish/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("Koi Detail:", response.data); // In chi tiết con cá ra console (bạn có thể hiển thị modal với dữ liệu này nếu muốn)
    } catch (error) {
      console.error("Error fetching koi detail:", error);
    }
  }

  // Gọi loadKoiList khi component được tải lần đầu
  useEffect(() => {
    loadKoiList();
  }, []); // Chỉ gọi một lần khi component mount

  const handleHideModel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (values) => {
    fetchKoi(values); // Thêm cá mới
    form.resetFields();
    handleHideModel();
  };

  const columns = [
    {
      title: "Fish Name:",
      dataIndex: "fishName",
      key: "fishName",
    },
    {
      title: "Breed",
      dataIndex: "breed",
      key: "breed",
    },
    {
      title: "Origin",
      dataIndex: "origin",
      key: "origin",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} width={150} alt="Koi fish" />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          {/* Nút chi tiết */}
          <Link to={`/home/dashboard/koi/koidetail/${record.id}`}>
            <Button type="default">Detail</Button>
          </Link>

          {/* Nút xóa */}
          <Button
            type="primary"
            danger
            onClick={() => deleteKoi(record.id)}
            style={{ marginRight: 8 }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // Hiển thị modal thêm cá mới
  const handleshowModal = () => {
    setIsModalOpen(true);
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Submit form thêm cá mới
  function handleOk() {
    form.submit();
  }

  return (
    <div>
      <Dashboard>
        <div>
          <Button type="primary" onClick={handleshowModal}>
            Add new koi
          </Button>
        </div>
        <Table dataSource={dataSource} columns={columns} />{" "}
        {/* Hiển thị danh sách cá Koi */}
        <Modal
          title={<div style={{ textAlign: "center" }}>Add New Koi</div>}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            form={form}
            onFinish={handleSubmit}
            labelCol={{
              span: 24,
            }}
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
              rules={[{ required: true, message: "Please input description!" }]}
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
              rules={[{ required: true, message: "Please select birth date!" }]}
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
              label="Hình ảnh"
              name="image" // Phải khớp với dataIndex trong bảng
              rules={[
                { required: true, message: "Vui lòng nhập URL hình ảnh" },
              ]}
            >
              <Input placeholder="Nhập URL hình ảnh" />
            </Form.Item>
          </Form>
        </Modal>
      </Dashboard>
    </div>
  );
}

export default Koi;
