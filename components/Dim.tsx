'use client'
import { useState, useEffect } from 'react'
import React from 'react'
import Image from 'next/image'
const Dim = () => {
    const [shouldShow, setshouldShow] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setshouldShow(true);
        }, 50);
    }, [])

    return (
        <div
            style={{
                opacity: shouldShow ? ('1') : ('0')
            }}
            className=' transition-all duration-500 fixed w-full h-full top-0 left-0 z-[1000] flex items-center justify-center bg-black bg-opacity-100'>

            <div className='animate-bounce'>
                <Image
                    unoptimized
                    width={200}
                    height={200}
                    alt={'dim'}
                    src={'/assets/Logo.png'}
                    priority
                    loading='eager'
                    className='invert animate-pulse'
                ></Image>
            </div>

        </div>
    )
}
export default Dim