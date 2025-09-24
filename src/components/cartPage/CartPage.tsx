"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  fetchGetCart,
  fetchDeleteProductInCart,
  fetchDeleteAllCart,
  fetchBuyOrder,
} from "@/features/cart/cartThunks";

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error, message } = useSelector((state: RootState) => state.cart);
  const { userData } = useSelector((state: RootState) => state.userData);
  const { price } = useSelector((state: RootState) => state.currency);
  const fundsInLocal = (amount: number ) => (amount * price).toFixed(2);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchGetCart());
  }, [dispatch]);

  const getTotalPrice = () =>
    orders.reduce((total, order) => total + order.ProductPrice * order.count, 0);

  const handleDelete = (id: string) => {
    dispatch(fetchDeleteProductInCart({ productId: id }));
  };

  const handleDeleteAll = () => {
    dispatch(fetchDeleteAllCart());
  };

  const handleCheckOut = () => {
    const total = getTotalPrice();

    if (!userData) {
      alert("يجب تسجيل الدخول أولاً");
      return;
    }
    if (userData.funds < total) {
      alert("رصيدك غير كافٍ لإتمام العملية");
      return;
    }
    dispatch(fetchBuyOrder());
      setIsModalOpen(true);

  };

  if (loading) return <p>جاري تحميل السلة...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!orders || orders.length === 0) return <p className="py-[100px]">السلة فارغة</p>;

  return (
    <div className="p-5 max-w-3xl mx-auto py-[80px] relative">
      <h1 className="text-2xl font-bold mb-5">🛒 سلة المشتريات</h1>

      <button
        onClick={handleDeleteAll}
        className="cursor-pointer mb-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        حذف كل المنتجات
      </button>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center gap-4 border p-3 rounded">
            <div className="flex-1">
              <h2 className="font-semibold">Product ID: {order.id}</h2>
              <div className="flex items-center justify-between w-1/2">
                <p>${fundsInLocal(order.ProductPrice)}</p>
                <p>الكمية: {order.count}</p>
              </div>
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

      <div className="flex justify-between items-center px-5 py-2 border h-[50px] mt-8 shadow rounded-md">
        <h2>إجمالي السعر: $ {fundsInLocal(getTotalPrice())}</h2>
        <button
         type="button" 
          onClick={handleCheckOut}
          className="bg-green-600 cursor-pointer h-[35px] px-3 rounded-md text-white"
        >
          Check Out
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl text-center">
            <h2 className="text-xl font-bold mb-3 text-green-600">تم الطلب بنجاح ✅</h2>
            <p className="mb-4">شكراً لتسوقك معنا! تم إكمال عملية الشراء بنجاح.</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
