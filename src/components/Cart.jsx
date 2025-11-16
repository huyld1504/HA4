import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            🛒 Giỏ hàng ({getTotalItems()} sản phẩm)
          </h1>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm rounded-lg bg-red-50 px-3 py-2 font-medium text-red-600 hover:bg-red-100"
            >
              Xóa toàn bộ
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <p className="mb-4 text-gray-600">Giỏ hàng của bạn đang trống.</p>
            <Link
              to="/mua-tranh-in"
              className="inline-block rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2.5 font-medium text-white shadow hover:from-orange-600 hover:to-amber-600"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Danh sách sản phẩm */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.selectedType}`}
                  className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                          Loại: <span className="font-medium">{item.selectedType}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-orange-600">
                          {(item.price * item.quantity).toLocaleString()}₫
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.price.toLocaleString()}₫ / sp
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      {/* Quantity controls */}
                      <div className="inline-flex items-center rounded-lg border bg-white">
                        <button
                          aria-label="Giảm số lượng"
                          className="px-3 py-1.5 text-gray-700 hover:bg-gray-50"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.selectedType,
                              item.quantity - 1
                            )
                          }
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min={1}
                          className="w-14 border-x border-orange-400 text-orange-700 py-1.5 text-center outline-none focus:ring-2 focus:ring-orange-300 bg-white"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.id,
                              item.selectedType,
                              Number(e.target.value)
                            )
                          }
                        />
                        <button
                          aria-label="Tăng số lượng"
                          className="px-3 py-1.5 text-gray-700 hover:bg-gray-50"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.selectedType,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id, item.selectedType)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tóm tắt đơn hàng */}
            <div className="h-max rounded-xl border bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-lg font-semibold text-gray-800">
                Tóm tắt đơn hàng
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Tạm tính</span>
                  <span className="font-medium">
                    {getTotalPrice().toLocaleString()}₫
                  </span>
                </div>
                <div className="flex items-center justify-between text-gray-500">
                  <span>Phí vận chuyển</span>
                  <span>—</span>
                </div>
                <div className="my-2 border-t" />
                <div className="flex items-center justify-between text-base">
                  <span className="font-semibold text-orange-600">Tổng cộng</span>
                  <span className="font-bold text-orange-600">
                    {getTotalPrice().toLocaleString()}₫
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className="mt-5 w-full rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2.5 font-medium text-white shadow hover:from-orange-600 hover:to-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Tiến hành thanh toán
              </button>

              <Link
                to="/mua-tranh-in"
                className="mt-3 block text-center text-sm font-medium text-orange-600 hover:underline"
              >
                ← Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
