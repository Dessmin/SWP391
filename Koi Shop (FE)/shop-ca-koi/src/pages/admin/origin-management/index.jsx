import { Form, Input, Modal, Table, Button } from "antd";
import Dashboard from "../../../components/dashboard";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useSelector } from "react-redux";

function Origin() {
  const [dataSource, setDatasource] = useState([]); 
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.user);

  
  async function fetchOrigin(data) {
    try {
      const response = await axios.post(
        "http://14.225.210.143:8080/api/origin", 
        data,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      
      setDatasource([...dataSource, response.data]);
      loadOriginList(); 
    } catch (error) {
      console.error("Error adding origin:", error);
    }
  }

  
  async function loadOriginList() {
    try {
      const response = await axios.get(
        "http://14.225.210.143:8080/api/origin/list", 
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      
      setDatasource(response.data);
    } catch (error) {
      console.error("Error fetching origin list:", error);
    }
  }

  
  async function deleteOrigin(id) {
    try {
      await axios.delete(`http://14.225.210.143:8080/api/origin/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      
      setDatasource(dataSource.filter((origin) => origin.originID !== id));
    } catch (error) {
      console.error("Error deleting origin:", error);
    }
  }

  
  useEffect(() => {
    loadOriginList(); 
  }, []);

  const handleHideModel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (values) => {
    fetchOrigin(values); 
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

  
  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  
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
