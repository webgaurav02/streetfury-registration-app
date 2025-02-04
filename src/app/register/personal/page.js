'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import { motion } from 'framer-motion';

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


    } catch (error) {
      console.error('Error submitting form:', error);
      setIsLoading(false);
      alert('Submission failed. Please try again.');
    }
  };




  return (
    <div className='min-h-screen bg-none md:px-60 px-10 py-20'>
      {isLoading && <Loading />}
      <motion.h1
        className='md:text-4xl text-2xl font-anton font-bold'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Personal Information
      </motion.h1>
      <div className='py-10 md:max-w-[30vw]'>
        <motion.form onSubmit={handleSubmit} className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-bold mb-2">First Name <span className='text-red-600'>&#42;</span></label>
            <input
              type="text"
              value={userData.firstname}
              onChange={(e) => setUserData({ ...userData, firstname: e.target.value })}
              className={`w-full p-2 border-2 ${errors.firstname ? 'border-red-500' : 'border-gray-300'} rounded focus:border-primary focus:outline-offset-2 focus:outline-primary/25`}
              disabled={userData.registered}
            />
            {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
          </motion.div>
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-bold mb-2">Last Name <span className='text-red-600'>&#42;</span></label>
            <input
              type="text"
              value={userData.lastname}
              onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
              className={`w-full p-2 border-2 ${errors.lastname ? 'border-red-500' : 'border-gray-300'} rounded focus:border-primary focus:outline-offset-2 focus:outline-primary/25`}
              disabled={userData.registered}
            />
            {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
          </motion.div>
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-bold mb-2">Date of Birth <span className='text-red-600'>&#42;</span></label>
            <input
              type="date"
              value={userData.dob}
              onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
              className={`w-full p-2 border-2 ${errors.dob ? 'border-red-500' : 'border-gray-300'} rounded focus:border-primary focus:outline-offset-2 focus:outline-primary/25`}
              disabled={userData.registered}
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
          </motion.div>
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-bold mb-2">Gender <span className='text-red-600'>&#42;</span></label>
            <select
              value={userData.gender}
              onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
              className={`w-full p-2 border-2 ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded focus:border-primary focus:outline-offset-2 focus:outline-primary/25`}
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
            <label className="block text-sm font-bold mb-2">Email Address <span className='text-red-600'>&#42;</span></label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              disabled
              className={`w-full p-2 border-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded focus:border-primary focus:outline-offset-2 focus:outline-primary/25`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </motion.div>
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-bold mb-2">Contact Number <span className='text-red-600'>&#42;</span></label>
            <div className='flex flex-row items-center'>
              <div className='bg-gray-300 p-2 border-l-2 border-t-2 border-b-2 border-gray-300 rounded-l'>+91</div>
              <input
                type="text"
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                className={`w-full p-2 border-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-r focus:border-primary focus:outline-offset-2 focus:outline-primary/25`}
                disabled={userData.registered}
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </motion.div>
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-bold mb-2">City <span className='text-red-600'>&#42;</span></label>
            <input
              type="text"
              value={userData.city}
              onChange={(e) => setUserData({ ...userData, city: e.target.value })}
              className={`w-full p-2 border-2 ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded focus:border-primary focus:outline-offset-2 focus:outline-primary/25`}
              disabled={userData.registered}
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </motion.div>
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-bold mb-2">
              State/UT <span className="text-red-600">&#42;</span>
            </label>
            <select
              value={userData.state}
              onChange={(e) => setUserData({ ...userData, state: e.target.value })}
              className={`w-full p-2 border-2 ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded focus:border-primary focus:outline-offset-2 focus:outline-primary/25`}
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
          <motion.div variants={itemVariants} className='text-right pt-20'>
            <button
              type="submit"
              className="w-40 bg-primary text-white px-10 py-3 rounded hover:bg-orange-700 font-black"
            >
              Next
            </button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  )
}

export default PersonalDataPage