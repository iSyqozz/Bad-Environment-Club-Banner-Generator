import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='z-5 w-full flex flex-col items-center justify-center gap-8'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <div className='text-white font-normal text-opacity-70 text-[10px]'> powered by</div>
        <Link target='_blank' href={"https://www.earlyart.io/"}>
          <Image
            className='aspect-auto opacity-60 transition-all hover:scale-110 hover:opacity-100'
            priority
            loading='eager'
            quality={100}
            width={50}
            height={50}
            src={"/assets/early.webp"}
            alt='early-art'
          ></Image>
        </Link>
      </div>
      <div className='p-1 capitalize text-[9px] text-white text-opacity-80 text-center'>
        @BadEnvironmentClub 2023. All Right reserved.
      </div>

    </div>
  )
}

export default Footer


