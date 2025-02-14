"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
//React buttons
// import {
//   GoogleLoginButton,
//   // FacebookLoginButton,
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


//Assets
// import bg from "../../../../public/images/signin_bg.jpg"

export default function SignIn() {

  const { status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/")
    }
  }, [status, router]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setErrorMessage("Invalid email or password");
    }
    else {
      router.push('/')
    }

  };

  return (
    <div className="relative flex min-h-[100svh] min-w-full justify-center items-center">

      {status === 'unauthenticated' && <div>

        <div className="absolute top-0 left-0 w-screen h-full bg-[#f8f8f8] -z-40">

        </div>

        <div className="text-center">
          <motion.div
            className="md:min-w-[30vw] min-w-[90svw] mt-10 bg-white shadow-2xl backdrop-blur-md px-10 py-10 rounded-md"
            initial={{ y: "-10%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <h1 className="text-3xl font-anton mb-10">MINUS01</h1>
            <h1 className="text-xl font-bold font-inter uppercase mb-10">Sign In</h1>

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
              {errorMessage && <p className="mb-5 text-red-600">{errorMessage}</p>}
              <div className="border border-text flex flex-col text-left rounded-md px-2 py-1">
                <label htmlFor="email" className="text-xs">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-transparent border-none outline-none"
                />
              </div>
              <div className="mt-2 border border-text flex flex-col text-left rounded-md px-2 py-1">
                <label htmlFor="email" className="text-xs">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-transparent border-none outline-none"
                />
              </div>
              <button type="submit" className="mt-5 bg-secondary text-white hover:bg-accent transition-colors py-2 font-semibold">Sign In</button>
            </form> */}

            <Link href='/auth/signup'>
              Need an account? <b>Sign Up</b>
            </Link>
          </motion.div>
        </div>
      </div>}
    </div>
  );
}