'use client'


import { SessionProvider } from "next-auth/react";

//Components
import Navbar from "./Navbar";
import Footer from "./Footer";



import React from 'react'

const LayoutComponent = ({ children }) => {
    return (
        <div>
            <SessionProvider>
                <Navbar />
                <div className="">{children}</div>
                <Footer />
            </SessionProvider>
        </div>
    )
}

export default LayoutComponent