import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Input, message } from "antd"; // Import thêm message
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Certificate() {
  const [dataSource, setDataSource] = useState([]); // State lưu trữ danh sách chứng chỉ
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal để thêm chứng chỉ
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user);
  const { koiId } = useParams(); // Lấy id của cá koi từ URL

  // Hàm để tải danh sách chứng chỉ của một cá koi
  async function listCertificates() {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/certificates/${koiId}/fish-certificate`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setDataSource(response.data); // Cập nhật danh sách chứng chỉ
    } catch (error) {
      console.error("Error fetching certificates list:", error);
    }
  }

  // Hàm để thêm một chứng chỉ mới
  async function addCertificate(values) {
    if (!values.image) {
      console.error("Image URL is required.");
      return; // Dừng lại nếu image bị trống
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/certificates/${koiId}/add-certificate`,
        { image: values.image }, // Đảm bảo image được truyền đúng
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setDataSource((prevData) => [...prevData, response.data]); // Cập nhật danh sách chứng chỉ
      message.success("Added new certificate successfully");
    } catch (error) {
      console.error("Error adding certificate:", error.response || error);
      if (error.response) {
        console.error("Response data:", error.response.data); // Xem chi tiết lỗi từ API
      }
    }
  }

  // Hàm để xóa một chứng chỉ
  async function deleteCertificate(id) {
    try {
      await axios.delete(`http://localhost:8080/api/certificates/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // Cập nhật lại danh sách sau khi xóa
      setDataSource((prevData) =>
        prevData.filter((certificate) => certificate.certificateID !== id)
      );
      message.success("Deleted certificate successfully"); // Hiển thị thông báo khi xóa thành công
    } catch (error) {
      console.error("Error deleting certificate:", error);
      message.error("Failed to delete certificate");
    }
  }

  // Gọi listCertificates khi component được mount
  useEffect(() => {
    listCertificates();
  }, []); // Chỉ gọi một lần khi component mount

  // Xử lý khi nhấn nút "Add New Certificate"
  const handleSubmit = (values) => {
    console.log("Image URL: ", values.image); // Kiểm tra xem giá trị image có tồn tại không
    addCertificate(values);
  };

  // Hiển thị modal thêm chứng chỉ
  const showAddCertificateModal = () => {
    setIsModalOpen(true);
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Các cột của bảng chứng chỉ
  const columns = [
    {
      title: "ID",
      dataIndex: "certificateID",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="Koi fish certificate" width={150} />
      ),
    },

    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button
          type="primary"
          danger
          onClick={() => deleteCertificate(record.certificateID)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1>Certificate Management</h1>
      <Button type="primary" onClick={showAddCertificateModal}>
        Add New Certificate
      </Button>
      <Table dataSource={dataSource} columns={columns} rowKey="certificateID" />

      {/* Modal thêm chứng chỉ */}
      <Modal
        title="Add New Certificate"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Image URL"
            name="image"
            rules={[{ required: true, message: "Please enter image URL!" }]}
          >
            <Input placeholder="Enter image URL" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Certificate;
