import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
} from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "../../../components/dashboard";
import moment from "moment";
import { useSelector } from "react-redux";

function Promotion() {
  const [dataSource, setDataSource] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedPromotion, setSelectedPromotion] = useState(null); 
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user);

  
  async function loadPromotionList() {
    try {
      const response = await axios.get(
        "http://14.225.210.143:8080/api/promotions/list-promotions",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setDataSource(response.data);
    } catch (error) {
      console.error("Error fetching promotion list:", error);
    }
  }

  useEffect(() => {
    loadPromotionList();
  }, []);

  
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const promotionData = {
        ...values,
        startDate: values.startDate.toISOString(),
        endDate: values.endDate.toISOString(),
      };

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`, 
        },
      };

      if (selectedPromotion) {
        
        await axios.put(
          `http://14.225.210.143:8080/api/promotions/${selectedPromotion.promotionID}`,
          promotionData,
          config 
        );
      } else {
        // Thêm mới promotion
        await axios.post(
          "http://14.225.210.143:8080/api/promotions/add-promotion",
          promotionData,
          config 
        );
      }

      
      loadPromotionList();
      setIsModalOpen(false);
      form.resetFields();
      setSelectedPromotion(null);
    } catch (error) {
      console.error("Error saving promotion:", error);
    }
  };

  
  const deletePromotion = async (promotionID) => {
    try {
      await axios.delete(
        `http://14.225.210.143:8080/api/promotions/${promotionID}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setDataSource((prevDataSource) =>
        prevDataSource.filter((item) => item.promotionID !== promotionID)
      );
    } catch (error) {
      console.error("Error deleting promotion:", error);
    }
  };

  
  const openModal = (promotion = null) => {
    setSelectedPromotion(promotion);
    if (promotion) {
      form.setFieldsValue({
        ...promotion,
        startDate: moment(promotion.startDate),
        endDate: moment(promotion.endDate),
      });
    }
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Promotion ID",
      dataIndex: "promotionID",
      key: "promotionID",
    },
    {
      title: "Promotion Name",
      dataIndex: "promotionName",
      key: "promotionName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Discount Percentage",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      render: (discount) => `${discount}%`,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button onClick={() => openModal(record)}>Edit</Button>
          <Button
            onClick={() => deletePromotion(record.promotionID)}
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
            Add Promotion
          </Button>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="promotionID"
          style={{ marginTop: "20px" }}
        />
      </Dashboard>

      <Modal
        title={selectedPromotion ? "Edit Promotion" : "Add Promotion"}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="promotionName"
            label="Promotion Name"
            rules={[
              { required: true, message: "Please enter the promotion name" },
            ]}
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
            name="discountPercentage"
            label="Discount Percentage"
            rules={[
              {
                required: true,
                message: "Please enter the discount percentage",
              },
            ]}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[
              { required: true, message: "Please select the start date" },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: "Please select the end date" }]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Promotion;
