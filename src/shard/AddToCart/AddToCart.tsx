/* eslint-disable @next/next/no-img-element */
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/index';
import { fetchAddCart } from '@/features/cart/cartThunks';

interface Product {
  _id: string;
  title: string;
  desc: string;
  price: number;
  img: string;
  count: number;
}

const AddToCart = ({ product, status }: { product: Product; status: boolean }) => {
  const { price, desc, title, img, _id } = product;
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, message } = useSelector((state: RootState) => state.cart);

  const handleCart = () => {
    dispatch(fetchAddCart({ productId: _id, count: 1 }));
  };

  return (
    <div className={`${status ? "right-0" : "-right-[400px]"} fixed w-[400px] px-5 py-12 h-full bg-gray-400 top-0 transition-all`}>
      <div className="pb-5 border-b">
        <img className='w-[100px] h-[100px]' src={img} alt={title} />
        <h1 className='font-bold text-lg'>{title}</h1>
        <div className='flex justify-between mb-5'>
          <span className='line-through text-gray-600'>${price}</span>
        </div>
        <p className='text-gray-600'>{desc}</p>
        
        <button 
          onClick={handleCart} 
          disabled={loading} 
          className="h-[40px] px-5 bg-red-500 text-white w-fit cursor-pointer rounded-md mt-5 disabled:opacity-50"
        >
          {loading ? "جاري الإضافة..." : "Add To Cart"}
        </button>

        {message && <p className="text-green-600 mt-3">{message}</p>}
        {error && <p className="text-red-600 mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default AddToCart;
