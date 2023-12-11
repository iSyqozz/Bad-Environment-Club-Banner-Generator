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
const BannerGenerator = ({ shouldDim, setShouldDim }) => {


    const [ChoosenNFTnumber, setChoosenNFTnumber] = useState('#92');
    const [NFTimageSrc, setNFTimageSrc] = useState('#92');
    const [topLeftPixelColor, setTopLeftPixelColor] = useState('');

    const [BannerText, setBannerText] = useState('You Text Here');
    const [fontSizeState, setFontSizeState] = useState(15); // Set an initial value

    const [AddQRcode, setAddQRcode] = useState(false);
    const [ReferralCode, setReferralCode] = useState('');

    const imgRef = useRef<HTMLImageElement | null>(null);
    const bannerRef = useRef<HTMLDivElement | null>(null);



    //exporting and saving banner
    function captureAndSaveBanner() {
        const hiddenBanner = document.querySelector('.hidden-banner') as HTMLDivElement; // Replace with the actual class or ID of your hidden banner container
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

            const bannerHeight = bannerElement?.clientHeight

            const realbannerHeight = 500

            const fontSize = (bannerHeight! * parseFloat((fontSizeState / 100).toFixed(3)));
            const realfontSize = (realbannerHeight! * parseFloat((fontSizeState / 100).toFixed(3)));
            // Calculate the font size based on the state value and parent width
            //const fontSize =  (fontSizeState / 50) * (banenrHeight ?? 0);
            return [`${fontSize}px`, `${realfontSize}px`];
        };
        // Calculate font size and update styles
        const [fontSize, realFontSize] = calculateFontSize();
        document.documentElement.style.setProperty('--complementary-font-size', fontSize);
        document.documentElement.style.setProperty('--complementary-real-font-size', realFontSize);

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
        }, 600);

        return () => { clearTimeout(timer) }
    }, [])


    return (

        <>
            <div
                id="banner-generator"
                style={{
                    opacity: ShouldShow ? ('1') : ('0'),
                    transform: ShouldShow ? ('translateY(0px)') : ('translateY(50px')
                }}
                className={'max-md:p-1  w-[max(65%,320px)]  aspect-[1.4/1] max-sm:aspect-[1/2] max-[950px]:aspect-[1/1.6] bg-secondary bg-opacity-60 rounded-3xl max-sm:rounded-xl flex flex-col items-center justify-start gap-2 '}>

                {/**title */}
                <div className={'text-xl max-sm:text-sm text-white font-extrabold mt-4 text-center ' + myFont.className}>create your custom twitter <br /> banner</div>

                {/**banner */}
                <div
                    ref={bannerRef}
                    style={{ background: topLeftPixelColor, }}
                    className='max-md:mt-auto  relative rounded-xl w-[85%] aspect-[1500/500] overflow-hidden '>
                    {/**banner text */}
                    <div style={{ fontSize: `var(--complementary-font-size)`, lineHeight: `calc(var(--complementary-font-size)*1)` }} className={'text-black z-[2] max-w-[60%] break-words absolute translate-y-[-50%] top-[50%]  left-[50%] max-sm:left-[45%] translate-x-[-50%] text-center  font-bold [text-shadow:none] ' + duncap.className}>{BannerText === '' ? ('Your Text Here') : (BannerText)}</div>

                    {/**nft image on the banner */}
                    {topLeftPixelColor == 'rgba(255, 229, 46, 1)' && (
                        <Image
                            unoptimized
                            width={400}
                            height={400}
                            alt={ChoosenNFTnumber}
                            src={'/assets/bubble-top-layer.webp'}
                            className='aspect-auto absolute bottom-0 right-1 h-[105%] w-auto z-[2] '
                        />)}
                    <Image
                        onLoad={getColorOfTopLeftPixel}
                        ref={imgRef}
                        unoptimized
                        width={400}
                        height={400}
                        alt={NFTimageSrc}
                        src={'/assets/NFTS/' + (NFTimageSrc ? NFTimageSrc.substring(1, NFTimageSrc.length) : '1') + '.png'}
                        className='aspect-auto absolute bottom-0 right-1 h-[105%] w-auto z-[1] '
                    ></Image>


                    {/** qr code section */}
                    {AddQRcode && (
                        <div className='max-sm:left-[45%] z-[3] absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center justify-end h-full '>
                            <div className='h-[20%] w-auto'>
                                <Image
                                    unoptimized
                                    width={150}
                                    height={150}
                                    alt={NFTimageSrc}
                                    src={'/assets/Qr.png'}
                                    priority
                                    loading='eager'
                                    className='h-[100%] w-auto z-[1]'
                                ></Image>
                            </div>
                            <div className='text-black text-center [text-shadow:none] max-sm:text-[5px] text-[9px] font-bold'>{`Discount Code ${ReferralCode || 'XXXX'}`}</div>
                        </div>
                    )}
                </div>

                {/** add your nft prompt */}
                <div className='text-[10px] text-white text-center'>add your nft</div>
                <input
                    className='text-center bg-primary bg-opacity-60 focus:bg-opacity-100 font-extrabold placeholder:text-black placeholder:text-opacity-70 text-[8px] rounded-sm [text-shadow:none] text-black p-1 w-[20%] max-sm:w-[75%] '
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
                <button className={' p-1 rounded-sm text-black font-bold text-center bg-primary transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer [text-shadow:none] text-[8px] max-sm:w-[75%] '}
                    onClick={() => { setNFTimageSrc(ChoosenNFTnumber) }}>{'APPLY CHANGES'}</button>




                {/** adding banner main text section */}
                <div className='mt-1 flex items-center justify-center gap-2 max-sm:gap-4 max-sm:flex-col w-full'>
                    {/** text input section */}
                    <div className='max-sm:w-full w-1/4 flex flex-col items-center justify-center gap-1'>
                        <div className='text-[10px] text-white text-center'>add your text</div>
                        <input
                            className='bg-opacity-60 focus:bg-opacity-100 max-sm:w-[75%] w-full text-center font-extrabold bg-primary placeholder:text-black placeholder:text-opacity-70 text-[8px] rounded-sm [text-shadow:none] text-black p-1'
                            type="text"
                            required
                            value={BannerText}
                            onChange={(e) => {
                                setBannerText(e.target.value.substring(0, 30));
                            }}
                            placeholder={'You Text Here'} />
                    </div>


                    {/** font size adjusting section */}
                    <div className='relative max-sm:w-full w-1/4 flex flex-col items-center justify-center gap-1'>
                        <div className='text-[10px] text-white text-center'>adjust font size</div>
                        <input
                            className='max-sm:w-[75%] text-slider w-full px-[20%] max-sm:px-[0%] appearance-none bg-primary  rounded-sm cursor-pointer'
                            type="range"
                            id="textSize"
                            min={6}
                            max={25}
                            value={fontSizeState}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setFontSizeState(Number(e.target.value)); handlefontOptimization() }}
                        />
                        <div className={'absolute -bottom-0 text-black text-center [text-shadow:none] left-1 max-sm:left-4 text-[10px] ' + duncap.className} >aa</div>
                        <div className={'absolute -bottom-[6px] text-black text-center [text-shadow:none] right-1 max-sm:right-2 max-sm:-bottom-[3px] text-lg ' + duncap.className} >aa</div>
                    </div>
                </div>


                {/**qr code and referral section */}
                <div className='mt-1 flex items-center justify-center gap-2 max-sm:gap-4 max-sm:flex-col w-full'>
                    <div className='w-full max-sm:w-[75%] flex flex-col items-center justify-center gap-1'>

                        {/** title */}
                        <div className='text-[10px] text-white text-center'>Include qr code & referral</div>

                        {/** toggle include */}
                        <div className='flex items-center justify-center gap-1 max-sm:w-full w-[60%]'>
                            <button className={'p-1 rounded-sm text-black font-bold text-center bg-green-500 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer [text-shadow:none] text-[8px] w-[25%] max-sm:w-[50%] ' + (!AddQRcode ? ('opacity-100 ') : ('opacity-50'))}
                                onClick={() => { setAddQRcode(true) }}>INCLUDE</button>
                            <button className={'p-1 rounded-sm text-black font-bold text-center bg-primary transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer [text-shadow:none] text-[8px] w-[25%] max-sm:w-[50%] ' + (AddQRcode ? ('opacity-100 ') : ('opacity-50'))}
                                onClick={() => { setAddQRcode(false) }}>DONT INCLUDE</button>
                        </div>

                    </div>
                </div>

                {/**qr code and referral input */}
                <input
                    className='bg-opacity-60 focus:bg-opacity-100 max-sm:w-[calc(75%)] w-[calc(30%+4px)]  text-center font-extrabold bg-primary placeholder:text-black placeholder:text-opacity-70 text-[8px] rounded-sm [text-shadow:none] text-black p-1  '
                    type="text"
                    required
                    value={ReferralCode}
                    onChange={(e) => {
                        setReferralCode(e.target.value.substring(0, 20));
                    }}
                    placeholder={'TYPE REFERRAL CODE'}
                />


                {/** export and save button */}
                <div

                    onClick={() => {
                        setShouldDim(true); setTimeout(() => { captureAndSaveBanner() }, 10);
                    }}
                    className={'max-md:my-auto max-sm:w-[calc(75%)] md:my-6  w-[calc(50%+8px)] bg-black transition-all duration-300 scale-105 text-center max-sm:text-sm font-light text-white text-lg rounded-sm p-2 ' + myFont.className}>
                    EXPORT AND SAVE
                </div>
            </div>









            {/**hidden banner for html2canvas */}
            <div
                style={{ background: topLeftPixelColor, }}
                className='hidden-banner hidden relative rounded-xl !w-[1500px] min-w-[1500px] max-w-[1500px] !h-[500px] min-h-[500px] max-h-[500px] overflow-hidden '>
                {/**banner text */}
                <div style={{ fontSize: `var(--complementary-real-font-size)`, lineHeight: `calc(var(--complementary-real-font-size)*1)` }} className={'text-black z-[2] max-w-[60%] break-words absolute translate-y-[-50%] top-[50%]  left-[50%] translate-x-[-50%] text-center  font-bold [text-shadow:none] ' + duncap.className}>{BannerText === '' ? ('Your Text Here') : (BannerText)}</div>

                {/**nft image on the banner */}
                {topLeftPixelColor == 'rgba(255, 229, 46, 1)' && (
                    <Image
                        unoptimized
                        width={400}
                        height={400}
                        alt={ChoosenNFTnumber}
                        src={'/assets/bubble-top-layer.webp'}
                        className='aspect-auto absolute bottom-0 right-1 h-[105%] w-auto z-[2] '
                    ></Image>)}
                <Image
                    onLoad={getColorOfTopLeftPixel}
                    ref={imgRef}
                    unoptimized
                    width={400}
                    height={400}
                    alt={NFTimageSrc}
                    src={'/assets/NFTS/' + (NFTimageSrc ? NFTimageSrc.substring(1, NFTimageSrc.length) : '1') + '.png'}
                    className='aspect-auto absolute bottom-0 right-1 h-[105%] w-auto z-[1] '
                ></Image>


                {/** qr code section */}
                {AddQRcode && (
                    <div className='z-[3] absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center justify-end h-full '>
                        <div className='h-[20%] w-auto bg-black' style={{ background: topLeftPixelColor }}>
                            <Image
                                unoptimized
                                width={150}
                                height={150}
                                alt={NFTimageSrc}
                                src={'/assets/Qr.png'}
                                priority
                                loading='eager'
                                className='h-[100%] w-auto z-[1] !mix-blend-multiply'
                            ></Image>
                        </div>
                        <div className='mb-2 text-black text-center [text-shadow:none] font-bold text-[16px]'>{`Discount Code ${ReferralCode || 'XXXX'}`}</div>
                    </div>
                )}
            </div>



        </>
    )
}

export default BannerGenerator

