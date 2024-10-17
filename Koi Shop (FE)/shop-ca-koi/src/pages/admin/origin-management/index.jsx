import { Form, Input, Modal, Table, Button } from "antd";
import Dashboard from "../../../components/dashboard";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useSelector } from "react-redux";

function Origin() {
  const [dataSource, setDatasource] = useState([]); // State lưu trữ danh sách Origin
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.user);

  // Hàm để thêm một origin mới
  async function fetchOrigin(data) {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/origin", // Thay đổi endpoint nếu cần
        data,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Cập nhật lại dataSource với origin mới
      setDatasource([...dataSource, response.data]);
      loadOriginList(); // Tải lại danh sách sau khi thêm thành công
    } catch (error) {
      console.error("Error adding origin:", error);
    }
  }

  // Hàm để tải danh sách các origin
  async function loadOriginList() {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/origin/list", // Sử dụng endpoint bạn cung cấp
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Cập nhật state với dữ liệu nhận được từ server
      setDatasource(response.data);
    } catch (error) {
      console.error("Error fetching origin list:", error);
    }
  }

  // Hàm để xóa một origin
  async function deleteOrigin(id) {
    try {
      await axios.delete(`http://localhost:8080/api/origin/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // Sau khi xóa, cập nhật lại danh sách
      setDatasource(dataSource.filter((origin) => origin.originID !== id));
    } catch (error) {
      console.error("Error deleting origin:", error);
    }
  }

  // Gọi loadOriginList khi component được tải lần đầu
  useEffect(() => {
    loadOriginList(); // Chỉ gọi một lần khi component mount
  }, []);

  const handleHideModel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (values) => {
    fetchOrigin(values); // Thêm origin mới
    form.resetFields();
    handleHideModel();
  };

  const columns = [
    {
      title: "Origin ID",
      dataIndex: "originID",
      key: "originID",
    },
    {
      title: "Origin Name",
      dataIndex: "originName",
      key: "originName",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          {/* Nút xóa */}
          <Button
            type="primary"
            danger
            onClick={() => deleteOrigin(record.originID)}
            style={{ marginRight: 8 }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // Hiển thị modal thêm origin mới
  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Submit form thêm origin mới
  function handleOk() {
    form.submit();
  }

  return (
    <div>
      <Dashboard>
        <div>
          <Button type="primary" onClick={handleShowModal}>
            Add New Origin
          </Button>
        </div>
        <Table dataSource={dataSource} columns={columns} />{" "}
        {/* Hiển thị danh sách origin */}
        <Modal
          title={<div style={{ textAlign: "center" }}>Add New Origin</div>}
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
              label="Origin Name"
              name="originName"
              rules={[{ required: true, message: "Please input origin name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: "Please input type!" }]}
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
          </Form>
        </Modal>
      </Dashboard>
    </div>
  );
}

export default Origin;
