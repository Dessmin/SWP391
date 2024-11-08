import { useEffect, useState } from "react";
import Dashboard from "../../../components/dashboard";
import axios from "axios";
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './index.scss'
import { Descriptions } from "antd";

function StatSummary() {
  const [stats, setStats] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://14.225.210.143:8080/api/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${user.token}`, 
            },
          }
        );
        setStats(response.data); 
      } catch (err) {
        setError("Không thể tải dữ liệu!"); 
      } finally {
        setLoading(false); 
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>; 
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
