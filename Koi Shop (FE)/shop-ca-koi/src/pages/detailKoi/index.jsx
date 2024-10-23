import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Descriptions,
  Form,
  Image,
  Input,
  Rate,
  Select,
  Spin,
  Table,
} from "antd";
import { toast } from "react-toastify";
import apiKoi from "../../config/koi-api";
import { Option } from "antd/es/mentions";
import "./index.scss";

const desc = ["1", "2", "3", "4", "5"];

function DetailKoi() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [certificateImage, setCertificateImage] = useState(null); // Thay đổi state để chỉ lưu trữ image
  const [value, setValue] = useState();
  const [koiList, setKoiList] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { id } = useParams(); // Lấy id từ URL
  const [koi, setKoi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("All");

  const fetchKoiById = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/koi-fishes/koiFish/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.toString());
      return null;
    }
  };

  const fetchKoiList = async (page = 0) => {
    try {
      const response = await apiKoi.get(`list?page=${page}`, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Gửi token trong header
        },
      });
      setKoiList(response.data.content); // Lưu danh sách cá koi
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
      setKoiList(response.data.content); // Lưu danh sách cá koi
      setTotalPages(response.data.totalPages); // Cập nhật tổng số trang
    } catch (e) {
      console.log(e); // Ghi lại lỗi không phải axios
    }
  };

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

  const handleCompare = (compareId) => {
    navigate(`/koi-comparison/${id}/${compareId}`); // Điều hướng đến trang so sánh với id hiện tại và compareId
  };

  const handleFeedBack = async () => {
    const values = {
      fishName: koi.fishName,
      rating: value,
      feedback: feedback,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/api/ratings-feedbacks/add-ratingsfeedback",
        values,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Gửi feedback thành công");
        fetchFeedBackById(id); // Cập nhật danh sách feedback sau khi gửi feedback thành công
      }
    } catch (error) {
      console.log(error.toString());
    }
  };

  const fetchFeedBackById = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/ratings-feedbacks/${id}/list-ratingsfeedbacksbykoi`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setFeedbackList(response.data); // Cập nhật danh sách feedback
    } catch (error) {
      console.log(error.toString());
    }
  };

  const fetchCertificateById = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/certificates/${id}/fish-certificate`, // Đảm bảo URL đúng
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Lấy chỉ image từ dữ liệu trả về
      if (response.data && response.data.length > 0) {
        setCertificateImage(response.data[0].image); // Lưu image từ phần tử đầu tiên
      }
    } catch (error) {
      console.log(error.toString());
    }
  };

  useEffect(() => {
    fetchBreeds();
    fetchKoiById(id).then((data) => {
      if (data) {
        setKoi(data);
      }
      setLoading(false);
    });
    fetchCertificateById(id);
    fetchFeedBackById(id); // Lấy danh sách feedback khi tải trang
    if (selectedBreed === "All") {
      fetchKoiList(page); // Gọi hàm fetch cho "All"
    } else {
      fetchKoiByBreed(selectedBreed, page); // Gọi hàm fetch cho breed đã chọn
    }
  }, [id, page, selectedBreed]);

  const handlePageChange = (newPage) => {
    setPage(newPage); // Cập nhật số trang
  };

  const handleBreedChange = (value) => {
    setSelectedBreed(value); // Cập nhật breed đã chọn
    setPage(0); // Reset về trang đầu khi thay đổi breed
  };

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => <Rate disabled value={rating} />, // Hiển thị số sao
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
    },
  ];

  return (
    <div>
      <h1>{koi.fishName}</h1>
      {koi && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Fish Name">
            {koi.fishName}
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            {koi.description}
          </Descriptions.Item>
          <Descriptions.Item label="Breed">{koi.breed}</Descriptions.Item>
          <Descriptions.Item label="Origin">{koi.origin}</Descriptions.Item>
          <Descriptions.Item label="Gender">
            {koi.gender ? "Male" : "Female"}
          </Descriptions.Item>
          <Descriptions.Item label="Birth day">
            {koi.birthDate}
          </Descriptions.Item>
          <Descriptions.Item label="Diet">{koi.diet}</Descriptions.Item>
          <Descriptions.Item label="Size">{koi.size}</Descriptions.Item>
          <Descriptions.Item label="Price">{koi.price}</Descriptions.Item>
          <Descriptions.Item label="Food">{koi.food}</Descriptions.Item>
          <Descriptions.Item label="Screening rate">
            {koi.screeningRate}
          </Descriptions.Item>
          <Descriptions.Item label="Image">
            <Image width={100} src={koi.image} alt="Certificate" />
          </Descriptions.Item>

          {/* Hiển thị chứng nhận */}
          <Descriptions.Item label="Certificate">
            {certificateImage ? (
              <Image width={200} src={certificateImage} alt="Certificate" />
            ) : (
              <span>No Certificate Available</span>
            )}
          </Descriptions.Item>

          <Descriptions.Item label="Rating">
            <Form onFinish={handleFeedBack}>
              <Form.Item>
                <Rate tooltips={desc} onChange={setValue} value={value} />
                {value ? <span>{desc[value - 1]}</span> : null}
              </Form.Item>
              <Form.Item>
                <Input
                  placeholder="Feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </Form.Item>
              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form>
          </Descriptions.Item>
        </Descriptions>
      )}

      <h1 className="compare" style={{ textAlign: "center" }}>So sánh cá Koi</h1>
      <div className="koi-compare">
        <strong>Breed </strong>
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
        <div className="koi-list">
          {koiList && koiList.length > 0 ? (
            koiList.map((koiItem) => (
              <div className="koi-card" key={koiItem.id}>
                <img
                  height={290}
                  src={koiItem.image}
                  alt={koiItem.fishName}
                  style={{
                    width: "100%",
                    borderRadius: "10px 10px 0 0",
                    objectFit: "cover",
                  }}
                />

                <div className="koi-card__content">
                  <div className="koi-card__info1">
                    <span>
                      <strong>Name:</strong> {koiItem.fishName}
                    </span>
                    <span>
                      <strong>Price:</strong> {koiItem.price.toLocaleString()}{" "}
                      VND
                    </span>
                  </div>
                  <div className="koi-card__info2">
                    <span>
                      <strong>Origin:</strong> {koiItem.origin}
                    </span>
                    <span>
                      <strong>Breed:</strong> {koiItem.breed}
                    </span>
                  </div>
                  <div>
                    <strong>Size:</strong> {koiItem.size} cm
                  </div>
                </div>

                <Button
                  key={koiItem.id}
                  type="primary"
                  onClick={() => handleCompare(koiItem.id)}
                  style={{ marginTop: "10px", width: "100%", height: '50px' }}
                >
                  So sánh
                </Button>
              </div>
            ))
          ) : (
            <p>Không có cá koi nào để hiển thị</p>
          )}
        </div>
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
      <h1>Feedback</h1>
      <Table columns={columns} dataSource={feedbackList} rowKey="id" />
      <Button type="primary" onClick={() => navigate("/home")}>
        Trở về
      </Button>
    </div>
  );
}

export default DetailKoi;
