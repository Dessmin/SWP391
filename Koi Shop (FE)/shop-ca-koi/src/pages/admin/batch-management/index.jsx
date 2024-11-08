import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  notification,
  Select,
  message,
  Switch,
} from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "../../../components/dashboard";
import { useSelector } from "react-redux";
import apiKoi from "../../../config/koi-api";

function Batch() {
  const [dataSource, setDataSource] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedBatch, setSelectedBatch] = useState(null); 
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user);
  const [breeds, setBreeds] = useState([]); 

  
  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  
  async function loadBatchList() {
    try {
      const response = await axios.get(
        "http://14.225.210.143:8080/api/batches/getbatches",
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
    fetchBreeds();
  }, []);

  const fetchBreeds = async () => {
    try {
      const response = await axios.get(
        "http://14.225.210.143:8080/api/breeds/list-breedName",
        {
          // Giả sử API lấy danh sách breed là /breeds
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setBreeds(response.data); 
    } catch (e) {
      console.log(e);
    }
  };

  
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form values before processing:", values);

      const batchData = {
        breed: values.breed, 
        description: values.description, 
        image: values.image, 
        quantity: values.quantity || 0, 
        price: values.price || 0, 
        isSale: values.isSale || false, 
      };

      console.log("Processed batch data before submitting:", batchData);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`, // Token để xác thực
        },
      };

      if (selectedBatch) {
        // Gọi API PUT khi cập nhật batch
        await axios.put(
          `http://14.225.210.143:8080/api/batches/${selectedBatch.id}/update`,
          batchData,
          config
        );
        openNotificationWithIcon(
          "success",
          "Batch Updated",
          "Batch has been successfully updated."
        );
      } else {
        // Gọi API POST khi tạo batch mới
        await axios.post(
          "http://14.225.210.143:8080/api/batches/create-batch",
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
    console.log("Batch ID to delete:", id); 
    try {
      await axios.put(
        `http://14.225.210.143:8080/api/batches/${id}/delete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setDataSource((prevData) =>
        prevData.map(
          (batch) => (batch.id === id ? { ...batch, deleted: true } : batch) 
        )
      );
      message.success("Xóa lô cá thành công!");
    } catch (error) {
      console.error("Error deleting koi fish:", error);
      message.error("Không thể xóa lô cá.");
    }
  };

  
  const openModal = (batch = null) => {
    setSelectedBatch(batch); 
    if (batch) {
      form.setFieldsValue({
        breed: batch.breed,
        description: batch.description,
        image: batch.image,
        quantity: batch.quantity,
        price: batch.price,
      });
    } else {
      form.resetFields(); 
    }
    setIsModalOpen(true);
  };

  
  const handleIsForSaleChange = async (id, currentStatus) => {
    try {
      
      await axios.put(
        `http://14.225.210.143:8080/api/batches/${id}/update-isSale`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      
      setDataSource((prevBatch) =>
        prevBatch.map((batch) =>
          batch.id === id ? { ...batch, forSale: !currentStatus } : batch
        )
      );
      message.success("Cập nhật trạng thái thành công!");
    } catch (err) {
      console.error("Error updating sale status:", err);
      message.error("Không thể cập nhật trạng thái bán.");
    }
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
      title: "For Sale",
      dataIndex: "forSale",
      key: "forSale",
      render: (forSale, record) => (
        <Switch
          checked={forSale}
          onChange={() => handleIsForSaleChange(record.id, forSale)}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => openModal(record)} // Mở modal với dữ liệu batch
            style={{ marginRight: 8 }}
          >
            Update
          </Button>
          {record.deleted ? (
            <Button>
              <span style={{ color: "red" }}>Is Delete</span>
            </Button>
          ) : (
            <Button
              type="primary"
              danger
              onClick={() => deleteBatch(record.id)}
            >
              Delete
            </Button>
          )}
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
        </Form>
      </Modal>
    </div>
  );
}

export default Batch;
