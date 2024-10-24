import { Descriptions, Image } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ConfirmConsign() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [koi, setKoi] = useState(null);

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
    </div>
  );
}

export default ConfirmConsign;
