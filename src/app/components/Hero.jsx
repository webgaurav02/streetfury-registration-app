import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

//Assets
import hero_bg from "../../../public/images/hero_bg.png"


const Hero = () => {
    return (
        <div className="relative w-full h-[80svh]">

            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={hero_bg}
                    alt="Streetfury MINUS01"
                    width="0"
                    height="0"
                    sizes='100vw'
                    priority
                    className='w-full object-cover object-center h-[80svh]'
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div className='relative z-10 h-full flex justify-start items-end md:px-20 px-10 py-20 pr-40'>
                <div className='flex md:flex-row flex-col justify-between w-full gap-10'>
                    <div className=" text-white text-left ">
                        <h1 className="text-5xl font-black font-anton">STREETFURY x MINUS01</h1>
                        <p className="text-2xl font-anton font-black mt-2 text-primary">Mar 27, 2025</p>
                        <p className="text-sm mt-1">North Eastern Hill University, Shillong, Meghalaya</p>
                    </div>
                    <Link href='/register' className='bg-primary hover:bg-white hover:text-black hover:scale-[102%] transition-all duration-200 shadow-2xl text-white font-anton font-black h-fit px-20 py-4 rounded-md'>
                        Register
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Hero