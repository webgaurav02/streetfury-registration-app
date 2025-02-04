'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import { motion } from 'framer-motion';

//Assets
// import hero_bg from "../../../public/images/hero_bg.png";
import Hero_img from "../../../public/Hero_img.svg";
import Hero_bg from "../../../public/Hero_bg.svg";
import Hero_grain from "../../../public/Hero_grain.svg";
import Logo_wordmark from "../../../public/Logo/Logo_wordmark.svg";


//MUI Icons
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';




const Hero = () => {

    // const containerVariants = {
    //     hidden: { opacity: 0 },
    //     visible: { opacity: 1, transition: { duration: 1.2, staggerChildren: 0.3 } },
    // };

    // const itemVariants = {
    //     hidden: { opacity: 0, y: 20 },
    //     visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeInOut" } },
    // };

    // return (
    //     <motion.div
    //         className="relative w-full h-[80svh]"
    //         variants={containerVariants}
    //         initial="hidden"
    //         animate="visible"
    //     >

    //         {/* Background Image */}
    //         <div className="absolute inset-0">
    //             <Image
    //                 src={hero_bg}
    //                 alt="Streetfury MINUS01"
    //                 width="0"
    //                 height="0"
    //                 sizes='100vw'
    //                 priority
    //                 className='w-full object-cover object-center h-[80svh]'
    //             />
    //             {/* Gradient Overlay */}
    //             <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent"></div>
    //         </div>

    //         {/* Content */}
    //         <div className='relative z-10 h-full flex justify-start items-end md:px-20 px-10 py-20 pr-40'>
    //             <motion.div
    //                 className='flex md:flex-row flex-col justify-between w-full gap-10'
    //                 variants={itemVariants}

    //             >
    //                 <motion.div
    //                     className=" text-white text-left"
    //                     variants={itemVariants}

    //                 >
    //                     <h1 className="text-5xl font-black font-anton">STREETFURY x MINUS01</h1>
    //                     <p className="text-2xl font-anton font-black mt-2 text-primary">Mar 27, 2025</p>
    //                     <p className="text-sm mt-1">North Eastern Hill University, Shillong, Meghalaya</p>
    //                 </motion.div>
    //                 <motion.div variants={itemVariants}>
    //                     <Link href='/register/personal' className='bg-primary text-center hover:bg-white hover:text-black hover:border-2 border-primary hover:scale-[102%] transition-all duration-200 shadow-2xl text-white font-anton font-black h-fit md:px-20 py-4 rounded-md'>
    //                         Register
    //                     </Link>
    //                 </motion.div>
    //             </motion.div>
    //         </div>
    //     </motion.div>
    // )
    return (
        <div className='relative min-h-[100svh] flex flex-col'>

            {/* Logo */}
            <Image
                src={Logo_wordmark}
                alt="Streetfury Hero Section"
                height="0"
                width="0"
                sizes='100svw'
                className='h-[50px] w-auto absolute z-30 left-10 top-10'
                priority
            />

            {/* Background */}
            <Image
                src={Hero_bg}
                alt="Streetfury Hero Section"
                height="0"
                width="0"
                sizes='100svw'
                className='h-[100svh] w-[100svw] object-cover absolute -z-10 left-0 top-0'
                priority
            />

            {/* Grain */}
            <Image
                src={Hero_grain}
                alt="Streetfury Hero Section"
                height="0"
                width="0"
                sizes='100svw'
                className='h-[100svh] w-[100svw] object-cover absolute z-0 left-0 top-0 '
                priority
            />

            {/* Foreground */}
            <Image
                src={Hero_img}
                alt="Streetfury Hero Section"
                height="0"
                width="0"
                sizes='100svw'
                className='h-[70svh] z-10 w-auto object-contain md:px-0 px-10'
                priority
            />

            <div className='absolute z-30 bottom-10 flex flex-col items-center w-screen'>
                <Link href='/register/personal' className='relative bg-[#0000007e] backdrop-blur-md md:w-fit w-[90svw] text-white px-10 py-10 rounded-xl shadow-2xl text-center hover:bg-black transition-all duration-700'>
                    <p className='absolute font-bebasNeue font-normal text-xl top-2 right-3 text-primary'>LEFT</p>
                    <table className='mb-5'>
                        <tbody>
                            <tr>
                                <td className=' font-bebasNeue font-normal text-8xl pt-1 px-5'>01</td>
                                <td className=' font-bebasNeue font-normal text-8xl pt-1 px-5'>27</td>
                                <td className=' font-bebasNeue font-normal text-8xl pt-1 px-5'>12</td>
                            </tr>
                            <tr>
                                <td className='leading-3 font-bebasNeue font-normal text-3xl pb-1 px-5 text-center text-[#c0c0c0]'>Month</td>
                                <td className='leading-3 font-bebasNeue font-normal text-3xl pb-1 px-5 text-center text-[#c0c0c0]'>Days</td>
                                <td className='leading-3 font-bebasNeue font-normal text-3xl pb-1 px-5 text-center text-[#c0c0c0]'>Hours</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='bg-primary px-10 py-2 rounded-full shadow-2xl shadow-black font-bebasNeue font-normal text-3xl'>
                        PARTICIPATE <ArrowForwardIosIcon sx={{marginLeft: "20px"}}/>
                    </div>
                </Link>
            </div>


        </div>
    );
}

export default Hero