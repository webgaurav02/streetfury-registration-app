'use client'

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';


//Components
import Loading from '../../components/Loading';

//Assets
import hero_bg from "../../../../public/images/hero_bg.png"

//MUI Icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';





const SummaryPage = () => {


  const [isLoading, setIsLoading] = useState(false);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [participantAccepted, setParticipantAccepted] = useState(false);

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
    registered: false,
  });

  useEffect(() => {
    // Fetch user-specific data
    const fetchUserData = async () => {

      if (!session?.user?.email || dataFetched) return;

      try {
        setIsLoading(true);
        const res = await fetch(`/api/participant/get-info/${session.user.email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (res.ok) {
          const data = await res.json();
          if(!data.participant.additionalDone){
            router.push('/register/additional');
          }
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
            registered: data.participant.registered || false,
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



  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await fetch(`/api/participant/save-info/complete-registration/${session.user.email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) throw new Error('Submission failed');

      setIsLoading(false);

      router.push("/register/next-steps");
      // alert("Registration complete")

    } catch (error) {
      setIsLoading(false);
      console.error('Error submitting form:', error);
      alert('Submission failed. Please try again.');
    }
  };


  return (
    <div className='min-h-screen bg-none md:px-60 px-10 py-20 '>
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
            className='md:block hidden aspect-square h-[150px] w-[150px] object-cover rounded-md shadow-lg'
          />
          <div>
            <h2 className='text-[#737576]'>Event</h2>
            <h1 className='text-2xl font-anton font-black mt-1'>STREETFURY</h1>
            <p className='text-[#737576] text-sm mt-3'>27/03/2025</p>
            <p className='text-[#737576] text-sm mt-3'>🇮🇳 Shillong, Meghalaya, IN</p>
          </div>
        </div>
        <div className='mt-10'>
          <h2 className='text-[#737576] font-bold mb-5'>Participant details</h2>
          <table className='w-full text-sm'>
            <tbody>
              <tr>
                <td className='text-[#737576] py-1'>Full Name</td>
                <td className=' py-1'>{userData.firstname} {userData.lastname}</td>
              </tr>
              <tr>
                <td className='text-[#737576] py-1'>Date of Birth</td>
                <td className=' py-1'>{userData.dob ? new Date(userData.dob).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}</td>
              </tr>
              <tr>
                <td className='text-[#737576] py-1'>Gender</td>
                <td className=' py-1'>{userData.gender}</td>
              </tr>
              <tr>
                <td className='text-[#737576] py-1'>Email</td>
                <td className=' py-1'>{userData.email}</td>
              </tr>
              <tr>
                <td className='text-[#737576] py-1'>Contact Number</td>
                <td className=' py-1'>+91 {userData.phone}</td>
              </tr>
              <tr>
                <td className='text-[#737576] py-1'>Email</td>
                <td className=' py-1'>{userData.email}</td>
              </tr>
              <tr>
                <td className='text-[#737576] py-1'>Location</td>
                <td className=' py-1'>{userData.city}, {userData.state}</td>
              </tr>
            </tbody>
          </table>
          <hr className='my-10' />
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className='flex flex-row items-start space-x-4 justify-start'>
              <input type='checkbox' className='w-40 h-4 mt-1 accent-orange-500' checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} />
              <label className='text-sm text-[#737576]'>I acknowledge that I am 16 years of age or older at the time of entry and I have read and agree to the Event Participation Terms and the Registration and Ticketing Terms & Conditions, and acknowledge that I am either above the age of majority in my country of residence at the time of entry or have otherwise obtained the consent of my parent and/or legal guardian to all applicable terms and conditions and to my participation.</label>
            </div>

            <div className='flex items-start space-x-2'>
              <input type='checkbox' className='w-9 h-4 mt-1 accent-orange-500' checked={participantAccepted} onChange={() => setParticipantAccepted(!participantAccepted)} />
              <label className='text-sm text-[#737576]'>I have read and accept the Participant Disclaimer.</label>
            </div>

            {/* <span className='text-sm text-[#737576]'></span>
          <label className='flex items-start space-x-2'>
            <input type='checkbox' className='form-checkbox w-[50px] h-[50px]' checked={participantAccepted} onChange={() => setParticipantAccepted(!participantAccepted)} />
            <span className='text-sm text-[#737576]'>I have read and accept the Participant Disclaimer.</span>
          </label> */}
            <div className='flex md:flex-row flex-col-reverse gap-5 justify-between text-right pt-20'>
              <Link href="/register/additional"
                className=" bg-gray-300 px-3 pl-5 text-white text-center py-3 rounded hover:bg-orange-700 font-black"
              >
                <ArrowBackIosIcon />
              </Link>
              <button
                type="submit"
                className={`min-w-40 text-white px-10 py-3 rounded hover:bg-orange-700 font-black text-nowrap ${termsAccepted && participantAccepted &&  !userData.registered  ? 'bg-primary' : 'bg-gray-400 cursor-not-allowed'}`} disabled={(!termsAccepted && !participantAccepted) || userData.registered}
              >
                {(userData.registered) ? "Already Registered" : "Complete Registration"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}

export default SummaryPage