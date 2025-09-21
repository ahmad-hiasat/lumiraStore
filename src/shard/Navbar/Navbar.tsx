import Link from 'next/link'
import Check from './Check';
import MenuLinks from './MenuLinks';

const Navbar = () => {
  return (
    <div className='shadow z-50 fixed top-0 left-0 right-0 bg-white'>
        <div className="container">
            <nav className='flex items-center justify-between h-[60px]'>
                <div className='logo text-lg'>
                    <Link href={"/"}>Lumira</Link>
                </div>
                <MenuLinks style1={"links max-lg:hidden"} style2={"flex items center"} />
                <Check/>
            </nav>
        </div>
    </div>
  )
}

export default Navbar