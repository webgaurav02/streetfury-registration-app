"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
//React buttons
// import {
//     GoogleLoginButton,
//     // FacebookLoginButton,
// } from "react-social-login-buttons";



const providers = [
    { name: "Google", id: "google" },
    // { name: "GitHub", id: "github" },
    // { name: "Facebook", id: "facebook" },
    // { name: "Apple", id: "apple" },
    // { name: "Discord", id: "discord" },
    // { name: "LinkedIn", id: "linkedin" },
    // { name: "Spotify", id: "spotify" },
    // { name: "Twitter", id: "twitter" },
];

//React Toastify
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Assets
// import bg from "../../../../public/images/signin_bg.jpg"


//Components
import Loading from "../../components/Loading";


//Assets
import logo from "../../../../public/Logo/img-removebg-black.png"





export default function SignUp() {

    const { status } = useSession();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [loading, isLoading] = useState(false);

    const [showOtp, setShowOtp] = useState(false); // To toggle OTP input
    const [otp, setOtp] = useState("");
    const [otpId, setOtpId] = useState(""); // Store OTP ID from the server

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    useEffect(() => {
        if (status === "authenticated") {
            router.push('/');
        }
    }, [status, router]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            toast.error("Passwords don't match!");
            return;
        }

        if (!emailRegex.test(email)) {
            return;
        }

        if (!passwordRegex.test(password)) {
            toast.error("Password must have at least 8 characters, a number, and a special character.");
            return;
        }

        try {
            isLoading(true);
            const res = await fetch("/api/auth/send-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (!res.ok) {
                toast.error(data.error || "Failed to send OTP.");
                isLoading(false);
                return;
            }

            setOtpId(data.otpId);
            setShowOtp(true);
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            isLoading(false);
        }
    };

    const handleOtpSubmit = async () => {
        try {
            isLoading(true);
            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ otp, otpId }),
            });

            const data = await res.json();
            if (!res.ok) {
                toast.error(data.error || "Invalid OTP.");
                isLoading(false);
                return;
            }

            const res1 = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            isLoading(true);
            const data1 = await res1.json();
            if (!res1.ok) {
                toast.error(data1.error || "Invalid Credentials.");
                isLoading(false);
                return;
            }

            const result = await signIn("credentials", {
                email,
                password,
                emailVerified: true,
                redirect: false,
            });

            if (result?.error) {
                toast.error(result.error);
                return;
            }

            router.push("/");

        } catch (error) {
            toast.error("OTP verification failed.");
        } finally {
            isLoading(false);
        }
    };


    // if (loading) return <Loading />

    return (
        <div>
            {loading && <Loading />}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                {...{ transition: Bounce }}
            />
            <div className="relative flex min-h-[100svh] min-w-full justify-center items-center">
                {status === "unauthenticated" && (
                    <div>
                        <div className="absolute top-0 left-0 w-screen h-full bg-[#f8f8f8] -z-40" />

                        <div className="text-center">
                            <motion.div
                                className="md:min-w-[30vw] min-w-[90svw] mt-10 bg-white  border-black shadow-2xl backdrop-blur-md px-10 py-10 rounded-md"
                                initial={{ y: "-10%", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: "-100%", opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                                {/* <h1 className="text-3xl font-anton mb-10">MINUS01</h1> */}
                                <Image
                                    src={logo}
                                    alt="MINUS01"
                                    height="0"
                                    width="0"
                                    sizes="100svw"
                                    className="h-20 w-auto mx-auto mb-10"
                                />
                                <h1 className="text-xl font-bold font-inter uppercase mb-10">Sign Up</h1>

                                {/* {!showOtp ? ( */}
                                <div>
                                    <div className="pb-5">
                                        {/* Using react-social-login-buttons */}
                                        {providers.map((provider) => (
                                            <button key={provider.id} onClick={() => signIn(provider.id)} className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-md shadow-sm px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                <Image
                                                    src="/images/google-icon.png"
                                                    alt="Google"
                                                    width={20}
                                                    height={20}
                                                    className="mr-2"
                                                />
                                                Sign in with Google
                                            </button>
                                        ))}
                                    </div>

                                    {/* <div className="flex flex-row justify-center gap-2">

                                            <p className="border-b mb-3 border-text w-full"></p>

                                            <p className="text-xl">Or</p>

                                            <p className="border-b mb-3 border-text w-full"></p>

                                        </div>

                                        <form onSubmit={handleSubmit} className="flex flex-col py-10">
                                            <div className={`border ${(!emailRegex.test(email) && email !== "") ? "border-red-600" : "border-text"} flex flex-col text-left rounded-md px-2 py-1`}>
                                                <label htmlFor="email" className="text-xs">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    className="bg-transparent border-none outline-none"
                                                />
                                            </div>
                                            <div className="mt-2 border border-text flex flex-col text-left rounded-md px-2 py-1">
                                                <label htmlFor="password" className="text-xs">Password</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                    className="bg-transparent border-none outline-none"
                                                />
                                            </div>
                                            <div className="mt-2 border border-text flex flex-col text-left rounded-md px-2 py-1">
                                                <label htmlFor="passwordConfirm" className="text-xs">Re-enter Password</label>
                                                <input
                                                    type="password"
                                                    name="passwordConfirm"
                                                    value={passwordConfirm}
                                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                                    required
                                                    className="bg-transparent border-none outline-none"
                                                />
                                            </div>
                                            <button type="submit" className="mt-5 bg-secondary text-white hover:bg-accent transition-colors py-2 font-semibold">Create Account</button>
                                        </form>

                                    </div>
                                ) : (
                                    <div

                                        className="flex flex-col py-10"
                                    >
                                        <h2 className="text-xl mb-4">Enter the OTP sent to your email</h2>
                                        <div className="mt-2 border border-text flex flex-col text-left rounded-md px-2 py-1">
                                            <label htmlFor="otp" className="text-xs">OTP</label>
                                            <input
                                                type="text"
                                                name="otp"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                required
                                                className="bg-transparent border-none outline-none"
                                            />
                                        </div>
                                        <button onClick={handleOtpSubmit} className="mt-5 bg-secondary text-white hover:bg-accent transition-colors py-2 font-semibold">
                                            Verify OTP
                                        </button>
                                        )}*/}
                                </div>

                                <Link href="/auth/signin">
                                    Already have an account? <b>Login</b>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}