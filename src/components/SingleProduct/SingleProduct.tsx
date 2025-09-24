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
  const { price } = useSelector((state: RootState) => state.currency);
    const fundsInLocal = (amount: number ) => (amount * price).toFixed(2);
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [id, dispatch]);
  ;
  if (!SingleProductId) return null;
  const { title, desc, img, count, NumberOfSales } = SingleProductId;
  if (loading) return "loading"
  if (error) return <div>Error: {error}</div>;
  return (
    <header className='py-[100px]'>
        <div className="container">
          <div className='flex gap-5 max-lg:flex-wrap'>
            <div className="image flex gap-4 w-full lg:w-[50%]">
            {img && (
              <div className="flex-1 max-lg:h-[400px]  relative">
                <div className='absolute group overflow-hidden z-10 top-0 left-0 h-full w-full flex flex-col justify-between'>
                </div>
                <img 
                className='w-full h-full object-cover'
                  src={img}
                  alt="Main Product Image"
                  />
              </div>
            )}            
          </div>
            <div className='w-full lg:w-[50%]'>
              <div className="info pb-5 border-b">
                <h2 className='font-bold text-lg'> {title}</h2>
                <h3 className='text-red-500'> ${fundsInLocal(SingleProductId.price)}</h3>
                <h3 className=''>Available quantity :  {count}</h3>
                <h3 className=''>NumberOfSales :  {NumberOfSales}</h3>
                <div>
                  <h3>The Description</h3>
                  <p className='text-gray-600'>{desc}</p>
                </div>
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