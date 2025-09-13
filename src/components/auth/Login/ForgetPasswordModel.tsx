// import { useLocale, useTranslations } from 'next-intl'
// import React, { useEffect, useState } from 'react'
// import { IoClose } from "react-icons/io5";
// import { useDispatch } from 'react-redux';
// import { AppDispatch,RootState } from '@/store';
// import { useSelector } from 'react-redux';
// import { changePasswordUser } from '@/features/auth/authThunks';
// import ForgetPasswordOtp from './ForgetPasswordOtp';
// type ForgetPasswordModelProps = {
//   model: (value: boolean) => void;
// };
        


// const ForgetPasswordModel = ({model}:ForgetPasswordModelProps) => {
//     const t = useTranslations("Register")
//     const locale = useLocale()
//     const [data, setData] = useState({ email: "", password: "" });
//   const [showOtp, setShowOtp] = useState(false)

//     const dispatch = useDispatch<AppDispatch>()
//     const { loading, messageChangePass, errorChangePass } = useSelector((state: RootState) => state.auth)
//     const handleChangePassword = (e : React.FormEvent)=>{
//       e.preventDefault()
//       if (!data.email && !data.password) return
//       console.log(data.email , data.password);
      
//       dispatch(changePasswordUser({ email: data.email , password: data.password }))
//     }
//       useEffect(() => {
//     if (messageChangePass && !errorChangePass) {
//       setShowOtp(true);
//     }
//   }, [messageChangePass, errorChangePass]);
//   return (
//     <div className='bg-[#00000054] absolute left-0 top-0 w-full h-full z-50'>
//         <div className='w-1/2 p-5 mt-8 bg-white rounded-md m-auto relative'>
//             <div onClick={()=> model(false)} className={`${locale === "ar" ? "-left-[26px]" : "-right-[26px]"} text-3xl close -top-[26px] cursor-pointer  bg-white border w-fit p-3 absolute` } >
//                 <IoClose/>
//             </div>
//             {showOtp ? <ForgetPasswordOtp/> : 
//             <div>
//               <h2 className='text-2xl font-bold mb-4'>{t("forgot-your-password")}</h2>
//               <p className='mt-2 mb-3'>{t("forgot-p")}</p>
//               <form onSubmit={handleChangePassword}>
//                 <label>{t("Email")}</label>
//                 <input onChange={(e) => setData({ ...data, email: e.target.value })} type="email" className='block w-full h-[40px] border border-gray-400 outline-activeColor px-5' />
//                 <input onChange={(e) => setData({ ...data, password: e.target.value })} type="password" placeholder='' className='mt-3 block w-full h-[40px] border border-gray-400 outline-activeColor px-5' />
//                 <button disabled={loading}  className='bg-activeColor mt-3 text-white rounded-md h-[40px] px-5 cursor-pointer'>
//                     {t("resetPassword")}
//                 </button>
//               </form>
//               {messageChangePass && <p className="text-green-600 mt-4">{messageChangePass}</p>}
//               {errorChangePass && <p className="text-red-600 mt-4">{errorChangePass}</p>}
//             </div>
//             }
//         </div>
//     </div>
//   )
// }

// export default ForgetPasswordModel