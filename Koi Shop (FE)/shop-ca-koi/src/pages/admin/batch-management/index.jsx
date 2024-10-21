import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Checkbox,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "../../../components/dashboard";
import { useSelector } from "react-redux";

function Batch() {
  const [dataSource, setDataSource] = useState([]); // Store batch list
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
  const [selectedBatch, setSelectedBatch] = useState(null); // Store batch for editing
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user);

  // Function to open notifications
  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  // Fetch batch list
  async function loadBatchList() {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/batches/getbatches",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setDataSource(response.data);
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Error Fetching Batches",
        "Could not load batch list."
      );
      console.error("Error fetching batch list:", error);
    }
  }

  useEffect(() => {
    loadBatchList();
  }, []);

  // Handle creating/updating batch
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form values before processing:", values);

      const batchData = {
        breed: values.breed, // Đảm bảo breed không undefined
        description: values.description, // Đảm bảo description không undefined
        image: values.image, // Đảm bảo image không undefined
        quantity: values.quantity || 0, // Nếu quantity không có, đặt mặc định là 0
        price: values.price || 0, // Nếu price không có, đặt mặc định là 0
        isSale: values.isSale || false, // Nếu isSale không có, đặt mặc định là false
      };

      console.log("Processed batch data before submitting:", batchData);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`, // Token để xác thực
        },
      };

      if (selectedBatch) {
        console.log(`Updating batch with ID: ${selectedBatch.id}`);
        await axios.put(
          `http://localhost:8080/api/batches/${selectedBatch.id}/update`,
          batchData,
          config
        );
        openNotificationWithIcon(
          "success",
          "Batch Updated",
          "Batch has been successfully updated."
        );
      } else {
        console.log("Creating a new batch");
        await axios.post(
          "http://localhost:8080/api/batches/create-batch",
          batchData,
          config
        );
        openNotificationWithIcon(
          "success",
          "Batch Created",
          "New batch has been successfully created."
        );
      }

      loadBatchList();
      setIsModalOpen(false);
      form.resetFields();
      setSelectedBatch(null);
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Error Saving Batch",
        "There was an error saving the batch."
      );
      console.error("Error saving batch:", error);
    }
  };

  // Handle deleting batch
  const deleteBatch = async (id) => {
    console.log("Batch ID to delete:", id); // Kiểm tra giá trị id
    try {
      await axios.delete(`http://localhost:8080/api/batches/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setDataSource((prevDataSource) =>
        prevDataSource.filter((item) => item.id !== id)
      );
      openNotificationWithIcon(
        "success",
        "Batch Deleted",
        "Batch has been successfully deleted."
      );
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Error Deleting Batch",
        "There was an error deleting the batch."
      );
      console.error("Error deleting batch:", error);
    }
  };

  // Open modal for creating or editing batch
  const openModal = (batch = null) => {
    setSelectedBatch(batch);
    if (batch) {
      form.setFieldsValue({
        ...batch,
      });
    }
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Batch ID",
      dataIndex: "id",
      key: "batchId",
    },
    {
      title: "Breed",
      dataIndex: "breedName",
      key: "breed",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="Batch" style={{ width: 100 }} />,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Is Sale",
      dataIndex: "isSale",
      key: "isSale",
      render: (isSale) => (isSale ? "Yes" : "No"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button onClick={() => openModal(record)}>Edit</Button>
          <Button
            onClick={() => deleteBatch(record.id)}
            style={{ marginLeft: "8px" }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Dashboard>
        <div>
          <Button type="primary" onClick={() => openModal()}>
            Add Batch
          </Button>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="batchId"
          style={{ marginTop: "20px" }}
        />
      </Dashboard>

      <Modal
        title={selectedBatch ? "Edit Batch" : "Add Batch"}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="breed"
            label="Breed"
            rules={[{ required: true, message: "Please enter the breed" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: "Please enter the image URL" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: "Please enter the quantity" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="isSale" valuePropName="checked">
            <Checkbox>Is Sale</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Batch;
