import { useState } from "react";
import "./index.scss"; 

const ConsignmentContent = () => {
  const [isExpanded, setIsExpanded] = useState(false); 

  const shortContent = (
    <div>
      <p>
        99% người nuôi cá Koi đều mong em koi của mình được “gả” vào gia đình
        tốt, đảm bảo cuộc sống, tương lai. 1 số người chỉ nuôi Koi bằng đam mê
        không đủ quan hệ rộng để trao đổi, bán các em koi đẹp. Vì vậy OnKoi –
        Quang Minh áp dụng chính sách Ký gửi cá Koi – Bán cá Koi hộ.
      </p>
      <br></br>
      <p>
        Tuy nhiên, chúng tôi có những nguyên tắc và quy trình ký gửi nghiêm
        ngặt. Đảm bảo bán những em Koi đúng giá trị tới những người đam mê nuôi
        Koi.
      </p>
      <br></br>
      <p className="highlight-text">Quy trình ký gửi cá Koi</p>
      <ul>
        <li>
          Ký gửi cá Koi offline: Người cần kí gửi cung cấp thông tin Koi cần kí
          gửi bằng: hình ảnh, video, giấy chứng nhận…
        </li>
        <li>
          Ký gửi cá Koi online: Người cần kí gửi đã có thông tin, hình ảnh,
          video, giấy chứng nhận chi tiết của Koi cần kí gửi đăng tải trên hệ
          thống websire/ phần mềm lưu trữ thông tin.
        </li>
      </ul>
    </div>
  );

  const fullContent = (
    <div>
      <p>
        99% người nuôi cá Koi đều mong em koi của mình được “gả” vào gia đình
        tốt, đảm bảo cuộc sống, tương lai. 1 số người chỉ nuôi Koi bằng đam mê
        không đủ quan hệ rộng để trao đổi, bán các em koi đẹp. Vì vậy OnKoi –
        Quang Minh áp dụng chính sách Ký gửi cá Koi – Bán cá Koi hộ.
      </p>
      <br></br>
      <p>
        Tuy nhiên, chúng tôi có những nguyên tắc và quy trình ký gửi nghiêm
        ngặt. Đảm bảo bán những em Koi đúng giá trị tới những người đam mê nuôi
        Koi.
      </p>
      <br></br>
      <p className="highlight-text">Quy trình ký gửi cá Koi</p>
      <ul>
        <li>
          Ký gửi cá Koi offline: Người cần kí gửi cung cấp thông tin Koi cần kí
          gửi bằng: hình ảnh, video, giấy chứng nhận…
        </li>
        <li>
          Ký gửi cá Koi online: Người cần kí gửi đã có thông tin, hình ảnh,
          video, giấy chứng nhận chi tiết của Koi cần kí gửi đăng tải trên hệ
          thống websire/ phần mềm lưu trữ thông tin.
        </li>
      </ul>
      <h3>Lưu ý:</h3>
      <p>
        Ký gửi cá Koi Offline phù hợp với người nuôi Koi chưa có website, chưa
        có phần mềm quản lý dữ liệu Koi chuyên nghiệp. Các khách này đặc trưng
        chỉ đam mê nuôi Koi, tham gia các hội Koi trên diễn đàn xã hội. Ký gửi
        Koi để muốn nâng cấp Koi khác, thay đổi kế hoạch cá nhân. Ký gửi koi
        Online là những người nuôi koi để kinh doanh, có hệ thống website, các
        phần mềm dữ liệu (mức độ chuyên nghiệp tùy quy mô). Cần mở rộng mạng
        lưới khách hàng nên mang ký gửi tại các Koi Farm lớn.
      </p>
      <p className="highlight-text">
        Dù áp dụng phương pháp ký gửi nào cũng phải thực hiện đúng quy trình
        dưới đây:
      </p>

      <ul>
        <li>
          Bước 1: Chụp ảnh chi tiết Koi cần kí gửi, cung cấp video Koi ký gửi
          thể hiện tình trạng Koi.
        </li>
        <li>
          Bước 2: Cung cấp thông tin: Tên, tuổi, giới tính, nguồn gốc, chủng
          loại, tính cách, lượng thực ăn/ngày. Các bệnh đã từng bị (nếu có).
          Cung cấp giấy chứng nhận
        </li>
        <li>
          Bước 3: The Koi Shop trực tiếp đến kiểm tra Koi (nếu thấy cần thiết).
        </li>
        <li>
          Bước 4: 2 bên thương thảo hợp đồng ký gửi dựa trên mong muốn, yêu cầu,
          mức giá ký gửi khách hàng đưa ra.
        </li>
        <li>
          Bước 5: Ký hợp đồng ký gửi (nếu thành công). Kể từ khi ký gửi thành
          công khách hàng phải đảm bảo cá khỏe mạnh như cam kết.
        </li>
        <li>
          Bước 6: Khi OnKoi – Quang Minh tìm được người có nhu cầu mua, hỗ trợ
          trực tiếp khách đến xem cá. Care đến khi chốt xong mua cá hay không.
        </li>
        <li>
          Bước 7: cá bán thành công. Hợp đồng ký gửi kết thúc. Khách chịu trách
          nhiệm với người mua cá Koi về chất lượng, chế độ bảo hành cá sau này.
        </li>
      </ul>
      <p className="highlight-text">Chính sách Ký gửi cá Koi</p>
      <ul>
        <li>
          Thứ nhất: Chỉ nhận Koi khỏe mạnh, không bệnh tật, đủ phẩm chất, có giá
          trị. Kích thước tùy từng dòng (không nhận koi baby, koi mini, koi
          giống), trung bình từ 35 – 90 cm.
        </li>
        <li>
          Thứ 2: Koi phải có giấy chứng nhận, ưu tiên các Koi thuần chủng tại
          Nhật Bản. Có nguồn gốc từ các Koi Farm lớn tại Nhật.
        </li>
        <li>
          Thứ 3: Khách hàng ký gửi chịu hoàn toàn trách nhiệm về chất lượng Koi,
          giấy chứng nhận Koi, tuổi Koi, sức khỏe Koi.
        </li>
        <li>
          Thứ 4: Chúng tôi cam kết cung cấp thông tin về tình trạng cá Koi của
          bạn trung thực, đầy đủ. Hỗ trợ, hướng dẫn khách hàng muốn mua Koi chi
          tiết, cụ thể, giúp Koi có cuộc sống tốt nhất trong tương lai.
        </li>
        <li>
          Thứ 5: Hỗ trợ định giá lại giá trị của Koi đúng với thực tế thị
          trường, nhu cầu của khách
        </li>
        <li>Thứ 6: Chi phí ký gửi hợp lý, phù hợp với giá trị Koi.</li>
        <li>
          Thứ 7: Tất cả các khách ký gửi Koi phải thực hiện đúng theo quy trình
          như trên.
        </li>
      </ul>
      <p className="highlight-text">Ý nghĩa của việc ký gửi cá Koi</p>
      <ul></ul>
      <li>
        <span className="bold">Phổ biến tại Nhật Bản: </span>Đây là dịch vụ rất
        phổ biến tại Nhật Bản. Khách mua Koi 1 em koi nhưng vì 1 lý do nào đó
        chưa thể đưa em ấy về nuôi, khách ký gửi tại hồ nuôi. Phổ biến hơn là
        khách có Koi cần bán, nhưng mạng lưới bán hàng không lớn, người nuôi Koi
        đưa Koi đến hồ nuôi, Koi farm lớn hơn ký gửi. Tại Nhật chi phí ký gửi
        Koi thường khá lớn. Bao gồm nhiều các điều khoản ràng buộc, bồi thường.
      </li>
      <br></br>
      <li>
        <span className="bold">Bắt đầu nở rộ tại Việt Nam: </span> Người chơi
        Koi muốn nâng cấp Koi, mở rộng hồ Koi, đàn Koi… nhưng không đủ năng lực
        tìm người muốn mua koi của mình. Vì vậy, họ tìm đến các dịch vụ kí gửi
        tại các Koi Farm lớn, có hồ nuôi chuyên nghiệp, được đông đảo người chơi
        Koi biết đến.
      </li>
      <br></br>
      <p>
        The Koi Shop là trang trại cá Koi với hệ thống hồ nuôi chuyên nghiệp.
        Nằm giữa lòng Hà Nội, hồ nuôi được thiết kế theo phong cách thủy cung có
        đường xuống ngắm koi trong hồ. Chủ hồ nuôi là người có đam mêm Koi thực
        thụ, chuyên viên phụ trách hồ koi là Kỹ sư Thủy Sản được đào tạo bài
        bản. Hệ thống marketing, truyền thông lớn, được đông đảo người chơi Koi
        biết đến.
      </p>
      <p className="highlight-text">Chúng tôi cam kết:</p>
      <ul>
        <li>
          100% giống F0 và F1 có nguồn gốc từ những trại nổi tiếng như Daihichi
          Koi Farm
        </li>
        <li>
          Koi đã được sàng lọc và tuyển chọn kỹ theo tỷ lệ 300 / 10000 con (cứ
          10000 Koi thì chỉ chọn được 300 con.
        </li>
        <li>
          Cung cấp đầy đủ kiến thức chăm sóc Cá Koi, kỹ thuật chăm cá, thiết kế
          thi công hồ nuôi trước khi bán các em Koi cho quí vị.
        </li>
        <li>
          Chỉ bán các em Koi chất lượng khi hồ của quí vị đã đạt tiêu chuẩn, đảm
          bảo cuộc sống tốt nhất cho em koi trong tương lai.
        </li>
        <li>
          Cách thiết kế và xây dựng hồ cá Koi chuẩn 100%, cách nuôi và chăm sóc
          cá Koi, xử lý khi cá bị bệnh…
        </li>
      </ul>
      <p className="highlight-text">
        Lưu ý: Đối với Koi baby đảm bảo khách NUÔI CÓ TƯƠNG LAI, không vỡ, không
        lên màu, body chuẩn
      </p>
      <ul>
        <li>
          Sẵn sàng cung cấp hình ảnh video chi tiết từng chi tiết nhỏ và nguồn
          gốc xuất xứ của từng em Koi trước khi khách quyết định mua.
        </li>
        <li>Cam kết bồi thường đền bù gấp 10 lần giá trị cá.</li>
      </ul>
      <p className="highlight-text">Về bảo hành Koi:</p>
      <ul>
        <li>Nếu khách tự làm hồ, tự mua tự thả, được bảo hành từ 2-5 ngày.</li>
        <li>
          Đối với khách có hồ đạt chuẩn, được đầu tư có bài bản hệ thống đã thả
          cá ổn định, chúng tôi sẵn sàng bảo hành Koi dài hạn.
        </li>
        <li>Tư vấn miễn phí các bệnh về Koi</li>
      </ul>
      <p className="highlight-text">Mọi chi tiết xin vui lòng liên hệ: </p>
      <ul>
        <p className="bold">The Koi Shop</p>
        <li>Địa chỉ: Quận 9, Thành Phố Hồ Chí Minh</li>
        <li>Số điện thoại: 0123456789 </li>
        <li>Email: koishop@gmail.com</li>
      </ul>
    </div>
  );

  
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="content-container">
      <h1 className="yellow">Ký gửi</h1>
      {isExpanded ? fullContent : shortContent}
      <button onClick={handleToggle} className="toggle-btn">
        {isExpanded ? "Thu gọn" : "Xem thêm"}
      </button>
    </div>
  );
};

export default ConsignmentContent;
