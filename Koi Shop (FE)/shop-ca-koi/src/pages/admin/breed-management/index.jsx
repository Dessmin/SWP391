import { Form, Input, Modal, Table, Button } from "antd";
import Dashboard from "../../../components/dashboard";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useSelector } from "react-redux";

function Breed() {
  const [dataSource, setDatasource] = useState([]); // State lưu trữ danh sách Breed
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // State cho modal chi tiết
  const [currentBreed, setCurrentBreed] = useState(null); // State để lưu breed hiện tại đang được xem chi tiết
  const user = useSelector((state) => state.user);

  // Hàm để thêm một breed mới
  async function fetchBreed(data) {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/breeds/add-breed", // Thay đổi endpoint nếu cần
        data,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Cập nhật lại dataSource với breed mới
      setDatasource([...dataSource, response.data]);
      loadBreedList(); // Tải lại danh sách sau khi thêm thành công
    } catch (error) {
      console.error("Error adding breed:", error);
    }
  }

  // Hàm để tải danh sách các breed
  async function loadBreedList() {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/breeds/list-breeds", // Sử dụng endpoint bạn cung cấp
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Cập nhật state với dữ liệu nhận được từ server
      setDatasource(response.data);
    } catch (error) {
      console.error("Error fetching breed list:", error);
    }
  }

  // Hàm để xóa một breed
  async function deleteBreed(id) {
    try {
      await axios.delete(`http://localhost:8080/api/breeds/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // Sau khi xóa, cập nhật lại danh sách
      setDatasource(dataSource.filter((breed) => breed.breedID !== id));
    } catch (error) {
      console.error("Error deleting breed:", error);
    }
  }

  // Gọi loadBreedList khi component được tải lần đầu
  useEffect(() => {
    loadBreedList(); // Chỉ gọi một lần khi component mount
  }, []);

  const handleHideModel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (values) => {
    fetchBreed(values); // Thêm breed mới
    form.resetFields();
    handleHideModel();
  };

  const columns = [
    {
      title: "Breed ID",
      dataIndex: "breedID",
      key: "breedID",
    },
    {
      title: "Breed Name",
      dataIndex: "breedName",
      key: "breedName",
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
          {/* Nút chi tiết */}
          <Button
            type="primary"
            onClick={() => {
              setCurrentBreed(record); // Lưu breed hiện tại
              setIsDetailModalOpen(true); // Mở modal chi tiết
            }}
            style={{ marginRight: 8 }}
          >
            Detail
          </Button>
          {/* Nút xóa */}
          <Button
            type="primary"
            danger
            onClick={() => deleteBreed(record.breedID)}
            style={{ marginRight: 8 }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // Hiển thị modal thêm breed mới
  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsDetailModalOpen(false); // Đóng modal chi tiết
    setCurrentBreed(null); // Đặt lại breed hiện tại
  };

  // Submit form thêm breed mới
  function handleOk() {
    form.submit();
  }

  return (
    <div>
      <Dashboard>
        <div>
          <Button type="primary" onClick={handleShowModal}>
            Add New Breed
          </Button>
        </div>
        <Table dataSource={dataSource} columns={columns} />{" "}
        {/* Hiển thị danh sách breed */}
        <Modal
          title={<div style={{ textAlign: "center" }}>Add New Breed</div>}
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
              label="Breed Name"
              name="breedName"
              rules={[{ required: true, message: "Please input breed name!" }]}
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
        {/* Modal chi tiết breed */}
        <Modal
          title={<div style={{ textAlign: "center" }}>Breed Details</div>}
          open={isDetailModalOpen}
          onOk={handleCancel}
          onCancel={handleCancel}
        >
          {currentBreed && (
            <div>
              <p>
                <strong>Breed ID:</strong> {currentBreed.breedID}
              </p>
              <p>
                <strong>Breed Name:</strong> {currentBreed.breedName}
              </p>
              <p>
                <strong>Description:</strong> {currentBreed.description}
              </p>
            </div>
          )}
        </Modal>
      </Dashboard>
    </div>
  );
}

export default Breed;
