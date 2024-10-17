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
  Spin,
  Table,
} from "antd";
import { toast } from "react-toastify";

const desc = ["1", "2", "3", "4", "5"];

function DetailKoi() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [certificateImage, setCertificateImage] = useState(null); // Thay đổi state để chỉ lưu trữ image
  const [value, setValue] = useState();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { id } = useParams(); // Lấy id từ URL
  const [koi, setKoi] = useState(null);
  const [loading, setLoading] = useState(true);

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
    fetchKoiById(id).then((data) => {
      if (data) {
        setKoi(data);
      }
      setLoading(false);
    });
    fetchCertificateById(id);
    fetchFeedBackById(id); // Lấy danh sách feedback khi tải trang
  }, [id]);

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
      <h1>Detail Koi name: {koi.fishName}</h1>
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
            <img width={100} src={koi.image} alt="" />
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
      <h1>Feedback</h1>
      <Table columns={columns} dataSource={feedbackList} rowKey="id" />
      <Button type="primary" onClick={() => navigate("/home")}>
        Trở về
      </Button>
    </div>
  );
}

export default DetailKoi;
