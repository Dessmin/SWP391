import { Button, Descriptions, Image, Radio } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import './index.scss'

function ConfirmConsign() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [koi, setKoi] = useState(null);
  const [consignmentTypes, setConsignmentTypes] = useState("Offline");

  const handleConsignment = async (fishId) => {
    if (!fishId) {
      toast.error("Không có thông tin cá để ký gửi.");
      return;
    }

    const consignmentData = {
      fishId,
      requestDate: new Date().toISOString(),
      consignmentType: consignmentTypes,
    };

    try {
      await axios.post(
        "http://localhost:8080/api/consignments/add-consignment",
        consignmentData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success("Ký gửi thành công!");
    } catch (err) {
      toast.error("Ký gửi thất bại.");
    }
  };

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

  useEffect(() => {
    fetchKoiById(id).then((data) => {
      if (data) {
        setKoi(data);
      }
    });
  }, [id]);
  return (
    <div>
      <h1></h1>
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
        </Descriptions>
      )}

      <Radio.Group
        onChange={(e) => setConsignmentTypes(e.target.value)} // Cập nhật giá trị khi thay đổi
        value={consignmentTypes} // Sử dụng giá trị của loại ký gửi
        style={{ marginBottom: "10px" }}
      >
        <Radio value="Online">Online</Radio>
        <Radio value="Offline">Offline</Radio>
      </Radio.Group>

      <Button
        type="default"
        onClick={() => handleConsignment(id)}
        style={{ marginTop: "10px" }}
      >
        Ký gửi
      </Button>
      <div>
        <Link to ="/home">
        <Button>
          Trở về
        </Button>
        </Link>
      </div>
    </div>
  );
}

export default ConfirmConsign;
