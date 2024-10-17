import { Alert, Spin, Table, Modal, Form, Input, Select, message, Button } from "antd";
import Dashboard from "../../../components/dashboard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const { Option } = Select;

function ConsignmentManagement() {
  const user = useSelector((state) => state.user);
  const [consignments, setConsignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentConsignment, setCurrentConsignment] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchConsignment = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/consignments/list-consignments",
          {
            headers: {
              Authorization: `Bearer ${user.token}`, // Gửi token trong header
            },
          }
        );
        setConsignments(response.data);
        setLoading(false);
      } catch (error) {
        setError("Không thể tải dữ liệu consignment.");
        setLoading(false);
      }
    };

    fetchConsignment();
  }, [user.token]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/consignments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.status === 200 || response.status === 204) {
        setConsignments((prevConsignments) =>
          prevConsignments.filter((item) => item.id !== id)
        );
        message.success("Xóa ký gửi thành công.");
      } else {
        message.error("Xóa ký gửi thất bại.");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa ký gửi.");
    }
  };

  const handleUpdate = (consignment) => {
    setCurrentConsignment(consignment); // Lưu thông tin ký gửi hiện tại
    form.setFieldsValue({
      userName: consignment.userName,
      fishName: consignment.fishName,
      shopPrice: consignment.shopPrice,
      consignmentType: consignment.consignmentType,
    });
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    if (!currentConsignment) {
      message.error("Không có thông tin ký gửi để cập nhật.");
      return;
    }

    try {
      const updatedValues = form.getFieldsValue();
      const response = await axios.put(
        `http://localhost:8080/api/consignments/${currentConsignment.id}/update`, // Sử dụng currentConsignment.id
        updatedValues,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.status === 200) {
        setConsignments((prevConsignments) =>
          prevConsignments.map((item) =>
            item.id === currentConsignment.id
              ? { ...item, ...updatedValues } // Cập nhật thông tin ký gửi trong danh sách
              : item
          )
        );
        message.success("Cập nhật ký gửi thành công.");
        setIsModalVisible(false);
      } else {
        message.error("Cập nhật ký gửi thất bại.");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật ký gửi.");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên người dùng",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Tên cá",
      dataIndex: "fishName",
      key: "fishName",
    },
    {
      title: "Ngày yêu cầu",
      dataIndex: "requestDate",
      key: "requestDate",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Loại ký gửi",
      dataIndex: "consignmentType",
      key: "consignmentType",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? "Hoàn thành" : "Chưa hoàn thành"),
    },
    {
      title: "Giá bán tại cửa hàng",
      dataIndex: "shopPrice",
      key: "shopPrice",
      render: (price) => `${price} VND`,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <span>
          <Button onClick={() => handleUpdate(record)}>Cập nhật</Button>
          <Button onClick={() => handleDelete(record.id)} style={{ marginLeft: 8 }}>
            Xóa
          </Button>
        </span>
      ),
    },
  ];

  if (loading) {
    return <Spin tip="Đang tải..." />;
  }

  if (error) {
    return <Alert message="Lỗi" description={error} type="error" showIcon />;
  }

  return (
    <div>
      <Dashboard>
        <Table
          columns={columns}
          dataSource={consignments}
          rowKey={(record) => record.id}
          bordered
        />
      </Dashboard>

      <Modal
        title="Cập nhật thông tin ký gửi"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="userName"
            label="Tên người dùng"
            rules={[{ required: true, message: "Vui lòng nhập tên người dùng" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="fishName"
            label="Tên cá"
            rules={[{ required: true, message: "Vui lòng nhập tên cá" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="shopPrice"
            label="Giá"
            rules={[{ required: true, message: "Vui lòng nhập giá" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="consignmentType"
            label="Loại ký gửi"
            rules={[{ required: true, message: "Vui lòng chọn loại ký gửi" }]}
          >
            <Select>
              <Option value="Online">Online</Option>
              <Option value="Offline">Offline</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ConsignmentManagement;
