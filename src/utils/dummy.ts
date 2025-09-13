import { ICartData, INavbar } from "@/types/type";
import { CiAlignCenterH } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { CiWavePulse1 } from "react-icons/ci";
import { CiVoicemail } from "react-icons/ci";

export const cartData:ICartData[] = [
    {head:"card-box1-h",p:"card-box1-p",icon:CiAlignCenterH},
    {head:"card-box2-h",p:"card-box2-p",icon:CiStar},
    {head:"card-box3-h",p:"card-box3-p",icon:CiWavePulse1},
    {head:"card-box4-h",p:"card-box4-p",icon:CiVoicemail}
]
export const NavbarData:INavbar[] = [
    {head:"Home",hash:"/"},
    {head:"Products",hash:"/Products"},
    {head:"ContactUs",hash:"/ContactUs"},
    {head:"Help",hash:"/Help"}
]