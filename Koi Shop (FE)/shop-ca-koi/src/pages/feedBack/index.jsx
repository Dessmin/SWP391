import axios from "axios";
import HeaderLoged from "../../components/header(loged)";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./index.scss";
import { Rate } from "antd";

function FeedBackUI() {
  const desc = ["1", "2", "3", "4", "5"];
  const user = useSelector((state) => state.user);
  const [feedBacks, setFeedbacks] = useState([]);

  const fetchFeedback = async () => {
    try {
      const response = await axios.get(
        "http://14.225.210.143:8080/api/ratings-feedbacks/list-ratingsfeedbacks",
        {
          headers: {
            Authorization: `Bearer ${user.token}`, 
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeedback().then((data) => {
      if (data) {
        setFeedbacks(data);
      }
    });
  }, []);
  return (
    <div className="fulll">
      <HeaderLoged />
      <h1>Phản hồi của khách hàng</h1>
      <div className="fb-contain">
        {feedBacks.map((fb) => (
          <div className="fb-form" key={fb.id}>
            {" "}
            
            <p>
              <strong>Khách hàng: </strong>
              {fb.userName}
            </p>
            <div className="fb-star">
              <div className="star">
                <Rate disabled value={fb.rating} tooltips={desc} />
              </div>

              <p>{fb.feedback}</p>
            </div>
            <p className="datee">
              {new Date(fb.feedbackDate).toLocaleString("vi-VN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedBackUI;
