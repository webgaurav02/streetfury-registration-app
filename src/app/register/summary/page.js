'use client'

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';


//Components
import Loading from '../../components/Loading';

//Assets
import hero_bg from "../../../../public/images/hero_bg.png"

const PersonalDataPage = () => {


  const [isLoading, setIsLoading] = useState(false);

  const { data: session, status } = useSession();
  const [dataFetched, setDataFetched] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    dob: '',
    gender: '',
    city: '',
    state: '',
    sport: '',
    instagram: '',
    pitch: '',
    portfolio: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    // Fetch user-specific data
    const fetchUserData = async () => {

      if (!session?.user?.id || dataFetched) return;

      try {
        setIsLoading(true);
        const res = await fetch(`/api/participant/get-info/${session.user.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (res.ok) {
          const data = await res.json();
          // console.log(data)
          setUserData(prevState => ({
            ...prevState,
            firstname: data.participant.firstname || '',
            lastname: data.participant.lastname || '',
            dob: data.participant.dob || '',
            gender: data.participant.gender || '',
            city: data.participant.city || '',
            state: data.participant.state || '',
            sport: data.participant.sport || '',
            instagram: data.participant.instagram || '',
            pitch: data.participant.pitch || '',
            portfolio: data.participant.portfolio || '',
            email: data.participant.email || '',
            phone: data.participant.phone || '',
          }));
          setIsLoading(false);
          setDataFetched(true);
        } else {
          console.error('Failed to fetch user data');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      }
    };

    fetchUserData();

  }, [session]);


  return (
    <div className='min-h-screen bg-[#f8f8f8] md:px-60 px-10 py-20 '>
      {isLoading && <Loading />}
      <div className='md:max-w-[30vw]'>
        <motion.h1
          className='md:text-4xl text-2xl font-anton font-bold'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Summary
        </motion.h1>
        <div className='bg-white flex flex-row shadow-2xl p-5 rounded-md mt-10 gap-5 items-center '>
          <Image
            src={hero_bg}
            alt="Streetfury Minus01"
            height="0"
            width="0"
            sizes='100svw'
            className='aspect-square h-[150px] w-[150px] object-cover rounded-md shadow-lg'
          />
          <div>
            <h2 className='text-[#737576]'>Event</h2>
            <h1 className='text-2xl font-anton font-black mt-1'>STREETFURY</h1>
            <p className='text-[#737576] text-sm mt-3'>27/03/2025</p>
            <p className='text-[#737576] text-sm mt-3'>🇮🇳 Shillong, Meghalaya, IN</p>
          </div>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  )
}

export default PersonalDataPage