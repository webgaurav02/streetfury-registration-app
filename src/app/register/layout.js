'use client'

import { usePathname } from 'next/navigation';
import Image from 'next/image';


import SidebarRegister from "../components/SidebarRegister"
import { Diversity1 } from '@mui/icons-material';
import square from '../../../public/Logo/STREETJAM.png'
import Link from 'next/link';

export default function RegistrationRootLayout({ children }) {

    const pathname = usePathname();

    let progressWidth = 'w-0'; // Default width

    if (pathname === '/register/personal') {
        progressWidth = 'w-1/4';
    } else if (pathname === '/register/additional') {
        progressWidth = 'w-2/4';
    } else if (pathname === '/register/summary') {
        progressWidth = 'w-3/4';
    } else if (pathname === '/register/next-steps') {
        progressWidth = 'w-full';
    }

    return (
        <div className='md:py-0 py-10'>
            {/* <div className={`h-[5px] bg-primary ${progressWidth} transition-width duration-1000 ease-in-out`}></div> */}
            <div className='flex md:flex-row flex-col md:pr-80'>
                <div className='w-full'>
                    {children}
                </div>
                <div className='md:max-w-[30vw] md:pt-40 pt-10 bg-white px-10'>
                    {/* <h2 className='text-3xl font-semibold'>Event</h2> */}
                    <div className='my-5 flex flex-row items-center'>
                        <Image 
                            src={square}
                            alt="Streetfury 2025 Registrations"
                            height="0"
                            width="0"
                            sizes='100svw'
                            className='h-40 object-cover w-auto'
                        />
                        <div className='space-y-3 font-medium'>
                            <p className='text-xl font-anton font-thin'>MINUS01 STREETJAM</p>
                            <p className='text-nowrap'><b>Venue</b> : NEHU, Shillong, IN</p>
                            <p><b>Date</b> : 05 April, 2025</p>
                        </div>
                    </div>
                    <hr className='md:w-[20svw] my-5'/>
                    <div className='flex flex-col space-y-2'>
                        <Link className='hover:font-bold' target='_blank' rel='noreferrer noopener' href='/terms-of-participation'>Terms of Participation</Link>
                        <Link className='hover:font-bold' target='_blank' rel='noreferrer noopener' href='/cancellations-and-refund'>Cancellations &amp; Refund</Link>
                        <Link className='hover:font-bold' target='_blank' rel='noreferrer noopener' href='/terms-of-use'>Terms of Use</Link>
                        <Link className='hover:font-bold' target='_blank' rel='noreferrer noopener' href='/privacy-policy'>Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
