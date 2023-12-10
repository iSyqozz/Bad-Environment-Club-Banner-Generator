'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import React from 'react'
import localFont from 'next/font/local'
import Image from 'next/image'
import Dim from './Dim'
import html2canvas from "html2canvas"
const myFont = localFont({ src: "../public/fonts/Akira-Expanded.otf", })



//@ts-ignore
const BMpostGenerator = ({ shouldDim, setShouldDim }) => {

    const [ChoosenNFTnumber, setChoosenNFTnumber] = useState('#92');
    const [NFTimageSrc, setNFTimageSrc] = useState('#92');
    const [topLeftPixelColor, setTopLeftPixelColor] = useState('');
    const [fontSizeState, setFontSizeState] = useState(42); // Set an initial value

    const [LogoColor, setLogoColor] = useState<'#000000' | '#ffffff' | '#ffd400' | '#ff4f8f' | '#fff6ee'>('#ffffff');
    const [FillColor, setFillColor] = useState<'#000000' | '#ffffff' | '#ffd400' | '#ff4f8f' | '#fff6ee'>('#000000');


    const BmFillSource = `/assets/BmPosts/Bm${FillColor.substring(1)}.webp`;
    console.log(BmFillSource);

    const imgRef = useRef<HTMLImageElement | null>(null);
    const bannerRef = useRef<HTMLDivElement | null>(null);
    const LogoRef1 = useRef<HTMLImageElement | null>(null);
    const LogoRef2 = useRef<HTMLImageElement | null>(null);

    //exporting and saving banner
    function captureAndSaveBanner() {
        const hiddenBanner = document.querySelector('.hidden-banner3') as HTMLDivElement; // Replace with the actual class or ID of your hidden banner container
        hiddenBanner.style.display = 'flex';
        window.scrollTo(0, 0);
        document.body.style.overflowY = 'hidden'

        if (hiddenBanner) {
            html2canvas(hiddenBanner).then((canvas) => {
                const image = canvas.toDataURL('image/png');
                const downloadLink = document.createElement('a');
                downloadLink.href = image;
                downloadLink.download = 'banner.png';
                downloadLink.click();

                hiddenBanner.style.display = 'none'
                document.body.style.overflowY = 'auto'

                setShouldDim(false);
            });
        }
    }


    // Helper function to convert hex color to RGB
    function hexToRgb(hex: string) {
        // Remove the hash sign if it's included
        hex = hex.replace(/^#/, '');

        // Parse the hex values for red, green, and blue
        var bigint = parseInt(hex, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;

        return { r, g, b };
    }



    function paintImage(img: HTMLImageElement, newColor: '#000000' | '#ffffff' | '#ffd400' | '#ff4f8f' | '#fff6ee') {

        let canvas = document.createElement('canvas');
        canvas.width = 1000;
        canvas.height = 1000;
        // Get canvas 2D context
        var ctx = canvas.getContext('2d')!;
        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // Get image data
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        // Convert hex color to RGB
        var rgb = hexToRgb(newColor);
        console.log(rgb)
        // Loop through each pixel and modify color
        for (var i = 0; i < data.length; i += 4) {
            if (data[i + 3] !== 0) {
                // Set the new RGB values
                data[i] = rgb.r;
                data[i + 1] = rgb.g;
                data[i + 2] = rgb.b;
                // Alpha value remains unchanged (data[i + 3])
            }
        }
        // Put the modified image data back on the canvas
        ctx.putImageData(imageData, 0, 0);
        // Replace the src attribute of the original image with the data URL of the modified image
        img.src = canvas.toDataURL();
    }

    useEffect(() => {
        paintImage(LogoRef2.current!, "#ffffff")
        paintImage(LogoRef1.current!, "#ffffff")
    }, [])


    //adjusting fonts
    const handlefontOptimization = useCallback(() => {
        // Function to calculate font size based on the state value
        const calculateFontSize = () => {
            const bannerElement = bannerRef.current;

            const bannerwidth = bannerElement?.clientWidth

            const realbannerwidth = 1000

            const fontSize = (bannerwidth! * parseFloat((fontSizeState / 100).toFixed(3)));
            const realfontSize = (realbannerwidth! * parseFloat((fontSizeState / 100).toFixed(3)));
            // Calculate the font size based on the state value and parent width
            //const fontSize =  (fontSizeState / 50) * (banenrHeight ?? 0);
            return [`${fontSize}px`, `${realfontSize}px`];
        };
        // Calculate font size and update styles
        const [fontSize, realFontSize] = calculateFontSize();
        document.documentElement.style.setProperty('--complementary-bm-font-size', fontSize);
        document.documentElement.style.setProperty('--complementary-bm-real-font-size', realFontSize);

    }, [fontSizeState])

    useEffect(() => {
        handlefontOptimization();
        window.addEventListener('resize', handlefontOptimization);
        return () => {
            window.removeEventListener('resize', handlefontOptimization);
        }
    }, []);


    //getting banner background color
    const getColorOfTopLeftPixel = () => {
        // Get the image element using the ref
        const img = imgRef.current;
        if (!img) { return }


        if (img && img.complete && img.naturalWidth > 0) {

            // Create a canvas element
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            // Get the 2D rendering context of the canvas
            const context = canvas.getContext('2d');

            // Draw the image onto the canvas
            context!.drawImage(img, 0, 0, img.width, img.height);

            // Get the color data of the top-left pixel
            const imageData = context!.getImageData(0, Math.floor(img.height / 2), 1, 1);
            const pixelColor = `rgba(${imageData.data[0]}, ${imageData.data[1]}, ${imageData.data[2]}, ${imageData.data[3] / 255})`;

            // Set the top-left pixel color in the state
            setTopLeftPixelColor(pixelColor);

        }
    };



    const [ShouldShow, setShouldShow] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShouldShow(true);
        }, 1200);

        return () => { clearTimeout(timer) }
    }, [])

    return (

        <>
            <div
                id="BMpost-generator"
                style={{
                    opacity: ShouldShow ? ('1') : ('0'),
                    transform: ShouldShow ? ('translateY(0px)') : ('translateY(50px')
                }}
                className={'max-md:p-1  w-[max(65%,320px)]  aspect-[1.4/1] max-sm:aspect-[1/2] max-[950px]:aspect-[1/1] bg-secondary bg-opacity-60 rounded-3xl max-sm:rounded-xl flex flex-col items-center justify-start gap-2 '}>


                {/**title */}
                <div className={'text-xl max-sm:text-sm text-white font-extrabold mt-4 text-center ' + myFont.className}>Create your custom bm post</div>

                {/**content */}
                <div className='w-[85%] mt-2 h-[90%] flex flex-row justify-evenly items-center max-sm:flex-col max-sm:justify-start relative'>
                    <div className='w-full h-full flex items-center justify-center max-md:flex-col gap-4 '>

                        {/**banner */}
                        <div
                            ref={bannerRef}
                            style={{ background: topLeftPixelColor, }}
                            className='relative w-[50%] rounded-xl aspect-[16/10] max-md:w-[90%] overflow-hidden '>


                            {/**nft image on the banner */}
                            {topLeftPixelColor == 'rgba(255, 229, 46, 1)' && (
                                <Image
                                    unoptimized
                                    width={400}
                                    height={400}
                                    alt={ChoosenNFTnumber}
                                    src={'/assets/bubble-top-layer.webp'}
                                    className='aspect-auto absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-auto z-[2] '
                                />)}
                            <Image
                                onLoad={getColorOfTopLeftPixel}
                                ref={imgRef}
                                unoptimized
                                width={400}
                                height={400}
                                alt={NFTimageSrc}
                                src={'/assets/NFTS/' + (NFTimageSrc ? NFTimageSrc.substring(1, NFTimageSrc.length) : '1') + '.png'}
                                className='aspect-auto absolute left-1/2 -translate-x-1/2  right-1 h-full w-auto z-[1] '
                            ></Image>

                            {/** Logo */}
                            <Image
                                ref={LogoRef1}
                                unoptimized
                                width={80}
                                height={80}
                                alt={NFTimageSrc}
                                src={'/assets/Logo.png'}
                                priority
                                loading='eager'
                                className='z-[5] aspect-auto absolute left-1/2 -bottom-[3%] -translate-x-1/2 flex flex-col items-center justify-center w-[15%]'
                            ></Image>

                            <Image
                                unoptimized
                                src={BmFillSource}
                                width={400}
                                height={400}
                                alt={`Bm Fill ${FillColor}`}
                                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] z-[4]'
                            />

                        </div>


                        {/** editing section */}
                        <div className='flex flex-col gap-2 items-center justify-center max-sm:w-full'>

                            {/** add your nft prompt */}
                            <div className='text-[10px] max-sm:mt-2 text-white text-center'>add your nft</div>
                            <input
                                className='text-center bg-primary bg-opacity-60 focus:bg-opacity-100 font-extrabold placeholder:text-black placeholder:text-opacity-70 text-[8px] rounded-sm [text-shadow:none] text-black p-1 w-[75%] max-sm:w-[85%] '
                                type="text"
                                required
                                value={ChoosenNFTnumber}
                                onChange={(e) => {
                                    const digitRegex = /\d/g;
                                    const digitsArray = e.target.value.match(digitRegex);
                                    if (!digitsArray) {
                                        setChoosenNFTnumber(``);
                                        return
                                    };
                                    let digitsOnly = digitsArray ? digitsArray.join('').slice(0, 4) : '';
                                    let digitNumber = parseInt(digitsOnly);
                                    if ([1996, 1414, 1427, 1418].includes(digitNumber)) {
                                        digitNumber -= 1;
                                    }
                                    digitsOnly = Math.min(Math.max(1, digitNumber), 2000).toString();
                                    setChoosenNFTnumber((digitsOnly ? `#` : '') + digitsOnly)
                                }}
                                placeholder='#1' />
                            <button
                                className={' p-1 rounded-sm text-black font-bold text-center bg-primary transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer [text-shadow:none] text-[8px] w-[65%] max-sm:w-[85%] '}
                                onClick={() => { setNFTimageSrc(ChoosenNFTnumber) }}>
                                APPLY CHANGES
                            </button>



                            {/** changing fill and logo color */}
                            <div className='text-[10px] max-sm:mt-2 text-white text-center'>select fill color</div>
                            <div className='flex item-center justify-center gap-1 w-[100%]'>
                                <div
                                    style={{
                                        transform: FillColor == '#000000' ? ('scale(1.15)') : ('1'),
                                        boxShadow: FillColor == '#000000' ? ('0px 0px 5px 1px #ffd400') : ('none'),
                                    }}
                                    onClick={() => { setFillColor('#000000') }}

                                    className='w-[15%] max-sm:w-[7.5%] cursor-pointer aspect-[16/9] bg-black rounded-sm transition-all hover:scale-[1.15] active:scale-95 duration-500'></div>
                                <div
                                    style={{
                                        transform: FillColor == '#ffffff' ? ('scale(1.15)') : ('1'),
                                        boxShadow: FillColor == '#ffffff' ? ('0px 0px 5px 1px #ffd400') : ('none'),
                                    }}
                                    onClick={() => { setFillColor('#ffffff') }}

                                    className='w-[15%] max-sm:w-[7.5%] cursor-pointer aspect-[16/9] bg-white rounded-sm transition-all hover:scale-[1.15] active:scale-95 duration-500'></div>
                                <div
                                    style={{
                                        transform: FillColor == '#ffd400' ? ('scale(1.15)') : ('1'),
                                        boxShadow: FillColor == '#ffd400' ? ('0px 0px 5px 1px #ffd400') : ('none'),
                                    }}
                                    onClick={() => { setFillColor('#ffd400') }}

                                    className='w-[15%] max-sm:w-[7.5%] cursor-pointer aspect-[16/9] bg-[#ffd400] rounded-sm transition-all hover:scale-[1.15] active:scale-95 duration-500'></div>
                                <div
                                    style={{
                                        transform: FillColor == '#ff4f8f' ? ('scale(1.15)') : ('1'),
                                        boxShadow: FillColor == '#ff4f8f' ? ('0px 0px 5px 1px #ffd400') : ('none'),
                                    }}
                                    onClick={() => { setFillColor('#ff4f8f') }}

                                    className='w-[15%] max-sm:w-[7.5%] cursor-pointer aspect-[16/9] bg-[#ff4f8f] rounded-sm transition-all hover:scale-[1.15] active:scale-95 duration-500'></div>
                                <div
                                    style={{
                                        transform: FillColor == '#fff6ee' ? ('scale(1.15)') : ('1'),
                                        boxShadow: FillColor == '#fff6ee' ? ('0px 0px 5px 1px #ffd400') : ('none'),
                                    }}
                                    onClick={() => { setFillColor('#fff6ee') }}

                                    className='w-[15%] max-sm:w-[7.5%] cursor-pointer aspect-[16/9] bg-[#fff6ee] rounded-sm transition-all hover:scale-[1.15] active:scale-95 duration-500'></div>
                            </div>



                            <div className='text-[10px] max-sm:mt-2 text-white text-center'>select logo color</div>
                            <div className='flex item-center justify-center gap-1 w-[100%]'>
                                <div
                                    style={{
                                        transform: LogoColor == '#000000' ? ('scale(1.15)') : ('1'),
                                        boxShadow: LogoColor == '#000000' ? ('0px 0px 5px 1px #ffd400') : ('none'),
                                    }}
                                    onClick={() => { paintImage(LogoRef1.current!, '#000000'); paintImage(LogoRef2.current!, '#000000'); setLogoColor('#000000') }}

                                    className='w-[15%] max-sm:w-[7.5%] cursor-pointer aspect-[16/9] bg-black rounded-sm transition-all hover:scale-[1.15] active:scale-95 duration-500'></div>
                                <div
                                    style={{
                                        transform: LogoColor == '#ffffff' ? ('scale(1.15)') : ('1'),
                                        boxShadow: LogoColor == '#ffffff' ? ('0px 0px 5px 1px #ffd400') : ('none'),
                                    }}
                                    onClick={() => { paintImage(LogoRef1.current!, '#ffffff'); paintImage(LogoRef2.current!, '#ffffff'); setLogoColor('#ffffff') }}

                                    className='w-[15%] max-sm:w-[7.5%] cursor-pointer aspect-[16/9] bg-white rounded-sm transition-all hover:scale-[1.15] active:scale-95 duration-500'></div>
                                <div
                                    style={{
                                        transform: LogoColor == '#ffd400' ? ('scale(1.15)') : ('1'),
                                        boxShadow: LogoColor == '#ffd400' ? ('0px 0px 5px 1px #ffd400') : ('none'),
                                    }}
                                    onClick={() => { paintImage(LogoRef1.current!, '#ffd400'); paintImage(LogoRef2.current!, '#ffd400'); setLogoColor('#ffd400') }}

                                    className='w-[15%] max-sm:w-[7.5%] cursor-pointer aspect-[16/9] bg-[#ffd400] rounded-sm transition-all hover:scale-[1.15] active:scale-95 duration-500'></div>
                                <div
                                    style={{
                                        transform: LogoColor == '#ff4f8f' ? ('scale(1.15)') : ('1'),
                                        boxShadow: LogoColor == '#ff4f8f' ? ('0px 0px 5px 1px #ffd400') : ('none'),
                                    }}
                                    onClick={() => { paintImage(LogoRef1.current!, '#ff4f8f'); paintImage(LogoRef2.current!, '#ff4f8f'); setLogoColor('#ff4f8f') }}

                                    className='w-[15%] max-sm:w-[7.5%] cursor-pointer aspect-[16/9] bg-[#ff4f8f] rounded-sm transition-all hover:scale-[1.15] active:scale-95 duration-500'></div>
                                <div
                                    style={{
                                        transform: LogoColor == '#fff6ee' ? ('scale(1.15)') : ('1'),
                                        boxShadow: LogoColor == '#fff6ee' ? ('0px 0px 5px 1px #ffd400') : ('none'),
                                    }}
                                    onClick={() => { paintImage(LogoRef1.current!, '#fff6ee'); paintImage(LogoRef2.current!, '#fff6ee'); setLogoColor('#fff6ee') }}

                                    className='w-[15%] max-sm:w-[7.5%] cursor-pointer aspect-[16/9] bg-[#fff6ee] rounded-sm transition-all hover:scale-[1.15] active:scale-95 duration-500'></div>
                            </div>


                            {/** export and save button */}
                            <div onClick={() => { setShouldDim(true); setTimeout(() => { captureAndSaveBanner() }, 10); }}
                                className='max-sm:w-[85%] max-sm:mt-2 sm:my-6  w-[100%] bg-black transition-all duration-300 hover:scale-105 active:scale-95 text-center sm:text-[9px] text-sm font-light text-white rounded-sm p-2'>
                                EXPORT AND SAVE
                            </div>
                        </div>

                    </div>
                </div>

            </div>







            {/** hidden banner */}

            {/**banner */}
            <div
                style={{ background: topLeftPixelColor, }}
                className='hidden-banner3 hidden relative !w-[1080px] min-w-[1080px] max-w-[1080px] rounded-xl aspect-[16/10] overflow-hidden '>

                {/**nft image on the banner */}
                {topLeftPixelColor == 'rgba(255, 229, 46, 1)' && (
                    <Image
                        unoptimized
                        width={400}
                        height={400}
                        alt={ChoosenNFTnumber}
                        src={'/assets/bubble-top-layer.webp'}
                        className='aspect-auto absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-auto z-[2] '
                    />)}
                <Image
                    onLoad={getColorOfTopLeftPixel}
                    ref={imgRef}
                    unoptimized
                    width={400}
                    height={400}
                    alt={NFTimageSrc}
                    src={'/assets/NFTS/' + (NFTimageSrc ? NFTimageSrc.substring(1, NFTimageSrc.length) : '1') + '.png'}
                    className='aspect-auto absolute left-1/2 -translate-x-1/2  right-1 h-full w-auto z-[1] '
                ></Image>

                {/** Logo */}
                <Image
                    ref={LogoRef2}
                    unoptimized
                    width={80}
                    height={80}
                    alt={NFTimageSrc}
                    src={'/assets/Logo.png'}
                    priority
                    loading='eager'
                    className='z-[5] aspect-auto absolute left-1/2 -bottom-[3%] -translate-x-1/2 flex flex-col items-center justify-center w-[15%]'
                ></Image>

                <Image
                    unoptimized
                    src={BmFillSource}
                    width={1000}
                    height={1000}
                    alt={`Bm Fill ${FillColor}`}
                    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] z-[4]'
                />

            </div>

        </>
    )
}

export default BMpostGenerator