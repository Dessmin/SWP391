import { Form, Input, Modal, Table, Button } from "antd";
import Dashboard from "../../../components/dashboard";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useSelector } from "react-redux";

function Breed() {
  const [dataSource, setDatasource] = useState([]); 
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); 
  const [currentBreed, setCurrentBreed] = useState(null); 
  const user = useSelector((state) => state.user);

  
  async function fetchBreed(data) {
    try {
      const response = await axios.post(
        "http://14.225.210.143:8080/api/breeds/add-breed", 
        data,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      
      setDatasource([...dataSource, response.data]);
      loadBreedList(); 
    } catch (error) {
      console.error("Error adding breed:", error);
    }
  }

  
  async function loadBreedList() {
    try {
      const response = await axios.get(
        "http://14.225.210.143:8080/api/breeds/list-breeds", 
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      
      setDatasource(response.data);
    } catch (error) {
      console.error("Error fetching breed list:", error);
    }
  }

  
  async function deleteBreed(id) {
    try {
      await axios.delete(`http://14.225.210.143:8080/api/breeds/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      
      setDatasource(dataSource.filter((breed) => breed.breedID !== id));
    } catch (error) {
      console.error("Error deleting breed:", error);
    }
  }

  
  useEffect(() => {
    loadBreedList(); 
  }, []);

  const handleHideModel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (values) => {
    fetchBreed(values); 
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
              setCurrentBreed(record); 
              setIsDetailModalOpen(true); 
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

 
  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsDetailModalOpen(false); 
    setCurrentBreed(null); 
  };

  
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
