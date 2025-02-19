'use client'

import React, { useEffect, useState, useMemo } from 'react'
import Link from 'next/link';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

// Components
import Loading from '../components/Loading';

// MUI Icons
import SearchIcon from '@mui/icons-material/Search';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// Context
import { useOrganizer } from '../context/OrganizerContext';

const Organizer = () => {
    const [loading, setLoading] = useState(false);
    const [searchEntry, setSearchEntry] = useState('');
    const { organizer } = useOrganizer(null);
    const [participants, setParticipants] = useState([]);
    const [rsvp, setRsvp] = useState([]);
    const [showRSVP, setShowRSVP] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const [selectedPitch, setSelectedPitch] = useState('');


    // Add filtered data using useMemo
    const filteredParticipants = useMemo(() => {
        if (!searchEntry) return participants;
        const searchLower = searchEntry.toLowerCase();
        return participants.filter(participant => {
            const fullName = `${participant.firstname} ${participant.lastname}`.toLowerCase();
            return (
                fullName.includes(searchLower) ||
                participant.email.toLowerCase().includes(searchLower) ||
                participant.phone.toLowerCase().includes(searchLower) ||
                participant.city.toLowerCase().includes(searchLower) ||
                participant.state.toLowerCase().includes(searchLower) ||
                participant.sport.toLowerCase().includes(searchLower)
            );
        });
    }, [participants, searchEntry]);


    const filteredRSVP = useMemo(() => {
        if (!searchEntry) return rsvp;
        const searchLower = searchEntry.toLowerCase();
        return rsvp.filter(rsvpItem => {
            const fullName = `${rsvpItem.firstname} ${rsvpItem.lastname}`.toLowerCase();
            return (
                fullName.includes(searchLower) ||
                rsvpItem.email.toLowerCase().includes(searchLower) ||
                rsvpItem.phone.toLowerCase().includes(searchLower) ||
                rsvpItem.city.toLowerCase().includes(searchLower) ||
                rsvpItem.state.toLowerCase().includes(searchLower)
            );
        });
    }, [rsvp, searchEntry]);




    useEffect(() => {
        const fetchParticipants = async () => {
            setLoading(true);

            try {
                const response = await fetch("/api/organizer/all-registered");
                const data = await response.json();
                if (data.success) {
                    setParticipants(data.participants);
                }
            } catch (error) {
                console.error("Error fetching participants:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchRsvp = async () => {
            setLoading(true);
            try {
                const response = await fetch("/api/organizer/all-rsvp");
                const data = await response.json();
                if (data.success) {
                    setRsvp(data.rsvpAll);
                }
            } catch (error) {
                console.error("Error fetching rsvp:", error);
            } finally {
                setLoading(false);
            }
        };


        fetchRsvp();
        fetchParticipants();
    }, []);

    const handleSearchEntry = (e) => {
        setSearchEntry(e.target.value);
    };

    const openPitchModal = (pitch) => {
        setSelectedPitch(pitch);
        setOpenModal(true);
    };

    if (loading) return <Loading />;

    return (
        <div className='px-10 pb-10 md:w-[80svw] w-screen'>
            <h1 className='font-assistant text-2xl'>Dashboard</h1>
            <p className='text-3xl'>{organizer?.name}</p>

            {/* Stats Cards */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-10'>
                <div className='border border-black border-opacity-5 px-10 py-5 rounded-md shadow-lg text-center'>
                    <h2 className='text-5xl font-thin font-anton'>{participants?.length || " - "}</h2>
                    <p className='font-assistant text-xl'>Total Registrations</p>
                </div>
                <div className='border border-black border-opacity-5 px-10 py-5 rounded-md shadow-lg text-center'>
                    <h2 className='text-5xl font-thin font-anton'>{rsvp?.length || " - "}</h2>
                    <p className='font-assistant text-xl'>Total RSVP</p>
                </div>
                <div className='border border-black border-opacity-5 px-10 py-5 rounded-md shadow-lg text-center'>
                    <h2 className='text-5xl font-thin font-anton'>0</h2>
                    <p className='font-assistant text-xl'>Selected</p>
                </div>
                <div className='border border-black border-opacity-5 px-10 py-5 rounded-md shadow-lg text-center'>
                    <h2 className='text-5xl font-thin font-anton'>0</h2>
                    <p className='font-assistant text-xl'>Paid Participation Fee</p>
                </div>
            </div>

             {/* Search Bar */}
             <div className='flex flex-row items-center gap-3 w-fit bg-[#D9D9D9] text-black px-2 my-4 rounded-md'>
                <input
                    type="search"
                    name="searchEntry"
                    id="searchEntry"
                    placeholder='Search '
                    value={searchEntry}
                    onChange={handleSearchEntry}
                    className='px-2 bg-[#D9D9D9] py-1 font-medium focus:outline-none'
                />
                <SearchIcon className='cursor-pointer' />
            </div>

            <div className='mt-20 flex gap-5'>
                <button onClick={() => setShowRSVP(false)} className={`px-5 py-2 border border-black border-opacity-10 rounded-t-lg hover:scale-[102%] transition-all duration-150 ${!showRSVP ? "bg-black text-white" : "bg-white text-black"}`}>
                    PARTICIPANTS
                </button>
                <button onClick={() => setShowRSVP(true)} className={`px-5 py-2 border border-black border-opacity-10 rounded-t-lg hover:scale-[102%] transition-all duration-150 ${showRSVP ? "bg-black text-white" : "bg-white text-black"}`}>
                    RSVP
                </button>
            </div>
            <hr />

            {/* Participants Table */}
            {!showRSVP && <div className="overflow-x-auto w-full mt-5">
                <p>Scroll <ArrowRightIcon sx={{ paddingBottom: "2px" }} /></p>
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Sl No.</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">DOB</th>
                            <th className="border p-2">Gender</th>
                            <th className="border p-2">Sport</th>
                            <th className="border p-2">City</th>
                            <th className="border p-2">State</th>
                            <th className="border p-2">Instagram</th>
                            <th className="border p-2">Portfolio</th>
                            <th className="border p-2">YouTube</th>
                            <th className="border p-2">Pitch</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Phone</th>
                            <th className="border p-2 text-nowrap">How did you hear about us?</th>
                            <th className="border p-2">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredParticipants.length > 0 ? (
                            filteredParticipants.map((participant, index) => (
                                <tr key={participant._id} className="text-center">
                                    <td className="border p-2">{index + 1}</td>
                                    <td className="border p-2">{participant.firstname} {participant.lastname}</td>
                                    <td className="border p-2 text-nowrap">{participant.dob}</td>
                                    <td className="border p-2">{participant.gender}</td>
                                    <td className="border p-2">{participant.sport}</td>
                                    <td className="border p-2">{participant.city}</td>
                                    <td className="border p-2">{participant.state}</td>
                                    <td className="border p-2">
                                        {participant.instagram ? (
                                            <a
                                                href={participant.instagram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline text-nowrap"
                                            >
                                                Instagram
                                            </a>
                                        ) : "N/A"}
                                    </td>
                                    <td className="border p-2">
                                        {participant.portfolio ? (
                                            <a
                                                href={participant.portfolio}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline text-nowrap"
                                            >
                                                Portfolio
                                            </a>
                                        ) : "N/A"}
                                    </td>
                                    <td className="border p-2">
                                        {participant.youtube ? (
                                            <a
                                                href={participant.youtube}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline text-nowrap"
                                            >
                                                YouTube
                                            </a>
                                        ) : "-"}
                                    </td>
                                    <td className="border p-2">
                                        <button
                                            onClick={() => openPitchModal(participant.pitch)}
                                            className="bg-white text-black border border-black border-opacity-10 shadow-lg hover:scale-[105%] transition-all duration-200 px-2 py-1 rounded"
                                        >
                                            View
                                        </button>
                                    </td>
                                    <td className="border p-2">{participant.email}</td>
                                    <td className="border p-2">{participant.phone}</td>
                                    <td className="border p-2">{participant.info}</td>
                                    <td className="border p-2">{new Date(participant.createdAt).toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="13" className="border p-2 text-center">
                                    No participants found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>}

            {/* Pitch Modal */}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg w-96"
                >
                    <h2 className="text-lg font-bold">Participant's Pitch</h2>
                    <p className="mt-2">{selectedPitch}</p>
                    <button
                        onClick={() => setOpenModal(false)}
                        className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
                    >
                        Close
                    </button>
                </Box>
            </Modal>





            {showRSVP && <div className="overflow-x-auto w-full mt-5">
                <p>Scroll <ArrowRightIcon sx={{ paddingBottom: "2px" }} /></p>
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Sl No.</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">DOB</th>
                            <th className="border p-2">Gender</th>
                            <th className="border p-2">City</th>
                            <th className="border p-2">State</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Phone</th>
                            <th className="border p-2 text-nowrap">How did you hear about us?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRSVP.length > 0 ? (
                            filteredRSVP.map((rsvp, index) => (
                                <tr key={rsvp._id} className="text-center">
                                    <td className="border p-2">{index + 1}</td>
                                    <td className="border p-2">{rsvp.firstname} {rsvp.lastname}</td>
                                    <td className="border p-2">{rsvp.dob}</td>
                                    <td className="border p-2">{rsvp.gender}</td>
                                    <td className="border p-2">{rsvp.city}</td>
                                    <td className="border p-2">{rsvp.state}</td>
                                    <td className="border p-2">{rsvp.email}</td>
                                    <td className="border p-2">{rsvp.phone}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="13" className="border p-2 text-center">
                                    No RSVP found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>}


        </div>
    );
};

export default Organizer;
