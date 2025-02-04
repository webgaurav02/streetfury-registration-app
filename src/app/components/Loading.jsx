import React from 'react'

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 bg-background w-screen h-screen z-50 flex items-center justify-center">
        <span className="loader"></span>
    </div>
  )
}

export default Loading

// 'use client'

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// //SVGs
// import loader_1 from "../../../public/Loader SVGs/loader_1.svg"
// import loader_2 from "../../../public/Loader SVGs/loader_2.svg"
// // import loader_3 from "../../../public/Loader SVGs/loader_3.svg"
// // import loader_4 from "../../../public/Loader SVGs/loader_4.svg"
// import loader_5 from "../../../public/Loader SVGs/loader_5.svg"
// import loader_6 from "../../../public/Loader SVGs/loader_6.svg"
// import loader_7 from "../../../public/Loader SVGs/loader_7.svg"
// import loader_8 from "../../../public/Loader SVGs/loader_8.svg"
// import loader_9 from "../../../public/Loader SVGs/loader_9.svg"
// import loader_10 from "../../../public/Loader SVGs/loader_10.svg"
// import loader_11 from "../../../public/Loader SVGs/loader_11.svg"
// import loader_12 from "../../../public/Loader SVGs/loader_12.svg"
// import loader_13 from "../../../public/Loader SVGs/loader_13.svg"


// const svgs = [loader_6, loader_11, loader_7, loader_12, loader_8, loader_9, loader_10, loader_13, loader_2, loader_1, loader_5]

// const Loader = () => {
//     const [currentIndex, setCurrentIndex] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentIndex((prevIndex) => (prevIndex + 1) % svgs.length);
//         }, 150);

//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <div className="h-screen w-screen bg-black backdrop-blur-md fixed left-0 top-0 flex justify-center items-center z-50">
//             <div className="flex flex-col h-[250px] justify-between">
//                 <Image
//                     src={svgs[currentIndex]}
//                     alt="Sport Icon"
//                     width={100}
//                     height={100}
//                     className="text-primary"
//                 />
//                 <p className="text-primary">Loading...</p>
//             </div>
//         </div>
//     );
// };

// export default Loader;
