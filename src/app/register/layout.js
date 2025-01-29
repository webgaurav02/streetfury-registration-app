'use client'

import { usePathname } from 'next/navigation';

import SidebarRegister from "../components/SidebarRegister"

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
        <div>
            <div className={`h-[5px] bg-primary ${progressWidth} transition-width duration-1000 ease-in-out`}></div>
            <div className='flex md:flex-row flex-col'>
                <div className='w-full'>
                    {children}
                </div>
                <div className='md:w-1/3'>
                    <SidebarRegister />
                </div>
            </div>
        </div>
    );
}
