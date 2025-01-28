'use client'


import { SessionProvider } from "next-auth/react";
//Components
import Navbar from "./Navbar";
import Footer from "./Footer";



import React from 'react'

import { usePathname } from "next/navigation";

const LayoutComponent = ({ children }) => {

    const pathname = usePathname().split('/')[1];

    return (
        <div>
            <SessionProvider>
                {pathname!=='auth' && <Navbar />}
                <div className="">{children}</div>
                {pathname!=='auth' && <Footer />}
            </SessionProvider>
        </div>
    )
}

export default LayoutComponent