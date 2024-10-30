import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Col,
  Descriptions,
  Image,
  Modal,
  Rate,
  Row,
  Select,
  Spin,
} from "antd";
import apiKoi from "../../config/koi-api";
import { Option } from "antd/es/mentions";
import "./index.scss";
import { CartContext } from "../../helper/CartContext";

function DetailKoi() {
  const [certificateImage, setCertificateImage] = useState(null); // Thay đổi state để chỉ lưu trữ image

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = () => {
    const product = {
      id,
      name: koi.fishName,
      image: koi.image,
      quantity: 1,
      price: koi.price,
      type: "KoiFish", // Đánh dấu đây là sản phẩm batch, vì bạn có 2 loại sản phẩm: batch và koiFish
    };
    addToCart(product); // Thêm sản phẩm vào giỏ hàng
  };

  const { addToCart } = useContext(CartContext);

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
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error.toString());
      return null;
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
      return response.data;
    } catch (error) {
      console.log(error.toString());
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

  useEffect(() => {
    fetchBreeds();
    fetchKoiById(id).then((data) => {
      if (data) {
        setKoi(data);
      }
      setLoading(false);
    });
    fetchCertificateById(id).then((data) => {
      if (data) {
        setCertificateImage(data);
      }
      setLoading(false);
    });

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

  return (
    <div className="full-koi">
      <h1>Thông tin cá {koi.fishName}</h1>

      <div className="koi-info">
        <Row>
          <Col className="img-price" span={12}>
            <img src={koi.image} alt="" />

            <p className="price">
              <strong>Giá: </strong>
              {koi.price.toLocaleString()} VND
            </p>

            <Button
              onClick={handleAddToCart}
              style={{ width: "100%", height: "50px" }}
              type="primary"
            >
              Thêm vào giỏ hàng
            </Button>
          </Col>

          <Col className="detailKoi" span={12}>
            {koi && (
              <Descriptions bordered column={1}>
                <Descriptions.Item label="Description">
                  {koi.description}
                </Descriptions.Item>
                <Descriptions.Item label="Breed">{koi.breed}</Descriptions.Item>
                <Descriptions.Item label="Origin">
                  {koi.origin}
                </Descriptions.Item>
                <Descriptions.Item label="Gender">
                  {koi.gender ? "Male" : "Female"}
                </Descriptions.Item>
                <Descriptions.Item label="Birth day">
                  {koi.birthDate}
                </Descriptions.Item>
                <Descriptions.Item label="Diet">{koi.diet}</Descriptions.Item>
                <Descriptions.Item label="Size">{koi.size}</Descriptions.Item>

                <Descriptions.Item label="Food">{koi.food}</Descriptions.Item>
                <Descriptions.Item label="Screening rate">
                  {koi.screeningRate}
                </Descriptions.Item>

                {/* Hiển thị chứng nhận */}
                <Descriptions.Item label="Certificate">
                  <Button type="primary" onClick={showModal}>
                    Xem chứng chỉ hiện có
                  </Button>
                </Descriptions.Item>
              </Descriptions>
            )}
          </Col>
        </Row>
      </div>

      <h1 className="compare" style={{ textAlign: "center" }}>
        So sánh cá Koi
      </h1>
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
                  style={{ marginTop: "10px", width: "100%", height: "50px" }}
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

      <Button type="primary" onClick={() => navigate("/home")}>
        Trở về
      </Button>

      <>
        <Modal
          title="Chứng chỉ"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {certificateImage && certificateImage.length > 0 ? (
            certificateImage.map((ci) => (
              <Image key={ci.id} height={100} width={200} src={ci.image} />
            ))
          ) : (
            <p>Không có chứng chỉ nào.</p>
          )}
        </Modal>
      </>
    </div>
  );
}

export default DetailKoi;
