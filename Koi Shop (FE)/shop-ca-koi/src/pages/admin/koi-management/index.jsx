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
} from "antd";
import Dashboard from "../../../components/dashboard";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Koi() {
  const [dataSource, setDatasource] = useState([]); // State lưu trữ danh sách Koi
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.user);

  // Hàm để thêm một con cá Koi mới
  async function fetchKoi(data) {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/koi-fishes/add",
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

  // Hàm để tải danh sách các con cá Koi
  async function loadKoiList() {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/koi-fishes/listfish",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const koiList = response.data.map((koi) => ({
        ...koi,
        isForSale: getSaleStatusFromLocalStorage(koi.id), // Lấy trạng thái bán từ Local Storage
      }));
      setDatasource(koiList);
    } catch (error) {
      console.error("Error fetching koi list:", error);
      notification.error({
        message: "Lỗi",
        description: "Không thể tải danh sách cá Koi.",
      });
    }
  }

  // Hàm để xóa một con cá Koi
  async function deleteKoi(id) {
    try {
      await axios.delete(`http://localhost:8080/api/koi-fishes/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setDatasource(dataSource.filter((koi) => koi.id !== id));
    } catch (error) {
      console.error("Error deleting koi fish:", error);
    }
  }

  // Hàm để cập nhật trạng thái IsForSale
  // Hàm cập nhật trạng thái bán
  async function updateIsForSale(id, isForSale) {
    try {
      // Truyền giá trị isForSale mới vào payload của API
      await axios.put(
        `http://localhost:8080/api/koi-fishes/${id}/updateIsForSale`,
        { isForSale: isForSale }, // Truyền đúng giá trị mới
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Lưu giá trị mới vào Local Storage
      saveSaleStatusToLocalStorage(id, isForSale);
      // Tải lại danh sách sau khi cập nhật
      loadKoiList();
      message.success("Đã cập nhật trạng thái bán!");
    } catch (error) {
      console.error("Error updating sale status:", error);
      message.error("Không thể cập nhật trạng thái bán.");
    }
  }

  // Hàm xử lý khi người dùng bật/tắt switch
  const handleSwitchChange = async (checked, record) => {
    await updateIsForSale(record.id, checked); // Truyền đúng giá trị checked vào hàm
  };
  // Hàm để lưu trạng thái bán vào Local Storage
  const saveSaleStatusToLocalStorage = (id, isForSale) => {
    const saleStatus = JSON.parse(localStorage.getItem("koiSaleStatus")) || {};
    saleStatus[id] = isForSale;
    localStorage.setItem("koiSaleStatus", JSON.stringify(saleStatus));
  };

  // Hàm để lấy trạng thái bán từ Local Storage
  const getSaleStatusFromLocalStorage = (id) => {
    const saleStatus = JSON.parse(localStorage.getItem("koiSaleStatus")) || {};
    return saleStatus[id] !== undefined ? saleStatus[id] : true; // Đảm bảo trả về false nếu không có
  };
  // Cột mới cho trạng thái IsForSale
  const columns = [
    {
      title: "Fish Name:",
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
      key: "isForSale",
      render: (text, record) => (
        <Switch
          checked={record.isForSale} // Đảm bảo sử dụng đúng giá trị từ server
          onChange={(checked) => handleSwitchChange(checked, record)}
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

          <Button
            type="primary"
            danger
            onClick={() => deleteKoi(record.id)}
            style={{ marginRight: 8 }}
          >
            Delete
          </Button>

          <Link to={`/home/dashboard/koi/certificate/${record.id}`}>
            <Button type="default">Certificate</Button>
          </Link>
        </div>
      ),
    },
  ];

  // Hiển thị modal thêm cá mới
  const handleshowModal = () => {
    setIsModalOpen(true);
  };

  const handleHideModel = () => {
    setIsModalOpen(false);
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Submit form thêm cá mới
  const handleSubmit = (values) => {
    fetchKoi(values);
    form.resetFields();
    handleHideModel();
  };

  const handleOk = () => {
    form.submit();
  };

  // Tải danh sách cá Koi khi component được mount
  useEffect(() => {
    loadKoiList();
  }, []);

  return (
    <div>
      <Dashboard>
        <div>
          <Button type="primary" onClick={handleshowModal}>
            Add new koi
          </Button>
        </div>
        <Table dataSource={dataSource} columns={columns} />
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
              rules={[{ required: true, message: "Please input breed!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Origin"
              name="origin"
              rules={[{ required: true, message: "Please input origin!" }]}
            >
              <Input />
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
              rules={[{ required: true, message: "Please select birth date!" }]}
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
              <Input placeholder="Nhập URL hình ảnh" />
            </Form.Item>
          </Form>
        </Modal>
      </Dashboard>
    </div>
  );
}

export default Koi;
