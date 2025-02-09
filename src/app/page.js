'use client'

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Loading from "./components/Loading";

// import Hero from "./components/Hero"
// import Events from "./components/Events"


export default function Home() {

  const router = useRouter()

  useEffect(()=>{
    router.push('/register/personal')
  }, [])

  return (
   <div className=''>
      <Loading />
   </div>
  );
}
