import { useEffect, useState } from "react";
import apiBatch from "../../config/api-batch";
import CardBatch from "../card-batch";
import { useSelector } from "react-redux";
import './index.scss'
import { Button } from "antd";
function BatchList() {
  const [batches, setbatches] = useState([]);
  const [page, setPage] = useState(0); // Số trang hiện tại
  const [totalPages, setTotalPages] = useState(1);

  const user = useSelector((state) => state.user);

  const fetchBatch = async (page = 0) => {
    try {
      const response = await apiBatch.get(`list-batch?page=${page}`, {
        headers: {
          Authorization: `Bearer ${user.token}`, 
        },
      });
      setbatches(response.data.content); 
      setTotalPages(response.data.totalPages); 
    } catch (e) {
      console.log(e); 
    }
  };

  useEffect(() => {
    fetchBatch(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage); 
  };
  return (
    <div className="batch">
      <h2>Danh sách lô cá Koi</h2>
      <div className="batch__list">
      {batches.map((batch, index) => (
        <CardBatch key={index} batch={batch} />
      ))}
      </div>
      

      <div className="batch__page">
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

export default BatchList;
