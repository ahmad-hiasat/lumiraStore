/* eslint-disable @next/next/no-img-element */
"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { useEffect } from "react";
import Link from "next/link";
import { fetchProducts } from "@/features/Products/ProductsThunks";
import AddProducts from "@/shard/AddProducts/AddProducts";

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productsData, loading, error } = useSelector((state: RootState) => state.products);
  
  useEffect(() => {
    dispatch(fetchProducts());
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
      <div><AddProducts/></div>
      <div className="flex flex-wrap mb-10 gap-4">
        {productsData.slice(0, 10).map((product) => (
          <Link
            href={`/SingleProduct/${product._id}`}
            key={product._id}
            className="px-2 w-[50%] md:w-[33.33%] lg:w-[25%] xl:w-[20%] mb-10 shadow border"
          >
            <div className="image h-[170px] sm:h-[220px] relative bg-gray">
              <div className="absolute group overflow-hidden z-10 top-0 left-0 h-full w-full flex flex-col justify-between"></div>
              {product?.img ?
               <img className="h-full w-full" src={product.img} alt={product.title}/> 
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
            </div>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Products;
