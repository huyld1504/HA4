import React, { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import ImageModal from '../components/ImageModal';

// Import ảnh từ thư mục assets
import hoanKiem from '../assets/hoankiem.jpg';
import diaDao from '../assets/diadao.png';
import ceo from '../assets/ceo.jpg';
import filterIcon from '../assets/filter.png';
import halongImg from '../assets/halong.jpg';

// --- DỮ LIỆU ĐỊA DANH VIỆT NAM (ẢNH + NÚT ĐƯỜNG ĐI) ---
const mapData = [
  // Bắc Bộ
  { 
    name: "Đền Hùng", 
    lat: 21.3682242, 
    lng: 105.3214424, 
    description: "Nơi thờ các vua Hùng, cội nguồn dân tộc Việt.", 
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/f/f8/Mausoleum_of_Hung_King.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/b/b3/Trung_t%C3%A2m_l%E1%BB%85_h%E1%BB%99i_%C4%91%E1%BB%81n_H%C3%B9ng_18-09-2015_1.jpg"
    ],
    period: "Hùng Vương",
    region: "Bắc"
  },
  { name: "Hồ Hoàn Kiếm", lat: 21.0285, lng: 105.8522, description: "Biểu tượng Hà Nội, gắn với truyền thuyết rùa thần.", images: ["https://upload.wikimedia.org/wikipedia/commons/9/9f/HoanKiemLake.jpg"], period: "Lý", region: "Bắc" },
  { name: "Văn Miếu Quốc Tử Giám", lat: 21.0287, lng: 105.8358, description: "Trường đại học đầu tiên của Việt Nam (1070).", images: ["https://upload.wikimedia.org/wikipedia/commons/6/6f/VanMieu.jpg"], period: "Lý", region: "Bắc" },
  { name: "Lăng Bác", lat: 21.0369, lng: 105.8346, description: "Nơi an nghỉ của Chủ tịch Hồ Chí Minh.", images: ["https://upload.wikimedia.org/wikipedia/commons/0/0d/Ho_Chi_Minh_Mausoleum.jpg"], period: "Hồ", region: "Bắc" },
  { name: "Chùa Một Cột", lat: 21.0358, lng: 105.8335, description: "Công trình kiến trúc độc đáo thời Lý.", images: ["https://upload.wikimedia.org/wikipedia/commons/9/90/One_Pillar_Pagoda_Hanoi.jpg"], period: "Lý", region: "Bắc" },

  // Trung Bộ
  { name: "Cố đô Huế", lat: 16.4697, lng: 107.5792, description: "Kinh đô triều Nguyễn, Di sản UNESCO.", images: ["https://upload.wikimedia.org/wikipedia/commons/5/5e/Citadel_of_Hue.jpg"], period: "Nguyễn", region: "Trung" },
  { name: "Phố cổ Hội An", lat: 15.8800, lng: 108.3380, description: "Thương cảng sầm uất thế kỷ 16-17.", images: ["https://upload.wikimedia.org/wikipedia/commons/9/9f/HoiAn.jpg"], period: "Nguyễn", region: "Trung" },
  { name: "Thành nhà Hồ", lat: 20.0786, lng: 105.6036, description: "Thành đá duy nhất Đông Nam Á (1397).", images: ["https://upload.wikimedia.org/wikipedia/commons/1/1e/Th%C3%A0nh_Nh%C3%A0_H%E1%BB%93.JPG"], period: "Hồ", region: "Bắc" },
  { name: "Động Phong Nha", lat: 17.5908, lng: 106.2833, description: "Hang động lớn nhất thế giới, Di sản UNESCO.", images: ["https://upload.wikimedia.org/wikipedia/commons/8/8c/PhongNha.jpg"], period: "Hiện đại", region: "Trung" },

  // Nam Bộ
  {
    name: "Dinh Độc Lập",
    lat: 10.7769,
    lng: 106.6955,
    description: "Nơi ghi dấu chiến thắng 30/4/1975, biểu tượng thống nhất đất nước.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/5/5f/Dinh_Doc_Lap.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/2/2c/Dinh_Doc_Lap_2020.jpg"
    ],
    period: "Hiện đại",
    region: "Nam"
  },
  {
    name: "Địa đạo Củ Chi",
    lat: 11.0618,
    lng: 106.4952,
    description: "Hệ thống địa đạo huyền thoại, biểu tượng kháng chiến chống Mỹ.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/Cu_Chi_tunnels_entrance.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/7d/Cu_Chi_tunnels.jpg"
    ],
    period: "Hiện đại",
    region: "Nam"
  },

  // --- DI TÍCH QUỐC GIA (56) – TP.HCM + TỈNH ---
  {
    name: "Giồng Cá Vồ",
    lat: 10.4583,
    lng: 106.9167,
    description: "Di chỉ khảo cổ học thời tiền sử, chứng tích cư dân cổ Nam Bộ.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/1/1f/Giong_Ca_Vo.jpg"],
    period: "Tiền sử",
    region: "Nam"
  },
  {
    name: "Lò gốm cổ Hưng Lợi",
    lat: 10.7450,
    lng: 106.6750,
    description: "Lò gốm cổ thế kỷ 18-19, minh chứng nghề gốm Nam Bộ xưa.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/7/7a/Lo_gom_Hung_Loi.jpg"],
    period: "Nguyễn",
    region: "Nam"
  },
  {
    name: "Điện Ngọc Hoàng",
    lat: 10.7867,
    lng: 106.6967,
    description: "Ngôi miếu Hoa kiều cổ kính, thờ Ngọc Hoàng Thượng Đế.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/8/8f/Dien_Ngoc_Hoang.jpg"],
    period: "Pháp thuộc",
    region: "Nam"
  },
  {
    name: "Miếu Thiên Hậu (Quảng Triệu Hội Quán)",
    lat: 10.7717,
    lng: 106.6900,
    description: "Hội quán Hoa kiều lâu đời, thờ Thiên Hậu Thánh Mẫu.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/3/3e/Chua_Ba_Thien_Hau.jpg"],
    period: "Pháp thuộc",
    region: "Nam"
  },
  {
    name: "Tòa án Nhân dân TP.HCM",
    lat: 10.7764,
    lng: 106.6960,
    description: "Công trình kiến trúc Pháp cổ kính, biểu tượng công lý Sài Gòn.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/6/6a/Toa_an_Nhan_dan_TP.HCM.jpg"],
    period: "Pháp thuộc",
    region: "Nam"
  },
  {
    name: "Bảo tàng Lịch sử TP.HCM",
    lat: 10.7872,
    lng: 106.7067,
    description: "Nơi lưu giữ hơn 30.000 hiện vật lịch sử Việt Nam.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/0/0c/Bao_tang_Lich_su_Viet_Nam.jpg"],
    period: "Pháp thuộc",
    region: "Nam"
  },

  // --- MỞ RỘNG 50 DI TÍCH NAM BỘ MỚI ---
  // 1. Nhà thờ Tân Định (Quận 3)
  {
    name: "Nhà thờ Tân Định",
    lat: 10.7894,
    lng: 106.6903,
    description: "Nhà thờ màu hồng nổi tiếng, kiến trúc Gothic Pháp.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/9/9a/Nha_tho_Tan_Dinh.jpg"],
    period: "Pháp thuộc",
    region: "Nam"
  },
  // 2. Chùa Vĩnh Nghiêm (Quận 3)
  {
    name: "Chùa Vĩnh Nghiêm",
    lat: 10.7617,
    lng: 106.6883,
    description: "Ngôi chùa 7 tầng nổi tiếng, kiến trúc hiện đại.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/4/4f/Chua_Vinh_Nghiem.jpg"],
    period: "Hiện đại",
    region: "Nam"
  },
  // 3. Chợ Lớn (Quận 5)
  {
    name: "Chợ Lớn",
    lat: 10.7528,
    lng: 106.6533,
    description: "Khu phố Hoa sầm uất, trung tâm thương mại xưa.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/7/7e/Cho_Lon.jpg"],
    period: "Pháp thuộc",
    region: "Nam"
  },
  // 4. Chùa Bà Thiên Hậu (Chợ Lớn)
  {
    name: "Chùa Bà Thiên Hậu (Chợ Lớn)",
    lat: 10.7522,
    lng: 106.6611,
    description: "Ngôi chùa Hoa kiều cổ kính, linh thiêng bậc nhất Sài Gòn.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/3/3e/Chua_Ba_Thien_Hau.jpg"],
    period: "Pháp thuộc",
    region: "Nam"
  },
  // 5. Nhà thờ Huyện Sĩ (Quận 10)
  {
    name: "Nhà thờ Huyện Sĩ",
    lat: 10.7689,
    lng: 106.6700,
    description: "Nhà thờ Công giáo cổ, kiến trúc Pháp tinh xảo.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/1/1d/Nha_tho_Huyen_Si.jpg"],
    period: "Pháp thuộc",
    region: "Nam"
  },
  // 6. Lăng Lê Văn Duyệt (Bình Thạnh)
  {
    name: "Lăng Lê Văn Duyệt",
    lat: 10.7925,
    lng: 106.6967,
    description: "Lăng thờ Tả quân Lê Văn Duyệt, di tích cấp quốc gia.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/5/5a/Lang_Le_Van_Duyet.jpg"],
    period: "Nguyễn",
    region: "Nam"
  },
  // 7. Bến Nhà Rồng
  {
    name: "Bến Nhà Rồng",
    lat: 10.7694,
    lng: 106.7056,
    description: "Nơi Bác Hồ ra đi tìm đường cứu nước năm 1911.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/0/0a/Ben_Nha_Rong.jpg"],
    period: "Hiện đại",
    region: "Nam"
  },
  // 8. Bưu điện Trung tâm Sài Gòn
  {
    name: "Bưu điện Trung tâm Sài Gòn",
    lat: 10.7797,
    lng: 106.6997,
    description: "Công trình kiến trúc Pháp, biểu tượng Sài Gòn xưa.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/5/5e/Saigon_Central_Post_Office.jpg"],
    period: "Pháp thuộc",
    region: "Nam"
  },
  // 9. Nhà hát Thành phố
  {
    name: "Nhà hát Thành phố",
    lat: 10.7767,
    lng: 106.7033,
    description: "Nhà hát lớn nhất Việt Nam, kiến trúc Pháp cổ.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/2/2d/Saigon_Opera_House.jpg"],
    period: "Pháp thuộc",
    region: "Nam"
  },
  // 10. Chợ Bến Thành
  {
    name: "Chợ Bến Thành",
    lat: 10.7722,
    lng: 106.6983,
    description: "Biểu tượng thương mại Sài Gòn, hoạt động từ 1914.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/6/67/Ben_Thanh_Market.jpg"],
    period: "Pháp thuộc",
    region: "Nam"
  },
  // 11. Nhà thờ Đức Bà
  {
    name: "Nhà thờ Đức Bà",
    lat: 10.7798,
    lng: 106.6990,
    description: "Công trình Pháp nổi tiếng, biểu tượng Sài Gòn.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/7/7e/Saigon_Notre-Dame_Basilica.jpg"],
    period: "Pháp thuộc",
    region: "Nam"
  },
  // 12. Cầu Cần Thơ
  {
    name: "Cầu Cần Thơ",
    lat: 10.0361,
    lng: 105.7833,
    description: "Cầu dây văng dài nhất Đông Nam Á.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/9/9d/Can_Tho_Bridge.jpg"],
    period: "Hiện đại",
    region: "Nam"
  },
  // 13. Nhà cổ Bình Thủy (Cần Thơ)
  {
    name: "Nhà cổ Bình Thủy",
    lat: 10.0500,
    lng: 105.7667,
    description: "Ngôi nhà cổ 5 gian, kiến trúc Pháp - Việt kết hợp.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/0/0f/Nha_co_Binh_Thuy.jpg"],
    period: "Pháp thuộc",
    region: "Nam"
  },
  // 14. Chợ nổi Cái Răng
  {
    name: "Chợ nổi Cái Răng",
    lat: 10.0167,
    lng: 105.7833,
    description: "Chợ nổi lớn nhất miền Tây, biểu tượng văn hóa sông nước.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/7/7c/Cho_noi_Cai_Rang.jpg"],
    period: "Hiện đại",
    region: "Nam"
  },
  // 15. Nhà trăm cột (Long An)
  {
    name: "Nhà trăm cột",
    lat: 10.5333,
    lng: 106.4167,
    description: "Công trình kiến trúc gỗ độc đáo, di sản văn hóa Long An.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/9/9c/Nha_tram_cot.jpg"],
    period: "Nguyễn",
    region: "Nam"
  },
  // 16. Khu di tích Ấp Bắc (Tiền Giang)
  {
    name: "Khu di tích Ấp Bắc",
    lat: 10.4167,
    lng: 106.2333,
    description: "Nơi diễn ra trận đánh nổi tiếng năm 1963.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/6/6b/Ap_Bac_memorial.jpg"],
    period: "Hiện đại",
    region: "Nam"
  },
  // 17. Căn cứ Xuyên Mộc (Bà Rịa - Vũng Tàu)
  {
    name: "Căn cứ Xuyên Mộc",
    lat: 10.5833,
    lng: 107.3333,
    description: "Căn cứ cách mạng thời kháng chiến chống Mỹ.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/2/2a/Can_cu_Xuyen_Moc.jpg"],
    period: "Hiện đại",
    region: "Nam"
  },
  // 18. Địa đạo Bến Đình (Vĩnh Long)
  {
    name: "Địa đạo Bến Đình",
    lat: 10.2500,
    lng: 105.9667,
    description: "Hệ thống địa đạo kháng chiến ở Đồng bằng sông Cửu Long.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/8/8d/Dia_dao_Ben_Dinh.jpg"],
    period: "Hiện đại",
    region: "Nam"
  },
  // 19. Tòa Thánh Tây Ninh
  {
    name: "Tòa Thánh Tây Ninh",
    lat: 11.3167,
    lng: 106.1167,
    description: "Trung tâm đạo Cao Đài, kiến trúc độc đáo.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/7/7d/Toa_Thanh_Tay_Ninh.jpg"],
    period: "Hiện đại",
    region: "Nam"
  },
  // 20. Chùa Dơi (Sóc Trăng)
  {
    name: "Chùa Dơi",
    lat: 9.6000,
    lng: 105.9667,
    description: "Ngôi chùa Khmer nổi tiếng với hàng ngàn con dơi.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/3/3f/Chua_Doi.jpg"],
    period: "Hiện đại",
    region: "Nam"
  },

  // === THÊM 30 DI TÍCH NỮA ĐỂ ĐẠT 50+ ===
  // 21. Nhà công tử Bạc Liêu
  {
    name: "Nhà công tử Bạc Liêu",
    lat: 9.2833,
    lng: 105.7167,
    description: "Ngôi nhà giàu có nhất Nam Kỳ xưa.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/1/1e/Nha_cong_tu_Bac_Lieu.jpg"],
    period: "Pháp thuộc",
    region: "Nam"
  },
  // 22. Chùa Vĩnh Tràng (Tiền Giang)
  {
    name: "Chùa Vĩnh Tràng",
    lat: 10.3833,
    lng: 106.3667,
    description: "Ngôi chùa lớn nhất miền Tây, kiến trúc Á - Âu.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/5/5c/Chua_Vinh_Trang.jpg"],
    period: "Nguyễn",
    region: "Nam"
  },
  // 23. Cồn Phụng (Bến Tre)
  {
    name: "Cồn Phụng",
    lat: 10.2500,
    lng: 106.3667,
    description: "Đảo du lịch sinh thái, làng nghề truyền thống.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/8/8b/Con_Phung.jpg"],
    period: "Hiện đại",
    region: "Nam"
  },
  // 24. Làng nổi Tân Lập (Long An)
  {
    name: "Làng nổi Tân Lập",
    lat: 10.6000,
    lng: 105.9833,
    description: "Làng nổi trên sông Vàm Cỏ, văn hóa sông nước.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/4/4d/Lang_noi_Tan_Lap.jpg"],
    period: "Hiện đại",
    region: "Nam"
  },
  // 25. Nhà tù Côn Đảo
  {
    name: "Nhà tù Côn Đảo",
    lat: 8.6833,
    lng: 106.6167,
    description: "Nhà tù thực dân khét tiếng, nơi giam giữ chiến sĩ cách mạng.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/9/9f/Nha_tu_Con_Dao.jpg"],
    period: "Pháp thuộc",
    region: "Nam"
  },
  // 26. Hầm Thủ Thiêm
  {
    name: "Hầm Thủ Thiêm",
    lat: 10.7817,
    lng: 106.7167,
    description: "Đường hầm hiện đại vượt sông Sài Gòn.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/9/9e/Thu_Thiem_Tunnel.jpg"],
    period: "Hiện đại",
    region: "Nam"
  },
  // 27. Cầu Rạch Miễu
  {
    name: "Cầu Rạch Miễu",
    lat: 10.3500,
    lng: 106.3667,
    description: "Cầu dây văng nối Tiền Giang - Bến Tre.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/1/1a/Cau_Rach_Mieu.jpg"],
    period: "Hiện đại",
    region: "Nam"
  },
  // 28. Suối Tiên
  {
    name: "Khu du lịch Suối Tiên",
    lat: 10.8667,
    lng: 106.8000,
    description: "Công viên văn hóa giải trí lớn nhất miền Nam.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/6/6f/Suoi_Tien.jpg"],
    period: "Hiện đại",
    region: "Nam"
  },
  // 29. Căn cứ Dương Minh Châu (Tây Ninh)
  {
    name: "Căn cứ Dương Minh Châu",
    lat: 11.3333,
    lng: 106.1167,
    description: "Căn cứ cách mạng thời kháng chiến chống Pháp.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/4/4c/Duong_Minh_Chau_base.jpg"],
    period: "Hiện đại",
    region: "Nam"
  },
  // 30. Nhà tù Phú Quốc
  {
    name: "Nhà tù Phú Quốc",
    lat: 10.2167,
    lng: 103.9667,
    description: "Nhà tù thực dân, nơi giam giữ chiến sĩ cách mạng.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/8/8a/Nha_tu_Phu_Quoc.jpg"],
    period: "Hiện đại",
    region: "Nam"
  },

  // === 20 DI TÍCH NỮA ĐỂ ĐẠT 50+ ===
  // 31-50: Thêm các di tích nổi tiếng khác
  { name: "Đồi Cù (Đà Lạt)", lat: 11.9417, lng: 108.4417, description: "Biểu tượng Đà Lạt, nơi ngắm toàn cảnh thành phố.", images: ["https://upload.wikimedia.org/wikipedia/commons/7/7c/Doi_Cu.jpg"], period: "Pháp thuộc", region: "Nam" },
  { name: "Nhà thờ Domaine de Marie", lat: 11.9500, lng: 108.4333, description: "Nhà thờ hồng nổi tiếng Đà Lạt.", images: ["https://upload.wikimedia.org/wikipedia/commons/5/5d/Nha_tho_Domaine.jpg"], period: "Pháp thuộc", region: "Nam" },
  { name: "Chùa Linh Phước (Đà Lạt)", lat: 11.9167, lng: 108.4667, description: "Chùa ve chai độc đáo nhất Việt Nam.", images: ["https://upload.wikimedia.org/wikipedia/commons/3/3a/Chua_Linh_Phuoc.jpg"], period: "Hiện đại", region: "Nam" },
  { name: "Cáp treo Đà Lạt", lat: 11.9333, lng: 108.4333, description: "Cáp treo dài nhất Việt Nam.", images: ["https://upload.wikimedia.org/wikipedia/commons/1/1b/Cap_treo_Da_Lat.jpg"], period: "Hiện đại", region: "Nam" },
  { name: "Chợ Đà Lạt", lat: 11.9417, lng: 108.4333, description: "Chợ đêm nổi tiếng, trung tâm ẩm thực.", images: ["https://upload.wikimedia.org/wikipedia/commons/6/6e/Cho_Da_Lat.jpg"], period: "Hiện đại", region: "Nam" },
  { name: "Dinh Bảo Đại", lat: 11.9333, lng: 108.4417, description: "Dinh thự của vua Bảo Đại.", images: ["https://upload.wikimedia.org/wikipedia/commons/9/9d/Dinh_Bao_Dai.jpg"], period: "Pháp thuộc", region: "Nam" },
  { name: "Hồ Xuân Hương", lat: 11.9417, lng: 108.4333, description: "Trái tim Đà Lạt, hồ nước thơ mộng.", images: ["https://upload.wikimedia.org/wikipedia/commons/0/0a/Ho_Xuan_Huong.jpg"], period: "Pháp thuộc", region: "Nam" },
  { name: "Thung lũng Tình Yêu", lat: 11.9500, lng: 108.4500, description: "Địa điểm du lịch lãng mạn.", images: ["https://upload.wikimedia.org/wikipedia/commons/2/2f/Thung_lung_Tinh_Yeu.jpg"], period: "Hiện đại", region: "Nam" },
  { name: "Ga Đà Lạt", lat: 11.9417, lng: 108.4583, description: "Nhà ga cổ kính nhất Đông Dương.", images: ["https://upload.wikimedia.org/wikipedia/commons/4/4b/Ga_Da_Lat.jpg"], period: "Pháp thuộc", region: "Nam" },
  { name: "Trường Cao đẳng Sư phạm Đà Lạt", lat: 11.9333, lng: 108.4333, description: "Kiến trúc Pháp cổ kính.", images: ["https://upload.wikimedia.org/wikipedia/commons/5/5a/Truong_Cao_dang_Da_Lat.jpg"], period: "Pháp thuộc", region: "Nam" },
  { name: "Chùa Thiên Vương Cổ Sát", lat: 10.7667, lng: 106.6833, description: "Ngôi chùa Hoa kiều cổ kính.", images: ["https://upload.wikimedia.org/wikipedia/commons/7/7f/Chua_Thien_Vuong.jpg"], period: "Pháp thuộc", region: "Nam" },
  { name: "Bình Quới", lat: 10.8167, lng: 106.7333, description: "Làng du lịch sinh thái ven sông.", images: ["https://upload.wikimedia.org/wikipedia/commons/8/8c/Binh_Quoi.jpg"], period: "Hiện đại", region: "Nam" },
  { name: "Địa đạo Bến Duộc", lat: 10.6833, lng: 106.5167, description: "Hệ thống địa đạo kháng chiến.", images: ["https://upload.wikimedia.org/wikipedia/commons/1/1a/Dia_dao_Ben_Duoc.jpg"], period: "Hiện đại", region: "Nam" },
  { name: "Khu di tích Gò Tháp (Đồng Tháp)", lat: 10.6333, lng: 105.6167, description: "Di chỉ Óc Eo, văn hóa cổ Nam Bộ.", images: ["https://upload.wikimedia.org/wikipedia/commons/3/3d/Go_Thap.jpg"], period: "Tiền sử", region: "Nam" },
  { name: "Vườn quốc gia Tràm Chim", lat: 10.7167, lng: 105.4333, description: "Vùng đất ngập nước Ramsar.", images: ["https://upload.wikimedia.org/wikipedia/commons/6/6a/Tram_Chim.jpg"], period: "Hiện đại", region: "Nam" },
  { name: "Chùa Bà Châu Đốc", lat: 10.7000, lng: 105.1167, description: "Ngôi miếu linh thiêng miền Tây.", images: ["https://upload.wikimedia.org/wikipedia/commons/9/9b/Chua_Ba_Chau_Doc.jpg"], period: "Nguyễn", region: "Nam" },
  { name: "Rừng tràm Trà Sư", lat: 10.5667, lng: 105.1333, description: "Rừng tràm ngập nước đẹp nhất miền Tây.", images: ["https://upload.wikimedia.org/wikipedia/commons/0/0d/Rung_tram_Tra_Su.jpg"], period: "Hiện đại", region: "Nam" },
  { name: "Cù lao Thới Sơn", lat: 10.3667, lng: 106.3667, description: "Đảo trái cây nổi tiếng Tiền Giang.", images: ["https://upload.wikimedia.org/wikipedia/commons/2/2e/Cu_lao_Thoi_Son.jpg"], period: "Hiện đại", region: "Nam" },
  { name: "Làng cổ Phước Tích", lat: 16.4667, lng: 107.5833, description: "Làng gốm cổ Huế.", images: ["https://upload.wikimedia.org/wikipedia/commons/4/4f/Phuoc_Tich.jpg"], period: "Nguyễn", region: "Trung" }, // Bonus
  { name: "Cầu Vàng Đà Nẵng", lat: 15.9958, lng: 107.9914, description: "Cây cầu bàn tay nổi tiếng thế giới.", images: ["https://upload.wikimedia.org/wikipedia/commons/7/7a/Cau_Vang.jpg"], period: "Hiện đại", region: "Trung" } // Bonus
];

const galleryData = [
  { id: 1, period: ["Lý", "Hồ"], region: ["Bắc"], year: 1010, src: hoanKiem, alt: "Hoàng thành Thăng Long", caption: "Hoàng thành Thăng Long – Di tích lịch sử nổi bật, trung tâm quyền lực suốt nhiều triều đại Việt Nam." },
  { id: 2, period: ["Trần"], region: ["Trung", "Nam"], year: 1285, src: diaDao, alt: "Chiến thắng Đông Bộ Đầu", caption: "Chiến thắng Đông Bộ Đầu - Trần Hưng Đạo đánh tan quân Nguyên." },
  { id: 3, period: ["Hồ"], region: ["Nam"], year: 1397, src: ceo, alt: "Thành nhà Hồ", caption: "Thành nhà Hồ, di sản văn hóa thế giới được UNESCO công nhận." },
  { id: 4, period: ["Lý"], region: ["Bắc", "Trung", "Nam"], year: 1049, src: ceo, alt: "Chùa Một Cột", caption: "Chùa Một Cột, một trong những biểu tượng của thủ đô Hà Nội." },
  { id: 5, period: ["Nguyễn"], region: ["Trung"], year: 1802, src: hoanKiem, alt: "Cố đô Huế", caption: "Cố đô Huế, kinh thành của triều đại nhà Nguyễn." },
  { id: 6, period: ["Hiện đại"], region: ["Nam"], year: 1975, src: diaDao, alt: "Dinh Độc Lập", caption: "Dinh Độc Lập, biểu tượng của ngày thống nhất đất nước 30/4/1975." },
  { id: 7, period: ["Pháp thuộc"], region: ["Nam"], year: 1914, src: ceo, alt: "Chợ Bến Thành", caption: "Chợ Bến Thành, một trong những công trình kiến trúc lâu đời tại Sài Gòn." },
  { id: 8, period: ["Lý", "Trần", "Nguyễn", "Hiện đại"], region: ["Bắc", "Trung", "Nam"], year: 2012, src: hoanKiem, alt: "Lễ hội đền Hùng", caption: "Lễ hội đền Hùng, di sản văn hóa phi vật thể của nhân loại." },
  { id: 9, period: ["Pháp thuộc"], region: ["Nam"], year: 1914, src: ceo, alt: "Chợ Bến Thành", caption: "Chợ Bến Thành, một trong những công trình kiến trúc lâu đời tại Sài Gòn." },
  { id: 10, period: ["Lý", "Trần", "Nguyễn", "Hiện đại"], region: ["Bắc", "Trung", "Nam"], year: 2012, src: hoanKiem, alt: "Lễ hội đền Hùng", caption: "Lễ hội đền Hùng, di sản văn hóa phi vật thể của nhân loại." },
  { id: 11, period: ["Hiện đại"], region: ["Nam"], year: 1975, src: diaDao, alt: "Dinh Độc Lập", caption: "Dinh Độc Lập, biểu tượng của ngày thống nhất đất nước 30/4/1975." },
  { id: 12, period: ["Pháp thuộc"], region: ["Nam"], year: 1914, src: ceo, alt: "Chợ Bến Thành", caption: "Chợ Bến Thành, một trong những công trình kiến trúc lâu đời tại Sài Gòn." },
  { id: 13, period: ["Lý", "Trần", "Nguyễn", "Hiện đại"], region: ["Bắc", "Trung", "Nam"], year: 2012, src: hoanKiem, alt: "Lễ hội đền Hùng", caption: "Lễ hội đền Hùng, di sản văn hóa phi vật thể của nhân loại." },
  { id: 14, period: ["Pháp thuộc"], region: ["Nam"], year: 1914, src: ceo, alt: "Chợ Bến Thành", caption: "Chợ Bến Thành, một trong những công trình kiến trúc lâu đời tại Sài Gòn." },
  { id: 15, period: ["Lý", "Trần", "Nguyễn", "Hiện đại"], region: ["Bắc", "Trung", "Nam"], year: 2012, src: hoanKiem, alt: "Lễ hội đền Hùng", caption: "Lễ hội đền Hùng, di sản văn hóa phi vật thể của nhân loại." },
];

const PERIODS = ["Lý", "Trần", "Nguyễn", "Hiện đại", "Pháp thuộc", "Hồ", "Hùng Vương"];
const REGIONS = ["Bắc", "Trung", "Nam"];

const TraiNghiem = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [mapFilters, setMapFilters] = useState({
    periods: new Set(PERIODS),
    regions: new Set(REGIONS),
    year: 2024,
  });
  const [galleryFilters, setGalleryFilters] = useState({
    periods: new Set(PERIODS),
    regions: new Set(REGIONS),
    year: 2024,
  });
  const [isFilterPanelVisible, setFilterPanelVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const filterPanelRef = useRef(null);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  const handleScrollToMap = () => {
    if (mapContainerRef.current) {
      mapContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openModal = (index) => setSelectedImageIndex(index);
  const closeModal = () => setSelectedImageIndex(null);
  const showNextImage = () => {
    if (selectedImageIndex === null) return;
    const nextIndex = (selectedImageIndex + 1) % filteredGalleryItems.length;
    setSelectedImageIndex(nextIndex);
  };
  const showPrevImage = () => {
    if (selectedImageIndex === null) return;
    const prevIndex = (selectedImageIndex - 1 + filteredGalleryItems.length) % filteredGalleryItems.length;
    setSelectedImageIndex(prevIndex);
  };

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true, offset: 100 });
  }, []);

  // --- KHỞI TẠO BẢN ĐỒ + POPUP CARD ĐỈNH CAO ---
  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current && window.L) {
      const map = window.L.map(mapContainerRef.current).setView([16.0, 107.5], 6);
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      mapInstanceRef.current = map;

      // ICON NHỎ, TINH TẾ, ĐỈNH CAO
      const commonIcon = window.L.divIcon({
        html: `
          <div style="
            background: #dc8154;
            width: 28px; height: 28px;
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 3px 10px rgba(220, 129, 84, 0.5);
            border: 2px solid #fff;
            animation: pulse 2s infinite;
          ">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
          </div>
        `,
        className: '',
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -28]
      });

      const markerLayer = window.L.layerGroup().addTo(map);

      markersRef.current = mapData.map(event => {
        // CARD POPUP ĐỈNH CAO
        const popupContent = `
            <div class="luxury-card-container relative w-[360px] font-sans overflow-hidden rounded-3xl shadow-2xl bg-white/95 backdrop-blur-xl border border-amber-100/50 transform-gpu transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
                
                <!-- GLASS EFFECT OVERLAY -->
                <div class="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-transparent to-amber-100/20 pointer-events-none"></div>
                
                <!-- BADGE THỜI KỲ + VÙNG MIỀN -->
                <div class="absolute top-4 left-4 right-4 flex justify-between z-20 pointer-events-none">
                <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#2e1e10] to-[#dc8154] text-white text-xs font-bold shadow-lg tracking-wider">
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/></svg>
                    ${event.period}
                </span>
                <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-600/90 text-white text-xs font-bold shadow-lg">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    ${event.region} Bộ
                </span>
                </div>

                <!-- HÌNH ẢNH CHÍNH -->
                <div class="relative h-48 overflow-hidden bg-gradient-to-b from-amber-50 to-amber-100">
                <img 
                    src="${event.images[0] || 'https://images.unsplash.com/photo-1506905925346-5008b58dde3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}" 
                    alt="${event.name}"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <h3 class="absolute bottom-4 left-5 text-2xl font-bold text-white drop-shadow-2xl tracking-tight z-10">
                    ${event.name}
                </h3>
                </div>

                <!-- NỘI DUNG -->
                <div class="p-5 space-y-4 relative z-10">
                <p class="text-sm text-gray-700 leading-relaxed line-clamp-3">
                    ${event.description}
                </p>

                <!-- THUMBNAIL ẢNH NHỎ -->
                ${event.images && event.images.length > 1 ? `
                    <div class="flex gap-2 overflow-x-auto scrollbar-hide">
                    ${event.images.slice(1, 4).map(img => `
                        <div class="group relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden cursor-pointer ring-2 ring-amber-200 ring-offset-2 transition-all hover:ring-amber-500" onclick="window.open('${img}', '_blank')">
                        <img src="${img}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-125">
                        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                            <svg class="w-5 h-5 text-white opacity-0 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                        </div>
                        </div>
                    `).join('')}
                    </div>
                ` : ''}

                <!-- NÚT CHỈ ĐƯỜNG SIÊU ĐỈNH -->
                <a 
                    href="https://www.google.com/maps/dir/?api=1&destination=${event.lat},${event.lng}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group relative overflow-hidden flex items-center justify-center gap-3 bg-gradient-to-r from-[#dc8154] via-[#f4a261] to-[#dc8154] text-white font-bold px-6 py-3.5 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/30 w-full text-center text-sm tracking-wider"
                    style="color: white !important;"
                    onmouseover="this.querySelector('.shine').style.transform='translateX(100%)'"
                    onmouseout="this.querySelector('.shine').style.transform='translateX(-100%)'"
                >
                <div class="shine absolute inset-0 w-12 bg-white/30 skew-x-12 -translate-x-full transition-transform duration-700"></div>
                
                <!-- ICON TRẮNG -->
                <svg class="w-5 h-5 text-white group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="stroke: white;">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                </svg>
                
                <!-- TEXT TRẮNG -->
                <span class="font-bold" style="color: white !important; text-shadow: 0 1px 2px rgba(0,0,0,0.3);">CHỈ ĐƯỜNG NGAY</span>
                
                <!-- MŨI TÊN TRẮNG -->
                <svg class="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="stroke: white;">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
                </a>

                <!-- GÓC TRANG TRÍ -->
                <div class="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl -z-10"></div>
                <div class="absolute bottom-0 left-0 w-24 h-24 bg-[#2e1e10]/5 rounded-full blur-2xl -z-10"></div>
            </div>

            <style>
                .luxury-card-container * { 
                font-family: 'Inter', 'Segoe UI', sans-serif !important;
                }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .shine { 
                transform: translateX(-100%);
                transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .luxury-card-container:hover {
                transform: translateY(-4px) scale(1.02) !important;
                }
                @media (max-width: 480px) {
                .luxury-card-container { width: 320px !important; }
                .luxury-card-container h3 { font-size: 1.4rem !important; }
                }
            </style>
            `;

        const marker = window.L.marker([event.lat, event.lng], { icon: commonIcon })
          .bindPopup(popupContent, { maxWidth: 340, className: 'luxury-popup' });

        marker.eventData = event;
        return { marker, layer: markerLayer };
      });

      markersRef.current.forEach(({ marker, layer }) => marker.addTo(layer));
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // --- LỌC MARKER THEO FILTER ---
  useEffect(() => {
    const { periods, regions, year } = mapFilters;
    markersRef.current.forEach(({ marker, layer }) => {
      const e = marker.eventData;
      const shouldShow = periods.has(e.period || "Hiện đại") && regions.has(e.region || "Bắc") && (e.year || 2024) <= year;
      if (shouldShow && !layer.hasLayer(marker)) {
        marker.addTo(layer);
      } else if (!shouldShow && layer.hasLayer(marker)) {
        layer.removeLayer(marker);
      }
    });
  }, [mapFilters]);

  const handleFilterChange = (setter, type, value) => {
    setter(prev => {
      const newSet = new Set(prev[type]);
      newSet.has(value) ? newSet.delete(value) : newSet.add(value);
      return { ...prev, [type]: newSet };
    });
  };

  const handleYearChange = (setter, e) => {
    setter(prev => ({ ...prev, year: parseInt(e.target.value, 10) }));
  };

  const filteredGalleryItems = galleryData.filter(item => {
    const matchPeriod = item.period.some(p => galleryFilters.periods.has(p));
    const matchRegion = item.region.some(r => galleryFilters.regions.has(r));
    const matchYear = item.year <= galleryFilters.year;
    return matchPeriod && matchRegion && matchYear;
  });

  const CustomCheckbox = ({ label, value, checked, onChange }) => (
    <label className="filter-button relative flex cursor-pointer select-none items-center gap-2 transition-all duration-200 hover:scale-105">
      <input type="checkbox" value={value} checked={checked} onChange={onChange} className="peer absolute h-full w-full opacity-0" />
      <span className={`flex h-5 w-5 items-center justify-center rounded border-2 border-[#dc8154] transition-all duration-200 peer-checked:border-[#2e1e10] peer-checked:bg-[#2e1e10]`}>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 text-white transition-opacity opacity-0 peer-checked:opacity-100`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
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

          /* PULSE */
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

            /* 3D TILT EFFECT (nếu muốn nâng cao hơn) */
            .luxury-card-container {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
            }
        `}
      </style>

      <main className="bg-gradient-to-b from-[#fdfaf3] to-[#f5e6d3] p-4 md:p-8 overflow-hidden">
        {/* HEADER */}
        <header className="parallax-bg relative -mx-4 md:-mx-8 -mt-4 md:-mt-8 mb-12 overflow-hidden min-h-screen flex items-center justify-center"
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)), url(${halongImg})`, backgroundBlendMode: 'multiply' }}
          data-aos="fade-down" data-aos-duration="1200">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-amber-700/10"></div>
            <div className="absolute inset-0 opacity-30">
              {[...Array(30)].map((_, i) => (
                <div key={i} className="absolute w-1 h-1 bg-amber-400 rounded-full animate-float"
                  style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 8}s`, animationDuration: `${8 + Math.random() * 10}s` }} />
              ))}
            </div>
          </div>
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-amber-100 tracking-tight drop-shadow-2xl mb-4 leading-tight">
              <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>Việt Nam</span>{' '}
              <span className="inline-block animate-fade-in-up text-amber-400" style={{ animationDelay: '0.4s' }}>Sử Ký</span>
            </h1>
            <p className="text-xl md:text-2xl text-amber-200 font-medium max-w-5xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              Chạm vào từng địa danh – nghe tiếng vọng của ngàn năm dựng nước và giữ nước.
            </p>
            <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '1s' }}>
              <button onClick={handleScrollToMap} className="group inline-flex items-center gap-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-lg px-8 py-4 rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105">
                <span>Khám Phá Ngay</span>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* FILTER + MAP */}
        <section data-aos="fade-up" data-aos-delay="100">
          <div className="mx-auto mb-6 max-w-7xl flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-white/70 p-6 shadow-2xl backdrop-blur-lg transition-all duration-300">
            <div className="flex items-center gap-x-4 gap-y-3 flex-wrap">
              <strong className="text-lg font-semibold text-[#2e1e10]">Thời kỳ:</strong>
              {PERIODS.map(period => (
                <label key={period} className="flex items-center gap-2 text-base font-medium text-[#2e1e10] transition-transform duration-200 hover:scale-105 cursor-pointer">
                  <input type="checkbox" className="h-5 w-5 accent-[#dc8154] rounded border-2 border-gray-400" checked={mapFilters.periods.has(period)} onChange={() => handleFilterChange(setMapFilters, 'periods', period)} /> {period}
                </label>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <strong className="text-lg font-semibold text-[#2e1e10]">Vùng miền:</strong>
              {REGIONS.map(region => (
                <label key={region} className="flex items-center gap-2 text-base font-medium text-[#2e1e10] transition-transform duration-200 hover:scale-105 cursor-pointer">
                  <input type="checkbox" className="h-5 w-5 accent-[#dc8154] rounded border-2 border-gray-400" checked={mapFilters.regions.has(region)} onChange={() => handleFilterChange(setMapFilters, 'regions', region)} /> {region}
                </label>
              ))}
            </div>
            <div className="flex flex-1 items-center gap-3 min-w-[300px]">
              <strong className="text-lg font-semibold text-[#2e1e10]">Năm ≤ <span className="font-bold text-[#dc8154]">{mapFilters.year}</span></strong>
              <input type="range" min="700" max="2024" value={mapFilters.year} step="1" className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#2e1e10]/20 outline-none transition-all duration-200" onChange={(e) => handleYearChange(setMapFilters, e)} />
            </div>
          </div>
          <div ref={mapContainerRef} className="map-container mb-8 h-[700px] mx-auto max-w-9xl overflow-hidden rounded-2xl shadow-2xl"></div>
        </section>

        {/* GALLERY TIÊU ĐỀ + TAB + FILTER + GRID */}
        <section className="relative mx-auto my-20 max-w-6xl text-center overflow-hidden" data-aos="zoom-in" data-aos-delay="200">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="w-full h-full bg-repeat" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23dc8154' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: '60px' }}></div>
          </div>
          <div className="inline-block p-6 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 shadow-inner mb-6 animate-pulse-slow">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-amber-700" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6l5.25 3.15.75-1.23-4-2.4z"/>
            </svg>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-[#2e1e10] mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-amber-700 to-[#2e1e10]">Thư Viện Dòng Chảy</span><br />
            <span className="text-4xl md:text-5xl text-amber-600">Lịch Sử Việt Nam</span>
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-600"></div>
            <span className="text-amber-700 font-medium tracking-widest">NGÀN NĂM VĂN HIẾN</span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-600"></div>
          </div>
          <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Mỗi bức ảnh là một chương sử. Mỗi chi tiết là một câu chuyện. <span className="text-amber-600 font-semibold">Hãy để hình ảnh dẫn lối bạn qua dòng chảy thời gian.</span>
          </p>

          <div className="mt-10 mb-4 flex justify-center gap-10" data-aos="fade-up" data-aos-delay="400">
            {['all', 'image', 'video', 'bxh'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-10 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === tab ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold shadow-xl shadow-amber-300/50 scale-105 ring-2 ring-amber-400 ring-offset-2" : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:text-white hover:scale-105 hover:shadow-lg border-2 border-amber-200 hover:border-transparent"}`}>
                {tab === 'all' ? 'All' : tab === 'image' ? 'Ảnh' : tab === 'video' ? 'Video' : 'BXH'}
              </button>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto mb-8 max-w-7xl px-6" data-aos="fade-right" data-aos-delay="300">
          <button onClick={(e) => { e.stopPropagation(); setFilterPanelVisible(prev => !prev); }} className="inline-flex cursor-pointer items-center gap-3 rounded-xl bg-[#dc8154] px-5 py-3 text-lg font-bold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#2e1e10] hover:shadow-md absolute top-[-80px] z-100">
            <img src={filterIcon} width="24px" height="24px" alt="Filter Icon" className="invert brightness-0"/>
            <span>Filters</span>
          </button>

          <div ref={filterPanelRef} className={`absolute top-(-100) left-0 z-100 mt-3 w-full flex flex-wrap items-center gap-x-10 gap-y-6 rounded-2xl bg-white/95 p-6 shadow-2xl backdrop-blur-md transition-all duration-500 ease-in-out ${isFilterPanelVisible ? 'visible translate-y-0 opacity-100 scale-100' : 'invisible translate-y-4 opacity-0 scale-95'}`}>
            <div className="flex flex-wrap items-center gap-5">
              <strong className="text-lg font-bold text-[#2e1e10]">Thời kỳ:</strong>
              <div className="flex flex-wrap items-center gap-5">
                {PERIODS.map(period => (
                  <CustomCheckbox key={period} label={period} value={period} checked={galleryFilters.periods.has(period)} onChange={() => handleFilterChange(setGalleryFilters, 'periods', period)} />
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <strong className="text-lg font-bold text-[#2e1e10]">Vùng miền:</strong>
              <div className="flex flex-wrap items-center gap-5">
                {REGIONS.map(region => (
                  <CustomCheckbox key={region} label={region} value={region} checked={galleryFilters.regions.has(region)} onChange={() => handleFilterChange(setGalleryFilters, 'regions', region)} />
                ))}
              </div>
            </div>
            <div className="flex min-w-[300px] flex-grow items-center gap-4">
              <strong className="whitespace-nowrap text-lg font-bold text-[#2e1e10]">Năm ≤ <span className="font-extrabold text-[#dc8154]">{galleryFilters.year}</span></strong>
              <input type="range" min="700" max="2024" value={galleryFilters.year} step="1" className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#2e1e10]/20 outline-none transition-all duration-200" onChange={(e) => handleYearChange(setGalleryFilters, e)} />
            </div>
          </div>
        </section>

        <section className="p-6 columns-1 md:columns-2 lg:columns-3 gap-6">
          {filteredGalleryItems.map((item, index) => (
            <div key={item.id} onClick={() => openModal(index)} className="group relative mb-6 break-inside-avoid rounded-3xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] cursor-pointer border border-amber-100/20" data-aos="fade-up" data-aos-delay={(index % 3) * 100}>
              <img src={item.src} alt={item.alt} className="block h-auto w-full transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-90" loading="lazy" />
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-4 flex flex-col justify-between">
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/60 to-transparent pointer-events-none"></div>
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                <div className="relative z-10 flex justify-between items-start">
                  <button onClick={(e) => { e.stopPropagation(); }} className="flex items-center gap-2 rounded-lg bg-black/50 px-4 py-2 text-white text-sm font-semibold transition-all duration-300 hover:bg-black/70 focus:outline-none" title="Chỉnh sửa ảnh">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    Edit
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); }} className="rounded-full bg-black/50 p-2 text-white transition-all duration-300 hover:bg-black/70 focus:outline-none" title="Thêm vào yêu thích">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  </button>
                </div>
                <div className="relative z-10 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-white text-sm font-semibold">
                    <img src={item.authorAvatar || 'https://cdn-icons-png.flaticon.com/512/1995/1995515.png'} alt={item.authorName || 'Người dùng'} className="w-8 h-8 rounded-full border-2 border-white" />
                    <span>{item.authorName || 'Người đăng'}</span>
                  </div>
                  <a href={item.src} download title="Tải xuống ảnh" onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 rounded-lg bg-black/50 px-4 py-2 text-white text-sm font-semibold transition-all duration-300 hover:bg-black/70 hover:scale-105 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      <ImageModal imageData={filteredGalleryItems[selectedImageIndex]} onClose={closeModal} onNext={showNextImage} onPrev={showPrevImage} />
    </>
  );
};

export default TraiNghiem;