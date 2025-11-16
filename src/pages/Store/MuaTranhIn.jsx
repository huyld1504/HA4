// File moved to ./Store/MuaTranhIn.jsx
// src/pages/MuaTranhIn.jsx
import React, { useState, useContext, useEffect } from "react";
import Cart from "../../components/Cart";
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
  return (
    <>
      <div className="flex w-full min-h-screen bg-gray-50">
        {/* Giỏ hàng luôn hiển thị bên phải */}
        <div className="hidden lg:block w-[420px] flex-shrink-0 border-l bg-white shadow-xl h-screen overflow-y-auto sticky top-0 z-30">
          <Cart />
        </div>

        <Toaster position="top-right" />

        {/* Sidebar bộ lọc */}
        <aside className="w-72 bg-white shadow-md p-6 border-r hidden md:block">
          {/* ...existing code... */}
          <h1 className="text-2xl font-bold text-orange-600 mb-6">🖼️ Cửa hàng HA4</h1>
          {/* ...existing code... */}
        </aside>

        {/* Danh sách tranh */}
        <main className="flex-1 p-6 md:p-10">
          {/* ...existing code... */}
        </main>
      </div>
    </>
  );
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
