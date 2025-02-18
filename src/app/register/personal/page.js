'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import { motion } from 'framer-motion';


//MUI Icons
import SkateboardingIcon from '@mui/icons-material/Skateboarding';
import PeopleIcon from '@mui/icons-material/People';

const statesAndUTs = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
].sort();



const PersonalDataPage = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // Delay between each child animation
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -20 // Start 20px above final position
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "linear",
        // damping: 50,
        stiffness: 100
      }
    }
  };

  const { data: session, status } = useSession();
  const [dataFetched, setDataFetched] = useState(false);

  const [rsvp, setRsvp] = useState(false);

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
    info: '',
    email: '',
    phone: '',
    registered: false
  });

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
            info: data.participant.info || '',
            email: data.participant.email || '',
            phone: data.participant.phone || '',
            registered: data.participant.registered || false,
          }));
          setIsLoading(false);
          setDataFetched(true);
        } else {
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
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!userData.firstname) newErrors.firstname = 'First Name is required.';
    if (!userData.lastname) newErrors.lastname = 'Last Name is required.';
    if (!userData.dob) newErrors.dob = 'Date of Birth is required.';
    if (!userData.gender) newErrors.gender = 'Gender is required.';
    if (!userData.email) newErrors.email = 'Email Address is required.';
    if (!userData.phone) {
      newErrors.phone = 'Contact Number is required.';
    } else if (!phoneRegex.test(userData.phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!userData.city) newErrors.city = 'City is required.';
    if (!userData.state) newErrors.state = 'State is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    try {

      setIsLoading(true);

      if (!rsvp) {
        const res = await fetch(`/api/participant/save-info/personal/${session.user.email}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstname: userData.firstname,
            lastname: userData.lastname,
            dob: userData.dob,
            gender: userData.gender,
            city: userData.city,
            state: userData.state,
            phone: userData.phone,
          }),
        });

        if (!res.ok) throw new Error('Submission failed');

        setIsLoading(false);

        router.push("/register/additional")
      }
      else {
        const res = await fetch(`/api/rsvp/save-info/${session.user.email}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstname: userData.firstname,
            lastname: userData.lastname,
            dob: userData.dob,
            gender: userData.gender,
            city: userData.city,
            state: userData.state,
            phone: userData.phone,
            info: userData.info,
          }),
        });

        if (!res.ok) throw new Error('Submission failed');

        setIsLoading(false);

        router.push("/register/next-step")
      }


    } catch (error) {
      console.error('Error submitting form:', error);
      setIsLoading(false);
      alert('Submission failed. Please try again.');
    }
  };




  return (
    <div className='min-h-screen bg-white md:pl-60 md:pr-10 px-10 py-20 font-assistant'>
      {isLoading && <Loading />}
      <motion.h1
        className='md:text-5xl text-2xl font-anton uppercase'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Personal Information
      </motion.h1>
      <div className='py-10 '>
        <p className='font-assistant mb-2'>Are you a Participant?</p>
        <div className='w-full flex flex-row gap-5'>
          <button
            disabled={userData.registered}
            onClick={() => setRsvp(false)}
            className={`${rsvp ? "bg-white border border-black w-fit text-black" : "bg-black w-fit text-white"} font-semibold px-5 py-2 ${userData.registered?"cursor-not-allowed":"cursor-pointer"} rounded-md hover:-translate-y-1 transition-all duration-300 hover:shadow-md`}
          >
            <SkateboardingIcon /> PARTICIPANT
          </button>
          <button
            disabled={userData.registered}
            onClick={() => setRsvp(true)}
            className={`${!rsvp ? "bg-white border border-black w-fit text-black" : "bg-black w-fit text-white"} font-semibold px-5 py-2 ${userData.registered?"cursor-not-allowed":"cursor-pointer"} rounded-md hover:-translate-y-1 transition-all duration-300 hover:shadow-md`}
          >
            <PeopleIcon /> RSVP
          </button>
        </div>
        <motion.form onSubmit={handleSubmit} className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <p className='mt-10'>Fields marked with <span className='text-red-600'>&#42;</span> are mandatory</p>
          <motion.div variants={itemVariants}>
            <label className="block text-sm font mb-2 mt-10">First Name <span className='text-red-600'>&#42;</span></label>
            <input
              type="text"
              value={userData.firstname}
              onChange={(e) => setUserData({ ...userData, firstname: e.target.value })}
              className={`w-full p-2 border border-opacity-70 ${errors.firstname ? 'border-red-500' : 'border-gray-300'} bg-white rounded focus:border-primary focus:outline-offset-2 focus:outline-primary/25`}
              disabled={userData.registered}
            />
            {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
          </motion.div>
          <motion.div variants={itemVariants}>
            <label className="block text-sm font mb-2 mt-10">Last Name <span className='text-red-600'>&#42;</span></label>
            <input
              type="text"
              value={userData.lastname}
              onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
              className={`w-full p-2 border border-opacity-70 ${errors.lastname ? 'border-red-500' : 'border-gray-300'} bg-white rounded focus:border-primary focus:outline-offset-2 focus:outline-primary/25`}
              disabled={userData.registered}
            />
            {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
          </motion.div>
          <motion.div variants={itemVariants}>
            <label className="block text-sm font mb-2 mt-10">Date of Birth <span className='text-red-600'>&#42;</span></label>
            <input
              type="date"
              value={userData.dob}
              onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
              className={`w-full p-2 border border-opacity-70 ${errors.dob ? 'border-red-500' : 'border-gray-300'} bg-white rounded focus:border-primary focus:outline-offset-2 focus:outline-primary/25`}
              disabled={userData.registered}
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
          </motion.div>
          <motion.div variants={itemVariants}>
            <label className="block text-sm font mb-2 mt-10">Gender <span className='text-red-600'>&#42;</span></label>
            <select
              value={userData.gender}
              onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
              className={`w-full p-2 border border-opacity-70 ${errors.gender ? 'border-red-500' : 'border-gray-300'} bg-white rounded focus:border-primary focus:outline-offset-2 focus:outline-primary/25`}
              disabled={userData.registered}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </motion.div>
          <motion.div variants={itemVariants}>
            <label className="block text-sm font mb-2 mt-10">Email Address <span className='text-red-600'>&#42;</span></label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              disabled
              className={`w-full p-2 border border-opacity-70 ${errors.email ? 'border-red-500' : 'border-gray-300'} bg-white rounded focus:border-primary focus:outline-offset-2 focus:outline-primary/25`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </motion.div>
          <motion.div variants={itemVariants}>
            <label className="block text-sm font mb-2 mt-10">Contact Number <span className='text-red-600'>&#42;</span></label>
            <div className='flex flex-row items-center'>
              <div className='bg-white p-2 border-l border-t border-b border-gray-300 rounded-l'>+91</div>
              <input
                type="text"
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                className={`w-full p-2 border border-opacity-70 ${errors.phone ? 'border-red-500' : 'border-gray-300'} bg-white rounded-r focus:border-primary focus:outline-offset-2 focus:outline-primary/25`}
                disabled={userData.registered}
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </motion.div>
          <motion.div variants={itemVariants}>
            <label className="block text-sm font mb-2 mt-10">City <span className='text-red-600'>&#42;</span></label>
            <input
              type="text"
              value={userData.city}
              onChange={(e) => setUserData({ ...userData, city: e.target.value })}
              className={`w-full p-2 border border-opacity-70 ${errors.city ? 'border-red-500' : 'border-gray-300'} bg-white rounded focus:border-primary focus:outline-offset-2 focus:outline-primary/25`}
              disabled={userData.registered}
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </motion.div>
          <motion.div variants={itemVariants}>
            <label className="block text-sm font mb-2 mt-10">
              State/UT <span className="text-red-600">&#42;</span>
            </label>
            <select
              value={userData.state}
              onChange={(e) => setUserData({ ...userData, state: e.target.value })}
              className={`w-full p-2 border border-opacity-70 ${errors.state ? 'border-red-500' : 'border-gray-300'} bg-white rounded focus:border-primary focus:outline-offset-2 focus:outline-primary/25`}
              disabled={userData.registered}
            >
              <option value="">Select</option>
              {statesAndUTs.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
          </motion.div>

          {rsvp && <motion.div variants={itemVariants}>
            <label className="block text-sm font mb-2 mt-10">
              How did you hear about us?
            </label>
            <input
              type="text"
              value={userData.info}
              onChange={(e) => setUserData({ ...userData, info: e.target.value })}
              className={`w-full p-2 border border-opacity-70 ${errors.info ? 'border-red-500' : 'border-gray-300'} bg-white rounded focus:border-primary focus:outline-offset-2 focus:outline-primary/25`}
              disabled={userData.registered}
            />
            {errors.info && <p className="text-red-500 text-sm">{errors.info}</p>}
          </motion.div>}

          <motion.div variants={itemVariants} className='text-right pt-20'>
            <button
              type="submit"
              className="w-40 bg-[#ee5d39] text-white px-10 py-3 rounded hover:bg-orange-700"
            >
              {(rsvp)?"Submit":"Next"}
            </button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  )
}

export default PersonalDataPage