'use client'


import React from 'react'
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import Image from 'next/image';


//Components
import Navbar from "./Navbar";
import Footer from "./Footer";

//Assets
import Hero_bg from "../../../public/Hero_bg.svg"
import Hero_grain from "../../../public/Hero_grain.svg"



const LayoutComponent = ({ children }) => {

    const pathname = usePathname().split('/')[1];

    return (
        <div>
            <SessionProvider>
                {pathname !== 'auth' && <Navbar />}
                <div className="relative">
                    {/* Background */}
                    <Image
                        src={Hero_bg}
                        alt="Streetfury Hero Section"
                        height="0"
                        width="0"
                        sizes='100svw'
                        className='h-full w-[100svw] object-cover absolute -z-20 left-0 top-0 opacity-40'
                        priority
                    />

                    {/* Grain */}
                    {/* <Image
                        src={Hero_grain}
                        alt="Streetfury Hero Section"
                        height="0"
                        width="0"
                        sizes='100svw'
                        className='h-full w-[100svw] object-cover absolute -z-10 left-0 top-0 '
                        priority
                    /> */}
                    {children}
                </div>
                {pathname !== 'auth' && <Footer />}
            </SessionProvider>
        </div>
    )
}

export default LayoutComponent