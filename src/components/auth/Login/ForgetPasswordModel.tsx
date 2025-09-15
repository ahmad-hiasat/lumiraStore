import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import Cookies from "js-cookie";
import { requestResetUserId } from '@/features/auth/LoginThunks';
import { useRouter } from "next/navigation"; // ✅ عشان نعمل navigation

type ForgetPasswordModelProps = {
  model: (value: boolean) => void;
};

const ForgetPasswordModel = ({ model }: ForgetPasswordModelProps) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { loading, message, error } = useSelector((state: RootState) => state.forget);
  const router = useRouter(); // ✅

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    dispatch(requestResetUserId(email))
      .unwrap()
      .then((res) => {
        if (res.status) {
          Cookies.set("auth_email", email, { expires: 1 });
          Cookies.set("user_id", res.id.toString(), { expires: 1 });
          model(false);
          router.push("/ForgetOtp");
        }
      });
  };

  return (
    <div className='bg-[#00000054] absolute left-0 top-0 w-full h-full z-50'>
      <div className='w-1/2 p-10 mt-8 bg-white rounded-md m-auto relative'>
        <h2 className='text-2xl mb-10 text-center font-bold'>please enter your email</h2>
        <div onClick={() => model(false)} className={`-right-[26px] text-3xl close -top-[26px] cursor-pointer bg-white border w-fit p-3 absolute`}>
          <IoClose />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder='enter your email'
            className='w-full h-[50px] px-5 border rounded-lg'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button 
            type='submit' 
            disabled={loading} 
            className='mt-5 px-6 py-2 bg-blue-600 text-white rounded-md'
          >
            {loading ? "Loading..." : "Enter"}
          </button>
        </form>
        {error && <p className="text-red-600 mt-3">{error}</p>}
        {message && <p className="text-green-600 mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default ForgetPasswordModel;
