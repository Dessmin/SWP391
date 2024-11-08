import { Form, Input, Modal, Table, Button } from "antd";
import Dashboard from "../../../components/dashboard";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useSelector } from "react-redux";

function Posting() {
  const [dataSource, setDataSource] = useState([]); 
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [postDetail, setPostDetail] = useState(null);
  const user = useSelector((state) => state.user); 

  
  async function loadPostingList() {
    try {
      const response = await axios.get(
        "http://14.225.210.143:8080/api/posting/list-postings",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setDataSource(response.data);
    } catch (error) {
      console.error("Error fetching posting list:", error);
    }
  }

  
  async function addPosting(data) {
    try {
      const response = await axios.post(
        "http://14.225.210.143:8080/api/posting/add-posting",
        data,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setDataSource([...dataSource, response.data]);
      loadPostingList();
    } catch (error) {
      console.error("Error adding posting:", error);
    }
  }

  
  async function deletePosting(id) {
    try {
      await axios.delete(
        `http://14.225.210.143:8080/api/posting/${id}/delete-posting`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setDataSource(dataSource.filter((posting) => posting.id !== id));
    } catch (error) {
      console.error("Error deleting posting:", error);
    }
  }

  
  async function updatePosting(id, data) {
    try {
      await axios.put(
        `http://14.225.210.143:8080/api/posting/${id}/update-posting`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      loadPostingList();
    } catch (error) {
      console.error("Error updating posting:", error);
    }
  }

  
  async function fetchPostDetail(id) {
    try {
      const response = await axios.get(
        `http://14.225.210.143:8080/api/posting/${id}/get-posting`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setPostDetail(response.data); 
      setIsDetailModalOpen(true); 
    } catch (error) {
      console.error("Error fetching post detail:", error);
    }
  }

  useEffect(() => {
    loadPostingList(); 
  }, []);

  const handleHideModel = () => {
    setIsModalOpen(false);
    setEditingPost(null);
  };

  const handleSubmit = (values) => {
    if (editingPost) {
      updatePosting(editingPost.id, values); 
    } else {
      addPosting(values); 
    }
    form.resetFields();
    handleHideModel();
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => <img src={text} alt="post-img" style={{ width: 50 }} />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => {
              form.setFieldsValue(record);
              setEditingPost(record);
              setIsModalOpen(true);
            }}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            type="primary"
            onClick={() => fetchPostDetail(record.id)} 
            style={{ marginRight: 8 }}
          >
            Detail
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => deletePosting(record.id)}
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
    setEditingPost(null);
  };

  function handleOk() {
    form.submit();
  }

  return (
    <div>
      <Dashboard>
        <div>
          <Button type="primary" onClick={handleShowModal}>
            {editingPost ? "Edit Post" : "Add New Post"}
          </Button>
        </div>
        <Table dataSource={dataSource} columns={columns} rowKey="id" />

        
        <Modal
          title={
            <div style={{ textAlign: "center" }}>
              {editingPost ? "Edit Post" : "Add New Post"}
            </div>
          }
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            form={form}
            onFinish={handleSubmit}
            labelCol={{ span: 24 }}
            initialValues={editingPost || {}}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input title!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Content"
              name="content"
              rules={[{ required: true, message: "Please input content!" }]}
            >
              <Input.TextArea placeholder="Enter a description" />
            </Form.Item>
            <Form.Item
              label="Image URL"
              name="image"
              rules={[{ required: true, message: "Please input image URL!" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>

        
        <Modal
          title="Post Details"
          open={isDetailModalOpen}
          onCancel={() => setIsDetailModalOpen(false)}
          footer={[
            <Button key="close" onClick={() => setIsDetailModalOpen(false)}>
              Close
            </Button>,
          ]}
        >
          {postDetail && (
            <div>
              <p>
                <strong>Title:</strong> {postDetail.title}
              </p>
              <p>
                <strong>Content:</strong> {postDetail.content}
              </p>
              <p>
                <strong>Author:</strong> {postDetail.author}
              </p>
              <p>
                <strong>Date:</strong> {postDetail.date}
              </p>
              <img
                src={postDetail.image}
                alt="post-detail"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          )}
        </Modal>
      </Dashboard>
    </div>
  );
}

export default Posting;
