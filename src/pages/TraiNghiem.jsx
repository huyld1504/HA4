import React, { useState, useEffect, useRef, useMemo } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import ImageModal from "../components/ImageModal";

// Import ảnh từ thư mục assets
import hoanKiem from "../assets/hoankiem.jpg";
import diaDao from "../assets/diadao.png";
import ceo from "../assets/ceo.jpg";
import filterIcon from "../assets/filter.png";
import halongImg from "../assets/halong.jpg";

// Import ảnh địa danh
import DinhDocLap from "../assets/Dinh Độc Lập.png";
import diadaocuchi from "../assets/địa đạo Củ Chi.png";
import giongcavo from "../assets/giongcavo.png";
import logomcohungloi from "../assets/logomcohungloi.jpg";
import dienngochoang from "../assets/dienngochoang.png";
import mieuthienhau from "../assets/mieuthienhau.png";
import toaannhandan from "../assets/toaannhandan.png";
import baotanglichsu from "../assets/baotangthanhpho.png";
/* ==============================
   DỮ LIỆU ĐỊA DANH (BỔ SUNG province + year)
   ============================== */
const defaultYearByPeriod = (p) => {
  switch (p) {
    case "Hùng Vương":
      return 500; // ước lệ
    case "Lý":
      return 1050;
    case "Trần":
      return 1300;
    case "Hồ":
      return 1400;
    case "Pháp thuộc":
      return 1900;
    case "Nguyễn":
      return 1830;
    case "Hiện đại":
      return 1975;
    default:
      return 2000;
  }
};

// --- DỮ LIỆU ĐỊA DANH VIỆT NAM (giữ nguyên + bổ sung "province" và "year" ước lệ) ---
const mapDataRaw = [
  // Di tích quốc gia đặc biệt
  {
    name: "Dinh Độc Lập",
    lat: 10.777141734059974,
    lng: 106.69522699878702,
    description:
      "Dinh Độc Lập là biểu tượng lịch sử quan trọng gắn với thời khắc giải phóng miền Nam 30/4/1975. Công trình mang nét kiến trúc độc đáo, từng là trung tâm đầu não của chính quyền Sài Gòn trước đây. Ngày nay, nơi đây trở thành điểm tham quan nổi tiếng, giúp du khách tìm hiểu về những dấu mốc quan trọng trong tiến trình thống nhất đất nước.",
    images: [DinhDocLap],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Địa đạo Củ Chi",
    lat: 11.146529521058183,
    lng: 106.45956874774421,
    description:
      "Địa đạo Củ Chi là hệ thống đường hầm ngầm kiên cố dài hàng trăm kilômét, được quân và dân ta xây dựng trong kháng chiến chống Mỹ. Công trình thể hiện ý chí kiên cường và sự sáng tạo của người Việt Nam trong chiến tranh. Đến đây, du khách có thể trải nghiệm không gian sinh hoạt, chiến đấu dưới lòng đất và hiểu hơn về tinh thần bất khuất của quân dân Củ Chi.",
    images: [diadaocuchi],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },

  // --- DI TÍCH QUỐC GIA (56) – TP.HCM --
  // Huyện Cần Giờ
  {
    name: "Giồng Cá Vồ",
    lat: 10.412385979077785, // 10.412385979077785, 106.92447840409623
    lng: 106.92447840409623,
    description:
      "Di chỉ khảo cổ học thời tiền sử, chứng tích cư dân cổ Nam Bộ.",
    images: [
      giongcavo
    ],
    period: "Tiền sử",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Lò gốm cổ Hưng Lợi",
    lat: 10.726118052881915, // 10.726118052881915, 106.62618359266747
    lng: 106.62618359266747,
    description:
      "Di tích lò gốm có niên đại hàng trăm năm, phản ánh quá trình phát triển nghề gốm truyền thống tại khu vực Nam Bộ. Đây là nơi từng sản xuất nhiều loại gốm gia dụng và trang trí, góp phần định hình đời sống văn hóa – kinh tế của cư dân địa phương.",
    images: [
      logomcohungloi
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận 1
  {
    name: "Điện Ngọc Hoàng",
    lat: 10.792175443368297, // 10.792175443368297, 106.69817910131295
    lng: 106.69817910131295,
    description:
      "Ngôi điện thờ mang kiến trúc đặc trưng Á Đông với nhiều họa tiết chạm trổ tinh xảo. Công trình từng là trung tâm sinh hoạt tín ngưỡng của cộng đồng người Hoa và người Việt tại Sài Gòn xưa, thể hiện sự giao thoa văn hóa lâu đời.",
    images: [
      dienngochoang
    ],
    period: "Pháp thuộc",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Miếu Thiên Hậu (Quảng Triệu Hội Quán)",
    lat: 10.756340006193135, // 10.756340006193135, 106.66084046155355
    lng: 106.66084046155355,
    description:
      "Miếu thờ Thiên Hậu Thánh Mẫu, là một trong những công trình tín ngưỡng quan trọng của cộng đồng người Hoa Quảng Triệu tại Sài Gòn. Kiến trúc miếu mang phong cách Hoa Nam đặc trưng cùng nhiều phù điêu, hoành phi, liễn đối cổ được bảo tồn nguyên vẹn.",
    images: [
      mieuthienhau
    ],
    period: "Pháp thuộc",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Tòa án Nhân dân TP.HCM",
    lat: 10.781626258160586,
    lng: 106.69743088555757,
    description:
      "Công trình kiến trúc mang phong cách Pháp thuộc, được xây dựng từ cuối thế kỷ XIX. Tòa nhà là một trong những dấu ấn tiêu biểu còn lại của thời kỳ đô thị hóa Sài Gòn trong thời thuộc địa, đồng thời hiện vẫn là cơ quan hành chính – tư pháp quan trọng của thành phố.",
    images: [
      toaannhandan
    ],
    period: "Pháp thuộc",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Bảo tàng Lịch sử TP.HCM",
    lat: 10.788275224177648,
    lng: 106.70472910149543,
    description:
      "Bảo tàng được xây dựng từ thời Pháp với kiến trúc pha trộn Á – Âu độc đáo. Nơi đây trưng bày hơn 40.000 hiện vật quý từ thời tiền sử đến cận đại, là kho tư liệu quan trọng về tiến trình lịch sử và văn hóa của miền Nam nói riêng và Việt Nam nói chung.",
    images: [
      baotanglichsu
    ],
    period: "Pháp thuộc",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận 10
  {
    name: "Đình Chí Hòa",
    lat: 10.781664146580408, // 10.781664146580408, 106.67321234627079
    lng: 106.67321234627079,
    description:
      "Đình Chí Hòa là một trong những ngôi đình cổ tiêu biểu của Sài Gòn, gắn liền với quá trình khai khẩn và hình thành vùng đất Gia Định xưa. Với kiến trúc truyền thống đậm nét Nam Bộ, ngôi đình thờ Thành Hoàng và lưu giữ nhiều giá trị văn hóa – tín ngưỡng của cộng đồng cư dân địa phương. Đây là điểm dừng chân lý tưởng để tìm hiểu đời sống tinh thần và lịch sử vùng đất Chí Hòa qua nhiều thế kỷ.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Pháp thuộc",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận 11
  {
    name: "Chùa Giác Viên",
    lat: 10.76329000042126, // 10.76329000042126, 106.63977861426329
    lng: 106.63977861426329,
    description:
      "Chùa Giác Viên là một trong những ngôi chùa cổ lâu đời nhất ở Sài Gòn, gắn với quá trình hình thành vùng đất Gia Định từ thế kỷ XVIII. Ngôi chùa mang kiến trúc truyền thống Nam Bộ với nhiều pho tượng gỗ, bao lam và hoành phi được chạm khắc tinh xảo. Không gian tĩnh lặng và cổ kính khiến nơi đây trở thành điểm dừng chân lý tưởng để tìm hiểu lịch sử Phật giáo và đời sống văn hóa tín ngưỡng của người dân Nam Bộ.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Chùa Phụng Sơn",
    lat: 10.781664146580408, // 10.781664146580408, 106.67321234627079
    lng: 106.67321234627079,
    description:
      "Chùa Phụng Sơn, còn gọi là chùa Gò, là ngôi chùa cổ nổi bật của Sài Gòn, được xây dựng vào thời Gia Long. Chùa lưu giữ nhiều di vật quý giá, đặc biệt là các tượng Phật bằng gỗ mang phong cách nghệ thuật dân gian đặc sắc. Với kiến trúc trang nghiêm và bầu không khí thanh tịnh, chùa Phụng Sơn là nơi giúp du khách cảm nhận rõ nét truyền thống Phật giáo và lịch sử hình thành vùng đất Gia Định xưa.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận 5
  {
    name: "Đình Minh Hương Gia Thạnh",
    lat: 10.752330144227848, // 10.752330144227848, 106.66126606339897
    lng: 106.66126606339897,
    description:
      "Chùa Phụng Sơn, còn gọi là chùa Gò, là ngôi chùa cổ nổi bật của Sài Gòn, được xây dựng vào thời Gia Long. Chùa lưu giữ nhiều di vật quý giá, đặc biệt là các tượng Phật bằng gỗ mang phong cách nghệ thuật dân gian đặc sắc. Với kiến trúc trang nghiêm và bầu không khí thanh tịnh, chùa Phụng Sơn là nơi giúp du khách cảm nhận rõ nét truyền thống Phật giáo và lịch sử hình thành vùng đất Gia Định xưa.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Hội quán Hà Chương",
    lat: 10.753478068153278, // 10.753478068153278, 106.65803810406284
    lng: 106.65803810406284,
    description:
      "Chùa Phụng Sơn, còn gọi là chùa Gò, là ngôi chùa cổ nổi bật của Sài Gòn, được xây dựng vào thời Gia Long. Chùa lưu giữ nhiều di vật quý giá, đặc biệt là các tượng Phật bằng gỗ mang phong cách nghệ thuật dân gian đặc sắc. Với kiến trúc trang nghiêm và bầu không khí thanh tịnh, chùa Phụng Sơn là nơi giúp du khách cảm nhận rõ nét truyền thống Phật giáo và lịch sử hình thành vùng đất Gia Định xưa.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Hội quán Nghĩa An",
    lat: 10.753986763702336, // 10.753986763702336, 106.66229058492084
    lng: 106.66229058492084,
    description:
      "Chùa Phụng Sơn, còn gọi là chùa Gò, là ngôi chùa cổ nổi bật của Sài Gòn, được xây dựng vào thời Gia Long. Chùa lưu giữ nhiều di vật quý giá, đặc biệt là các tượng Phật bằng gỗ mang phong cách nghệ thuật dân gian đặc sắc. Với kiến trúc trang nghiêm và bầu không khí thanh tịnh, chùa Phụng Sơn là nơi giúp du khách cảm nhận rõ nét truyền thống Phật giáo và lịch sử hình thành vùng đất Gia Định xưa.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Hội quán Nghĩa Nhuận",
    lat: 10.74953827505296, // 10.74953827505296, 106.65438651553954
    lng: 106.65438651553954,
    description:
      "Chùa Phụng Sơn, còn gọi là chùa Gò, là ngôi chùa cổ nổi bật của Sài Gòn, được xây dựng vào thời Gia Long. Chùa lưu giữ nhiều di vật quý giá, đặc biệt là các tượng Phật bằng gỗ mang phong cách nghệ thuật dân gian đặc sắc. Với kiến trúc trang nghiêm và bầu không khí thanh tịnh, chùa Phụng Sơn là nơi giúp du khách cảm nhận rõ nét truyền thống Phật giáo và lịch sử hình thành vùng đất Gia Định xưa.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Hội quán Ôn Lăng",
    lat: 10.754544354683357, // 10.754544354683357, 106.65970040571848
    lng: 106.65970040571848,
    description:
      "Chùa Phụng Sơn, còn gọi là chùa Gò, là ngôi chùa cổ nổi bật của Sài Gòn, được xây dựng vào thời Gia Long. Chùa lưu giữ nhiều di vật quý giá, đặc biệt là các tượng Phật bằng gỗ mang phong cách nghệ thuật dân gian đặc sắc. Với kiến trúc trang nghiêm và bầu không khí thanh tịnh, chùa Phụng Sơn là nơi giúp du khách cảm nhận rõ nét truyền thống Phật giáo và lịch sử hình thành vùng đất Gia Định xưa.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Hội quán Tuệ Thành",
    lat: 10.753478068153278, // 10.753478068153278, 106.65803810406284
    lng: 106.65803810406284,
    description:
      "Chùa Phụng Sơn, còn gọi là chùa Gò, là ngôi chùa cổ nổi bật của Sài Gòn, được xây dựng vào thời Gia Long. Chùa lưu giữ nhiều di vật quý giá, đặc biệt là các tượng Phật bằng gỗ mang phong cách nghệ thuật dân gian đặc sắc. Với kiến trúc trang nghiêm và bầu không khí thanh tịnh, chùa Phụng Sơn là nơi giúp du khách cảm nhận rõ nét truyền thống Phật giáo và lịch sử hình thành vùng đất Gia Định xưa.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Miếu Nhị Phủ",
    lat: 10.749725235571873, // 10.749725235571873, 106.65610268497856
    lng: 106.65610268497856,
    description:
      "Chùa Phụng Sơn, còn gọi là chùa Gò, là ngôi chùa cổ nổi bật của Sài Gòn, được xây dựng vào thời Gia Long. Chùa lưu giữ nhiều di vật quý giá, đặc biệt là các tượng Phật bằng gỗ mang phong cách nghệ thuật dân gian đặc sắc. Với kiến trúc trang nghiêm và bầu không khí thanh tịnh, chùa Phụng Sơn là nơi giúp du khách cảm nhận rõ nét truyền thống Phật giáo và lịch sử hình thành vùng đất Gia Định xưa.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Nhà thờ tổ thợ bạc",
    lat: 10.752160043321783, // 10.752160043321783, 106.65517647167837
    lng: 106.65517647167837,
    description:
      "Chùa Phụng Sơn, còn gọi là chùa Gò, là ngôi chùa cổ nổi bật của Sài Gòn, được xây dựng vào thời Gia Long. Chùa lưu giữ nhiều di vật quý giá, đặc biệt là các tượng Phật bằng gỗ mang phong cách nghệ thuật dân gian đặc sắc. Với kiến trúc trang nghiêm và bầu không khí thanh tịnh, chùa Phụng Sơn là nơi giúp du khách cảm nhận rõ nét truyền thống Phật giáo và lịch sử hình thành vùng đất Gia Định xưa.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Hội quán Quỳnh Phủ",
    lat: 10.752680088743366, // 10.752680088743366, 106.66355958600451
    lng: 106.66355958600451,
    description:
      "Chùa Phụng Sơn, còn gọi là chùa Gò, là ngôi chùa cổ nổi bật của Sài Gòn, được xây dựng vào thời Gia Long. Chùa lưu giữ nhiều di vật quý giá, đặc biệt là các tượng Phật bằng gỗ mang phong cách nghệ thuật dân gian đặc sắc. Với kiến trúc trang nghiêm và bầu không khí thanh tịnh, chùa Phụng Sơn là nơi giúp du khách cảm nhận rõ nét truyền thống Phật giáo và lịch sử hình thành vùng đất Gia Định xưa.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Thành phố thủ đức
  {
    name: "Chùa Hội Sơn",
    lat: "",
    lng: "",
    description:
      "Chùa Hội Sơn là một trong những ngôi chùa cổ nhất tại khu vực Thủ Đức, gắn với quá trình khai phá vùng đất Gia Định xưa. Chùa mang kiến trúc truyền thống mộc mạc và lưu giữ nhiều tượng Phật, pháp khí mang giá trị lịch sử – văn hóa đặc sắc. Đây là điểm đến thanh tịnh, phản ánh đời sống tín ngưỡng lâu đời của cư dân Nam Bộ.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Chùa Phước Tường",
    lat: "",
    lng: "",
    description:
      "Chùa Phước Tường là ngôi chùa cổ của vùng Tăng Nhơn Phú, mang phong cách kiến trúc truyền thống Nam Bộ. Trải qua nhiều lần trùng tu, chùa vẫn giữ được vẻ trang nghiêm cùng những di vật quý, thể hiện đời sống tâm linh phong phú của cộng đồng cư dân địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Trường Thọ",
    lat: "",
    lng: "",
    description:
      "Đình Trường Thọ là thiết chế tín ngưỡng gắn với quá trình hình thành khu vực Thủ Đức. Đình thờ Thành Hoàng và là nơi diễn ra các lễ hội truyền thống, phản ánh văn hóa cộng đồng người Việt trên vùng đất mới. Kiến trúc đình mang đậm dấu ấn Nam Bộ với các mảng chạm khắc mộc mạc.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Xuân Hiệp",
    lat: "",
    lng: "",
    description:
      "Đình Xuân Hiệp là ngôi đình cổ của cư dân vùng Linh Xuân, thờ Thành Hoàng và những bậc tiền hiền có công khai hoang lập ấp. Đình mang kiến trúc truyền thống đặc trưng, là nơi lưu giữ nhiều giá trị lịch sử – văn hóa của cộng đồng qua nhiều thế hệ.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Thần Linh Đông",
    lat: "",
    lng: "",
    description:
      "Đình Thần Linh Đông là di tích tiêu biểu của khu vực Linh Chiểu, thờ Thành Hoàng cùng các vị thần bảo hộ làng xã. Với kiến trúc truyền thống và các nghi lễ được duy trì qua nhiều đời, đình là điểm hội tụ đời sống văn hóa – tín ngưỡng của cư dân địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận Bình Thạnh
  {
    name: "Đình Bình Hòa",
    lat: "",
    lng: "",
    description:
      "Đình Bình Hòa là ngôi đình cổ của vùng Bình Thạnh, thờ Thành Hoàng và ghi dấu sự định cư sớm của cư dân Gia Định. Không gian kiến trúc mộc mạc, gắn với các lễ hội truyền thống, tạo nên giá trị văn hóa đặc trưng của cộng đồng người Việt tại khu vực này.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Lăng Lê Văn Duyệt",
    lat: "",
    lng: "",
    description:
      "Lăng Lê Văn Duyệt, hay còn gọi là Lăng Ông Bà Chiểu, là nơi an táng Tả quân Lê Văn Duyệt – một vị tướng tài ba thời Nguyễn. Quần thể lăng mang kiến trúc uy nghi, hòa quyện yếu tố truyền thống và nghệ thuật trang trí tinh xảo. Đây là di tích lịch sử – văn hóa đặc biệt quan trọng của TP. Hồ Chí Minh.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận Gò Vấp
  {
    name: "Chùa Sắc tứ Trường Thọ",
    lat: "",
    lng: "",
    description:
      "Chùa Sắc tứ Trường Thọ là ngôi chùa cổ tại Gò Vấp, có lịch sử gắn liền với quá trình khẩn hoang của cư dân vùng Gia Định. Chùa mang kiến trúc truyền thống đơn sơ, lưu giữ nhiều tượng Phật và pháp khí quý giá. Đây là nơi sinh hoạt tín ngưỡng quan trọng của cộng đồng Phật tử địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Thông Tây Hội",
    lat: "",
    lng: "",
    description:
      "Đình Thông Tây Hội được xem là một trong những ngôi đình cổ nhất Sài Gòn, có lịch sử hơn 300 năm. Đình thờ Thành Hoàng và các bậc tiền hiền khai hoang lập ấp. Không gian kiến trúc truyền thống cùng các lễ hội thường niên tạo nên giá trị văn hóa đặc sắc cho cộng đồng cư dân Gò Vấp.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận Phú Nhuận
  {
    name: "Đình Phú Nhuận",
    lat: "",
    lng: "",
    description:
      "Đình Phú Nhuận là di tích tín ngưỡng quan trọng của cư dân vùng Phú Nhuận, thờ Thành Hoàng và ghi nhận công lao của các bậc tiền hiền. Đình mang kiến trúc truyền thống đặc trưng, là nơi diễn ra nhiều lễ hội dân gian gắn với đời sống cộng đồng.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Lăng Trương Tấn Bửu",
    lat: "",
    lng: "",
    description:
      "Lăng Trương Tấn Bửu là nơi an táng Trương Tấn Bửu – một danh tướng triều Nguyễn nổi tiếng về tài thao lược. Khu lăng mang kiến trúc trang trọng, lưu giữ nhiều giá trị lịch sử gắn với thời kỳ mở mang vùng đất Gia Định. Đây là địa chỉ văn hóa – lịch sử quan trọng của quận Phú Nhuận.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Lăng Võ Di Nguy",
    lat: "",
    lng: "",
    description:
      "Lăng Võ Di Nguy là nơi thờ và tưởng niệm Võ Di Nguy, một vị tướng tài thời Nguyễn có công lớn trong việc bảo vệ và củng cố vùng đất Gia Định. Công trình mang kiến trúc cổ kính, là dấu tích quan trọng phản ánh lịch sử hình thành và phát triển của khu vực Tân Bình.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận Tân Bình
  {
    name: "Chùa Giác Lâm",
    lat: "",
    lng: "",
    description:
      "Chùa Giác Lâm là một trong những ngôi chùa cổ lâu đời nhất tại TP. Hồ Chí Minh, xây dựng vào giữa thế kỷ XVIII. Chùa nổi bật với kiến trúc truyền thống, nhiều pho tượng cổ cùng các bao lam chạm khắc tinh xảo. Đây là di tích văn hóa – lịch sử quan trọng, gắn với sự phát triển Phật giáo ở Nam Bộ.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Di tích lịch sử (24)
  // Huyện Cần Giờ
  {
    name: "Căn cứ Rừng Sác",
    lat: "",
    lng: "",
    description:
      "Căn cứ Rừng Sác là địa danh gắn liền với lực lượng Đặc công Rừng Sác trong kháng chiến chống Mỹ. Nơi đây từng là vùng rừng ngập mặn hiểm trở, đóng vai trò chiến lược quan trọng trong nhiều trận đánh nổi bật. Hiện nay, khu căn cứ được bảo tồn như một di tích lịch sử, giúp du khách tìm hiểu tinh thần quả cảm của bộ đội đặc công.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Huyện Hóc Môn
  {
    name: "Dinh Quận Hóc Môn",
    lat: "",
    lng: "",
    description:
      "Dinh Quận Hóc Môn là một công trình hành chính cổ của vùng Hóc Môn, gắn với quá trình hình thành và quản lý địa phương từ thời Pháp thuộc đến hiện đại. Công trình được gìn giữ như một phần ký ức đô thị, phản ánh lịch sử phát triển của vùng đất Hóc Môn.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Pháp thuộc",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Ngã Ba Giồng",
    lat: "",
    lng: "",
    description:
      "Ngã Ba Giồng là địa điểm lịch sử nổi tiếng, nơi thực dân Pháp đã xử bắn nhiều chiến sĩ yêu nước trong thời kỳ đầu kháng chiến. Hiện nay, khu vực được xây dựng thành khu tưởng niệm trang nghiêm, là biểu tượng cho tinh thần kiên trung và sự hy sinh của các chiến sĩ cách mạng.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận 1
  {
    name: "Địa điểm lưu niệm Chủ tịch Tôn Đức Thắng (Ba Son)",
    lat: "",
    lng: "",
    description:
      "Địa điểm lưu niệm Chủ tịch Tôn Đức Thắng tại khu vực Ba Son ghi dấu sự nghiệp hoạt động của ông trong phong trào công nhân Sài Gòn. Đây là nơi ông từng làm việc và tham gia vận động cách mạng. Khu lưu niệm góp phần tôn vinh cuộc đời và sự nghiệp của vị lãnh đạo xuất sắc của giai cấp công nhân Việt Nam.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Nơi thành lập An Nam Cộng sản Đảng năm 1929",
    lat: "",
    lng: "",
    description:
      "Nơi thành lập An Nam Cộng sản Đảng năm 1929 là di tích quan trọng, đánh dấu bước ngoặt trong phong trào cách mạng Việt Nam. Sự kiện thành lập tại đây đã góp phần hình thành nền tảng tư tưởng và tổ chức dẫn tới sự ra đời của Đảng Cộng sản Việt Nam. Di tích lưu giữ dấu ấn lịch sử của phong trào đấu tranh giải phóng dân tộc.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Nơi thành lập Kỳ bộ Việt Nam Thanh niên Đồng chí Hội",
    lat: "",
    lng: "",
    description:
      "Địa điểm gắn với quá trình hình thành Kỳ bộ Việt Nam Thanh niên Đồng chí Hội – một tổ chức cách mạng quan trọng trong những năm đầu thế kỷ XX. Đây là nơi diễn ra nhiều hoạt động tuyên truyền và phát triển phong trào yêu nước tại Sài Gòn.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Tòa đại sứ quán Mỹ (nay là Tổng Lãnh sự quán Hoa Kỳ)",
    lat: "",
    lng: "",
    description:
      "Tòa đại sứ quán Mỹ trước năm 1975, nay là Tổng Lãnh sự quán Hoa Kỳ tại TP. Hồ Chí Minh. Công trình gắn liền với nhiều sự kiện quan trọng trong giai đoạn cuối của chiến tranh Việt Nam, là một trong những địa danh lịch sử tiêu biểu tại trung tâm Quận 1.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Trụ sở báo Dân Chúng",
    lat: "",
    lng: "",
    description:
      "Trụ sở báo Dân Chúng từng là cơ quan ngôn luận của phong trào cách mạng Sài Gòn – Chợ Lớn thời kỳ trước Cách mạng Tháng Tám. Báo có vai trò lớn trong tuyên truyền tinh thần yêu nước và đấu tranh chống áp bức.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận 10
  {
    name: "Cơ sở in ấn của Hội Ủng hộ Vệ quốc đoàn",
    lat: "",
    lng: "",
    description:
      "Cơ sở bí mật chuyên in ấn tài liệu tuyên truyền và hỗ trợ lực lượng Vệ quốc đoàn trong những năm đầu của cuộc kháng chiến. Đây là điểm tựa quan trọng của phong trào cách mạng tại nội thành Sài Gòn.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Hầm bí mật chứa vũ khí thời kháng chiến chống Mỹ",
    lat: "",
    lng: "",
    description:
      "Hầm bí mật được dùng để cất giấu vũ khí, tài liệu và phương tiện chiến đấu của lực lượng cách mạng trong kháng chiến chống Mỹ. Công trình được xây dựng ngay trong khu dân cư, thể hiện sự mưu trí và tinh thần chiến đấu của quân dân Sài Gòn.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận 3
  {
    name: "Cơ sở Ban Tuyên huấn Xứ ủy Nam Bộ",
    lat: "",
    lng: "",
    description:
      "Cơ sở hoạt động bí mật của Ban Tuyên huấn Xứ ủy Nam Bộ, nơi diễn ra các hoạt động sản xuất tài liệu, truyền đơn và tổ chức liên lạc phục vụ phong trào cách mạng tại Sài Gòn – Gia Định trong thời kỳ kháng chiến.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Cơ sở giấu vũ khí của Biệt động Thành đánh Dinh Độc Lập",
    lat: "",
    lng: "",
    description:
      "Cơ sở bí mật của lực lượng Biệt động Thành, nơi cất giấu vũ khí phục vụ cuộc tấn công Dinh Độc Lập trong những năm cuối của cuộc kháng chiến chống Mỹ. Đây là di tích quan trọng phản ánh tinh thần chiến đấu quả cảm và tổ chức chặt chẽ của lực lượng biệt động.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Sở Chỉ huy tiền phương Phân khu 6 trong chiến dịch Mậu Thân 1968",
    lat: "",
    lng: "",
    description:
      "Địa điểm từng là sở chỉ huy tiền phương của Phân khu 6 trong cuộc Tổng tiến công và nổi dậy Mậu Thân 1968. Đây là nơi chỉ đạo nhiều trận đánh quan trọng trong nội đô, góp phần làm nên sự kiện lịch sử mang tính bước ngoặt.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận 5
  {
    name: "Khu trại giam bệnh viện Chợ Quán – nơi đồng chí Trần Phú hy sinh",
    lat: "",
    lng: "",
    description:
      "Khu trại giam trong bệnh viện Chợ Quán là nơi Tổng Bí thư Trần Phú bị giam giữ và hy sinh năm 1931. Di tích là minh chứng về tinh thần kiên trung của người chiến sĩ cộng sản trong giai đoạn đấu tranh gian khổ chống thực dân.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Nơi đồng chí Nguyễn Tất Thành ở trước khi ra đi tìm đường cứu nước",
    lat: "",
    lng: "",
    description:
      "Địa điểm ghi dấu quãng thời gian Nguyễn Tất Thành ở Sài Gòn trước khi rời Tổ quốc vào năm 1911. Đây là dấu mốc quan trọng trong hành trình tìm đường cứu nước, mở đầu cho sự nghiệp cách mạng của Chủ tịch Hồ Chí Minh.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận 6
  {
    name: "Hầm bí mật in tài liệu Ban Tuyên huấn Hoa vận",
    lat: "",
    lng: "",
    description:
      "Hầm bí mật in tài liệu của Ban Tuyên huấn Hoa vận được sử dụng trong kháng chiến chống Mỹ để in ấn truyền đơn, tài liệu cách mạng. Công trình nằm ẩn trong khu dân cư, thể hiện sự mưu trí và tinh thần kiên cường của lực lượng hoạt động nội thành.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận 8
  {
    name: "Đình Bình Đông",
    lat: "",
    lng: "",
    description:
      "Đình Bình Đông là ngôi đình cổ ở khu vực Cù lao Bà Tàng, gắn với tín ngưỡng thờ Thành Hoàng và đời sống văn hóa của cư dân vùng sông nước. Đình mang kiến trúc truyền thống Nam Bộ và là nơi tổ chức nhiều lễ hội dân gian đặc sắc.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Thành phố Thủ Đức
  {
    name: "Bót Dây Thép",
    lat: "",
    lng: "",
    description:
      "Bót Dây Thép là một trạm kiểm soát và cơ sở hành chính của chính quyền Sài Gòn cũ. Đây từng là địa điểm chứng kiến nhiều biến động trong giai đoạn chiến tranh, mang giá trị lịch sử về quản lý, an ninh và phong trào đấu tranh đô thị.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Phong Phú",
    lat: "",
    lng: "",
    description:
      "Đình Phong Phú là công trình thờ Thành Hoàng và các bậc tiền hiền khai phá vùng đất Tăng Nhơn Phú. Với kiến trúc truyền thống cùng giá trị văn hóa lâu đời, đình là trung tâm sinh hoạt tín ngưỡng của cộng đồng địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận Gò Vấp
  {
    name: "Tịnh xá Ngọc Phương",
    lat: "",
    lng: "",
    description:
      "Tịnh xá Ngọc Phương là ngôi tịnh xá có kiến trúc trang nhã, là nơi tu học và sinh hoạt Phật giáo của Ni giới. Công trình mang dấu ấn kiến trúc đặc trưng của Hệ phái Khất sĩ và có vai trò quan trọng trong đời sống tín ngưỡng cộng đồng.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận Phú Nhuận
  {
    name: "Trụ sở Phái đoàn liên lạc Quân đội Nhân dân Việt Nam (1955–1958)",
    lat: "",
    lng: "",
    description:
      "Trụ sở của Phái đoàn liên lạc Quân đội Nhân dân Việt Nam cạnh Phân ban Quốc tế giám sát đình chiến giai đoạn 1955–1958. Đây là địa điểm quan trọng trong việc duy trì hoạt động ngoại giao quân sự sau Hiệp định Genève.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận Tân Bình
  {
    name: "Mộ Phan Châu Trinh",
    lat: "",
    lng: "",
    description:
      "Mộ Phan Châu Trinh là nơi an táng nhà chí sĩ yêu nước nổi tiếng đầu thế kỷ XX. Khu mộ mang kiến trúc giản dị, là không gian tưởng niệm nhân vật có đóng góp lớn cho phong trào cải cách và tinh thần dân chủ.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Trại Đa-vít",
    lat: "",
    lng: "",
    description:
      "Trại Đa-vít là nơi đóng quân của Phái đoàn liên lạc Quân Giải phóng miền Nam Việt Nam tại sân bay Tân Sơn Nhất trong giai đoạn 1973–1975. Đây là di tích quan trọng, chứng kiến những hoạt động ngoại giao quân sự trong thời kỳ cuối chiến tranh.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận Tân Phú
  {
    name: "Địa đạo Phú Thọ Hòa",
    lat: "",
    lng: "",
    description:
      "Địa đạo Phú Thọ Hòa là hệ thống đường hầm bí mật được xây dựng để phục vụ hoạt động cách mạng tại nội thành Sài Gòn. Công trình thể hiện sự sáng tạo và tinh thần chiến đấu kiên cường của lực lượng cách mạng trong kháng chiến chống Pháp.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Di tích cấp Thành Phố
  // Di tích Nghệ Thuật
  // Huyện Bình Chánh
  {
    name: "Đình Bình Trường",
    lat: "",
    lng: "",
    description:
      "Đình Bình Trường là địa điểm tín ngưỡng của cư dân vùng Bình Chánh, thờ Thành Hoàng và những vị tiền hiền có công khai phá đất đai. Đình mang kiến trúc truyền thống Nam Bộ và là nơi tổ chức nhiều lễ hội văn hóa dân gian.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Phú Lạc",
    lat: "",
    lng: "",
    description:
      "Đình Phú Lạc là di tích tín ngưỡng quan trọng của xã Phong Phú, nơi người dân thờ phụng Thành Hoàng và duy trì các lễ hội truyền thống. Không gian đình giữ được nét mộc mạc đặc trưng của kiến trúc đình làng Nam Bộ.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Nhà cổ dân dụng TP. Hồ Chí Minh",
    lat: "",
    lng: "",
    description:
      "Ngôi nhà cổ tại An Phú Tây là mẫu kiến trúc dân dụng truyền thống còn được bảo tồn nguyên vẹn, phản ánh đời sống sinh hoạt của người dân vùng ven Sài Gòn xưa. Công trình mang giá trị văn hoá và kiến trúc độc đáo.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Huyện Củ Chi
  {
    name: "Chùa Linh Sơn",
    lat: "",
    lng: "",
    description:
      "Chùa Linh Sơn là ngôi chùa lâu đời tại xã Phú Hòa Đông, mang kiến trúc Phật giáo truyền thống và là nơi tu học, sinh hoạt tâm linh của Phật tử địa phương. Chùa giữ nhiều giá trị văn hóa – lịch sử của vùng đất Củ Chi.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Xóm Huế",
    lat: "",
    lng: "",
    description:
      "Đình Xóm Huế là điểm sinh hoạt tín ngưỡng của cộng đồng xã Tân An Hội, nơi thờ Thành Hoàng và các vị tiền hiền. Đình kiến trúc giản dị, mang đậm phong cách đình làng Nam Bộ, gắn liền với đời sống văn hóa của người dân.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Huyện Cần Giờ
  {
    name: "Đình Cần Thạnh",
    lat: "",
    lng: "",
    description:
      "Đình Cần Thạnh là một trong những công trình tín ngưỡng tiêu biểu của vùng Cần Giờ, thờ Thành Hoàng và ghi dấu quá trình định cư lâu đời của cư dân ven biển. Đình là nơi diễn ra các lễ hội truyền thống mang đậm bản sắc địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Lăng Ông Thủy Tướng",
    lat: "",
    lng: "",
    description:
      "Lăng Ông Thủy Tướng ở thị trấn Cần Thạnh gắn liền với tín ngưỡng thờ cá Ông của ngư dân miền biển. Công trình mang nét kiến trúc dân gian độc đáo và là địa điểm tổ chức lễ hội Nghinh Ông nổi tiếng của Cần Giờ.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Huyện Hóc Môn
  {
    name: "Đình Tân Thới Nhì",
    lat: "",
    lng: "",
    description:
      "Đình Tân Thới Nhì là nơi thờ Thành Hoàng và các bậc tiền hiền khai khẩn vùng Hóc Môn. Đình mang kiến trúc truyền thống và là nơi sinh hoạt văn hóa quan trọng của cộng đồng địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Tân Thới Tứ",
    lat: "",
    lng: "",
    description:
      "Đình Tân Thới Tứ nằm trong vùng Thới Tam Thôn, là công trình tín ngưỡng gắn với quá trình định cư của cư dân địa phương. Đình là nơi tổ chức nhiều lễ hội truyền thống và giữ gìn các giá trị văn hóa dân gian.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Tân Thới Nhứt",
    lat: "",
    lng: "",
    description:
      "Đình Tân Thới Nhứt là ngôi đình cổ thờ Thành Hoàng, gắn liền với lịch sử hình thành làng quê vùng Bà Điểm. Công trình là trung tâm sinh hoạt tín ngưỡng và văn hóa của cư dân địa phương, lưu giữ nhiều giá trị truyền thống.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Thới Tam Thôn",
    lat: "",
    lng: "",
    description:
      "Đình Thới Tam Thôn là nơi thờ Thành Hoàng và ghi dấu quá trình khai phá vùng Thới Tam Thôn của cư dân xưa. Đình mang kiến trúc truyền thống Nam Bộ và là trung tâm sinh hoạt văn hóa của cộng đồng địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Ngã tư Bảy Hiền",
    lat: "",
    lng: "",
    description:
      "Ngã tư Bảy Hiền là địa điểm lịch sử gắn với cuộc đấu tranh của quân dân Sài Gòn trong kháng chiến chống Pháp và chống Mỹ. Đây từng là khu vực diễn ra nhiều hoạt động quân sự và phong trào đấu tranh của lực lượng cách mạng.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Tân Thới Tây",
    lat: "",
    lng: "",
    description:
      "Đình Tân Thới Tây thờ Thành Hoàng và những vị tiền hiền có công lập nên vùng đất Tân Thới. Công trình giữ được nét kiến trúc truyền thống và là nơi tổ chức các lễ hội văn hóa dân gian của cư dân địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Trung Mỹ Tây",
    lat: "",
    lng: "",
    description:
      "Đình Trung Mỹ Tây nằm trong vùng Trung Mỹ Tây, là nơi thờ Thành Hoàng và các bậc tiền hiền. Với kiến trúc giản dị cùng không gian truyền thống, đình là điểm sinh hoạt văn hóa quan trọng của người dân địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Tân Bình",
    lat: "",
    lng: "",
    description:
      "Đình Tân Bình là công trình thờ tự lâu đời, gắn liền với sự hình thành vùng đất Tân Bình. Đình là nơi người dân tổ chức nhiều lễ hội đặc trưng của Nam Bộ và lưu giữ các giá trị kiến trúc – tín ngưỡng truyền thống.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Chùa Từ Quang",
    lat: "",
    lng: "",
    description:
      "Chùa Từ Quang là cơ sở Phật giáo quan trọng của thị trấn Hóc Môn. Chùa mang kiến trúc truyền thống và là nơi sinh hoạt tâm linh của đông đảo Phật tử địa phương, góp phần gìn giữ các giá trị văn hóa – tín ngưỡng của vùng.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Huyện Nhà Bè
  {
    name: "Đình Phú Xuân",
    lat: "",
    lng: "",
    description:
      "Đình Phú Xuân là ngôi đình tiêu biểu của huyện Nhà Bè, thờ Thành Hoàng và các vị tiền hiền có công khai phá vùng đất. Đình mang kiến trúc truyền thống Nam Bộ và là nơi tổ chức nhiều lễ hội văn hóa dân gian của địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận 1
  {
    name: "Đình Nam Chơn",
    lat: "",
    lng: "",
    description:
      "Đình Nam Chơn là ngôi đình cổ nằm tại trung tâm Quận 1, thờ Thành Hoàng cùng các vị tiền hiền. Với kiến trúc truyền thống đặc sắc, đình là điểm sinh hoạt tín ngưỡng và văn hóa của cộng đồng cư dân Tân Định từ nhiều thế hệ.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Nhơn Hòa",
    lat: "",
    lng: "",
    description:
      "Đình Nhơn Hòa nằm tại phường Cầu Ông Lãnh, là nơi thờ Thành Hoàng và tưởng niệm các bậc tiền hiền. Đình mang đậm dấu ấn văn hóa Nam Bộ và là một trong những thiết chế tín ngưỡng tiêu biểu của khu vực Chợ Lớn xưa.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Khách sạn Continental",
    lat: "",
    lng: "",
    description:
      "Khách sạn Continental được xây dựng từ cuối thế kỷ XIX dưới thời Pháp thuộc, là một trong những khách sạn cổ nhất tại Sài Gòn. Công trình mang kiến trúc châu Âu cổ điển và từng là nơi lui tới của nhiều chính khách, văn nghệ sĩ nổi tiếng. Đây là biểu tượng văn hóa – lịch sử quan trọng của trung tâm Quận 1.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Pháp thuộc",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Bảo tàng Mỹ thuật Thành phố Hồ Chí Minh",
    lat: "",
    lng: "",
    description:
      "Bảo tàng Mỹ thuật Thành phố Hồ Chí Minh là công trình kiến trúc Pháp thuộc mang phong cách Á – Âu kết hợp. Đây là nơi trưng bày nhiều bộ sưu tập mỹ thuật có giá trị, phản ánh lịch sử và sự phát triển nghệ thuật của thành phố.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Pháp thuộc",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Cầu Móng",
    lat: "",
    lng: "",
    description:
      "Cầu Móng được xây dựng cuối thế kỷ XIX dưới thời Pháp thuộc, là một trong những cây cầu sắt cổ nhất Sài Gòn. Cầu có kiến trúc độc đáo và từng chứng kiến sự phát triển của khu vực Bến Vân Đồn và trung tâm Quận 1.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Pháp thuộc",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Mộ cổ họ Lâm",
    lat: "",
    lng: "",
    description:
      "Mộ cổ họ Lâm là quần thể mộ cổ mang giá trị văn hóa – lịch sử, phản ánh phong tục mai táng của cư dân Sài Gòn xưa. Công trình được bảo tồn và là minh chứng cho đời sống tín ngưỡng truyền thống của cộng đồng người Hoa.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đền thờ Hùng Vương",
    lat: "",
    lng: "",
    description:
      "Đền thờ Hùng Vương tại Quận 1 được xây dựng để tưởng niệm các Vua Hùng, mang ý nghĩa tâm linh và văn hóa sâu sắc. Công trình mang phong cách kiến trúc truyền thống, là nơi tổ chức nhiều hoạt động kỷ niệm Giỗ Tổ Hùng Vương hàng năm.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Bệnh viện Nhi đồng 2",
    lat: "",
    lng: "",
    description:
      "Bệnh viện Nhi đồng 2 được xây dựng từ thời Pháp thuộc, nguyên là cơ sở y tế quan trọng của Sài Gòn. Với kiến trúc cổ điển châu Âu còn được lưu giữ, công trình có giá trị lịch sử và gắn với sự phát triển ngành y tế thành phố.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Pháp thuộc",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Trường THCS Võ Trường Toản",
    lat: "",
    lng: "",
    description:
      "Trường THCS Võ Trường Toản là cơ sở giáo dục lâu đời tại trung tâm Quận 1. Trường gắn liền với sự phát triển giáo dục đô thị và mang giá trị văn hóa – xã hội quan trọng đối với cộng đồng địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Trường THPT Chuyên Trần Đại Nghĩa",
    lat: "",
    lng: "",
    description:
      "Trường THPT Chuyên Trần Đại Nghĩa là một trong những trường trung học hàng đầu tại TP. Hồ Chí Minh, có lịch sử hình thành lâu đời và đóng góp lớn trong đào tạo học sinh giỏi. Công trình mang giá trị giáo dục và kiến trúc đô thị đặc trưng.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Thành phố Thủ Đức
  {
    name: "Nhà thờ Thủ Thiêm",
    lat: "",
    lng: "",
    description:
      "Nhà thờ Thủ Thiêm được xây dựng vào cuối thế kỷ XIX, là một trong những nhà thờ Công giáo cổ của khu vực Thủ Đức. Công trình có kiến trúc Gothic giản dị và gắn liền với cộng đồng giáo dân vùng Thủ Thiêm.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Pháp thuộc",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Tu viện Hội Dòng Mến Thánh Giá Thủ Thiêm",
    lat: "",
    lng: "",
    description:
      "Tu viện Mến Thánh Giá Thủ Thiêm là cơ sở Công giáo lâu đời, thành lập từ cuối thế kỷ XIX. Tu viện có vai trò quan trọng trong đời sống tôn giáo, giáo dục và từ thiện tại khu vực Thủ Thiêm.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Pháp thuộc",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Tăng Phú",
    lat: "",
    lng: "",
    description:
      "Đình Tăng Phú là ngôi đình cổ thờ Thành Hoàng và các vị tiền hiền của vùng Tăng Nhơn Phú. Đình mang kiến trúc truyền thống Nam Bộ và là nơi tổ chức các lễ hội văn hóa của cộng đồng địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Chùa Bửu Sơn",
    lat: "",
    lng: "",
    description:
      "Chùa Bửu Sơn là ngôi chùa có kiến trúc truyền thống, là nơi sinh hoạt tâm linh của Phật tử vùng Long Thạnh Mỹ. Chùa là một phần quan trọng trong đời sống văn hóa – tôn giáo địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Mộ ông Nghị viên đại tộc Đặng Tấn Xuân",
    lat: "",
    lng: "",
    description:
      "Khu mộ Đặng Tấn Xuân thuộc khuôn viên Học viện Chính trị tại Quận 9, là công trình mang giá trị lịch sử gắn liền với nhân vật có đóng góp quan trọng trong phong trào yêu nước và hoạt động xã hội đầu thế kỷ XX.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Chùa Thiên Phước",
    lat: "",
    lng: "",
    description:
      "Chùa Thiên Phước là ngôi chùa cổ có kiến trúc giản dị đặc trưng của vùng Thủ Đức. Chùa là nơi tu học và sinh hoạt tôn giáo của cộng đồng Phật tử địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Thần Linh Tây",
    lat: "",
    lng: "",
    description:
      "Đình Thần Linh Tây là ngôi đình cổ tại khu vực Thủ Đức, thờ Thành Hoàng và các bậc tiền hiền có công khai phá vùng đất. Đình có kiến trúc mộc mạc, mang đặc trưng tín ngưỡng Nam Bộ.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Mộ Tiền hiền Tạ Dương Minh",
    lat: "",
    lng: "",
    description:
      "Mộ Tiền hiền Tạ Dương Minh là nơi an táng một trong những người có công khai phá vùng đất Linh Chiểu. Khu mộ mang giá trị văn hóa – lịch sử và được người dân địa phương gìn giữ qua nhiều thế hệ.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Bình Thọ",
    lat: "",
    lng: "",
    description:
      "Đình Bình Thọ thờ Thành Hoàng và các vị tiền hiền của vùng Bình Thọ. Đình mang kiến trúc truyền thống và là nơi tổ chức nhiều lễ hội văn hóa đặc trưng của người dân Thủ Đức.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Chùa Sùng Đức",
    lat: "",
    lng: "",
    description:
      "Chùa Sùng Đức là ngôi chùa cổ có kiến trúc giản dị, gắn liền với đời sống tín ngưỡng của cư dân khu vực Trường Thọ. Chùa là nơi tu học và sinh hoạt tâm linh của Phật tử địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận 3
  {
    name: "Đình Xuân Hòa",
    lat: "",
    lng: "",
    description:
      "Đình Xuân Hòa thờ Thành Hoàng và các bậc tiền hiền của vùng Phường 7, Quận 3. Đình có kiến trúc truyền thống, là nơi diễn ra các lễ hội văn hóa đặc sắc của cộng đồng địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Miễu Thánh Mẫu",
    lat: "",
    lng: "",
    description:
      "Miễu Thánh Mẫu trên đường Nguyễn Thị Minh Khai là nơi thờ Mẫu, mang giá trị tín ngưỡng dân gian đặc trưng. Công trình nhỏ nhưng gắn bó mật thiết với đời sống tâm linh của người dân khu vực.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Phú Thạnh",
    lat: "",
    lng: "",
    description:
      "Đình Phú Thạnh là nơi thờ Thành Hoàng, mang kiến trúc truyền thống Nam Bộ và gắn liền với sự hình thành cộng đồng dân cư tại khu vực Quận 4. Đình là điểm sinh hoạt văn hóa – tín ngưỡng lâu đời của người dân.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Trường THPT Nguyễn Thị Minh Khai",
    lat: "",
    lng: "",
    description:
      "Trường THPT Nguyễn Thị Minh Khai là một trong những trường trung học lâu đời và danh tiếng tại TP. Hồ Chí Minh. Trường có kiến trúc cổ kính và gắn liền với lịch sử giáo dục đô thị từ đầu thế kỷ XX.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Pháp thuộc",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Thủy Đài",
    lat: "",
    lng: "",
    description:
      "Thủy Đài tại Phường 6, Quận 3 là công trình phục vụ mục đích cấp nước của Sài Gòn xưa. Công trình mang dấu ấn kỹ thuật – kiến trúc của thời kỳ đầu đô thị hóa thành phố.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Pháp thuộc",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Viện Pasteur",
    lat: "",
    lng: "",
    description:
      "Viện Pasteur TP. Hồ Chí Minh được thành lập từ thời Pháp thuộc, là trung tâm nghiên cứu y học và dịch tễ quan trọng của miền Nam. Công trình mang giá trị khoa học, lịch sử và kiến trúc đặc trưng của thời kỳ thuộc địa.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Pháp thuộc",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Trường THPT Marie Curie",
    lat: "",
    lng: "",
    description:
      "Trường THPT Marie Curie là một trong những ngôi trường lâu đời do Pháp xây dựng tại Sài Gòn. Với kiến trúc cổ điển châu Âu và bề dày lịch sử, trường là biểu tượng giáo dục của Quận 3.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Pháp thuộc",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Trường Trung học Lê Quý Đôn",
    lat: "",
    lng: "",
    description:
      "Trường Trung học Lê Quý Đôn là ngôi trường nổi tiếng lâu đời tại Sài Gòn, được xây dựng từ thời Pháp thuộc. Trường có kiến trúc cổ kính và là nơi đào tạo nhiều thế hệ học sinh ưu tú.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Pháp thuộc",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận 4
  {
    name: "Đình Khánh Hội",
    lat: "",
    lng: "",
    description:
      "Đình Khánh Hội là nơi thờ Thành Hoàng và các bậc tiền hiền của vùng Khánh Hội, Quận 4. Đình mang giá trị tín ngưỡng và kiến trúc truyền thống, được cộng đồng gìn giữ qua nhiều thế hệ.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Vĩnh Hội",
    lat: "",
    lng: "",
    description:
      "Đình Vĩnh Hội là ngôi đình cổ của cư dân khu vực Vĩnh Hội, thờ Thành Hoàng và các vị tiền hiền. Đình có không gian truyền thống, là điểm giữ gìn văn hóa làng xã giữa lòng đô thị.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Bảo tàng Hồ Chí Minh – Chi nhánh Thành phố Hồ Chí Minh",
    lat: "",
    lng: "",
    description:
      "Bảo tàng Hồ Chí Minh – Chi nhánh TP. Hồ Chí Minh đặt tại Bến Nhà Rồng, nơi Chủ tịch Hồ Chí Minh ra đi tìm đường cứu nước năm 1911. Công trình mang kiến trúc Pháp thuộc và có giá trị lịch sử đặc biệt quan trọng.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Pháp thuộc",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Nhà cổ đô thị",
    lat: "",
    lng: "",
    description:
      "Ngôi nhà cổ trên đường Bến Vân Đồn là di tích kiến trúc dân dụng còn lại của Sài Gòn xưa. Công trình phản ánh đời sống sinh hoạt và phong cách kiến trúc truyền thống của cư dân đô thị ven sông.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận 5
  {
    name: "Hội quán Tam Sơn",
    lat: "",
    lng: "",
    description:
      "Hội quán Tam Sơn là nơi sinh hoạt tín ngưỡng và văn hóa của cộng đồng người Hoa tại Quận 5. Công trình mang kiến trúc đặc trưng của hội quán Hoa Nam, là điểm nhấn văn hóa quan trọng của khu vực Chợ Lớn.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Trường THPT chuyên Lê Hồng Phong",
    lat: "",
    lng: "",
    description:
      "Trường Lê Hồng Phong là một trong những ngôi trường trung học danh tiếng nhất TP. Hồ Chí Minh, được xây dựng từ thời Pháp thuộc. Công trình mang kiến trúc châu Âu cổ điển và có bề dày truyền thống giáo dục hơn 90 năm.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Pháp thuộc",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Trường THCS Hồng Bàng",
    lat: "",
    lng: "",
    description:
      "Trường THCS Hồng Bàng là cơ sở giáo dục lâu năm của Quận 5, mang giá trị lịch sử – xã hội và gắn liền với sự phát triển giáo dục tại khu vực Chợ Lớn.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Tân Kiểng",
    lat: "",
    lng: "",
    description:
      "Đình Tân Kiểng là ngôi đình cổ thờ Thành Hoàng của cư dân vùng Tân Kiểng, mang kiến trúc truyền thống Nam Bộ. Đình là nơi diễn ra nhiều lễ hội văn hóa dân gian của cộng đồng địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Hội quán Phước An",
    lat: "",
    lng: "",
    description:
      "Hội quán Phước An do cộng đồng người Triều Châu xây dựng, là nơi thờ tự và tổ chức các hoạt động văn hóa của cộng đồng Hoa kiều. Công trình mang đậm dấu ấn kiến trúc truyền thống Trung Hoa.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Từ đường họ Lý",
    lat: "",
    lng: "",
    description:
      "Từ đường họ Lý là công trình thờ cúng tổ tiên của dòng họ Lý tại Quận 5. Công trình mang giá trị tín ngưỡng và phản ánh truyền thống gia tộc lâu đời trong cộng đồng người Hoa.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Từ đường Phước Kiến",
    lat: "",
    lng: "",
    description:
      "Từ đường Phước Kiến được xây dựng bởi cộng đồng người Phúc Kiến tại Sài Gòn. Đây là công trình có giá trị cao về kiến trúc, mỹ thuật và tín ngưỡng truyền thống của người Hoa.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận 6
  {
    name: "Đình Bình Tiên",
    lat: "",
    lng: "",
    description:
      "Đình Bình Tiên là ngôi đình lâu đời, thờ Thành Hoàng và những người có công khai phá vùng Minh Phụng. Đình mang kiến trúc đặc trưng của đình Nam Bộ và là nơi tổ chức nhiều lễ hội truyền thống.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Chùa Giác Hải",
    lat: "",
    lng: "",
    description:
      "Chùa Giác Hải là nơi sinh hoạt tôn giáo của cộng đồng Phật tử tại Quận 6. Chùa mang kiến trúc truyền thống và góp phần gìn giữ đời sống văn hóa – tâm linh của cư dân địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Chợ Bình Tây",
    lat: "",
    lng: "",
    description:
      "Chợ Bình Tây là ngôi chợ lớn do thương gia Quách Đàm xây dựng vào đầu thế kỷ XX. Công trình mang kiến trúc Á – Âu độc đáo và là trung tâm giao thương quan trọng nhất khu vực Chợ Lớn.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Pháp thuộc",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận 7
  {
    name: "Đình Tân Quy Đông",
    lat: "",
    lng: "",
    description:
      "Đình Tân Quy Đông thờ Thành Hoàng của vùng Tân Phong, Quận 7. Đình mang kiến trúc truyền thống và là nơi tổ chức lễ hội văn hóa đặc trưng của cư dân Nam Bộ.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận 8
  {
    name: "Chùa Sắc tứ Huệ Lâm",
    lat: "",
    lng: "",
    description:
      "Chùa Sắc tứ Huệ Lâm là ngôi chùa cổ có sắc phong triều Nguyễn, mang giá trị lịch sử – tôn giáo quan trọng. Chùa có kiến trúc truyền thống và là điểm sinh hoạt tâm linh lớn của cư dân Quận 11.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Hưng Phú",
    lat: "",
    lng: "",
    description:
      "Đình Hưng Phú thờ Thành Hoàng và các bậc tiền hiền của vùng Bến Ba Đình. Đình mang kiểu kiến trúc mộc mạc, gần gũi với đặc trưng văn hóa Nam Bộ.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Vinh Hội",
    lat: "",
    lng: "",
    description:
      "Đình Vinh Hội là di tích tín ngưỡng quan trọng của cư dân phường 13, Quận 8. Đình thờ Thành Hoàng và lưu giữ nhiều yếu tố kiến trúc truyền thống đặc sắc.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Phong Phú",
    lat: "",
    lng: "",
    description:
      "Đình Phong Phú là ngôi đình lâu đời của cư dân Phường 12, Quận 8. Đình lưu giữ nhiều giá trị văn hóa tín ngưỡng và là nơi tổ chức các lễ hội truyền thống hằng năm.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận Bình Tân
  {
    name: "Đình Bình Trị Đông",
    lat: "",
    lng: "",
    description:
      "Đình Bình Trị Đông là di tích thờ Thành Hoàng và các vị tiền hiền đã khai phá vùng Bình Trị Đông. Đình mang kiến trúc truyền thống Nam Bộ và là nơi gìn giữ nhiều lễ hội văn hóa đặc sắc của địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // QUận Bình Thạnh
  {
    name: "Chùa Sắc tứ Tập Phước",
    lat: "",
    lng: "",
    description:
      "Chùa Sắc tứ Tập Phước là ngôi chùa cổ được sắc phong dưới thời Nguyễn, mang giá trị tôn giáo và lịch sử quan trọng tại Quận Bình Thạnh. Chùa có kiến trúc trang nghiêm và là nơi tu học của tăng ni, Phật tử.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Chùa Văn Thánh",
    lat: "",
    lng: "",
    description:
      "Chùa Văn Thánh là một trong những ngôi chùa tiêu biểu của Quận Bình Thạnh, mang màu sắc kiến trúc truyền thống và là nơi diễn ra các sinh hoạt tôn giáo của cộng đồng Phật tử.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Bình Quới Tây",
    lat: "",
    lng: "",
    description:
      "Đình Bình Quới Tây thờ Thành Hoàng và các bậc tiền nhân đã khai phá vùng đất Bình Quới. Đình giữ gìn kiến trúc cổ truyền với không gian đậm chất Nam Bộ.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Nhà cổ dân dụng truyền thống của ông Vương Hồng Sển",
    lat: "",
    lng: "",
    description:
      "Ngôi nhà cổ của học giả Vương Hồng Sển là di tích mang giá trị văn hóa – kiến trúc đặc biệt, lưu giữ nhiều hiện vật gắn với cuộc đời và sự nghiệp nghiên cứu của ông. Đây là một trong những nhà cổ tiêu biểu còn lại ở TP. Hồ Chí Minh.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận Gò Vấp
  {
    name: "Đình An Nhơn",
    lat: "",
    lng: "",
    description:
      "Đình An Nhơn thờ Thành Hoàng và các vị tiền hiền vùng Gò Vấp. Đình mang kiến trúc truyền thống và là trung tâm sinh hoạt tín ngưỡng của cộng đồng địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Hội quán Quảng Triệu",
    lat: "",
    lng: "",
    description:
      "Hội quán Quảng Triệu do cộng đồng người Hoa gốc Triều Châu xây dựng. Đây là nơi thờ tự và tổ chức các nghi lễ văn hóa đặc trưng, mang giá trị nghệ thuật – tín ngưỡng của cộng đồng Hoa kiều.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Chùa An Lạc",
    lat: "",
    lng: "",
    description:
      "Chùa An Lạc là ngôi chùa cổ tại Gò Vấp, mang kiến trúc truyền thống và gắn liền với đời sống tôn giáo của cộng đồng Phật tử trong khu vực.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Miếu Thất phủ Thiên Hậu",
    lat: "",
    lng: "",
    description:
      "Miếu Thất phủ Thiên Hậu thờ Thiên Hậu Thánh Mẫu, là nơi sinh hoạt tín ngưỡng của cộng đồng người Hoa tại Gò Vấp. Công trình có giá trị kiến trúc và mỹ thuật đặc sắc.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Miễu Nổi",
    lat: "",
    lng: "",
    description:
      "Miễu Nổi nằm trên khu vực ven kênh thuộc Quận Gò Vấp, là nơi thờ Thiên Hậu cùng các vị thần linh trong tín ngưỡng dân gian. Công trình nổi tiếng với vị trí độc đáo và kiến trúc cổ kính.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình An Hội",
    lat: "",
    lng: "",
    description:
      "Đình An Hội thờ Thành Hoàng và các bậc tiền hiền của vùng Phường 8, Quận Gò Vấp. Đây là nơi tổ chức các lễ hội truyền thống của cộng đồng địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Miếu Sa Tân",
    lat: "",
    lng: "",
    description:
      "Miếu Sa Tân là nơi thờ tự theo tín ngưỡng dân gian của cư dân khu vực Trần Bá Giao. Công trình mang nét kiến trúc truyền thống và gắn bó mật thiết với đời sống tinh thần của người dân.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận Phú Nhuận
  {
    name: "Chùa Phù Long",
    lat: "",
    lng: "",
    description:
      "Chùa Phù Long là ngôi chùa lâu đời tại Quận Phú Nhuận, mang kiến trúc cổ truyền và là nơi tu học của tăng ni, Phật tử trong vùng.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Lăng Võ Tánh",
    lat: "",
    lng: "",
    description:
      "Lăng Võ Tánh là nơi tưởng niệm danh tướng Võ Tánh – một nhân vật lịch sử quan trọng thời Nguyễn. Công trình mang giá trị văn hóa – lịch sử sâu sắc và được gìn giữ cẩn trọng.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận Tân Bình
  {
    name: "Miếu Tân Kỳ, Miễu Ông Bổn",
    lat: "",
    lng: "",
    description:
      "Miếu Tân Kỳ và Miễu Ông Bổn là nơi thờ tự của cộng đồng người Hoa tại Quận Tân Bình. Công trình mang kiến trúc truyền thống và có giá trị tín ngưỡng đặc sắc.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận Tân Phú
  {
    name: "Mộ ông Lý Tường Quang và bà Nguyễn Thị Lâu",
    lat: "",
    lng: "",
    description:
      "Khu mộ ông Lý Tường Quang và bà Nguyễn Thị Lâu là di tích tưởng niệm gia tộc người Hoa tại Quận Tân Phú. Công trình phản ánh phong tục mai táng và truyền thống văn hóa của cộng đồng Hoa kiều xưa.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Di tích lịch sử: 47
  // Huyện Bình Chánh
  {
    name: "Đình Tân Túc",
    lat: "",
    lng: "",
    description:
      "Đình Tân Túc là ngôi đình cổ của thị trấn Tân Túc, nơi thờ Thành Hoàng và các vị tiền hiền có công khai phá vùng đất. Đình mang kiến trúc truyền thống Nam Bộ và là nơi sinh hoạt văn hóa – tín ngưỡng của cộng đồng địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Khu di tích dân công hỏa tuyến Vĩnh Lộc Mậu Thân 1968",
    lat: "",
    lng: "",
    description:
      "Khu di tích dân công hỏa tuyến Vĩnh Lộc ghi dấu sự hy sinh và đóng góp của lực lượng dân công trong chiến dịch Mậu Thân 1968. Đây là di tích cách mạng có giá trị lớn về lịch sử đấu tranh của nhân dân Bình Chánh.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Lăng Le – Bàu Cò",
    lat: "",
    lng: "",
    description:
      "Lăng Le – Bàu Cò là di tích chiến khu xưa, gắn liền với phong trào đấu tranh cách mạng tại huyện Bình Chánh. Khu vực này từng là căn cứ quan trọng của lực lượng vũ trang trong hai cuộc kháng chiến.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Rạch Già",
    lat: "",
    lng: "",
    description:
      "Rạch Già là địa danh gắn liền với lịch sử hình thành các tuyến giao thông thủy truyền thống tại huyện Hưng Long. Khu vực này mang dấu ấn văn hóa sông nước đặc trưng của vùng Nam Bộ.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Khu Tưởng niệm bộ đội An Điền và cán bộ, chiến sĩ, nhân dân hy sinh tại đồng bưng Láng Sấu",
    lat: "",
    lng: "",
    description:
      "Khu tưởng niệm là nơi ghi công các bộ đội An Điền cùng cán bộ và nhân dân đã hy sinh trong những chiến dịch chống Mỹ. Di tích có ý nghĩa lớn về truyền thống yêu nước và tinh thần chiến đấu của quân dân địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Huyện Cần Giờ
  {
    name: "Đình Dương Văn Hạnh",
    lat: "",
    lng: "",
    description:
      "Đình Dương Văn Hạnh là ngôi đình cổ thờ Thành Hoàng và ghi nhớ công lao các vị tiền hiền tại xã Lý Nhơn, huyện Cần Giờ. Đình phản ánh đời sống văn hóa truyền thống của cư dân ven biển.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Bình Khánh và Mộ Tiền hiền Trần Quang Đạo",
    lat: "",
    lng: "",
    description:
      "Đình Bình Khánh là nơi thờ Thành Hoàng và tôn vinh ông Trần Quang Đạo – vị tiền hiền có công khai phá vùng Bình Khánh. Khu mộ và đình mang giá trị lịch sử – tín ngưỡng sâu sắc của huyện Cần Giờ.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Huyện Củ Chi
  {
    name: "Đình Cây Sộp",
    lat: "",
    lng: "",
    description:
      "Đình Cây Sộp là di tích văn hóa của cư dân xã Tân An Hội, nơi thờ Thành Hoàng và các bậc khai canh. Đình mang nét kiến trúc truyền thống và là nơi tổ chức nhiều sinh hoạt tín ngưỡng địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Tân Thông",
    lat: "",
    lng: "",
    description:
      "Đình Tân Thông nằm tại xã Tân Thông Hội, là nơi thờ Thành Hoàng cùng các vị khai canh của vùng đất Củ Chi. Đình có kiến trúc truyền thống và gắn liền với nhiều lễ hội văn hóa dân gian.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Huyện Hóc Môn
  {
    name: "Chùa Thiên Quang",
    lat: "",
    lng: "",
    description:
      "Chùa Thiên Quang là cơ sở Phật giáo lâu đời tại xã Trung Chánh, gắn liền với sinh hoạt tâm linh của cộng đồng địa phương. Chùa mang kiến trúc truyền thống và là nơi tu học của chư tăng, Phật tử.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đền thờ ông Phan Công Hớn",
    lat: "",
    lng: "",
    description:
      "Đền thờ ông Phan Công Hớn là nơi tưởng niệm nhân vật tham gia vận động khởi nghĩa Hóc Môn – Bà Điểm. Công trình có giá trị lớn về lịch sử truyền thống yêu nước của nhân dân.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Nơi họp Hội nghị Xứ ủy Nam Kỳ tháng 9/1940",
    lat: "",
    lng: "",
    description:
      "Địa điểm này là nơi diễn ra Hội nghị Xứ ủy Nam Kỳ tháng 9/1940, sự kiện quan trọng chuẩn bị cho Khởi nghĩa Nam Kỳ. Di tích mang giá trị đặc biệt về lịch sử cách mạng.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận 1
  {
    name: "Nhà số 14 Cách Mạng Tháng Tám",
    lat: "",
    lng: "",
    description:
      "Ngôi nhà số 14 đường Cách Mạng Tháng Tám từng là địa điểm hoạt động của phong trào công nhân và kháng chiến tại Sài Gòn. Công trình mang giá trị lịch sử tiêu biểu của Quận 1.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Quán Nhạn Hương",
    lat: "",
    lng: "",
    description:
      "Quán Nhạn Hương là địa điểm có liên quan đến hoạt động yêu nước và phong trào cách mạng tại Sài Gòn. Công trình mang dấu ấn đặc biệt trong lịch sử đấu tranh của nhân dân.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Cột cờ Thủ Ngữ",
    lat: "",
    lng: "",
    description:
      "Cột cờ Thủ Ngữ là công trình biểu tượng tại khu vực Bến Bạch Đằng, từng là nơi thượng cờ của tàu bè cập cảng Sài Gòn. Đây là công trình kiến trúc tiêu biểu gắn liền với lịch sử giao thương của thành phố.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Pháp thuộc",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận 10
  {
    name: "Chùa Ấn Quang",
    lat: "",
    lng: "",
    description:
      "Chùa Ấn Quang là cơ sở Phật giáo lớn, nơi đặt trụ sở Thành hội Phật giáo TP. Hồ Chí Minh trong nhiều năm. Chùa có kiến trúc trang nghiêm và là trung tâm sinh hoạt tôn giáo quan trọng.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Chùa Từ Nghiêm",
    lat: "",
    lng: "",
    description:
      "Chùa Từ Nghiêm là ngôi chùa thuộc hệ phái Bắc tông, là một trong những cơ sở Phật giáo lớn của Quận 10. Chùa gắn với nhiều hoạt động từ thiện – xã hội của Phật giáo thành phố.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận 12
  {
    name: "Chùa Khánh An",
    lat: "",
    lng: "",
    description:
      "Chùa Khánh An từng là cơ sở hoạt động cách mạng trong thời kỳ kháng chiến chống Pháp. Ngày nay chùa vẫn giữ được kiến trúc truyền thống và vai trò quan trọng trong đời sống tâm linh.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Chùa Tường Quang",
    lat: "",
    lng: "",
    description:
      "Chùa Tường Quang là cơ sở Phật giáo có từ đầu thế kỷ XX, từng là điểm hoạt động yêu nước tại Gia Định. Chùa mang kiến trúc truyền thống và có giá trị lịch sử quan trọng.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Hanh Phú",
    lat: "",
    lng: "",
    description:
      "Đình Hanh Phú thờ Thành Hoàng và là kho lương thực của Ban Tiếp tế tỉnh Gia Định trong kháng chiến. Đình có giá trị cả về tín ngưỡng và lịch sử cách mạng.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Miễu Cây Quéo",
    lat: "",
    lng: "",
    description:
      "Miễu Cây Quéo là nơi thờ tự theo tín ngưỡng dân gian của cư dân vùng Tân Mỹ Tây. Công trình mang kiến trúc truyền thống và gắn liền với đời sống tâm linh của cộng đồng.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đền thờ Nguyễn Ảnh Thủ",
    lat: "",
    lng: "",
    description:
      "Đền thờ Nguyễn Ảnh Thủ tưởng niệm vị quan triều Nguyễn, người có công với vùng đất Hóc Môn. Công trình mang giá trị lịch sử và kiến trúc truyền thống.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Tân Hội",
    lat: "",
    lng: "",
    description:
      "Đình Tân Hội là nơi thờ Thành Hoàng và các bậc tiền nhân đã mở mang vùng đất Tân Hưng Thuận. Đình mang kiến trúc truyền thống và giá trị văn hóa sâu sắc.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Thành phố Thủ Đức
  {
    name: "Căn cứ vùng bưng 6 xã (An Phú)",
    lat: "",
    lng: "",
    description:
      "Căn cứ vùng bưng 6 xã là địa điểm hoạt động của lực lượng cách mạng tại khu vực An Phú trong thời kháng chiến chống Mỹ. Khu căn cứ mang dấu ấn lịch sử quan trọng.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình An Phú",
    lat: "",
    lng: "",
    description:
      "Đình An Phú thờ Thành Hoàng và là một trong những ngôi đình tiêu biểu tại Quận 2. Công trình mang giá trị tín ngưỡng và nét kiến trúc truyền thống Nam Bộ.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Căn cứ vùng bưng 6 xã (Phú Hữu)",
    lat: "",
    lng: "",
    description:
      "Căn cứ vùng bưng 6 xã Phú Hữu từng là nơi hoạt động của lực lượng cách mạng trong hai cuộc kháng chiến, mang ý nghĩa lịch sử sâu sắc.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Chùa Bửu Thanh",
    lat: "",
    lng: "",
    description:
      "Chùa Bửu Thanh là cơ sở Phật giáo của cộng đồng Quận 9, mang nét kiến trúc truyền thống và là nơi sinh hoạt tôn giáo quan trọng.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Thái Bình",
    lat: "",
    lng: "",
    description:
      "Đình Thái Bình thờ Thành Hoàng và các vị tiền hiền tại phường Long Bình. Đình giữ được kiến trúc truyền thống và là nơi tổ chức nhiều lễ hội dân gian.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Chùa Châu Hưng",
    lat: "",
    lng: "",
    description:
      "Chùa Châu Hưng là ngôi chùa lớn của Quận Tân Phú, mang vẻ kiến trúc trang nghiêm và là nơi sinh hoạt tâm linh của đông đảo Phật tử.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận 3
  {
    name: "Chùa Xá Lợi",
    lat: "",
    lng: "",
    description:
      "Chùa Xá Lợi là một trong những ngôi chùa quan trọng của TP. Hồ Chí Minh, nổi bật với tháp chuông và kiến trúc hiện đại. Chùa là nơi diễn ra nhiều sự kiện lớn của Phật giáo Việt Nam.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận 5
  {
    name: "Chùa Thiên Tôn",
    lat: "",
    lng: "",
    description:
      "Chùa Thiên Tôn là ngôi chùa cổ tại Quận 5, mang dấu ấn kiến trúc truyền thống và là nơi sinh hoạt tín ngưỡng quan trọng của cộng đồng Phật tử.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận 6
  {
    name: "Cơ sở bí mật Thành ủy Sài Gòn – Gia Định",
    lat: "",
    lng: "",
    description:
      "Đây từng là cơ sở bí mật quan trọng của Thành ủy Sài Gòn – Gia Định trong kháng chiến chống Mỹ. Di tích có giá trị lịch sử đặc biệt về phong trào cách mạng đô thị.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Mộ và đền thờ ông Phạm Văn Chí",
    lat: "",
    lng: "",
    description:
      "Khu mộ và đền thờ ông Phạm Văn Chí tưởng nhớ một nhân vật có công lao lớn với vùng đất Bình Chánh – Tân Bình. Công trình mang đậm giá trị truyền thống và lịch sử địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận 7
  {
    name: "Gò Ô Môi",
    lat: "",
    lng: "",
    description:
      "Gò Ô Môi là di tích khảo cổ quan trọng của khu vực Phú Thuận, nơi tìm thấy nhiều dấu tích văn hóa cổ. Đây là một trong những địa điểm hiếm hoi còn bảo tồn lớp văn hóa cư trú xưa của thành phố.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hùng Vương",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Chùa Long Hoa",
    lat: "",
    lng: "",
    description:
      "Chùa Long Hoa là cơ sở Phật giáo lớn tại Quận 7, nổi bật với kiến trúc truyền thống và cảnh quan thoáng đãng. Chùa là nơi tu học của đông đảo tăng ni, Phật tử.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận 8
  {
    name: "Chùa Thiên Phước",
    lat: "",
    lng: "",
    description:
      "Chùa Thiên Phước tại Quận 8 là ngôi chùa cổ có kiến trúc trang nghiêm, là nơi sinh hoạt tín ngưỡng của cộng đồng Phật tử địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Chùa Pháp Quang",
    lat: "",
    lng: "",
    description:
      "Chùa Pháp Quang là cơ sở Phật giáo có vai trò quan trọng trong phong trào cách mạng giai đoạn 1963–1975. Chùa hiện vẫn là điểm sinh hoạt tôn giáo lớn của cộng đồng.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận Bình Thạnh
  {
    name: "Đình Cầu Sơn",
    lat: "",
    lng: "",
    description:
      "Đình Cầu Sơn thờ Thành Hoàng và phản ánh văn hóa tín ngưỡng truyền thống của cư dân Bình Thạnh. Đình là một trong những di tích lâu đời của khu vực.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận Bình Tân
  {
    name: "Chùa Long Thạnh",
    lat: "",
    lng: "",
    description:
      "Chùa Long Thạnh là nơi tu học và sinh hoạt tôn giáo quan trọng của cộng đồng Phật tử Bình Tân. Chùa mang lối kiến trúc truyền thống và không gian trang nghiêm.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Tân Khai",
    lat: "",
    lng: "",
    description:
      "Đình Tân Khai thờ Thành Hoàng và các vị khai canh vùng Bình Trị Đông. Công trình mang đậm phong cách kiến trúc đình làng Nam Bộ.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quân Gò Vấp
  {
    name: "Đình Hanh Thông",
    lat: "",
    lng: "",
    description:
      "Đình Hanh Thông là di tích tiêu biểu của Gò Vấp, mang kiến trúc truyền thống với giá trị văn hóa – lịch sử lâu đời. Đình là nơi diễn ra nhiều lễ hội đặc sắc.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận Phú Nhuận
  {
    name: "Chùa Từ Vân",
    lat: "",
    lng: "",
    description:
      "Chùa Từ Vân là cơ sở Phật giáo nổi bật tại Quận Phú Nhuận, được biết đến với kiến trúc thanh thoát và vai trò quan trọng trong sinh hoạt tín ngưỡng địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Chùa Quán Thế Âm",
    lat: "",
    lng: "",
    description:
      "Chùa Quán Thế Âm là ngôi chùa lớn nằm tại Quận 5, nổi tiếng với tượng Quan Âm và các hoạt động Phật sự phong phú. Chùa mang kiến trúc truyền thống trang nghiêm.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Chùa Pháp Hoa",
    lat: "",
    lng: "",
    description:
      "Chùa Pháp Hoa là cơ sở tu học thuộc Quận Phú Nhuận, mang kiến trúc đặc trưng Phật giáo và là điểm sinh hoạt tâm linh của cộng đồng địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận Tân Bình
  {
    name: "Kho bom Phú Thọ",
    lat: "",
    lng: "",
    description:
      "Kho bom Phú Thọ thuộc Công viên Tân Phước, từng là nơi lưu trữ vũ khí, đạn dược trong thời kháng chiến. Di tích có giá trị lịch sử lớn về phong trào đấu tranh tại đô thị Sài Gòn.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Hiện đại",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  // Quận Tân Phú
  {
    name: "Mộ ông Nguyễn Quý Anh và bà Lý Thu Liên",
    lat: "",
    lng: "",
    description:
      "Mộ ông Nguyễn Quý Anh và bà Lý Thu Liên là di tích gia tộc mang giá trị lịch sử – văn hóa của cộng đồng Phú Thọ Hòa. Công trình phản ánh truyền thống hiếu nghĩa và phong tục mai táng xưa.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Phú Thạnh",
    lat: "",
    lng: "",
    description:
      "Đình Phú Thạnh thờ Thành Hoàng và là một trong những đình cổ còn lại tại Tân Phú. Công trình mang giá trị kiến trúc và nét đẹp tín ngưỡng truyền thống.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Tân Hòa Tây",
    lat: "",
    lng: "",
    description:
      "Đình Tân Hòa Tây là nơi thờ Thành Hoàng, mang kiến trúc cổ truyền đặc trưng của vùng đất Tân Phú. Đình là địa điểm sinh hoạt văn hóa – tín ngưỡng quan trọng của người dân địa phương.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Hòa Thạnh",
    lat: "",
    lng: "",
    description:
      "Đình Hòa Thạnh thờ Thành Hoàng và các vị tiền hiền khai canh khu vực Hòa Thạnh. Đình giữ được không gian truyền thống và là nơi tổ chức nhiều lễ hội văn hóa.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
  {
    name: "Đình Tân Sơn Nhì",
    lat: "",
    lng: "",
    description:
      "Đình Tân Sơn Nhì là ngôi đình cổ thờ Thành Hoàng và các bậc tiền nhân, phản ánh đời sống tín ngưỡng lâu đời của cư dân Tân Phú.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg",
    ],
    period: "Nguyễn",
    region: "Nam",
    province: "TP. Hồ Chí Minh",
  },
];

// Chuẩn hóa year
const mapData = mapDataRaw.map((e) => ({
  ...e,
  year: e.year || defaultYearByPeriod(e.period),
}));

const galleryData = [
  {
    id: 1,
    period: ["Lý", "Hồ"],
    region: ["Bắc"],
    year: 1010,
    src: hoanKiem,
    alt: "Hoàng thành Thăng Long",
    caption:
      "Hoàng thành Thăng Long – Di tích lịch sử nổi bật, trung tâm quyền lực suốt nhiều triều đại Việt Nam.",
  },
  {
    id: 2,
    period: ["Trần"],
    region: ["Trung", "Nam"],
    year: 1285,
    src: diaDao,
    alt: "Chiến thắng Đông Bộ Đầu",
    caption: "Chiến thắng Đông Bộ Đầu - Trần Hưng Đạo đánh tan quân Nguyên.",
  },
  {
    id: 3,
    period: ["Hồ"],
    region: ["Nam"],
    year: 1397,
    src: ceo,
    alt: "Thành nhà Hồ",
    caption: "Thành nhà Hồ, di sản văn hóa thế giới được UNESCO công nhận.",
  },
  {
    id: 4,
    period: ["Lý"],
    region: ["Bắc", "Trung", "Nam"],
    year: 1049,
    src: ceo,
    alt: "Chùa Một Cột",
    caption: "Chùa Một Cột, một trong những biểu tượng của thủ đô Hà Nội.",
  },
  {
    id: 5,
    period: ["Nguyễn"],
    region: ["Trung"],
    year: 1802,
    src: hoanKiem,
    alt: "Cố đô Huế",
    caption: "Cố đô Huế, kinh thành của triều đại nhà Nguyễn.",
  },
  {
    id: 6,
    period: ["Hiện đại"],
    region: ["Nam"],
    year: 1975,
    src: diaDao,
    alt: "Dinh Độc Lập",
    caption: "Dinh Độc Lập, biểu tượng của ngày thống nhất đất nước 30/4/1975.",
  },
  {
    id: 7,
    period: ["Pháp thuộc"],
    region: ["Nam"],
    year: 1914,
    src: ceo,
    alt: "Chợ Bến Thành",
    caption:
      "Chợ Bến Thành, một trong những công trình kiến trúc lâu đời tại Sài Gòn.",
  },
  {
    id: 8,
    period: ["Lý", "Trần", "Nguyễn", "Hiện đại"],
    region: ["Bắc", "Trung", "Nam"],
    year: 2012,
    src: hoanKiem,
    alt: "Lễ hội đền Hùng",
    caption: "Lễ hội đền Hùng, di sản văn hóa phi vật thể của nhân loại.",
  },
  {
    id: 9,
    period: ["Pháp thuộc"],
    region: ["Nam"],
    year: 1914,
    src: ceo,
    alt: "Chợ Bến Thành",
    caption:
      "Chợ Bến Thành, một trong những công trình kiến trúc lâu đời tại Sài Gòn.",
  },
  {
    id: 10,
    period: ["Lý", "Trần", "Nguyễn", "Hiện đại"],
    region: ["Bắc", "Trung", "Nam"],
    year: 2012,
    src: hoanKiem,
    alt: "Lễ hội đền Hùng",
    caption: "Lễ hội đền Hùng, di sản văn hóa phi vật thể của nhân loại.",
  },
  {
    id: 11,
    period: ["Hiện đại"],
    region: ["Nam"],
    year: 1975,
    src: diaDao,
    alt: "Dinh Độc Lập",
    caption: "Dinh Độc Lập, biểu tượng của ngày thống nhất đất nước 30/4/1975.",
  },
  {
    id: 12,
    period: ["Pháp thuộc"],
    region: ["Nam"],
    year: 1914,
    src: ceo,
    alt: "Chợ Bến Thành",
    caption:
      "Chợ Bến Thành, một trong những công trình kiến trúc lâu đời tại Sài Gòn.",
  },
  {
    id: 13,
    period: ["Lý", "Trần", "Nguyễn", "Hiện đại"],
    region: ["Bắc", "Trung", "Nam"],
    year: 2012,
    src: hoanKiem,
    alt: "Lễ hội đền Hùng",
    caption: "Lễ hội đền Hùng, di sản văn hóa phi vật thể của nhân loại.",
  },
  {
    id: 14,
    period: ["Pháp thuộc"],
    region: ["Nam"],
    year: 1914,
    src: ceo,
    alt: "Chợ Bến Thành",
    caption:
      "Chợ Bến Thành, một trong những công trình kiến trúc lâu đời tại Sài Gòn.",
  },
  {
    id: 15,
    period: ["Lý", "Trần", "Nguyễn", "Hiện đại"],
    region: ["Bắc", "Trung", "Nam"],
    year: 2012,
    src: hoanKiem,
    alt: "Lễ hội đền Hùng",
    caption: "Lễ hội đền Hùng, di sản văn hóa phi vật thể của nhân loại.",
  },
];

const PERIODS = [
  "Lý",
  "Trần",
  "Nguyễn",
  "Hiện đại",
  "Pháp thuộc",
  "Hồ",
  "Hùng Vương",
];
const REGIONS = ["Bắc", "Trung", "Nam"];

const TraiNghiem = () => {
  /* ---------- UI state ---------- */
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  /* ---------- Map & filters ---------- */
  const PROVINCES = useMemo(
    () =>
      Array.from(new Set(mapData.map((d) => d.province).filter(Boolean))).sort(
        (a, b) => a.localeCompare(b, "vi")
      ),
    []
  );

  const [isFilterPanelVisible, setFilterPanelVisible] = useState(false); // sidebar trong map (hamburger)
  const [mapFilters, setMapFilters] = useState({
    periods: new Set(PERIODS),
    regions: new Set(REGIONS),
    provinces: new Set(PROVINCES), // lọc theo tỉnh
    year: 2024,
  });

  const [galleryFilters, setGalleryFilters] = useState({
    periods: new Set(PERIODS),
    regions: new Set(REGIONS),
    year: 2024,
  });

  const filterPanelRef = useRef(null);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]); // [{ marker, data }]
  const markerLayerRef = useRef(null);

  /* ---------- Geolocation ---------- */
  const locatingRef = useRef({
    watchId: null,
    marker: null,
    accuracy: null,
    following: false,
  });

  /* ---------- Search ---------- */
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggest, setShowSuggest] = useState(false);

  /* ---------- Effects ---------- */
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true, offset: 100 });
  }, []);

  const handleScrollToMap = () => {
    if (mapContainerRef.current) {
      mapContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Đóng sidebar bằng phím Esc
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") setFilterPanelVisible(false);
    };
    if (isFilterPanelVisible) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [isFilterPanelVisible]);

  // --- KHỞI TẠO MAP ---
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current || !window.L) return;

    const map = window.L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: true,
    }).setView([16.0, 107.5], 6);

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    window.L.control.zoom({ position: "topright" }).addTo(map);

    mapInstanceRef.current = map;

    // Layer cho marker
    markerLayerRef.current = window.L.layerGroup().addTo(map);

    // Icon tối giản, hiện đại (không hiệu ứng)
    const baseIconHtml = `
      <div style="
        width:14px;height:14px;border-radius:50%;
        background:#dc8154;border:2px solid #fff;
        box-shadow:0 0 0 1px rgba(0,0,0,0.25);
      "></div>`;
    const modernIcon = window.L.divIcon({
      html: baseIconHtml,
      className: "",
      iconSize: [14, 14],
      iconAnchor: [7, 7],
      popupAnchor: [0, -12],
    });

    // Tạo & gắn marker
    markersRef.current = mapData.map((e) => {
      const m = window.L
        .marker([e.lat, e.lng], { icon: modernIcon, title: e.name })
        .addTo(markerLayerRef.current);

      // Tooltip tên địa danh
      m.bindTooltip(e.name, {
        direction: "top",
        offset: [0, -8],
        opacity: 0.9,
      });

      // Popup card (gọn nhẹ)
      const popup = createPopupCardHtml(e);
      m.bindPopup(popup, {
        maxWidth: 360,
        className: "gm-like-popup",
        autoClose: true,
        closeButton: false,
      });

      // Hover mở popup nhưng cho phép rê chuột vào nội dung
      m._hoveringPopup = false;
      m._closeTimer = null;

      m.on("mouseover", () => {
        m.openPopup();
        if (m._closeTimer) {
          clearTimeout(m._closeTimer);
          m._closeTimer = null;
        }
      });

      m.on("mouseout", () => {
        if (m._closeTimer) clearTimeout(m._closeTimer);
        m._closeTimer = setTimeout(() => {
          if (!m._hoveringPopup) m.closePopup();
        }, 250);
      });

      m.on("popupopen", () => {
        const el = m.getPopup()?.getElement();
        if (!el) return;
        const onEnter = () => {
          m._hoveringPopup = true;
          if (m._closeTimer) {
            clearTimeout(m._closeTimer);
            m._closeTimer = null;
          }
        };
        const onLeave = () => {
          m._hoveringPopup = false;
          m._closeTimer = setTimeout(() => {
            if (!m._hoveringPopup) m.closePopup();
          }, 200);
        };
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
        m.once("popupclose", () => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
          m._hoveringPopup = false;
          if (m._closeTimer) {
            clearTimeout(m._closeTimer);
            m._closeTimer = null;
          }
        });
      });

      return { marker: m, data: e };
    });

    injectMapCssOnce();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // --- ÁP DỤNG FILTER MARKER ---
  useEffect(() => {
    if (!markerLayerRef.current) return;

    const { periods, regions, provinces, year } = mapFilters;
    markersRef.current.forEach(({ marker, data }) => {
      const ok =
        periods.has(data.period) &&
        regions.has(data.region) &&
        provinces.has(data.province) &&
        (data.year || 2024) <= year;
      if (ok) {
        if (!markerLayerRef.current.hasLayer(marker)) {
          marker.addTo(markerLayerRef.current);
        }
      } else {
        if (markerLayerRef.current.hasLayer(marker)) {
          markerLayerRef.current.removeLayer(marker);
        }
      }
    });
  }, [mapFilters]);

  /* ==============================
     HÀM TẠO POPUP CARD
     ============================== */
  const createPopupCardHtml = (event) => `
    <div style="
      width: 360px; max-width: 90vw;
      background:#fff; border-radius:16px; overflow:hidden;
      box-shadow:0 8px 24px rgba(0,0,0,0.15); border:1px solid #eee;
      font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    ">
      <div style="position:relative;height:180px;background:#f7f7f7;">
        <img src="${event.images?.[0] || ""}" alt="${event.name}" style="width:100%;height:100%;object-fit:cover;" />
        <div style="position:absolute;bottom:8px;left:12px;padding:6px 10px;border-radius:999px;background:rgba(0,0,0,.55);color:#fff;font-size:12px;">
          ${event.period} · ${event.region} Bộ · ${event.province ?? ""}
        </div>
      </div>
      <div style="padding:12px 14px 14px;">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
          <h3 style="margin:0;font-size:18px;line-height:1.3;color:#1f2937;font-weight:700;">${event.name}</h3>
        </div>
        <p style="margin:8px 0 12px;color:#4b5563;font-size:14px;line-height:1.5;">
          ${event.description}
        </p>
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=${event.lat},${event.lng}"
          target="_blank" rel="noopener noreferrer"
          style="display:inline-flex;align-items:center;gap:8px;padding:10px 12px;border-radius:10px;background:#2e1e10;color:#fff;font-weight:600;text-decoration:none;"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
          Chỉ đường
        </a>
      </div>
    </div>
  `;

  const injectMapCssOnce = () => {
    if (document.getElementById("gm-like-popup-css")) return;
    const style = document.createElement("style");
    style.id = "gm-like-popup-css";
    style.innerHTML = `
      .gm-like-popup .leaflet-popup-content-wrapper{
        background:transparent; box-shadow:none; padding:0; border-radius:0;
      }
      .gm-like-popup .leaflet-popup-content{ margin:0!important; }
      .gm-like-popup .leaflet-popup-tip{ background:#fff; }
      /* overlay mask khi mở sidebar */
      .sidebar-mask{
        position:absolute; inset:0; background:rgba(0,0,0,.15);
        opacity:0; pointer-events:none; transition:opacity .2s; border-radius:16px; z-index: 998;
      }
      .sidebar-mask.open{ opacity:1; pointer-events:auto; }
    `;
    document.head.appendChild(style);
  };

  /* ==============================
     GEOLOCATION: Nút định vị
     ============================== */
  const toggleLocate = () => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Tắt theo dõi
    if (locatingRef.current.following) {
      if (locatingRef.current.watchId !== null) {
        navigator.geolocation.clearWatch(locatingRef.current.watchId);
      }
      if (locatingRef.current.marker) {
        map.removeLayer(locatingRef.current.marker);
      }
      if (locatingRef.current.accuracy) {
        map.removeLayer(locatingRef.current.accuracy);
      }
      locatingRef.current = {
        watchId: null,
        marker: null,
        accuracy: null,
        following: false,
      };
      return;
    }

    // Bật theo dõi
    if (!navigator.geolocation) {
      alert("Trình duyệt không hỗ trợ Geolocation.");
      return;
    }
    locatingRef.current.following = true;

    const ensureLayers = (lat, lng, acc) => {
      const icon = window.L.divIcon({
        html: `<div style="
          width:12px;height:12px;border-radius:50%;background:#1d4ed8;border:2px solid #fff;box-shadow:0 0 0 2px rgba(29,78,216,.35);
        "></div>`,
        className: "",
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });
      if (!locatingRef.current.marker) {
        locatingRef.current.marker = window.L.marker([lat, lng], { icon }).addTo(map);
      }
      if (!locatingRef.current.accuracy) {
        locatingRef.current.accuracy = window.L
          .circle([lat, lng], {
            radius: acc || 30,
            color: "#1d4ed8",
            fillColor: "#3b82f6",
            fillOpacity: 0.12,
            weight: 1,
          })
          .addTo(map);
      }
    };

    const updatePos = (lat, lng, acc = 30, fly = false) => {
      ensureLayers(lat, lng, acc);
      locatingRef.current.marker.setLatLng([lat, lng]);
      locatingRef.current.accuracy.setLatLng([lat, lng]);
      locatingRef.current.accuracy.setRadius(acc);
      if (fly) {
        map.flyTo([lat, lng], Math.max(map.getZoom(), 15), { duration: 0.8 });
      }
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        updatePos(latitude, longitude, accuracy, true);
      },
      (err) => {
        console.warn(err);
        alert("Không lấy được vị trí. Hãy kiểm tra quyền truy cập vị trí.");
        locatingRef.current.following = false;
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        updatePos(latitude, longitude, accuracy, false);
      },
      (err) => {
        console.warn(err);
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );
    locatingRef.current.watchId = watchId;
  };

  /* ==============================
     FILTER HANDLERS
     ============================== */
  const handleFilterChange = (setter, type, value) => {
    setter((prev) => {
      const newSet = new Set(prev[type]);
      newSet.has(value) ? newSet.delete(value) : newSet.add(value);
      return { ...prev, [type]: newSet };
    });
  };

  const handleYearChange = (setter, e) => {
    setter((prev) => ({ ...prev, year: parseInt(e.target.value, 10) }));
  };

  const filteredGalleryItems = galleryData.filter((item) => {
    const matchPeriod = item.period.some((p) => galleryFilters.periods.has(p));
    const matchRegion = item.region.some((r) => galleryFilters.regions.has(r));
    const matchYear = item.year <= galleryFilters.year;
    return matchPeriod && matchRegion && matchYear;
  });

  const openModal = (index) => setSelectedImageIndex(index);
  const closeModal = () => setSelectedImageIndex(null);
  const showNextImage = () => {
    if (selectedImageIndex === null) return;
    const nextIndex = (selectedImageIndex + 1) % filteredGalleryItems.length;
    setSelectedImageIndex(nextIndex);
  };
  const showPrevImage = () => {
    if (selectedImageIndex === null) return;
    const prevIndex =
      (selectedImageIndex - 1 + filteredGalleryItems.length) %
      filteredGalleryItems.length;
    setSelectedImageIndex(prevIndex);
  };

  /* ==============================
     SEARCH
     ============================== */
  useEffect(() => {
    if (!searchText.trim()) {
      setSuggestions([]);
      return;
    }
    const q = searchText.toLowerCase().normalize("NFC");
    const results = mapData
      .filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          (e.province && e.province.toLowerCase().includes(q))
      )
      .slice(0, 8);
    setSuggestions(results);
  }, [searchText]);

  const focusPlace = (place) => {
    const map = mapInstanceRef.current;
    if (!map) return;
    setMapFilters((prev) => ({
      ...prev,
      provinces: new Set([...prev.provinces, place.province]),
      regions: new Set([...prev.regions, place.region]),
      periods: new Set([...prev.periods, place.period]),
    }));
    map.flyTo([place.lat, place.lng], Math.max(map.getZoom(), 14), {
      duration: 0.8,
    });
    const found = markersRef.current.find(
      (m) => m.data.name === place.name && m.data.lat === place.lat
    );
    if (found) {
      setTimeout(() => {
        found.marker.openPopup();
      }, 850);
    }
    setShowSuggest(false);
    setSearchText(place.name);
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      focusPlace(suggestions[0]);
    }
  };

  /* ==============================
     CUSTOM CHECKBOX (gallery filters)
     ============================== */
  const CustomCheckbox = ({ label, value, checked, onChange }) => (
    <label className="filter-button relative flex cursor-pointer select-none items-center gap-2 transition-all duration-200 hover:scale-105">
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer absolute h-full w-full opacity-0"
      />
      <span
        className={`flex h-5 w-5 items-center justify-center rounded border-2 border-[#dc8154] transition-all duration-200 peer-checked:border-[#2e1e10] peer-checked:bg-[#2e1e10]`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-3 w-3 text-white transition-opacity opacity-0 peer-checked:opacity-100`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <span className="text-sm font-medium text-[#2e1e10]">{label}</span>
    </label>
  );


  return (
    <>
      <style>
        {`
          /* THUMB RANGE */
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none; width: 24px; height: 24px; background: #dc8154; border-radius: 50%; cursor: pointer; border: 4px solid #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.2); margin-top: -9px; transition: transform 0.2s;
          }
          input[type="range"]::-webkit-slider-thumb:hover { transform: scale(1.1); }
          input[type="range"]::-moz-range-thumb { width: 24px; height: 24px; background: #dc8154; border-radius: 50%; cursor: pointer; border: 4px solid #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.2); transition: transform 0.2s; }
          input[type="range"]::-moz-range-thumb:hover { transform: scale(1.1); }

          /* MAP */
          .map-container { transition: all 0.3s ease-in-out; }
          .map-container:hover { transform: scale(1.02); box-shadow: 0 15px 40px rgba(0,0,0,0.2); }

          /* PARALLAX */
          .parallax-bg { background-attachment: fixed; background-position: center; background-repeat: no-repeat; background-size: cover; }
          @media (max-width: 768px) { .parallax-bg { background-attachment: scroll; } }

          /* POPUP */
          .luxury-popup .leaflet-popup-content-wrapper { background: transparent !important; box-shadow: none !important; padding: 0 !important; border-radius: 16px !important; }
          .luxury-popup .leaflet-popup-tip { background: #2e1e10 !important; }

          /* PULSE (đã bỏ dùng cho marker) */
          @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(220, 129, 84, 0.5); } 70% { box-shadow: 0 0 0 10px rgba(220, 129, 84, 0); } 100% { box-shadow: 0 0 0 0 rgba(220, 129, 84, 0); } }

          /* ANIMATION */
          @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }

          @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; } 50% { transform: translateY(-30px) rotate(5deg); opacity: 0.8; } }
          .animate-float { animation: float linear infinite; }

          @keyframes pulse-slow { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
          .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }

          .filter-button:hover span { background: #2e1e10 !important; border-color: #2e1e10 !important; }
          .filter-button:hover svg { opacity: 1 !important; }

          .luxury-popup .leaflet-popup-content-wrapper {
            background: transparent !important;
            box-shadow: none !important;
            padding: 0 !important;
            border-radius: 24px !important;
            overflow: hidden;
          }
          .luxury-popup .leaflet-popup-tip {
            background: linear-gradient(135deg, #dc8154, #2e1e10) !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          }
          .luxury-popup .leaflet-popup-content {
            margin: 0 !important;
            width: 100% !important;
          }

          /* overlay mask khi mở sidebar */
          .sidebar-mask{
            position:absolute; inset:0; background:rgba(0,0,0,.15);
            opacity:0; pointer-events:none; transition:opacity .2s; border-radius:16px;
          }
          .sidebar-mask.open{ opacity:1; pointer-events:auto; }
        `}
      </style>

      <main className="bg-gradient-to-b from-[#fdfaf3] to-[#f5e6d3] p-4 md:p-8 overflow-hidden">
        {/* HEADER */}
        <header
          className="parallax-bg relative -mx-4 md:-mx-8 -mt-4 md:-mt-8 mb-12 overflow-hidden min-h-screen flex items-center justify-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)), url(${halongImg})`,
            backgroundBlendMode: "multiply",
          }}
          data-aos="fade-down"
          data-aos-duration="1200"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-amber-700/10"></div>
            <div className="absolute inset-0 opacity-30">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-amber-400 rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 8}s`,
                    animationDuration: `${8 + Math.random() * 10}s`,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-amber-100 tracking-tight drop-shadow-2xl mb-4 leading-tight">
              <span
                className="inline-block animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                Việt Nam
              </span>{" "}
              <span
                className="inline-block animate-fade-in-up text-amber-400"
                style={{ animationDelay: "0.4s" }}
              >
                Sử Ký
              </span>
            </h1>
            <p
              className="text-xl md:text-2xl text-amber-200 font-medium max-w-5xl mx-auto leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.7s" }}
            >
              Chạm vào từng địa danh – nghe tiếng vọng của ngàn năm dựng nước và
              giữ nước.
            </p>
            <div
              className="mt-8 animate-fade-in-up"
              style={{ animationDelay: "1s" }}
            >
              <button
                onClick={handleScrollToMap}
                className="group inline-flex items-center gap-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-lg px-8 py-4 rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <span>Khám Phá Ngay</span>
                <svg
                  className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>
        
        {/* THANH CÔNG CỤ TRÊN MAP: search + bộ lọc nhanh */}
        <section data-aos="fade-up" data-aos-delay="100">
          <div className="mx-auto mb-6 max-w-7xl flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-white/70 p-6 shadow-2xl backdrop-blur-lg">
            {/* Quick filters: thời kỳ */}
            <div className="flex items-center gap-x-4 gap-y-3 flex-wrap">
              <strong className="text-lg font-semibold text-[#2e1e10]">Thời kỳ:</strong>
              {PERIODS.map((period) => (
                <label
                  key={period}
                  className="flex items-center gap-2 text-base font-medium text-[#2e1e10] cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-[#dc8154] rounded border-2 border-gray-400"
                    checked={mapFilters.periods.has(period)}
                    onChange={() => handleFilterChange(setMapFilters, "periods", period)}
                  />
                  {period}
                </label>
              ))}
            </div>

            {/* Quick filters: vùng miền */}
            <div className="flex items-center gap-4">
              <strong className="text-lg font-semibold text-[#2e1e10]">Vùng miền:</strong>
              {REGIONS.map((region) => (
                <label
                  key={region}
                  className="flex items-center gap-2 text-base font-medium text-[#2e1e10] cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-[#dc8154] rounded border-2 border-gray-400"
                    checked={mapFilters.regions.has(region)}
                    onChange={() => handleFilterChange(setMapFilters, "regions", region)}
                  />
                  {region}
                </label>
              ))}
            </div>

            {/* Năm */}
            <div className="flex flex-1 items-center gap-3 min-w-[300px]">
              <strong className="text-lg font-semibold text-[#2e1e10]">
                Năm ≤ <span className="font-bold text-[#dc8154]">{mapFilters.year}</span>
              </strong>
              <input
                type="range"
                min="500"
                max="2024"
                value={mapFilters.year}
                step="1"
                className="h-2 w-full cursor-pointer rounded-full bg-[#2e1e10]/20"
                onChange={(e) => handleYearChange(setMapFilters, e)}
              />
            </div>
          </div>

          {/* Thanh search (giữ) */}
          <div className="mx-auto mb-4 max-w-7xl relative">
            <form onSubmit={onSearchSubmit} className="relative">
              <input
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setShowSuggest(true);
                }}
                onFocus={() => setShowSuggest(true)}
                placeholder="Tìm địa danh (ví dụ: Chợ Bến Thành, Cố đô Huế, Văn Miếu...)"
                className="w-full rounded-xl border border-amber-200 bg-white/90 px-4 py-3 pr-[100px] shadow-sm outline-none focus:ring-2 focus:ring-amber-400 text-[#2e1e10]"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-[#2e1e10] px-4 py-2 text-white font-semibold"
              >
                Tìm
              </button>

              {/* Gợi ý */}
              {showSuggest && suggestions.length > 0 && (
                <div
                  className="absolute z-[999] mt-2 w-full max-h-72 overflow-auto rounded-lg border border-amber-200 bg-white shadow-lg"
                  onMouseLeave={() => setShowSuggest(false)}
                >
                  {suggestions.map((s) => (
                    <div
                      key={`${s.name}-${s.lat}`}
                      className="cursor-pointer px-4 py-2 hover:bg-amber-50"
                      onClick={() => focusPlace(s)}
                    >
                      <div className="font-semibold text-[#2e1e10]">{s.name}</div>
                      <div className="text-sm text-gray-500">
                        {s.province} · {s.region} Bộ · {s.period}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>

          {/* MAP */}
          <div className="relative mx-auto max-w-9xl">
            {/* Sidebar mask */}
            <div
              className={`sidebar-mask ${isFilterPanelVisible ? "open" : ""}`}
              onClick={() => setFilterPanelVisible(false)}
            />
            {/* Sidebar lọc theo tỉnh (nằm TRONG map, mở bằng hamburger) */}
            <aside
              className={`absolute left-0 top-0 z-[999] h-[700px] w-[320px] overflow-auto rounded-xl bg-white/95 p-4 shadow-2xl transition-transform ${
                isFilterPanelVisible ? "translate-x-0" : "-translate-x-[110%]"
              }`}
              style={{ backdropFilter: "blur(6px)" }}
            >
              {/* Nút ĐÓNG */}
              <button
                onClick={() => setFilterPanelVisible(false)}
                aria-label="Đóng bộ lọc"
                className="absolute right-3 top-3 rounded-full bg-white p-2 border border-gray-200 shadow-md hover:shadow-lg"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2">
                  <path d="M6 6l12 12M18 6l-12 12" />
                </svg>
              </button>
              <div className="mr-10 mb-3 flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#2e1e10]">Lọc theo Tỉnh/TP</h3>
                <button
                  onClick={() =>
                    setMapFilters((prev) => ({
                      ...prev,
                      provinces: new Set(PROVINCES),
                    }))
                  }
                  className="text-sm font-semibold text-[#dc8154]"
                >
                  Chọn tất cả
                </button>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Lọc danh sách tỉnh…"
                  className="w-full rounded-lg border border-amber-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 text-[#2e1e10]"
                  onChange={(e) => {
                    const val = e.target.value.toLowerCase();
                    const items = Array.from(
                      document.querySelectorAll(".province-item")
                    );
                    items.forEach((el) => {
                      const name = el.getAttribute("data-name");
                      el.style.display = name?.toLowerCase().includes(val)
                        ? "flex"
                        : "none";
                    });
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                {PROVINCES.map((p) => (
                  <label
                    key={p}
                    data-name={p}
                    className="province-item flex items-center justify-between gap-3 rounded-lg border border-amber-100 px-3 py-2"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-[#dc8154]"
                        checked={mapFilters.provinces.has(p)}
                        onChange={() =>
                          handleFilterChange(setMapFilters, "provinces", p)
                        }
                      />
                      <span className="truncate text-sm text-[#2e1e10]">{p}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {mapData.filter((d) => d.province === p).length} địa danh
                    </span>
                  </label>
                ))}
              </div>
            </aside>

            {/* Nút hamburger (ba gạch) để mở sidebar trong map */}
            <div className="absolute left-3 top-3 z-[998]">
              <button
                onClick={() => setFilterPanelVisible(true)}
                title="Mở bộ lọc địa danh"
                className="rounded-lg bg-white p-3 shadow-md hover:shadow-lg border border-gray-200"
              >
                {/* icon hamburger */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2">
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              </button>
            </div>

            {/* Nút định vị giống Google Maps */}
            <div className="absolute right-3 bottom-8 z-900 flex flex-col gap-2">
              <button
                onClick={toggleLocate}
                title="Vị trí của tôi"
                className="rounded-lg bg-white p-3 shadow-md hover:shadow-lg border border-gray-200"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2">
                  <path d="M12 8v8m-4-4h8"/>
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M12 2v2m0 16v2M2 12h2m16 0h2"/>
                </svg>
              </button>
            </div>

            <div
              ref={mapContainerRef}
              className="map-container mb-8 h-[700px] mx-auto overflow-hidden rounded-2xl shadow-2xl"
            />
          </div>
        </section>
        

        {/* GALLERY TIÊU ĐỀ + TAB + FILTER + GRID (giữ nguyên) */}
        <section
          className="relative mx-auto my-20 max-w-6xl text-center overflow-hidden"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div
              className="w-full h-full bg-repeat"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23dc8154' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "60px",
              }}
            ></div>
          </div>
          <div className="inline-block p-6 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 shadow-inner mb-6 animate-pulse-slow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 text-amber-700"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6l5.25 3.15.75-1.23-4-2.4z" />
            </svg>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-[#2e1e10] mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-amber-700 to-[#2e1e10]">
              Thư Viện Dòng Chảy
            </span>
            <br />
            <span className="text-4xl md:text-5xl text-amber-600">
              Lịch Sử Việt Nam
            </span>
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-600"></div>
            <span className="text-amber-700 font-medium tracking-widest">
              NGÀN NĂM VĂN HIẾN
            </span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-600"></div>
          </div>
          <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Mỗi bức ảnh là một chương sử. Mỗi chi tiết là một câu chuyện.{" "}
            <span className="text-amber-600 font-semibold">
              Hãy để hình ảnh dẫn lối bạn qua dòng chảy thời gian.
            </span>
          </p>

          <div
            className="mt-10 mb-4 flex justify-center gap-10"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {["all", "image", "video", "bxh"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-10 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold shadow-xl shadow-amber-300/50 scale-105 ring-2 ring-amber-400 ring-offset-2"
                    : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:text-white hover:scale-105 hover:shadow-lg border-2 border-amber-200 hover:border-transparent"
                }`}
              >
                {tab === "all"
                  ? "All"
                  : tab === "image"
                  ? "Ảnh"
                  : tab === "video"
                  ? "Video"
                  : "BXH"}
              </button>
            ))}
          </div>
        </section>

        <section
          className="relative z-10 mx-auto mb-8 max-w-7xl px-6"
          data-aos="fade-right"
          data-aos-delay="300"
        >
          {/* Panel filter cho GALLERY (giữ nguyên) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFilterPanelVisible((prev) => !prev);
            }}
            className="inline-flex cursor-pointer items-center gap-3 rounded-xl bg-[#dc8154] px-5 py-3 text-lg font-bold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#2e1e10] hover:shadow-md absolute top-[-80px] z-100"
          >
            <img
              src={filterIcon}
              width="24px"
              height="24px"
              alt="Filter Icon"
              className="invert brightness-0"
            />
            <span>Filters</span>
          </button>

          <div
            ref={filterPanelRef}
            className={`absolute top-(-100) left-0 z-100 mt-3 w-full flex flex-wrap items-center gap-x-10 gap-y-6 rounded-2xl bg-white/95 p-6 shadow-2xl backdrop-blur-md transition-all duration-500 ease-in-out ${
              isFilterPanelVisible
                ? "visible translate-y-0 opacity-100 scale-100"
                : "invisible translate-y-4 opacity-0 scale-95"
            }`}
          >
            <div className="flex flex-wrap items-center gap-5">
              <strong className="text-lg font-bold text-[#2e1e10]">
                Thời kỳ:
              </strong>
              <div className="flex flex-wrap items-center gap-5">
                {PERIODS.map((period) => (
                  <CustomCheckbox
                    key={period}
                    label={period}
                    value={period}
                    checked={galleryFilters.periods.has(period)}
                    onChange={() =>
                      handleFilterChange(setGalleryFilters, "periods", period)
                    }
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <strong className="text-lg font-bold text-[#2e1e10]">
                Vùng miền:
              </strong>
              <div className="flex flex-wrap items-center gap-5">
                {REGIONS.map((region) => (
                  <CustomCheckbox
                    key={region}
                    label={region}
                    value={region}
                    checked={galleryFilters.regions.has(region)}
                    onChange={() =>
                      handleFilterChange(setGalleryFilters, "regions", region)
                    }
                  />
                ))}
              </div>
            </div>
            <div className="flex min-w-[300px] flex-grow items-center gap-4">
              <strong className="whitespace-nowrap text-lg font-bold text-[#2e1e10]">
                Năm ≤{" "}
                <span className="font-extrabold text-[#dc8154]">
                  {galleryFilters.year}
                </span>
              </strong>
              <input
                type="range"
                min="700"
                max="2024"
                value={galleryFilters.year}
                step="1"
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#2e1e10]/20 outline-none transition-all duration-200"
                onChange={(e) => handleYearChange(setGalleryFilters, e)}
              />
            </div>
          </div>
        </section>

        <section className="p-6 columns-1 md:columns-2 lg:columns-3 gap-6">
          {filteredGalleryItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openModal(index)}
              className="group relative mb-6 break-inside-avoid rounded-3xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] cursor-pointer border border-amber-100/20"
              data-aos="fade-up"
              data-aos-delay={(index % 3) * 100}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="block h-auto w-full transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-90"
                loading="lazy"
              />
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-4 flex flex-col justify-between">
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/60 to-transparent pointer-events-none"></div>
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                <div className="relative z-10 flex justify-between items-start">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="flex items-center gap-2 rounded-lg bg-black/50 px-4 py-2 text-white text-sm font-semibold transition-all duration-300 hover:bg-black/70 focus:outline-none"
                    title="Chỉnh sửa ảnh"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="rounded-full bg-black/50 p-2 text-white transition-all duration-300 hover:bg-black/70 focus:outline-none"
                    title="Thêm vào yêu thích"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="relative z-10 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-white text-sm font-semibold">
                    <img
                      src={
                        item.authorAvatar ||
                        "https://cdn-icons-png.flaticon.com/512/1995/1995515.png"
                      }
                      alt={item.authorName || "Người dùng"}
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    <span>{item.authorName || "Người đăng"}</span>
                  </div>
                  <a
                    href={item.src}
                    download
                    title="Tải xuống ảnh"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 rounded-lg bg-black/50 px-4 py-2 text-white text-sm font-semibold transition-all duration-300 hover:bg-black/70 hover:scale-105 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      <ImageModal
        imageData={filteredGalleryItems[selectedImageIndex]}
        onClose={closeModal}
        onNext={showNextImage}
        onPrev={showPrevImage}
      />
    </>
  );
};

export default TraiNghiem;
