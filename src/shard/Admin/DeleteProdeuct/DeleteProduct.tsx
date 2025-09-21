import React from 'react'
import { useDispatch } from 'react-redux';
import {  AppDispatch } from '@/store/index';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { fetchDeleteProducts } from '@/features/Products/ProductsThunks';
const DeleteProduct = ({id} : {id:string}) => {
      const dispatch = useDispatch<AppDispatch>();
      const  handleClick = ()=>{
        dispatch(fetchDeleteProducts(id))
        setInterval(() => {
          window.location.reload();
        }, 300);
      }
  return (
    <div>
        <MdOutlineDeleteOutline onClick={handleClick} className="rounded-full p-1 hover:bg-white hover:text-[#52220A]"/>
    </div>
  )
}

export default DeleteProduct