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

  const [termsAccepted1, setTermsAccepted1] = useState(false);
  const [termsAccepted2, setTermsAccepted2] = useState(false);
  // const [termsAccepted3, setTermsAccepted3] = useState(false);
  // const [termsAccepted4, setTermsAccepted4] = useState(false);
  // const [termsAccepted5, setTermsAccepted5] = useState(false);
  // const [termsAccepted6, setTermsAccepted6] = useState(false);
  // const [termsAccepted7, setTermsAccepted7] = useState(false);
  // const [termsAccepted8, setTermsAccepted8] = useState(false);
  // const [termsAccepted9, setTermsAccepted9] = useState(false);
  // const [termsAccepted10, setTermsAccepted10] = useState(false);

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
    <div className='min-h-screen bg-none md:pl-60 px-10 py-20 '>
      {isLoading && <Loading />}
      <div className=''>
        <motion.h1
          className='md:text-5xl text-2xl font-anton uppercase'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Summary
        </motion.h1>
        {/* <div className='bg-white flex flex-row shadow-2xl p-5 rounded-md mt-10 gap-5 items-center '>
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
            <h1 className='text-2xl font-anton mt-1'>STREETFURY</h1>
            <p className='text-[#737576] text-sm mt-3'>27/03/2025</p>
            <p className='text-[#737576] text-sm mt-3'>🇮🇳 Shillong, Meghalaya, IN</p>
          </div>
        </div> */}
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

            <div className='flex flex-row items-start justify-start'>
              <input type='checkbox' className='mr-2 mt-1 accent-black' checked={termsAccepted1} onChange={() => setTermsAccepted1(!termsAccepted1)} />
              <label className='text-sm text-black'>I agree that I am 16 years of age or older in compliance with the age restriction terms of this event.</label>
            </div>

            <div className='flex items-start'>
              <input type='checkbox' className='mr-2 mt-1 accent-black' checked={termsAccepted2} onChange={() => setTermsAccepted2(!termsAccepted2)} />
              <label className='text-sm text-black'>By registering, I confirm that I acknowledge receiving an account and automatically agree to the General <Link href='/terms-of-use' target='_blank' rel='noreferrer noopener' className='font-bold underline'>Terms of Use</Link>, <Link href='/privacy-policy' target='_blank' rel='noreferrer noopener' className='font-bold underline'>Privacy Policy</Link>, <Link href='/terms-of-participation' target='_blank' rel='noreferrer noopener' className='font-bold underline'>Participation Terms</Link>, and <Link href='/registration-terms' target='_blank' rel='noreferrer noopener' className='font-bold underline'>Registration Terms</Link>. I understand that my personal data will be processed in accordance with the platform's <Link href='/privacy-policy' target='_blank' rel='noreferrer noopener' className='font-bold underline'>Privacy Policy</Link>.</label>
            </div>



            <div className='flex md:flex-row flex-col-reverse gap-5 justify-between text-right pt-20'>
              <Link href="/register/additional"
                className=" bg-gray-300 px-3 pl-5 text-white text-center py-3 rounded hover:bg-orange-700 font-black"
              >
                <ArrowBackIosIcon />
              </Link>
              <button
                type="submit"
                className={`min-w-40 text-white px-10 py-3 rounded hover:bg-orange-700 font-black text-nowrap ${termsAccepted1 && termsAccepted2 &&  !userData.registered  ? 'bg-primary' : 'bg-gray-400 cursor-not-allowed'}`} disabled={(!termsAccepted1 || !termsAccepted2) || userData.registered}
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