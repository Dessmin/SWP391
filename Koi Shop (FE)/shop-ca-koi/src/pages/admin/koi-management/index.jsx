import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Table,
  Button,
  Switch,
  message,
  notification,
  Select,
  Upload,
  Image,
} from "antd";
import Dashboard from "../../../components/dashboard";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import apiKoi from "../../../config/koi-api";

function Koi() {
  const [dataSource, setDatasource] = useState([]);
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const [breeds, setBreeds] = useState([]);
  const [origins, setOrigins] = useState([]);

  async function fetchKoi(data) {
    try {
      const response = await axios.post(
        "http://14.225.210.143:8080/api/koi-fishes/add",
        data,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setDatasource([...dataSource, response.data]);
      loadKoiList();
    } catch (error) {
      console.error("Error adding koi fish:", error);
    }
  }

  async function loadKoiList() {
    try {
      const response = await axios.get(
        "http://14.225.210.143:8080/api/koi-fishes/listfish",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setDatasource(response.data);
    } catch (error) {
      console.error("Error fetching koi list:", error);
      notification.error({
        message: "Lỗi",
        description: "Không thể tải danh sách cá Koi.",
      });
    }
  }

  const handleDeleteKoi = async (id) => {
    try {
      await axios.put(
        `http://14.225.210.143:8080/api/koi-fishes/${id}/delete`,
        {}, // body rỗng vì chỉ cập nhật trạng thái
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setDatasource((prevData) =>
        prevData.map(
          (koi) => (koi.id === id ? { ...koi, deleted: true } : koi) // Đánh dấu cá là đã xóa
        )
      );
      message.success("Xóa cá Koi thành công!");
    } catch (error) {
      console.error("Error deleting koi fish:", error);
      message.error("Không thể xóa cá Koi.");
    }
  };

  const handleIsForSaleChange = async (id, currentStatus) => {
    try {
      await axios.put(
        `http://14.225.210.143:8080/api/koi-fishes/${id}/updateIsForSale`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setDatasource((prevFishes) =>
        prevFishes.map((fish) =>
          fish.id === id ? { ...fish, isForSale: !currentStatus } : fish
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
      title: "Fish Name",
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
      title: "For Sale",
      dataIndex: "isForSale",
      key: "isForSale",
      render: (isForSale, record) => (
        <Switch
          checked={isForSale}
          onChange={() => handleIsForSaleChange(record.id, isForSale)}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Link to={`/home/dashboard/koi/koidetail/${record.id}`}>
            <Button type="default">Detail</Button>
          </Link>

          {record.deleted ? (
            <Button>
              <span style={{ color: "red" }}>Is Delete</span>
            </Button>
          ) : (
            <Button
              type="primary"
              danger
              onClick={() => handleDeleteKoi(record.id)}
              style={{ marginRight: 8 }}
            >
              Delete
            </Button>
          )}

          <Link to={`/home/dashboard/koi/certificate/${record.id}`}>
            <Button type="default">Certificate</Button>
          </Link>
        </div>
      ),
    },
  ];

  // const [previewOpen, setPreviewOpen] = useState(false);
  // const [previewImage, setPreviewImage] = useState("");
  // const [fileList, setFileList] = useState([]);
  // const getBase64 = (file) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // const handlePreview = async (file) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //   setPreviewImage(file.url || file.preview);
  //   setPreviewOpen(true);
  // };
  // const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  // const uploadButton = (
  //   <button
  //     style={{
  //       border: 0,
  //       background: "none",
  //     }}
  //     type="button"
  //   >
  //     <PlusOutlined />
  //     <div
  //       style={{
  //         marginTop: 8,
  //       }}
  //     >
  //       Upload
  //     </div>
  //   </button>
  // );

  const handleshowModal = () => {
    setIsModalOpen(true);
  };

  const handleHideModel = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (values) => {
    console.log(values);

    fetchKoi(values);
    form.resetFields();
    handleHideModel();
  };

  const handleOk = () => {
    form.submit();
  };

  useEffect(() => {
    loadKoiList();
    fetchBreeds();
    fetchOrigins();
  }, []);
  const fetchBreeds = async () => {
    try {
      const response = await apiKoi.get(
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

  const fetchOrigins = async () => {
    try {
      const response = await axios.get(
        "http://14.225.210.143:8080/api/origin/list-originName",
        {
          // Giả sử API lấy danh sách breed là /origin
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setOrigins(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Dashboard>
        <div>
          <Button type="primary" onClick={handleshowModal}>
            Add new koi
          </Button>
        </div>
        <Table dataSource={dataSource} columns={columns} rowKey="id" />
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
              label="Origin"
              name="origin"
              rules={[{ required: true, message: "Please select origin!" }]}
            >
              <Select placeholder="Select Origin">
                {origins.map((origin) => (
                  <Select.Option key={origin} value={origin}>
                    {origin}
                  </Select.Option>
                ))}
              </Select>
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
              rules={[{ required: true }]}
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
              name="image"
              rules={[
                { required: true, message: "Vui lòng nhập URL hình ảnh" },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </Dashboard>
    </div>
  );
}

export default Koi;
