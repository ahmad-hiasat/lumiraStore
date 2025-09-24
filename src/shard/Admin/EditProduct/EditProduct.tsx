"use client";
import React, { useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import ProductForm from "../ProductForm";
import { fetchProducts, fetchUpdateProduct } from "@/features/Products/ProductsThunks";
import { resetUpdateState } from "@/features/Products/UpdateProductSlice";

interface EditProductProps {
  product: {
    _id: string;
    title: string;
    price: number;
    desc: string;
    img: string;
    stock: number;
  };
}

export default function EditProduct({ product }: EditProductProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.updateProduct);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: {
    _id?: string;
    title: string;
    price: number;
    desc: string;
    img: string;
    stock: number;
  }) => {
    try {
      await dispatch(fetchUpdateProduct({ id: product._id, updates: data })).unwrap();
      setOpen(false);              
      dispatch(fetchProducts());    
      dispatch(resetUpdateState());
    } catch (err) {
      console.error("فشل التعديل:", err);
    }
  };

  return (
    <div className="z-40">
      <span onClick={() => setOpen(true)}>
        <MdOutlineModeEdit className="rounded-full p-1 hover:bg-white hover:text-[#52220A] cursor-pointer" />
      </span>

      <ProductForm
        mode="edit"
        initialData={product}
        onSubmitAction={handleSubmit}
        loading={loading}
        error={error}
        externalOpen={open}
        onCloseExternal={() => setOpen(false)}
      />
    </div>
  );
}
