'use client'
import { useState, useEffect } from "react"
import BannerGenerator from "@/components/BannerGenerator";
import WallpaperGenerator from "@/components/WallpaperGenerator";
import ToolPicker from "@/components/ToolPicker";
import BMpostGenerator from "@/components/BMpostGenerator";
import SepBar from "@/components/SepBar";
import Dim from "@/components/Dim";
const Home = () => {

  const [ShouldShoud, setShouldShoud] = useState(false);
  const [shouldDim, setshouldDim] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldShoud(true);
    }, 300);

    return () => { clearTimeout(timer) }
  }, [])

  return (
    <>

      <div
        style={{
          transform: ShouldShoud ? ('Scale(1)') : ('Scale(0.6)'),
        }}
        className="relative  pt-12 duration-500 ease-in-out w-[90%] max-w-6xl mx-auto flex flex-col items-center justify-start gap-10">

        <ToolPicker />
        <SepBar width={40} />
        <BannerGenerator shouldDim={shouldDim} setShouldDim={setshouldDim} />

        <SepBar width={40} />
        <WallpaperGenerator shouldDim={shouldDim} setShouldDim={setshouldDim} />
        <SepBar width={40} />

        <BMpostGenerator shouldDim={shouldDim} setShouldDim={setshouldDim} />
      </div>

      {shouldDim && <Dim></Dim>}
    </>
  )
}

export default Home