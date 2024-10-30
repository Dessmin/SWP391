import { useEffect, useState } from "react";
import Dashboard from "../../../components/dashboard";
import axios from "axios";
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './index.scss'
import { Descriptions } from "antd";

function StatSummary() {
  const [stats, setStats] = useState(null); // Lưu trữ dữ liệu từ API
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Hàm gọi API
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${user.token}`, // Gửi token trong header
            },
          }
        );
        setStats(response.data); // Lưu dữ liệu vào state
      } catch (err) {
        setError("Không thể tải dữ liệu!"); // Xử lý lỗi
      } finally {
        setLoading(false); // Kết thúc trạng thái tải
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>; // Hiển thị khi đang tải
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Dashboard>
      <div className="overview-card">
        <h2>Thông Tin Tổng Quan</h2>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Tổng số cá Koi">
          {stats.totalKoiFish}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng số đơn hàng">
          {stats.orders}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng số khách hàng">
          {stats.customers}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng số ký gửi">
          {stats.consigments}
          </Descriptions.Item>
        </Descriptions>
        {/* <p>Total Koi Fish: {stats.totalKoiFish}</p>
        <p>Orders: {stats.orders}</p>
        <p>Customers: {stats.customers}</p>
        <p>Consignments: {stats.consigments}</p> */}
      </div>

        <div className="breed-sales-chart">
        <h2>Breed Sales</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={stats.breeds} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="breedName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalSold" fill="#8884d8" name="Total Sold" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      </Dashboard>
    </div>
  );
}

export default StatSummary;
