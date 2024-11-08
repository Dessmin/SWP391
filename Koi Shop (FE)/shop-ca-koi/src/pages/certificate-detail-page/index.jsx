import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Input, message } from "antd"; 
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Certificate() {
  const [dataSource, setDataSource] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user);
  const { koiId } = useParams(); 

  
  async function listCertificates() {
    try {
      const response = await axios.get(
        `http://14.225.210.143:8080/api/certificates/${koiId}/fish-certificate`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setDataSource(response.data); 
    } catch (error) {
      console.error("Error fetching certificates list:", error);
    }
  }

  // Hàm để thêm một chứng chỉ mới
  async function addCertificate(values) {
    if (!values.image) {
      console.error("Image URL is required.");
      return; 
    }

    try {
      const response = await axios.post(
        `http://14.225.210.143:8080/api/certificates/${koiId}/add-certificate`,
        { image: values.image }, 
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setDataSource((prevData) => [...prevData, response.data]); 
      message.success("Added new certificate successfully");
    } catch (error) {
      console.error("Error adding certificate:", error.response || error);
      if (error.response) {
        console.error("Response data:", error.response.data); 
      }
    }
  }

  
  async function deleteCertificate(id) {
    try {
      await axios.delete(`http://14.225.210.143:8080/api/certificates/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      
      setDataSource((prevData) =>
        prevData.filter((certificate) => certificate.certificateID !== id)
      );
      message.success("Deleted certificate successfully"); 
    } catch (error) {
      console.error("Error deleting certificate:", error);
      message.error("Failed to delete certificate");
    }
  }

  
  useEffect(() => {
    listCertificates();
  }, []); 

  
  const handleSubmit = (values) => {
    console.log("Image URL: ", values.image); 
    addCertificate(values);
  };

  
  const showAddCertificateModal = () => {
    setIsModalOpen(true);
  };

  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  
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
