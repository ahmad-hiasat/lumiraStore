import React from 'react'
type ButtonFormProps = {
  loading: boolean;
}
const ButtonForm = ({loading} : ButtonFormProps) => {
  return (
    <button disabled={loading} className='bg-activeColor text-white w-full h-[50px] font-bold text-lg cursor-pointer rounded-md hover:bg-HoverActiveColor'>
        {loading ? "جاري التسجيل..." : "continue with email"}
    </button>
  )
}

export default ButtonForm