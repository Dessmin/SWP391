import { Select } from "antd";
import { Option } from "antd/es/mentions";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Dashboard from "../../../components/dashboard";

function Income() {
    const [incomeData, setIncomeData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); 
  const [availableYears, setAvailableYears] = useState([selectedYear]);
  const user = useSelector((state) => state.user);

  // Hàm lấy dữ liệu từ API
  const fetchIncomeData = async (year) => {
    try {
      const response = await axios.get("http://14.225.210.143:8080/api/dashboard/income", {
        headers: {
          Authorization: `Bearer ${user.token}`, // Gửi token trong header
        },
      });
      const data = response.data.incomeMonthly;

      // Lọc dữ liệu theo năm và định dạng 12 tháng đầy đủ
      const filteredData = Array.from({ length: 12 }, (_, i) => {
        const month = (i + 1).toString().padStart(2, '0');
        const monthData = data.find(
          (item) => item.Month === `${year}-${month}`
        );
        return {
          month: `${year}-${month}`,
          income: monthData ? monthData.Income : 0, 
        };
      });

      
      setIncomeData(filteredData);
      setAvailableYears([...new Set(data.map(item => item.Year))]);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu thu nhập:", error);
    }
  };

  
  useEffect(() => {
    fetchIncomeData(selectedYear);
  }, [selectedYear]);

  
  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <div>
        <Dashboard>
        <h2>Biểu đồ thu nhập theo tháng</h2>
      <Select
        defaultValue={selectedYear}
        onChange={handleYearChange}
        style={{ width: 150, marginBottom: 20 }}
      >
        {availableYears.map((year) => (
          <Option key={year} value={year}>
            {year}
          </Option>
        ))}
      </Select>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={incomeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tickFormatter={(month) => month.slice(5)} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#8884d8" name="Thu nhập" />
        </BarChart>
      </ResponsiveContainer>
        </Dashboard>
      
    </div>
  );
}

export default Income