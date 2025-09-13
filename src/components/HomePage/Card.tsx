import { cartData } from '@/utils/dummy'
import { useTranslations } from 'next-intl'
import React from 'react'

const Card = () => {
    const t = useTranslations("HomePage")
  return (
    <section  className='py-20 bg-[#3A190B]'>
        <div className="container m-auto">
            <div className='flex flex-wrap'>
                {cartData.map((item)=>(
                    <div key={item.p} className='w-full  max-lg:mb-5 group sm:w-[50%] lg:w-1/4 px-2'>
                        <article  className="box bg-[#52220A] text-white pt-8 pb-12 px-5 rounded-sm h-full transition-colors duration-30 group-hover:bg-[#472010]">
                            <div className='border border-gray w-fit rounded-full p-3 cursor-pointer mb-5 '><item.icon aria-hidden="true" className='text-3xl' /></div>
                            <header  className="info">
                                <h2 className='font-bold text xl mb-10'>{t(item.head)}</h2>
                                <h2>{t(item.p)}</h2>
                            </header>
                        </article>
                    </div>
                ))}
            </div>
        </div>    
    </section>
  )
}

export default Card