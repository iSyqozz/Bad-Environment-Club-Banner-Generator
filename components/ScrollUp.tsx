'use client'
import { useState, useEffect } from "react";


const ScrollUp = () => {

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 30) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className={(isVisible ? 'block ' : 'hidden ') + ` cursor-pointer scale-[1.02] flex justify-center items-center text-center
         rounded-xl w-6 h-6 bg-black bg-opacity-30 border border-primary border-opacity-40 hover:border-primary hover:text-primary
           hover:animate-pulse fixed bottom-6 right-6 z-20 transition-all hover:scale-110
          `}
            onClick={scrollToTop}>
            <div className=" text-[11px]">
                ▲
            </div>
        </div>
    )
}

export default ScrollUp