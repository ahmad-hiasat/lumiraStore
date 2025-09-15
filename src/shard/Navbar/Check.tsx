"use client";
import React, { useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { fetchUserData } from "@/features/userData/userDataThunks";
import { fetchLogout } from "@/features/logout/LogoutThunks";
const Check = () => {
  const btnStyle ="px-4 h-[40px] rounded-md text-white bg-[#52220A] hover:bg-white hover:text-[#52220A] hover:border hover:border-[#52220A] cursor-pointer border border-[#52220A] mx-1";
  const dispatch = useDispatch<AppDispatch>();
  const { userData, loading } = useSelector((state: RootState) => state.userData);
  const { orders } = useSelector((state: RootState) => state.cart);
  const handleLogout = async () => {
    await dispatch(fetchLogout());
    dispatch(fetchUserData());
  };
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <div className="btns flex items-center">
      {userData?.isAdmin !== true &&
      <Link href={"/Cart"} className="relative mr-5">
       <FaCartShopping className="text-3xl cursor-pointer" />
        <span className="absolute w-[22px] rounded-full -top-[10px] -right-[10px] h-[22px] bg-[#52220A] flex items-center justify-center text-white">{orders.length}</span>
      </Link>
      }

      {loading ? (
        <p>Loading...</p>
      ) : userData?.status ? (
        <div className="flex items-center gap-3">
          <span className="font-bold text-[#52220A]">Hi, {userData?.username}</span>
          <button className={btnStyle}>
            <Link href="/Login" onClick={handleLogout}>Logout</Link>
          </button>
        </div>
      ) : (
        <>
          <button className={btnStyle}><Link href="/Login">Login</Link></button>
          <button className={btnStyle}><Link href="/Register">Register</Link></button>
        </>
      )}
    </div>
  );
};

export default Check;
