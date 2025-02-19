"use client";

import Link from "next/link";

//Icons
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import Image from "next/image";

//Assets
import img from "../../../public/Logo/img-removebg-white.png"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className=" mx-auto px-10 ">
        <div className="flex flex-wrap justify-between items-start space-y-10">
          {/* Logo and Description */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <Image 
              src={img}
              alt="MINUS01"
              height="0"
              width="0"
              sizes="100svw"
              className="h-20 w-auto"
            />
            {/* <h2 className="text-4xl font-anton font-thin">MINUS01</h2> */}
            <p className="mt-2 text-gray-400 pr-10">
            MINUS01 is where culture, creativity, and performance unite for those who dare
            to move differently
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0 md:px-10">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://streetjam.minus01.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="https://streetjam.minus01.com/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="https://streetjam.minus01.com/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-of-use"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/minus0one?igsh=d2x1cWczcGR4Yzln&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </Link>
              <Link
                href="https://youtube.com/@minus0one?feature=shared"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Youtube"
              >
                <YouTubeIcon />
              </Link>
              <Link
                href="https://www.facebook.com/share/1ACuaiJkE5/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </Link>
              <Link
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="X"
              >
                <XIcon />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} MINUS01. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
