import { IconType } from "react-icons";
export type FloatingInputProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
};

export type SignupData = {
  email: string;
  password: string;
  username: string;
}
export type ActivateData = {
  email: string;
  otp: number;
}
export type LoginData = {
  email: string;
  password: string;
}
export type ChangePasswordData = {
  email: string;
  password:string
}
export type ChangePasswordDataOtp = {
  email: string;
  otp:number
}
export interface INavbar {
head:string
hash:string
}
export interface ICartData {
head:string
p:string
icon:IconType
}
export interface IAddProducts {
  _id?: string;
  title: string;
  price: number;
  desc: string;
  img: string;
  count: number;
}
export interface IAddProduct {
  _id?: string;
  title: string;
  price: number;
  desc: string;
  img: string;
  stock: number;
}
export interface AddCartPayload {
  productId: string;
  count: number;
}


