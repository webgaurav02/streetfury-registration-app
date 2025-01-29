'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

//SVGs
import loader_1 from "../../../public/Loader SVGs/loader_1.svg"
import loader_2 from "../../../public/Loader SVGs/loader_2.svg"
import loader_3 from "../../../public/Loader SVGs/loader_3.svg"
import loader_4 from "../../../public/Loader SVGs/loader_4.svg"
import loader_5 from "../../../public/Loader SVGs/loader_5.svg"
import loader_6 from "../../../public/Loader SVGs/loader_6.svg"
import loader_7 from "../../../public/Loader SVGs/loader_7.svg"
import loader_8 from "../../../public/Loader SVGs/loader_8.svg"
import loader_9 from "../../../public/Loader SVGs/loader_9.svg"
import loader_10 from "../../../public/Loader SVGs/loader_10.svg"
import loader_11 from "../../../public/Loader SVGs/loader_11.svg"
import loader_12 from "../../../public/Loader SVGs/loader_12.svg"
import loader_13 from "../../../public/Loader SVGs/loader_13.svg"


const svgs = [loader_1, loader_2, loader_3, loader_4, loader_5, loader_6, loader_7, loader_8, loader_9, loader_10, loader_11, loader_12, loader_13]

const Loader = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % svgs.length);
        }, 150);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-screen w-screen bg-black/50 backdrop-blur-sm fixed left-0 top-0 flex justify-center items-center">
            <div className="flex flex-col h-[250px] justify-between">
                <Image
                    src={svgs[currentIndex]}
                    alt="Sport Icon"
                    width={100}
                    height={100}
                    className="text-primary"
                />
                <p className="text-primary">Loading...</p>
            </div>
        </div>
    );
};

export default Loader;
