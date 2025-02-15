'use client';

// components/Navbar.js
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import { FC } from 'react';

//Assets
import profileimg from "../../../public/profile_white.png";
import PersonIcon from '@mui/icons-material/Person';
import logo_wordmark from "../../../public/Logo/Logo_wordmark.svg";
import img_removebg_black from "../../../public/Logo/img-removebg-black.png";

//Fonts
import { Bree_Serif, Bungee, Racing_Sans_One } from 'next/font/google';
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "./Loading";

const racingSansOne = Racing_Sans_One({ 
    subsets: ['latin'],
    weight: ['400'],
});

const Navbar: FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const pathname = usePathname();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  if(status=='loading'){
    return <Loading />
  }

  if(pathname === '/') return ;

  return (
    <nav className=" w-screen bg-none p-4 ">
      <div className="md:max-w-full max-w-7xl mx-auto flex justify-between items-center">
        <Link href="https://streetjam.minus01.com" className={`text-2xl font-anton`}>
          <div className="flex flex-row gap-2 justify-center items-center">
            <p className="font-thin text-4xl">
              <Image 
                src={img_removebg_black}
                alt="MINUS01 logo"
                height="0"
                width="0"
                sizes="100svw"
                className="h-16 w-auto ml-5"
              />
            </p>
          </div>
        </Link>

        <div className="flex items-center space-x-6">
          {session?.user ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none">
                {/* <Image
                  src={session.user.image || profileimg}
                  width="0"
                  height="0"
                  sizes="100vw"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                /> */}
                <PersonIcon sx={{fontSize: "3rem"}}/>
                {/* <span className="text-white">{session.user.name}</span> */}
              </button>

              {/* Dropdown menu with Framer Motion */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    {...{ className: "absolute right-0 mt-2 w-48 px-4 py-5 space-y-2 bg-white border-[0.1px] text-text shadow-md rounded-lg z-50" }}
                  >
                    <p className="text-xl">Hi! <b>{session.user?.name?.split(' ')[0]}</b></p>
                    <hr className=" h-[0.1px] border-text w-full my-2"/>
                    {/* <Link
                      href="/dashboard"
                      className="block hover:text-white transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link> */}
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        signOut();
                      }}
                      className="block w-full text-left hover:text-primary transition-colors"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={() => {router.push('/auth/signin')}}
              className="text-white font-semibold bg-accent hover:bg-white transition-all hover:scale-105 px-4 py-1 rounded-full"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
