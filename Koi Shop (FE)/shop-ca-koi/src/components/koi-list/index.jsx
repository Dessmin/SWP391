import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./index.scss";
import apiKoi from "../../config/koi-api";
import CardKoi from "../card-koi";

function KoiList() {
    const [kois, setKois] = useState([]);
    const [page, setPage] = useState(0); // Số trang hiện tại
    const [totalPages, setTotalPages] = useState(1);

    const user = useSelector((state) => state.user);

    const fetchKoi = async (page = 0) => {
        try {
            const response = await apiKoi.get(`list?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`, // Gửi token trong header
                },
            });
            setKois(response.data.content); // Lưu danh sách cá koi (tùy thuộc vào cấu trúc response)
            setTotalPages(response.data.totalPages); // Cập nhật tổng số trang
        } catch (e) {
            console.log(e); // Ghi lại lỗi không phải axios
        }
    };

    useEffect(() => {
        fetchKoi(page);
    }, [page]);

    const handlePageChange = (newPage) => {
        setPage(newPage); // Cập nhật số trang
    };

    return (
        <div className="koi-list">
            {kois.map((koi, index) => (
                <CardKoi key={index} koi={koi} />
            ))}

            <div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index)}
                        style={{ margin: '0 5px', padding: '5px 10px', background: page === index ? 'lightblue' : 'white' }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default KoiList;
