"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import ProductForm from "../ProductForm";
import { useEffect, useState } from "react";
import { fetchAddProducts } from "@/features/Products/ProductsThunks";
import { resetAddState } from "@/features/Products/addProductsSlice";

export default function AddProducts() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, newProduct } = useSelector((state: RootState) => state.AddProduct);

  const handleAdd = async (data: {
    title: string;
    price: number;
    desc: string;
    img: string;
    stock: number;
  }) => {
    try {
      await dispatch(fetchAddProducts(data)).unwrap();
      setOpen(false);
    } catch (err) {
      console.error("فشل الإضافة:", err);
    }
  };

  useEffect(() => {
    if (open === true) {
      dispatch(resetAddState());
    }
  }, [open, dispatch]);

  return (
    <div className="relative z-40">
      <h2
        className="text-3xl cursor-pointer underline mb-5"
        onClick={() => setOpen(true)}
      >
        Add Product
      </h2>
      <ProductForm
        mode="add"
        onSubmitAction={handleAdd}
        loading={loading}
        error={error}
        externalOpen={open}
        onCloseExternal={() => setOpen(false)}
      />
      {newProduct && (
        <p className="mt-4 text-green-700">
          ✅ تمت الإضافة: {newProduct.title}
        </p>
      )}
    </div>
  );
}
