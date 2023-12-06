'use client'
import { useState, useEffect } from "react"
const Home = () => {

  const [ShouldShoud, setShouldShoud] = useState(false);


  useEffect(()=>{
    const timer = setTimeout(() => {
      setShouldShoud(true);
    }, 200);

    return ()=>{clearTimeout(timer)}
  },[])
  
  
  
  return (
    <>

    
      <div
      style={{
        transform: ShouldShoud?('scale-[0.7]'):('1'),
      }}
      className=" transition-[transform] duration-300 w-[90%] max-w-6xl mx-auto flex items-center justify-start h-[200vh]">

        <div id="tool-picker"></div>
        <div id="banner-generator"></div>
        <div id="wallpaper-generator"></div>
        <div id="BMpost-generator"></div>

      </div>
    </>
  )
}

export default Home