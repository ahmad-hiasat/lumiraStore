import { NavbarData } from '@/utils/dummy'
import Link from 'next/link'
import React from 'react'

const MenuLinks = ({style1,style2}:{style1:string,style2:string}) => {
  return (
    <div className={style1}>
        <ul className={style2}>
            {NavbarData.map((ele,index)=>(
                <li key={index} className='text-md cursor-pointer  hover:text-[#52220A] font-bold px-3 '>
                    <Link href={ele.hash}>{ele.head}</Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default MenuLinks