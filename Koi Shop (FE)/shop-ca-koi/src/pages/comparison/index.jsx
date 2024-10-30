import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import apiKoi from "../../config/koi-api";
import { Col, Descriptions, Image, Row, Spin } from "antd";

function CompareKoi () {

  const [koi1, setKoi1] = useState(null);
  const [koi2, setKoi2] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id, compareId } = useParams();
  const user = useSelector((state) => state.user);

  const fetchKoiById = async (koiId) => {
    try {
      const response = await apiKoi.get(
        `koiFish/${koiId}`,
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
    const fetchData = async () => {
      setLoading(true);
      const koiData1 = await fetchKoiById(id);
      const koiData2 = await fetchKoiById(compareId);
      setKoi1(koiData1);
      setKoi2(koiData2);
      setLoading(false);
    };

    fetchData();
  }, [id, compareId]);

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (!koi1 || !koi2) {
    return <p>Không thể tải dữ liệu cá koi để so sánh.</p>;
  }
  return (
    <div>
      <h1>So sánh cá koi</h1>
      <Row gutter={16}>
        <Col span={12}>
          <h2>{koi1.fishName}</h2>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Fish Name">{koi1.fishName}</Descriptions.Item>
            <Descriptions.Item label="Mô tả">{koi1.description}</Descriptions.Item>
            <Descriptions.Item label="Giống">{koi1.breed}</Descriptions.Item>
            <Descriptions.Item label="Nguôn gốc">{koi1.origin}</Descriptions.Item>
            <Descriptions.Item label="Giới tính">{koi1.gender ? "Male" : "Female"}</Descriptions.Item>
            <Descriptions.Item label="Ngày sinh">{koi1.birthDate}</Descriptions.Item>
            <Descriptions.Item label="Chế độ ăn">{koi1.diet}</Descriptions.Item>
            <Descriptions.Item label="Kích thước">{koi1.size}</Descriptions.Item>
            <Descriptions.Item label="Thức ăn">{koi1.food}</Descriptions.Item>
            <Descriptions.Item label="Độ lọc">{koi1.screeningRate}</Descriptions.Item>
            <Descriptions.Item label="Image">
              <Image width={100} src={koi1.image} alt={koi1.fishName} />
            </Descriptions.Item>
            {/* Các thuộc tính khác của koi1 */}
          </Descriptions>
        </Col>
        <Col span={12}>
          <h2>{koi2.fishName}</h2>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Fish Name">{koi2.fishName}</Descriptions.Item>
            <Descriptions.Item label="Mô tả">{koi2.description}</Descriptions.Item>
            <Descriptions.Item label="Giống">{koi2.breed}</Descriptions.Item>
            <Descriptions.Item label="Nguôn gốc">{koi2.origin}</Descriptions.Item>
            <Descriptions.Item label="Giới tính">{koi2.gender ? "Male" : "Female"}</Descriptions.Item>
            <Descriptions.Item label="Ngày sinh">{koi2.birthDate}</Descriptions.Item>
            <Descriptions.Item label="Chế độ ăn">{koi2.diet}</Descriptions.Item>
            <Descriptions.Item label="Kích thước">{koi2.size}</Descriptions.Item>
            <Descriptions.Item label="Thức ăn">{koi2.food}</Descriptions.Item>
            <Descriptions.Item label="Độ lọc">{koi2.screeningRate}</Descriptions.Item>
            <Descriptions.Item label="Image">
              <Image width={100} src={koi2.image} alt={koi2.fishName} />
            </Descriptions.Item>
            {/* Các thuộc tính khác của koi1 */}
          </Descriptions>
        </Col>
      </Row>
    </div>

  )
}

export default CompareKoi 