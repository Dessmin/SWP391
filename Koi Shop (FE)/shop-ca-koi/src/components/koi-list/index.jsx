import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./index.scss";
import apiKoi from "../../config/koi-api";
import CardKoi from "../card-koi";
import { Button, Select } from "antd";
import { Option } from "antd/es/mentions";

function KoiList() {
  const [kois, setKois] = useState([]);
  const [page, setPage] = useState(0); // Số trang hiện tại
  const [totalPages, setTotalPages] = useState(1);
  const [breeds, setBreeds] = useState([]); // State để lưu danh sách breed
  const [selectedBreed, setSelectedBreed] = useState("All");
  const [name, setName] = useState([]);

  const searchTerm = useSelector((state) => state.search.term);
  const user = useSelector((state) => state.user);

  const fetchKoi = async (page = 0) => {
    try {
      const response = await apiKoi.get(`list?page=${page}`, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Gửi token trong header
        },
      });
      setKois(response.data.content); // Lưu danh sách cá koi
      setTotalPages(response.data.totalPages); // Cập nhật tổng số trang
    } catch (e) {
      console.log(e); // Ghi lại lỗi không phải axios
    }
  };

  const fetchKoiByBreed = async (breed, page = 0) => {
    try {
      const response = await apiKoi.get(`${breed}?page=${page}`, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Gửi token trong header
        },
      });
      setKois(response.data.content); // Lưu danh sách cá koi
      setTotalPages(response.data.totalPages); // Cập nhật tổng số trang
    } catch (e) {
      console.log(e); // Ghi lại lỗi không phải axios
    }
  };

  // const handleInputChange = (e) => {
  //   setSearchTerm(e.target.value); // Cập nhật từ khóa tìm kiếm khi người dùng nhập
  // };
  

  const fetchKoiBySearchTerm = async () => {
    if (!searchTerm) {
      setName([]);
      fetchKoi(page);
      return;
    }
    try {
      const response = await apiKoi.get(`${searchTerm}/search`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setName(response.data);
    } catch (error) {
      console.error("Error fetching Koi by search", error);
    }
  };
  // const handleSearch = async () => {
  //   if (!searchTerm) {
  //     // Nếu không nhập gì, hiển thị toàn bộ danh sách
  //     setName([]);
  //     fetchKoi(page);
  //     return;
  //   }
  //   try {
  //     const response = await apiKoi.get(`${searchTerm}/search`, {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     });

  //     setName(response.data); // Cập nhật danh sách cá Koi dựa trên từ khóa tìm kiếm
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error fetching Koi by search", error);
  //   }
  // };

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

  useEffect(() => {
    fetchKoiBySearchTerm(),
    fetchBreeds(); // Lấy danh sách breed khi component mount
    // Lấy danh sách Koi theo breed đã chọn
    if (selectedBreed === "All") {
      fetchKoi(page); // Gọi hàm fetch cho "All"
    } else {
      fetchKoiByBreed(selectedBreed, page); // Gọi hàm fetch cho breed đã chọn
    }
  }, [page, selectedBreed, searchTerm]);

  const handlePageChange = (newPage) => {
    setPage(newPage); // Cập nhật số trang
  };

  const handleBreedChange = (value) => {
    setSelectedBreed(value); // Cập nhật breed đã chọn
    setPage(0); // Reset về trang đầu khi thay đổi breed
  };

  return (
    <div className="koi">
      <h2>Danh sách Koi</h2>
      <div className="action">
      
      <div className="filter">
        <strong style={{ color: "white" }}>Breed</strong>
        <Select
          defaultValue="All"
          style={{ width: 200, marginBottom: "20px" }}
          onChange={handleBreedChange}
        >
          <Option value="All">All</Option>
          {breeds.map((breed, index) => (
            <Option key={index} value={breed}>
              {breed}
            </Option>
          ))}
        </Select>
      </div>
      
      </div>

      

      <div className="koi__list">
        {kois
          .filter((koi) => {
            // Nếu không có từ khóa tìm kiếm hoặc danh sách 'name' trống, hiển thị tất cả
            if (name.length === 0) return true;
            // Nếu có tìm kiếm, chỉ hiển thị những cá Koi có tên nằm trong danh sách 'name'
            return name.includes(koi.fishName);
          })
          .map((koi, index) => (
            <CardKoi key={index} koi={koi} />
          ))}
      </div>
      <div className="koi__page">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            onClick={() => handlePageChange(index)}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              background: page === index ? "lightblue" : "white",
            }}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default KoiList;
