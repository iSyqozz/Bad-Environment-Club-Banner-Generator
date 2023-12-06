import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MAIN_WEBSITE_LINK } from '@/constants'
const Navbar = () => {
  return (
    <div className='h-24 w-[90%] max-w-6xl mx-auto relative flex items-center justify-start'>
      <div className=' transition-all absolute abs-center'>
        <Link target='_blank' href={MAIN_WEBSITE_LINK}>
          <Image
            loading='eager'
            quality={100}
            priority
            src={'/assets/Logo.gif'}
            width={70}
            height={70}
            alt='nav logo'
            unoptimized
          ></Image>
        </Link>
      </div>


      <Link target='_blank' href={'https://www.badenvirohub.com/'}>
        <div className='text-white text-xl font-bold text-center hover:scale-[1.2] duration-200 transition-all'>HUB</div>
      </Link>
    </div>
  )
}

export default Navbar