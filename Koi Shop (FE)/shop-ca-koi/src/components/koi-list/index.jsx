import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./index.scss";
import apiKoi from "../../config/koi-api";
import CardKoi from "../card-koi";
import { Button, Select } from "antd";
import { Option } from "antd/es/mentions";
import axios from "axios";

function KoiList() {
  const [kois, setKois] = useState([]);
  const [page, setPage] = useState(0); 
  const [totalPages, setTotalPages] = useState(1);
  const [breeds, setBreeds] = useState([]); 
  const [selectedBreed, setSelectedBreed] = useState("All");
  const [name, setName] = useState([]);

  const searchTerm = useSelector((state) => state.search.term);
  const user = useSelector((state) => state.user);

  const fetchKoi = async (page = 0) => {
    try {
      const response = await apiKoi.get(`list?page=${page}`, {
        headers: {
          Authorization: `Bearer ${user.token}`, 
        },
      });
      setKois(response.data.content); 
      setTotalPages(response.data.totalPages); 
    } catch (e) {
      console.log(e); 
    }
  };

  const fetchKoiByBreed = async (breed, page = 0) => {
    try {
      const response = await axios.get(`http://14.225.210.143:8080/api/koi-fishes/${breed}?page=${page}`, {
        headers: {
          Authorization: `Bearer ${user.token}`, 
        },
      });
      setKois(response.data.content); 
      console.log(response.data.content);
      
      setTotalPages(response.data.totalPages); 
    } catch (e) {
      console.log(e); 
    }
  };

  
  

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
  

  const fetchBreeds = async () => {
    try {
      const response = await apiKoi.get(
        "http://14.225.210.143:8080/api/breeds/list-breedName",
        {
          // Giả sử API lấy danh sách breed là /breeds
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setBreeds(response.data); 
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchKoiBySearchTerm(),
    fetchBreeds(); 
   
    if (selectedBreed === "All") {
      fetchKoi(page); 
    } else {
      fetchKoiByBreed(selectedBreed, page); 
    }
  }, [page, selectedBreed, searchTerm]);

  const handlePageChange = (newPage) => {
    setPage(newPage); 
  };

  const handleBreedChange = (value) => {
    setSelectedBreed(value); 
    setPage(0); 
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
            
            if (selectedBreed === "All" && name.length === 0) return true;
           
            if (name.length > 0) return name.includes(koi.fishName);
            
            return koi.breed === selectedBreed;
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
