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
  const [termsAccepted3, setTermsAccepted3] = useState(false);
  const [termsAccepted4, setTermsAccepted4] = useState(false);
  const [termsAccepted5, setTermsAccepted5] = useState(false);
  const [termsAccepted6, setTermsAccepted6] = useState(false);
  const [termsAccepted7, setTermsAccepted7] = useState(false);
  const [termsAccepted8, setTermsAccepted8] = useState(false);
  const [termsAccepted9, setTermsAccepted9] = useState(false);
  const [termsAccepted10, setTermsAccepted10] = useState(false);

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
          className='md:text-5xl text-2xl font-anton'
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

            <div className='flex flex-row items-start space-x-4 justify-start'>
              <input type='checkbox' className=' mt-1 accent-black' checked={termsAccepted1} onChange={() => setTermsAccepted1(!termsAccepted1)} />
              <label className='text-sm text-black'>I agree that I am 16 years of age or older in compliance with the age restriction terms of this event.</label>
            </div>

            <div className='flex items-start space-x-2'>
              <input type='checkbox' className=' mt-1 accent-black' checked={termsAccepted2} onChange={() => setTermsAccepted2(!termsAccepted2)} />
              <label className='text-sm text-black'>I confirm that I am in the appropriate physical and mental condition and possess the required skills to participate in the event. I understand that participation involves a degree of risk. I agree that neither the organiser (Minus01) nor any companies involved will be held responsible for any injury I may sustain. If I cause damage to others or their property, I will accept responsibility and ensure Minus01 or other companies involved do not incur any loss in this regard.</label>
            </div>
            <div className='flex items-start space-x-2'>
              <input type='checkbox' className=' mt-1 accent-black' checked={termsAccepted3} onChange={() => setTermsAccepted3(!termsAccepted3)} />
              <label className='text-sm text-black'>I agree to adhere to the organiser&apos;s terms and conditions for the event and follow all safety protocols and instructions after completing registration and being selected for participation.</label>
            </div>
            <div className='flex items-start space-x-2'>
              <input type='checkbox' className=' mt-1 accent-black' checked={termsAccepted4} onChange={() => setTermsAccepted4(!termsAccepted4)} />
              <label className='text-sm text-black'>I confirm that my equipment (including sports gear, safety equipment, and any devices) is in proper working order, well-maintained, and suitable for the event. I am aware that I will only be allowed to participate after undergoing a full inspection of the site, track, equipment, and safety measures.</label>
            </div>
            <div className='flex items-start space-x-2'>
              <input type='checkbox' className=' mt-1 accent-black' checked={termsAccepted5} onChange={() => setTermsAccepted5(!termsAccepted5)} />
              <label className='text-sm text-black'>I understand that the organiser reserves the right to refuse my participation at any time if necessary.</label>
            </div>
            <div className='flex items-start space-x-2'>
              <input type='checkbox' className=' mt-1 accent-black' checked={termsAccepted6} onChange={() => setTermsAccepted6(!termsAccepted6)} />
              <label className='text-sm text-black'>I grant Minus01, or authorised third parties, the right to capture and use audio, video recordings, and photographs (“Material”) from the event. Minus01 may use my name, image, voice, appearance, and performance for any purpose, in all media, indefinitely.</label>
            </div>
            <div className='flex items-start space-x-2'>
              <input type='checkbox' className=' mt-1 accent-black' checked={termsAccepted7} onChange={() => setTermsAccepted7(!termsAccepted7)} />
              <label className='text-sm text-black'>I acknowledge that Minus01 may use, broadcast, display, or reproduce the Material in any media, and may alter or modify it as needed. I accept that Minus01 may transfer these rights to third parties without the need for my approval. I will not be compensated or financially rewarded for my appearance in the Material.</label>
            </div>
            <div className='flex items-start space-x-2'>
              <input type='checkbox' className=' mt-1 accent-black' checked={termsAccepted8} onChange={() => setTermsAccepted8(!termsAccepted8)} />
              <label className='text-sm text-black'>I am permitted to record Participant Content (photos, videos) for personal use, such as sharing on my website or social media. I acknowledge that Minus01 holds the intellectual property and media rights to the event and will provide Minus01 access to the Participant Content upon request. Commercial use of the Participant Content is subject to prior consent from Minus01.</label>
            </div>
            <div className='flex items-start space-x-2'>
              <input type='checkbox' className=' mt-1 accent-black' checked={termsAccepted9} onChange={() => setTermsAccepted9(!termsAccepted9)} />
              <label className='text-sm text-black'>I acknowledge that my participation in this event is voluntary and agree not to demand any rewards, compensation, or benefits by forceful or unfair means.</label>
            </div>
            <div className='flex items-start space-x-2'>
              <input type='checkbox' className=' mt-1 accent-black' checked={termsAccepted10} onChange={() => setTermsAccepted10(!termsAccepted10)} />
              <label className='text-sm text-black'>By registering for this event, I agree to receive promotional emails from Minus01 regarding future events, offers, product launches, etc.</label>
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
                className={`min-w-40 text-white px-10 py-3 rounded hover:bg-orange-700 font-black text-nowrap ${termsAccepted1 && termsAccepted2 && termsAccepted3 && termsAccepted4 && termsAccepted5 && termsAccepted6 && termsAccepted7 && termsAccepted8 && termsAccepted9 && termsAccepted10 &&  !userData.registered  ? 'bg-primary' : 'bg-gray-400 cursor-not-allowed'}`} disabled={(!termsAccepted1 || !termsAccepted2 || !termsAccepted3 || !termsAccepted4 || !termsAccepted5 || !termsAccepted6 || !termsAccepted7 || !termsAccepted8 || !termsAccepted9 || !termsAccepted10) || userData.registered}
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