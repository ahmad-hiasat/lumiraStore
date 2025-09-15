/* eslint-disable @next/next/no-img-element */
"use client"
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/index';
import {useEffect, useState } from "react";
import { fetchSingleProduct } from '@/features/SingleProduct/singleProductThunks';
import AddToCart from '@/shard/AddToCart/AddToCart';
const SingleProduct = () => {
  const params = useParams();
  const [Active,setActive] = useState(false)
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const dispatch = useDispatch<AppDispatch>();
  const { SingleProductId, loading, error } = useSelector((state: RootState) => state.SingleProduct); 
  const { userData } = useSelector((state: RootState) => state.userData);
  
    useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [id, dispatch]);
;
  if (!SingleProductId) return null;
  const { title, desc, price, img, } = SingleProductId;
  if (loading) return "loading"
  if (error) return <div>Error: {error}</div>;
  return (
    <header className='py-[100px]'>
        <div className="container">
          <div className='flex gap-5 max-lg:flex-wrap'>
            <div className="image flex gap-4 w-[50%]">
            {img && (
              <div className="flex-1 bg-gray-300 h-[350px] relative">
                <div className='absolute group overflow-hidden z-10 top-0 left-0 h-full w-full flex flex-col justify-between'>
                </div>
                <img 
                  src={img}
                  alt="Main Product Image"
                  />
              </div>
            )}            
          </div>
            <div className='w-[50%]'>
              <div className="info pb-5 border-b">
                <h1 className='font-bold text-lg'>{title}</h1>
                <div className='flex justify-between mb-5'>
                  <span className='line-through text-gray-600'>${price}</span>
                </div>
                <p className='text-gray-600'>{desc}</p>
                {userData?.isAdmin !== true &&
                <>
                  <button onClick={()=>setActive(!Active)} className='cursor-pointer text-white bg-black h-[50px] px-8 rounded-md'>Add to cart</button>
                  <AddToCart product={SingleProductId} status={Active} />
                </>
                }
              </div>
            </div>
          </div>
        </div>
    </header>
  )
}

export default SingleProduct