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
  const [dataSource, setDataSource] = useState([]); // Store batch list
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
  const [selectedBatch, setSelectedBatch] = useState(null); // Store batch for editing
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user);
  const [breeds, setBreeds] = useState([]); // State để lưu danh sách breed

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
    fetchBreeds();
  }, []);

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
        // Gọi API PUT khi cập nhật batch
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
        // Gọi API POST khi tạo batch mới
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

      loadBatchList(); // Tải lại danh sách batch sau khi thêm/cập nhật
      setIsModalOpen(false); // Đóng modal
      form.resetFields(); // Reset form
      setSelectedBatch(null); // Reset batch đã chọn
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
      await axios.put(
        `http://localhost:8080/api/batches/${id}/delete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setDataSource((prevData) =>
        prevData.map(
          (batch) => (batch.id === id ? { ...batch, deleted: true } : batch) // Đánh dấu batch là đã xóa
        )
      );
      message.success("Xóa lô cá thành công!");
    } catch (error) {
      console.error("Error deleting koi fish:", error);
      message.error("Không thể xóa lô cá.");
    }
  };

  // Open modal for creating or editing batch
  const openModal = (batch = null) => {
    setSelectedBatch(batch); // Lưu lại batch hiện tại
    if (batch) {
      form.setFieldsValue({
        breed: batch.breed,
        description: batch.description,
        image: batch.image,
        quantity: batch.quantity,
        price: batch.price,
      });
    } else {
      form.resetFields(); // Reset nếu tạo mới
    }
    setIsModalOpen(true);
  };

  // Hàm để cập nhật trạng thái bán
  const handleIsForSaleChange = async (id, currentStatus) => {
    try {
      // Gửi yêu cầu cập nhật trạng thái isForSale
      await axios.put(
        `http://localhost:8080/api/batches/${id}/update-isSale`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // Cập nhật trạng thái ngay lập tức trong dataSource
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
