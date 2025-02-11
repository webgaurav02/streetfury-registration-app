'use client';
import { useSession } from 'next-auth/react';
import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

//MUI Icons
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import Loading from '../../components/Loading';
import Link from 'next/link';


//MUI Icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';






const AdditionalDataPage = () => {

  const { data: session, status } = useSession();
  const [dataFetched, setDataFetched] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  const [userData, setUserData] = useState({
    sport: '',
    instagram: '',
    youtube: '',
    pitch: '',
    portfolio: '',
    info: '',
    registered: false
  });

  const [otherSport, setOtherSport] = useState('')

  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);

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
          if(!data.participant.personalDone){
            router.push('/register/personal');
          }
          setUserData(prevState => ({
            ...prevState,
            sport: data.participant?.sport?.trim() || '',
            instagram: data.participant.instagram || '',
            youtube: data.participant.youtube || '',
            pitch: data.participant.pitch || '',
            portfolio: data.participant.portfolio || '',
            info: data.participant.info || '',
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

  const validate = () => {
    const newErrors = {};
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;

    if (!userData.sport) newErrors.sport = 'Select a Sport';
    if (!userData.instagram || !urlRegex.test(userData.instagram)) newErrors.instagram = 'Enter a valid Instagram URL.';
    if (userData.youtube && !urlRegex.test(userData.youtube)) newErrors.youtube = 'Enter a valid YouTube URL.';
    if (!userData.pitch) {
      newErrors.pitch = 'Please write a Short Pitch';
    } else {
      const words = userData.pitch.trim().split(/\s+/).filter(word => word.length > 0);
      if (words.length > 100) {
        newErrors.pitch = 'Pitch must not exceed 100 words';
      }
    }
    if (!userData.portfolio || !urlRegex.test(userData.portfolio)) newErrors.portfolio = 'Enter a valid Google Drive URL.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    try {
      setIsLoading(true);
      const res = await fetch(`/api/participant/save-info/additional/${session.user.email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sport: userData.sport + " " + otherSport,
          instagram: userData.instagram,
          youtube: userData.youtube || '',
          pitch: userData.pitch,
          portfolio: userData.portfolio,
          info: userData.info || '',
        }),
      });

      if (!res.ok) throw new Error('Submission failed');

      setIsLoading(false);

      // alert('Form submitted successfully!');
      router.push("/register/summary");

    } catch (error) {
      setIsLoading(false);
      console.error('Error submitting form:', error);
      alert('Submission failed. Please try again.');
    }
  };




  return (
    <div className='min-h-screen bg-white md:pl-60 md:pr-10 px-10 py-20'>
      {isLoading && <Loading />}
      <h1 className='md:text-5xl text-2xl font-anton uppercase'>Additional Information</h1>
      <div className='py-10 '>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2 mt-10">Sport of Interest <span className='text-red-600'>&#42;</span></label>
            <select
              value={userData.sport}
              onChange={(e) => setUserData({ ...userData, sport: e.target.value })}
              className={`w-full p-2 border border-opacity-70 ${errors.sport ? 'border-red-500' : 'border-gray-300'} rounded focus:border-primary focus:outline-offset-2 focus:outline-primary/25`}
              disabled={userData.registered}
            >
              <option value="">Select</option>
              <option value="BMX">BMX</option>
              <option value="Skateboarding">Skateboarding</option>
              <option value="Parkour">Parkour</option>
              <option value="MTB freestyle">MTB freestyle</option>
              <option value="Other">Others (Specify)</option>
            </select>
            {userData.sport === "Other" && <input
              type="text"
              placeholder='Specify'
              value={otherSport}
              onChange={(e) => setOtherSport(e.target.value)}
              className={`w-full p-2 border-b border-opacity-70 bg-[#f8f8f8] ${errors.otherSport ? 'border-red-500' : 'border-gray-300'} rounded focus:border-primary focus:outline-offset-2 focus:outline-primary/25`}
              disabled={userData.registered}
            />}
            {errors.sport && <p className="text-red-500 text-sm">{errors.sport}</p>}
          </div>
          <div>
            <label className="block text-sm mb-2 mt-10">Instagram <span className='text-red-600'>&#42;</span></label>
            <div className='flex flex-row items-center'>
              <div className=' p-2 border-l border-t border-b border-opacity-70 border-gray-300 rounded-l'><InstagramIcon sx={{ fontSize: "1.2rem" }} /></div>
              <input
                type="text"
                placeholder='eg: https://www.instagram.com/streetfuryofficial/'
                value={userData.instagram}
                onChange={(e) => setUserData({ ...userData, instagram: e.target.value })}
                className={`w-full p-2 placeholder:text-gray-400 border border-opacity-70 ${errors.instagram ? 'border-red-500' : 'border-gray-300'} rounded-r focus:border-primary focus:outline-offset-2 focus:outline-primary/25`}
                disabled={userData.registered}
              />
            </div>
            {errors.instagram && <p className="text-red-500 text-sm">{errors.instagram}</p>}
          </div>
          <div>
            <label className="block text-sm mb-2 mt-10">YouTube </label>
            <div className='flex flex-row items-center'>
              <div className='p-2 border-l border-t border-b border-gray-300 border-opacity-70 rounded-l'><YouTubeIcon sx={{ fontSize: "1.2rem" }} /></div>
              <input
                type="text"
                placeholder='eg: https://www.youtube.com/@minus01'
                value={userData.youtube}
                onChange={(e) => setUserData({ ...userData, youtube: e.target.value })}
                className={`w-full p-2 placeholder:text-gray-400 border border-opacity-70 ${errors.youtube ? 'border-red-500' : 'border-gray-300'} rounded-r focus:border-primary focus:outline-offset-2 focus:outline-primary/25`}
                disabled={userData.registered}
              />
            </div>
          </div>
          <div>
            <label className="block te mb-2 mt-10">Why Should You Be Selected? <span className='text-red-600'>&#42;</span></label>
            <label className="block text-xs font-normal mb-2">Short Pitch - 100 words max</label>
            <textarea
              value={userData.pitch}
              rows={8}
              onChange={(e) => setUserData({ ...userData, pitch: e.target.value })}
              className={`w-full p-2 border border-opacity-70 ${errors.pitch ? 'border-red-500' : 'border-gray-300'} rounded focus:border-primary focus:outline-offset-2 focus:outline-primary/25`}
              disabled={userData.registered}
            />
            {errors.pitch && <p className="text-red-500 text-sm">{errors.pitch}</p>}
          </div>
          <div>
            <label className="block text-sm mb-2 mt-10">Upload Your Portfolio:<span className='text-red-600'>&#42;</span></label>
            <label className="block text-xs font-normal mb-2">Google Drive link to upload videos or images (limit: 100 MB, supported
              formats: MP4, JPG, PNG).</label>
            <div className='flex flex-row items-center'>
              <div className=' p-2 border-l border-t border-b border-gray-300 border-opacity-70 rounded-l'><AddToDriveIcon sx={{ fontSize: "1.2rem" }} /></div>
              <input
                type="text"
                placeholder='eg: https://drive.google.com/drive/'
                value={userData.portfolio}
                onChange={(e) => setUserData({ ...userData, portfolio: e.target.value })}
                className={`w-full p-2 placeholder:text-gray-400 border border-opacity-70 ${errors.portfolio ? 'border-red-500' : 'border-gray-300'} rounded-r focus:border-primary focus:outline-offset-2 focus:outline-primary/25`}
                disabled={userData.registered}
              />
            </div>
              {errors.portfolio && <p className="text-red-500 text-sm">{errors.portfolio}</p>}
          </div>
          <div>
            <label className="block text-sm mb-2 mt-10">How did you hear about us?</label>
            <input
              type="text"
              value={userData.info}
              onChange={(e) => setUserData({ ...userData, info: e.target.value })}
              className={`w-full p-2 border border-opacity-70 ${errors.info ? 'border-red-500' : 'border-gray-300'} rounded focus:border-primary focus:outline-offset-2 focus:outline-primary/25`}
              disabled={userData.registered}
            />
            {errors.info && <p className="text-red-500 text-sm">{errors.info}</p>}
          </div>

          <div className='flex flex-row justify-between text-right pt-20'>
            <Link href="/register/personal"
              className=" px-3 pl-5 border border-opacity-70 text-black text-center py-3 rounded hover:bg-orange-700 hover:text-white"
            >
              <ArrowBackIosIcon />
            </Link>
            <button
              type="submit"
              className="w-40 bg-[#ee5d39] text-white px-10 py-3 rounded hover:bg-orange-700 font-black"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdditionalDataPage