"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchGetCart, fetchDeleteProductInCart, fetchDeleteAllCart } from "@/features/cart/cartThunks";

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector((state: RootState) => state.cart);
console.log("thd",orders);

  useEffect(() => {
    dispatch(fetchGetCart());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(fetchDeleteProductInCart({ productId: id }));
  };

  const handleDeleteAll = () => {
    dispatch(fetchDeleteAllCart());
  };

  if (loading) return <p>جاري تحميل السلة...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!orders || orders.length === 0) return <p>السلة فارغة</p>;

  return (
    <div className="p-5 max-w-3xl mx-auto py-[80px]">
      <h1 className="text-2xl font-bold mb-5">🛒 سلة المشتريات</h1>
      <button onClick={handleDeleteAll} className="cursor-pointer mb-4 bg-red-500 text-white px-4 py-2 rounded">
        حذف كل المنتجات
      </button>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="flex items-center gap-4 border p-3 rounded">
            <div className="flex-1">
              <h2 className="font-semibold">Product ID: {order.id}</h2>
              <p>الكمية: {order.count}</p>
            </div>
            <button
              onClick={() => handleDelete(order.id)}
              className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded"
            >
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
