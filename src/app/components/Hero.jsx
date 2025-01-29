'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

//Assets
import hero_bg from "../../../public/images/hero_bg.png";

const Hero = () => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1.2, staggerChildren: 0.3 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeInOut" } },
    };

    return (
        <motion.div
            className="relative w-full h-[80svh]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >

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
                <motion.div
                    className='flex md:flex-row flex-col justify-between w-full gap-10'
                    variants={itemVariants}

                >
                    <motion.div
                        className=" text-white text-left"
                        variants={itemVariants}

                    >
                        <h1 className="text-5xl font-black font-anton">STREETFURY x MINUS01</h1>
                        <p className="text-2xl font-anton font-black mt-2 text-primary">Mar 27, 2025</p>
                        <p className="text-sm mt-1">North Eastern Hill University, Shillong, Meghalaya</p>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Link href='/register/personal' className='bg-primary text-center hover:bg-white hover:text-black hover:border-2 border-primary hover:scale-[102%] transition-all duration-200 shadow-2xl text-white font-anton font-black h-fit md:px-20 py-4 rounded-md'>
                            Register
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Hero