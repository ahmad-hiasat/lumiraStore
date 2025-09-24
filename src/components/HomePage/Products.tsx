/* eslint-disable @next/next/no-img-element */
"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchProducts } from "@/features/Products/ProductsThunks";
import AddProducts from "@/shard/Admin/AddProducts/AddProducts";
import { IoSettingsOutline } from "react-icons/io5";
import DeleteProduct from "@/shard/Admin/DeleteProdeuct/DeleteProduct";
import { fetchUserData } from "@/features/userData/userDataThunks";
import EditProduct from "@/shard/Admin/EditProduct/EditProduct";

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productsData, loading, error } = useSelector((state: RootState) => state.products);
  const { userData } = useSelector((state: RootState) => state.userData);
  const { price } = useSelector((state: RootState) => state.currency);
  const [Active,setActive] =  useState<string | null>(null);
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchUserData());
  }, [dispatch]);
  const fundsInLocal = (amount: number ) => (amount * price).toFixed(2);

  if (loading) {
    return <p className="text-center py-6">جارٍ تحميل المنتجات...</p>;
  }
  if (error) {
    return <p className="text-red-500 text-center">خطأ: {error}</p>;
  }
  return (
    <div className="py-16">
    <div className="container m-auto">
      {userData?.isAdmin && <div><AddProducts/></div>}
      <div className="flex mb-10 flex-wrap">
        {productsData.slice(0, 10).map((product) => (
          <div key={product._id} className="px-3  w-[50%] md:w-[33.33%] lg:w-[25%] mb-10">
          <div
            className="shadow border pb-5"
          >
            <div className="image h-[170px] sm:h-[220px] relative bg-gray">
              <div className="absolute group overflow-hidden top-0 left-0 h-full w-full flex flex-col justify-between"></div>
              {userData?.isAdmin && 
              <div className="absolute flex text-2xl gap-3 flex-col top-3  left-3 rounded-full bg-[#52220A] w-fit h-fit p-2 cursor-pointer text-white">
                <IoSettingsOutline className="p-1 rounded-full hover:bg-white hover:text-[#52220A]" onClick={()=>  setActive(Active === product._id ? null : product._id)} />
                {Active === product._id && (
                  <>
                    <DeleteProduct id={product._id} />
                    <EditProduct product={product} />
                  </>
                )}
              </div>
              }
              {product?.img ?
              <Link      
               href={`/SingleProduct/${product._id}`} className="cursor-pointer">
              <img className="h-full w-full" src={product.img} alt={product.title}/> 
            </Link>
               : ""}
            </div>
            <div
              className={`px-3 info mt-4`}
            >
              <h5 className="font-semibold mb-3">
                { product.title}
              </h5>
              <div className="flex justify-between">
                <span className="line-through text-gray-600">
                  ${(fundsInLocal(product.price))}
                </span>
                <span className="text-brown font-bold">
                   ${(parseFloat(fundsInLocal(product.price)) * 0.9).toFixed(2)}         
                </span>
              </div>
              <Link  href={`/SingleProduct/${product._id}`} className="cursor-pointer">
                show details
              </Link>
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Products;
