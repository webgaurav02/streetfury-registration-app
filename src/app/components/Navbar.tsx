// components/Navbar.js
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import { FC } from 'react';


//Assets
import profileimg from "../../../public/profile_white.png";
import logo_white from "../../../public/Logo/logo_white.png";

//Fonts
import { Bree_Serif, Bungee, Racing_Sans_One } from 'next/font/google';
import { useRouter } from "next/navigation";
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

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  if(status=='loading'){
    return <Loading />
  }

  return (
    <nav className=" w-screen bg-black p-4 ">
      <div className="md:max-w-full max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className={`text-2xl font-black font-anton`}>
          <div className="flex flex-row gap-2 justify-center items-center">
            <Image 
              src={logo_white}
              alt="MINUS01 Logo"
              width="0"
              height="0"
              sizes="100vw"
              className="w-[50px] h-fit"

            />
            <p className="md:block hidden text-white">minus<span className="text-primary">01</span></p>
          </div>
        </Link>

        <div className="flex items-center space-x-6">
          {session?.user ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none">
                <Image
                  src={session.user.image || profileimg}
                  width="0"
                  height="0"
                  sizes="100vw"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
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
                    {...{ className: "absolute right-0 mt-2 w-48 px-4 py-5 space-y-2 bg-secondary text-text shadow-md rounded-lg z-10" }}
                  >
                    <p>Hi! <b>{session.user.name?.split(' ')[0]}</b></p>
                    <hr className=" h-[0.1px] border-text w-full my-2"/>
                    <Link
                      href="/dashboard"
                      className="block hover:text-accent transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/account"
                      className="block hover:text-accent transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Account
                    </Link>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        signOut();
                      }}
                      className="block w-full text-left hover:text-accent transition-colors"
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
              className="text-white font-semibold bg-accent hover:bg-accent transition-all hover:scale-105 px-4 py-1 rounded-full"
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
