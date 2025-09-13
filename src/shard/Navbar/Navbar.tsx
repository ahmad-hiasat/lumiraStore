import { NavbarData } from '@/utils/dummy'
import Link from 'next/link'
import Check from './Check';

const Navbar = () => {
  return (
    <div className='shadow '>
        <div className="container">
            <nav className='flex items-center justify-between h-[60px]'>
                <div className='logo text-lg'>
                    <Link href={"/"}>Lumira</Link>
                </div>
                <div className='links'>
                    <ul className='flex items center'>
                        {NavbarData.map((ele,index)=>(
                            <li key={index} className='text-md  hover:text-[#52220A] font-bold px-3 '>
                                <Link href={ele.hash}>{ele.head}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <Check/>
            </nav>
        </div>
    </div>
  )
}

export default Navbar