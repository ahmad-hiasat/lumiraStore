"use client";
import React, { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { fetchUserData } from "@/features/userData/userDataThunks";
import { fetchLogout } from "@/features/logout/LogoutThunks";
import { fetchCurrency } from "@/features/Currency/CurrencyThunks";
import { FaBars } from "react-icons/fa";
import MenuLinks from "./MenuLinks";
import { IoClose } from "react-icons/io5";


const Check = () => {
  const btnStyle = "px-4 h-[40px] rounded-md text-white bg-[#52220A] hover:bg-white hover:text-[#52220A] hover:border hover:border-[#52220A] cursor-pointer border border-[#52220A] mx-1";
  const dispatch = useDispatch<AppDispatch>();
  const [Menu, setMenu ] = useState(false)
  const { userData, loading } = useSelector((state: RootState) => state.userData);
  const { orders } = useSelector((state: RootState) => state.cart);
  const { country, price } = useSelector((state: RootState) => state.currency);

  const handleLogout = async () => {
    await dispatch(fetchLogout());
    dispatch(fetchUserData());
  };

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchCurrency()); 
  }, [dispatch]);

  const fundsInLocal = userData?.funds
    ? (userData.funds * price).toFixed(2)
    : "0";

  return (
    <div className="btns flex items-center">
      {userData?.isAdmin !== true && (
        <Link href={"/Cart"} className="relative mr-5">
          <FaCartShopping className="text-3xl cursor-pointer" />
          <span className="absolute w-[22px] rounded-full -top-[10px] -right-[10px] h-[22px] bg-[#52220A] flex items-center justify-center text-white">
            {orders.length}
          </span>
        </Link>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : userData?.status ? (
        <div className="flex items-center gap-3">
          <span className="font-bold text-[#52220A]">
            Hi, {userData?.username}
          </span>

          {userData.isAdmin !== true && (
            <span>
              {fundsInLocal} {country}
            </span>
          )}

          <button className={btnStyle}>
            <Link href="/Login" onClick={handleLogout}>
              Logout
            </Link>
          </button>
        </div>
      ) : (
        <>
          <button className={btnStyle}>
            <Link href="/Login">Login</Link>
          </button>
          <button className={btnStyle}>
            <Link href="/Register">Register</Link>
          </button>
        </>
      )}
      <div className="lg:hidden">
        <FaBars className="text-2xl cursor-pointer font-bold" onClick={()=>setMenu(!Menu)} />
        {Menu ?
          <div className={`right-0 fixed transition-all h-full top-[60px] w-full sm:w-[300px] px-5 py-8 bg-white`}>
            <IoClose className="absolute top-0 right-0 text-3xl cursor-pointer" onClick={()=>setMenu(false)}/>
            <MenuLinks style1="" style2="flex flex-col gap-8 " />
          </div>
          : 
          <div className={`-right-[150%] transition-all   fixed h-full top-[60px] w-full sm:w-[300px] px-5 py-8 bg-white`}>
            <MenuLinks style1="" style2="flex flex-col gap-8 " />
          </div>
        }
      </div>
    </div>
  );
};

export default Check;
