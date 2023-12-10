'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import React from 'react'
import localFont from 'next/font/local'
import Image from 'next/image'
import Dim from './Dim'
import html2canvas from "html2canvas"
const myFont = localFont({ src: "../public/fonts/Akira-Expanded.otf", })
const duncap = localFont({ src: "../public/fonts/DunceCap-BB-Italic.ttf", })

//@ts-ignore
const WallpaperGenerator = ({ shouldDim, setShouldDim }) => {

    const [ChoosenNFTnumber, setChoosenNFTnumber] = useState('#92');
    const [NFTimageSrc, setNFTimageSrc] = useState('#92');
    const [topLeftPixelColor, setTopLeftPixelColor] = useState('');

    const [BannerText, setBannerText] = useState('You Text Here');
    const [fontSizeState, setFontSizeState] = useState(6); // Set an initial value

    const [IncludeLogo, setIncludeLogo] = useState(true);

    const imgRef = useRef<HTMLImageElement | null>(null);
    const bannerRef = useRef<HTMLDivElement | null>(null);


    //exporting and saving banner
    function captureAndSaveBanner() {
        const hiddenBanner = document.querySelector('.hidden-banner2') as HTMLDivElement; // Replace with the actual class or ID of your hidden banner container
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


    //adjusting fonts
    const handlefontOptimization = useCallback(() => {
        // Function to calculate font size based on the state value
        const calculateFontSize = () => {
            const bannerElement = bannerRef.current;

            const bannerwidth = bannerElement?.clientWidth

            const realbannerwidth = 1080

            const fontSize = (bannerwidth! * parseFloat((fontSizeState / 100).toFixed(3)));
            const realfontSize = (realbannerwidth! * parseFloat((fontSizeState / 100).toFixed(3)));
            // Calculate the font size based on the state value and parent width
            //const fontSize =  (fontSizeState / 50) * (banenrHeight ?? 0);
            return [`${fontSize}px`, `${realfontSize}px`];
        };
        // Calculate font size and update styles
        const [fontSize, realFontSize] = calculateFontSize();
        document.documentElement.style.setProperty('--complementary-wallpaper-font-size', fontSize);
        document.documentElement.style.setProperty('--complementary-wallpaper-real-font-size', realFontSize);

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
        }, 900);

        return () => { clearTimeout(timer) }
    }, [])

    return (

        <>
            <div
                id="wallpaper-generator"
                style={{
                    opacity: ShouldShow ? ('1') : ('0'),
                    transform: ShouldShow ? ('translateY(0px)') : ('translateY(50px')
                }}
                className={'max-md:p-1  w-[max(65%,320px)]  aspect-[1.4/1] max-sm:aspect-[1/2] max-[950px]:aspect-[1/1] bg-secondary bg-opacity-60 rounded-3xl max-sm:rounded-xl flex flex-col items-center justify-start gap-2 '}>

                {/**title */}
                <div className={'text-xl max-sm:text-sm text-white font-extrabold mt-4 text-center ' + myFont.className}>create your custom wallpaper</div>

                {/**content */}
                <div className='w-[85%] mt-2 h-[90%] flex flex-row justify-evenly items-center max-sm:flex-col max-sm:justify-start relative'>
                    <div className='w-full h-full flex items-center justify-center max-md:flex-col gap-4 '>

                        {/**banner */}
                        <div
                            ref={bannerRef}
                            style={{ background: topLeftPixelColor, }}
                            className='relative w-[35%] rounded-xl aspect-[9/16] max-md:w-[225px] overflow-hidden '>

                            {/**banner text */}
                            <div style={{ fontSize: `var(--complementary-wallpaper-font-size)`, lineHeight: `calc(var(--complementary-wallpaper-font-size)*1)` }} className={'text-black z-[2] max-w-[100%] break-words absolute translate-y-[-50%] top-[30%]  left-[50%]  translate-x-[-50%] text-center  font-bold [text-shadow:none] ' + duncap.className}>{BannerText === '' ? ('Your Text Here') : (BannerText)}</div>

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
                                className='aspect-auto absolute bottom-0 right-1 w-full h-auto z-[1] '
                            ></Image>

                            {/** qr code section */}
                            {IncludeLogo && (
                                <Image
                                    unoptimized
                                    width={50}
                                    height={50}
                                    alt={NFTimageSrc}
                                    src={'/assets/Logo.png'}
                                    priority
                                    loading='eager'
                                    className='z-[3] absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-[25%] h-auto'
                                ></Image>
                            )}
                        </div>



                        {/** editing section */}
                        <div className='flex flex-col gap-2 items-center justify-center max-sm:w-full'>

                            {/** add your nft prompt */}
                            <div className='text-[10px] max-sm:mt-2 text-white text-center'>add your nft</div>
                            <input
                                className='text-center bg-primary bg-opacity-60 focus:bg-opacity-100 font-extrabold placeholder:text-black placeholder:text-opacity-70 text-[8px] rounded-sm [text-shadow:none] text-black p-1 w-[40%] max-sm:w-[85%] '
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
                                className={' p-1 rounded-sm text-black font-bold text-center bg-primary transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer [text-shadow:none] text-[8px] w-[30%] max-sm:w-[85%] '}
                                onClick={() => { setNFTimageSrc(ChoosenNFTnumber) }}>
                                APPLY CHANGES
                            </button>


                            {/** adding banner main text section */}
                            <div className='mt-1 flex items-center justify-center gap-2 max-sm:gap-4 max-sm:flex-col w-[100%]'>
                                {/** text input section */}
                                <div className='max-sm:w-full w-[100%] flex flex-col items-center justify-center gap-1'>
                                    <div className='text-[10px] text-white text-center'>add your text</div>
                                    <input
                                        className='bg-opacity-60 focus:bg-opacity-100 w-[100%] max-sm:w-[85%] text-center font-extrabold bg-primary placeholder:text-black placeholder:text-opacity-70 text-[8px] rounded-sm [text-shadow:none] text-black p-1'
                                        type="text"
                                        required
                                        value={BannerText}
                                        onChange={(e) => {
                                            setBannerText(e.target.value.substring(0, 30));
                                        }}
                                        placeholder={'You Text Here'} />
                                </div>


                                {/** font size adjusting section */}
                                <div className='relative max-sm:w-full w-[100%] flex flex-col items-center justify-center gap-1'>
                                    <div className='text-[10px] text-white text-center'>adjust font size</div>
                                    <input
                                        className='w-[100%] max-sm:w-[85%] text-slider  px-[20%] max-sm:px-[0%] appearance-none bg-primary  rounded-sm cursor-pointer'
                                        type="range"
                                        id="textSize"
                                        min={6}
                                        max={20}
                                        value={fontSizeState}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setFontSizeState(Number(e.target.value)); handlefontOptimization() }}
                                    />
                                    <div className={'absolute -bottom-0 text-black text-center [text-shadow:none] left-1 max-sm:-left-[5px] text-[10px] ' + duncap.className} >aa</div>
                                    <div className={'absolute -bottom-[6px] text-black text-center [text-shadow:none] right-1 max-sm:-right-[12px] max-sm:-bottom-[3px] text-lg ' + duncap.className} >aa</div>
                                </div>
                            </div>


                            {/**logo addition section*/}
                            <div className='mt-1 flex items-center justify-center gap-2 max-sm:gap-4 max-sm:flex-col w-[100%]'>
                                <div className='w-full max-sm:w-[85%] flex flex-col items-center justify-center gap-1'>
                                    {/** title */}
                                    <div className='text-[10px] text-white text-center'>Include logo</div>

                                    {/** toggle include */}
                                    <div className='flex items-center justify-center gap-1 max-sm:w-full w-full'>
                                        <button className={' w-full p-1 rounded-sm text-black font-bold text-center bg-green-500 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer [text-shadow:none] text-[8px] max-sm:w-[50%] ' + (!IncludeLogo ? ('opacity-100 ') : ('opacity-50'))}
                                            onClick={() => { setIncludeLogo(true) }}>INCLUDE</button>
                                        <button className={' w-full p-1 rounded-sm text-black font-bold text-center bg-primary transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer [text-shadow:none] text-[8px] max-sm:w-[50%] ' + (IncludeLogo ? ('opacity-100 ') : ('opacity-50'))}
                                            onClick={() => { setIncludeLogo(false) }}>DONT INCLUDE</button>
                                    </div>
                                </div>
                            </div>

                            {/** export and save button */}
                            <div onClick={() => { setShouldDim(true); setTimeout(() => { captureAndSaveBanner() }, 10); }}
                                className='max-sm:w-[85%] max-sm:mt-2 sm:my-6  w-[100%] bg-black transition-all duration-300 hover:scale-105 active:scale-95 text-center font-light text-white text-lg rounded-sm p-2'>
                                EXPORT AND SAVE
                            </div>
                        </div>

                    </div>
                </div>
            </div>





            {/** hidden banner  */}
            <div
                style={{ background: topLeftPixelColor, }}
                className='hidden-banner2 hidden relative rounded-xl !w-[1080px] min-w-[1080px] max-w-[1080px] aspect-[9/16] overflow-hidden '>

                {/**banner text */}
                <div style={{ fontSize: `var(--complementary-wallpaper-real-font-size)`, lineHeight: `calc(var(--complementary-wallpaper-real-font-size)*1)` }} className={'text-black z-[2] max-w-[100%] break-words absolute translate-y-[-50%] top-[30%]  left-[50%]  translate-x-[-50%] text-center  font-bold [text-shadow:none] ' + duncap.className}>{BannerText === '' ? ('Your Text Here') : (BannerText)}</div>

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
                    className='aspect-auto absolute bottom-0 right-1 w-full h-auto z-[1] '
                ></Image>

                {/** qr code section */}
                {IncludeLogo && (
                    <Image
                        unoptimized
                        width={50}
                        height={50}
                        alt={NFTimageSrc}
                        src={'/assets/Logo.png'}
                        priority
                        loading='eager'
                        className='z-[3] absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-[25%] h-auto'
                    ></Image>
                )}
            </div>

        </>

    )
}

export default WallpaperGenerator