/* eslint-disable @next/next/no-img-element */
"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchProducts } from "@/features/Products/ProductsThunks";
import AddProducts from "@/shard/Admin/AddProducts/AddProducts";
import { IoSettingsOutline } from "react-icons/io5";
// import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import DeleteProduct from "@/shard/Admin/DeleteProdeuct/DeleteProduct";
import { fetchUserData } from "@/features/userData/userDataThunks";

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productsData, loading, error } = useSelector((state: RootState) => state.products);
  const { userData } = useSelector((state: RootState) => state.userData);
  const [Active,setActive] =  useState<string | null>(null);
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchUserData());
  }, [dispatch]);

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
      <div className="flex flex-wrap mb-10 gap-4">
        {productsData.slice(0, 10).map((product) => (
          <div
            key={product._id}
            className="px-2 w-[50%] md:w-[33.33%] lg:w-[25%] xl:w-[20%] mb-10 shadow border"
          >
            <div className="image h-[170px] sm:h-[220px] relative bg-gray">
              <div className="absolute group overflow-hidden z-10 top-0 left-0 h-full w-full flex flex-col justify-between"></div>
              {userData?.isAdmin && 
              <div className="absolute flex text-2xl gap-3 flex-col top-3 z-50 left-3 rounded-full bg-[#52220A] w-fit h-fit p-2 cursor-pointer text-white">
                <IoSettingsOutline className="p-1 rounded-full hover:bg-white hover:text-[#52220A]" onClick={()=>  setActive(Active === product._id ? null : product._id)} />
                {Active === product._id && (
                  <>
                    <DeleteProduct id={product._id} />
                    <MdOutlineModeEdit className="rounded-full p-1 hover:bg-white hover:text-[#52220A]"/>
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
              className={`"text-start" info mt-4`}
            >
              <h5 className="font-semibold mb-3">
                { product.title}
              </h5>
              <div className="flex justify-between">
                <span className="line-through text-gray-600">
                  ${product.price}
                </span>
                <span className="text-brown font-bold">
                  ${(product.price - (product.price * 10) / 100).toFixed()}
                </span>
              </div>
              <Link  href={`/SingleProduct/${product._id}`} className="cursor-pointer">
                show details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Products;
