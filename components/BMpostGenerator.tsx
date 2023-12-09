'use client'
import { useState, useEffect } from 'react'
import React from 'react'


const BMpostGenerator = () => {

    const [ShouldShoud, setShouldShoud] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShouldShoud(true);
        }, 300);

        return () => { clearTimeout(timer) }
    }, [])


    return (
        <div
            id="BMpost-generator"
            style={{
                opacity: ShouldShoud ? ('1') : ('0'),
                transform: ShouldShoud ? ('translateY(0px)') : ('translateY(50px')
            }}>
        </div>
    )
}

export default BMpostGenerator