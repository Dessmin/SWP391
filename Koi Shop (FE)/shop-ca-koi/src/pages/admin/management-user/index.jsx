import { Table, Button } from "antd";
import Dashboard from "../../../components/dashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

function User() {
  const [dataSource, setDataSource] = useState([]); // State to store user list
  const user = useSelector((state) => state.user);
  const navigate = useNavigate(); // Hook để điều hướng đến trang chi tiết người dùng

  // Fetch user list
  async function loadUserList() {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/user/list-user",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Update the state with the data from the server
      setDataSource(response.data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  }

  // Call loadUserList when the component is mounted
  useEffect(() => {
    loadUserList();
  }, []); // Only run once when the component is mounted

  // Handle deleting user
  const deleteUser = async (userID) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/user/${userID}/delete`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Kiểm tra nếu API trả về thành công
      if (response.status === 200 || response.status === 204) {
        // Cập nhật lại state `dataSource` bằng cách lọc bỏ người dùng đã xóa
        setDataSource((prevDataSource) =>
          prevDataSource.filter((user) => user.id !== userID)
        );
      } else {
        console.error(
          "Failed to delete user. Response status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Navigate to user detail page
  const viewUserDetails = (userID) => {
    navigate(`/home/dashboard/user/${userID}/detail`);
  };

  const columns = [
    {
      title: "User ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
      render: (joinDate) => new Date(joinDate).toLocaleDateString(),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Link to={`/home/dashboard/user/${record.id}/detail`}>
            <Button type="default">Detail</Button>
          </Link>
          <Button
            type="default"
            onClick={() => deleteUser(record.id)}
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
        <Table dataSource={dataSource} columns={columns} rowKey="id" />
      </Dashboard>
    </div>
  );
}

export default User;
