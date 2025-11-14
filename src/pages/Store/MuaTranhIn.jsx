// File moved to ./Store/MuaTranhIn.jsx
// src/pages/MuaTranhIn.jsx
import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useArts } from "../../context/ArtContext";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import { useCart } from "../../context/CartContext";
import logoWatermark from "../../assets/logo-watermark.png";


export default function MuaTranhIn() {
  const { user } = useContext(UserContext);
  const { addToCart } = useCart();
  const { arts: artSamples } = useArts();
  const [selectedTypes, setSelectedTypes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("selectedTypes")) || {};
    } catch {
      return {};
    }
  });
  const [filterCategory, setFilterCategory] = useState("Tất cả");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");
  const [watermarkedImages, setWatermarkedImages] = useState({});
  const navigate = useNavigate();

 // 🔹 Hàm thêm watermark bằng ảnh logo (chuẩn)
const addWatermark = (imageUrl, callback) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  const logo = new Image();

  img.crossOrigin = "anonymous"; // Cho phép load ảnh từ nguồn khác
  logo.crossOrigin = "anonymous"; // Cho phép load logo

  logo.src = logoWatermark; // ✅ Logo lấy từ src/assets/logo-watermark.png
  img.src = imageUrl;

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    logo.onload = () => {
      // ✅ Logo nằm giữa ảnh, chiếm ~1/5 chiều ngang
      const logoWidth = img.width / 5;
      const logoHeight = (logo.height / logo.width) * logoWidth;
      const x = (img.width - logoWidth) / 2;
      const y = (img.height - logoHeight) / 2;

      ctx.globalAlpha = 0.3; // Độ mờ của watermark
      ctx.drawImage(logo, x, y, logoWidth, logoHeight);
      ctx.globalAlpha = 1.0;

      // ✅ Xuất ảnh có watermark
      callback(canvas.toDataURL("image/png"));
    };
  };
};


  // 🔹 Thay đổi loại sản phẩm
  const handleTypeChange = (id, value) => {
    setSelectedTypes((prev) => {
      const next = { ...prev, [id]: value };
      localStorage.setItem("selectedTypes", JSON.stringify(next));
      return next;
    });
  };

  // 🔹 Chuyển tới chi tiết tranh
  const handleViewDetail = (art) => navigate(`/chi-tiet/${art.id}`);

  // 🔹 Thêm vào giỏ hàng
 // 🔹 Thêm vào giỏ hàng kèm hình ảnh (phiên bản chuẩn)
const handleAddToCart = (art) => {
  const selectedType = selectedTypes[art.id] || "Tranh Canvas";

  // ✅ Gọi đúng cấu trúc hàm addToCart từ App.jsx
  addToCart(art, selectedType);

  toast.success("🛒 Đã thêm vào giỏ hàng!");
};



  // 🔹 Reset bộ lọc
  const resetFilters = () => {
    setFilterCategory("Tất cả");
    setMinPrice("");
    setMaxPrice("");
    setSortOrder("none");
    setSearchTerm("");
    setSelectedTypes((prev) => ({ ...prev, filterMaterial: "", filterStyle: "" }));
  };

  // 🔹 Lọc tranh
  let filteredArts = artSamples.filter((art) => {
    const selectedType = selectedTypes[art.id] || "Tranh Canvas";
    const price = art.price[selectedType];
    const matchCategory =
      filterCategory === "Tất cả" || art.category === filterCategory;
    const matchMin = minPrice === "" || price >= parseInt(minPrice);
    const matchMax = maxPrice === "" || price <= parseInt(maxPrice);
    const matchSearch =
      searchTerm === "" ||
      art.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchMin && matchMax && matchSearch;
  });

  // 🔹 Sắp xếp tranh theo giá
  if (sortOrder === "asc") {
    filteredArts.sort((a, b) => {
      const pa = a.price[selectedTypes[a.id] || "Tranh Canvas"];
      const pb = b.price[selectedTypes[b.id] || "Tranh Canvas"];
      return pa - pb;
    });
  } else if (sortOrder === "desc") {
    filteredArts.sort((a, b) => {
      const pa = a.price[selectedTypes[a.id] || "Tranh Canvas"];
      const pb = b.price[selectedTypes[b.id] || "Tranh Canvas"];
      return pb - pa;
    });
  }

 // 🔹 Tự động thêm watermark cho ảnh chưa xử lý
useEffect(() => {
  filteredArts.forEach((art) => {
    const selectedType = selectedTypes[art.id] || "Tranh Canvas";
    const imageUrl = art.images[selectedType];

    // Nếu ảnh chưa được gắn watermark thì thêm
    if (!watermarkedImages[art.id]) {
      addWatermark(imageUrl, (dataUrl) => {
        setWatermarkedImages((prev) => ({
          ...prev,
          [art.id]: dataUrl,
        }));
      });
    }
  });
}, [filteredArts, selectedTypes]);


  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Sidebar bộ lọc */}
      <aside className="w-72 bg-white shadow-md p-6 border-r hidden md:block">
        <h1 className="text-2xl font-bold text-orange-600 mb-6">
          🖼️ Cửa hàng HA4
        </h1>

        {/* Tìm kiếm */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Tìm kiếm theo tên
          </label>
          <input
            type="text"
            placeholder="Nhập tên tranh..."
            className="border rounded-md p-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Lọc theo chủ đề */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">Chủ đề</label>
          <select
            className="border rounded-md p-2 w-full"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Di tích lịch sử">Di tích lịch sử</option>
            <option value="Văn hóa">Văn hóa</option>
            <option value="Phố cổ">Phố cổ</option>
          </select>
        </div>

        {/* Bộ lọc chất liệu */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">Chất liệu</label>
          <select
            className="border rounded-md p-2 w-full"
            value={selectedTypes["filterMaterial"] || ""}
            onChange={(e) =>
              setSelectedTypes((prev) => ({ ...prev, filterMaterial: e.target.value }))
            }
          >
            <option value="">Tất cả</option>
            <option value="Tranh Canvas">Tranh Canvas</option>
            <option value="Tranh Lụa">Tranh Lụa</option>
            <option value="Tranh Gỗ">Tranh Gỗ</option>
            <option value="Tranh Kính">Tranh Kính</option>
          </select>
        </div>

        {/* Bộ lọc phong cách */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">Phong cách</label>
          <select
            className="border rounded-md p-2 w-full"
            value={selectedTypes["filterStyle"] || ""}
            onChange={(e) =>
              setSelectedTypes((prev) => ({ ...prev, filterStyle: e.target.value }))
            }
          >
            <option value="">Tất cả</option>
            <option value="Cổ điển">Cổ điển</option>
            <option value="Hiện đại">Hiện đại</option>
            <option value="Trừu tượng">Trừu tượng</option>
            <option value="Thiên nhiên">Thiên nhiên</option>
          </select>
        </div>

        {/* Bộ lọc giá */}
        <div className="mb-8">
          <label className="block mb-2 font-medium text-gray-700">
            Khoảng giá (₫)
          </label>
          <div className="flex items-center justify-between mb-1 text-sm text-gray-600">
            <span>{parseInt(minPrice || 0).toLocaleString()}₫</span>
            <span>{parseInt(maxPrice || 5000000).toLocaleString()}₫</span>
          </div>
          <input
            type="range"
            min="0"
            max="5000000"
            step="50000"
            value={minPrice || 0}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full accent-orange-500"
          />
          <input
            type="range"
            min="0"
            max="5000000"
            step="50000"
            value={maxPrice || 5000000}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full accent-orange-500 mt-2"
          />
        </div>

        {/* Sắp xếp */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Sắp xếp
          </label>
          <select
            className="border rounded-md p-2 w-full"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="none">Mặc định</option>
            <option value="asc">Giá tăng dần</option>
            <option value="desc">Giá giảm dần</option>
          </select>
        </div>

        <button
          onClick={resetFilters}
          className="w-full py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
        >
          🔄 Reset bộ lọc
        </button>
      </aside>

      {/* Danh sách tranh */}
      <main className="flex-1 p-6 md:p-10">
        <motion.div
          className="mb-10 text-center bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-300 rounded-xl p-6 shadow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="text-2xl font-bold text-orange-700 mb-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ❤️ Chung tay vì dự án Heritage Art 4.0
          </motion.h2>
          <motion.p
            className="text-lg text-gray-800 font-medium"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Khi bạn mua tranh,{" "}
            <span className="text-orange-600 font-bold">5% tổng số tiền bán ra</span>{" "}
            sẽ được dành tặng cho các{" "}
            <span className="font-semibold">Mẹ Việt Nam anh hùng</span> và{" "}
            <span className="font-semibold">Anh hùng lực lượng vũ trang nhân dân</span>.
          </motion.p>
        </motion.div>
{/* Grid tranh (tự động hiển thị sản phẩm từ Admin, dạng gallery 4 cột) */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {filteredArts && filteredArts.length > 0 ? (
    filteredArts.map((art) => {
      const selectedType = selectedTypes[art.id] || "Tranh Canvas";
      const price = art.price[selectedType];
      const imageUrl = art.images[selectedType];

      return (
        <motion.div
          key={art.id}
          className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          whileHover={{ y: -6 }}
        >
          {/* Ảnh sản phẩm */}
          <div
            onClick={() => handleViewDetail(art)}
            className="relative cursor-pointer group overflow-hidden"
          >
            {/* Ảnh có hiệu ứng phóng to khi hover */}
            <motion.img
              src={imageUrl}
              alt={`${art.title} - ${selectedType}`}
              className="w-full h-full object-cover aspect-square select-none"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />

            {/* Overlay mờ + nút xem chi tiết */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <motion.button
                className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:bg-orange-600 transition-transform transform hover:scale-105"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                🔍 Xem chi tiết
              </motion.button>
            </motion.div>
          </div>

          {/* Thông tin sản phẩm */}
          <div className="p-4">
            <div
              onClick={() => handleViewDetail(art)}
              className="text-base font-semibold mb-2 text-gray-800 hover:text-orange-600 cursor-pointer truncate"
            >
              {art.title}
            </div>

            <label className="block mb-1 text-xs font-medium text-gray-600">
              Loại sản phẩm:
            </label>
            <select
              className="border rounded-md p-2 w-full mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={selectedType}
              onChange={(e) => handleTypeChange(art.id, e.target.value)}
            >
              {Object.keys(art.price).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <p className="text-lg font-bold text-orange-600 mb-3">
              {price.toLocaleString()}₫
            </p>

            <motion.button
              onClick={() => handleAddToCart(art)}
              className="w-full py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg shadow hover:from-orange-600 hover:to-amber-600 transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              🛒 Thêm vào giỏ
            </motion.button>
          </div>
        </motion.div>
      );
    })
  ) : (
    <p className="text-center col-span-4 text-gray-500 italic">
      Hiện chưa có sản phẩm nào. Vui lòng thêm từ trang Admin.
    </p>
  )}
</div>

      </main>
    </div>
  );
}
