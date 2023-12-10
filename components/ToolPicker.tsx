'use client'
import { useState, useEffect } from 'react'
import React from 'react'
import localFont from 'next/font/local'
import Image from 'next/image'
const myFont = localFont({ src: "../public/fonts/Akira-Expanded.otf", })
const duncap = localFont({ src: "../public/fonts/DunceCap-BB-Italic.ttf", })

const ToolPicker = () => {

    const [ShouldShoud, setShouldShoud] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShouldShoud(true);
        }, 300);

        return () => { clearTimeout(timer) }
    }, [])


    return (
        <div
            id="tool-picker"
            style={{
                opacity: ShouldShoud ? ('1') : ('0'),
                transform: ShouldShoud ? ('translateY(0px)') : ('translateY(50px')
            }}
            className={'max-md:p-1  w-[max(65%,320px)]  aspect-[1.4/1] max-sm:aspect-[1/2] bg-secondary bg-opacity-60 rounded-3xl max-sm:rounded-xl flex flex-col items-center justify-start gap-2 '}>
            <div className={'text-xl max-sm:text-sm text-white font-extrabold mt-4 ' + myFont.className}>create bad vibes</div>
            <div className=' sm:mt-4 lg:mt-6 grid  grid-cols-3 grid-rows-3 max-sm:grid-cols-4 max-sm:grid-rows-4 w-[85%] h-[75%] max-sm:h-[85%] gap-4'>

                <a href="#banner-generator" className=' group transition-all border-[#7f6900] border duration-500 ease-in-out hover:scale-[1.05] active:scale-[1] cursor-pointer overflow-hidden [grid-column:1_/_span_2] max-sm:[grid-column:1_/_span_4] sm:[grid-row:1_/_span_1] rounded-lg bg-[#ffd400] relative' >
                    <div className='rounded-sm absolute  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[105%] h-[105%] bg-black group-hover:opacity-80 opacity-50 z-[5]'></div>
                    <div className='text-white z-[6] absolute opacity-70 group-hover:opacity-100 translate-y-[-50%] text-sm md:text-sm top-[50%]  left-[50%] translate-x-[-50%] text-center max-sm:text-[11px] font-bold'>banner tool</div>
                    <div className={'text-black z-[2] absolute translate-y-[-50%] text-3xl top-[50%]  left-[50%] max-sm:left-[35%] translate-x-[-50%] text-center max-sm:text-2xl font-bold ' + duncap.className}>Early</div>
                    <Image
                        loading='eager'
                        priority
                        quality={100}
                        width={400}
                        height={400}
                        alt='top nav image'
                        src={'/assets/top-grid-pic.webp'}
                        className='aspect-auto absolute bottom-0 right-1 h-[105%] w-auto z-[1] '
                    ></Image>
                </a>


                <a href="#BMpost-generator" className=' group transition-all border-[#7f6900] border duration-500 ease-in-out hover:scale-[1.05] active:scale-[1] cursor-pointer overflow-hidden sm:[grid-column:1_/_span_2] sm:[grid-row:2_/_span_2] max-sm:[grid-column:1_/_span_4] max-sm:[grid-rows:2_/_span_1]  rounded-lg bg-[#ffd400] relative' >
                    <div className='rounded-sm absolute  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[105%] h-[105%] bg-black group-hover:opacity-80 opacity-50 z-[5]'></div>
                    <div className='text-white z-[6] absolute opacity-70 group-hover:opacity-100 translate-y-[-50%] text-sm md:text-sm top-[50%]  left-[50%] translate-x-[-50%] text-center max-sm:text-[11px] font-bold'>BM tool</div>



                    <div className={
                        `rounded-sm  flex items-center justify-center text-8xl sm:text-7xl   md:text-[180px] absolute text-center 
                        font-extrabold top-0 left-0 w-[100%] h-[100%]  bg-black text-white mix-blend-multiply  z-[4] `
                        + duncap.className}>
                        Bm
                    </div>



                    <Image
                        loading='eager'
                        priority
                        quality={100}
                        width={400}
                        height={400}
                        alt='top nav image'
                        src={'/assets/top-grid-pic.webp'}
                        className='z-[1] aspect-auto absolute bottom-0 left-[50%] translate-x-[-50%] h-[100%] max-sm:h-[150%] w-auto '
                    ></Image>


                    <Image
                        loading='eager'
                        priority
                        quality={100}
                        width={50}
                        height={50}
                        alt='top nav image'
                        src={'/assets/Logo.png'}
                        className=' invert opacity-40 aspect-auto absolute bottom-[-5%] group-hover:opacity-100 left-[50%] translate-x-[-50%] w-[20%] h-auto z-[5]'
                    ></Image>





                </a>


                <a href="#wallpaper-generator" className=' group transition-all border-[#7f6900] border duration-500 ease-in-out hover:scale-[1.05] active:scale-[1] cursor-pointer overflow-hidden sm:[grid-row:1_/_span_3] sm:[grid-column:3_/_span_2] max-sm:[grid-column:2_/_span_2] max-sm:[grid-row:3_/_span_3]  rounded-lg bg-[#ffd400] relative' >
                    <div className='rounded-sm absolute  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[105%] h-[105%] bg-black group-hover:opacity-80 opacity-50 z-[5]'></div>
                    <div className='text-white z-[6] absolute opacity-70 group-hover:opacity-100 translate-y-[-50%] text-sm md:text-sm top-[50%]  left-[50%] translate-x-[-50%] text-center max-sm:text-[11px] font-bold'>wallpaper tool</div>
                    <Image
                        loading='eager'
                        priority
                        quality={100}
                        width={400}
                        height={400}
                        alt='top nav image'
                        src={'/assets/top-grid-pic.webp'}
                        className='aspect-auto absolute bottom-0 left-[50%] translate-x-[-50%] w-[100%] h-auto z-[1]'
                    ></Image>

                    <Image
                        loading='eager'
                        priority
                        quality={100}
                        width={200}
                        height={200}
                        alt='top nav image'
                        src={'/assets/Logo.png'}
                        className='aspect-auto absolute top-[12%] left-[50%] translate-x-[-50%] w-[65%] h-auto'
                    ></Image>

                </a>
            </div>
        </div>
    )
}

export default ToolPicker