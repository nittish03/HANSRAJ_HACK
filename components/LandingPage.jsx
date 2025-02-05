import { ArrowBigRight, ArrowRight } from 'lucide-react';
import React from 'react';

const LandingPage = () => {
  return (
    <div className='text-white  py-[32px] flex items-center justify-center min-h-[91vh] '>
      <div className="container relative flex flex-col items-center">
        <div className="flex items-center justify-center">
          <a href="#" className="inline-flex gap-3 border py-1 px-2 rounded-lg border-white/30 relative overflow-clip">
            <span className="bg-gradient-to-r from-pink-500 to-yellow-300 text-transparent bg-clip-text">Bringing Healthcare Closer to You – Anytime, Anywhere!</span>
            <span className="inline-flex items-center gap-1">
              <span className="text-teal-500"><ArrowRight /></span>
            </span>
          </a>
        </div>
        <h1 className="text-7xl font-bold tracking-tighter text-center mt-8">MediCare</h1>
        <p className="text-center text-xl mt-4">
        Simplifying healthcare for rural communities—telemedicine, <br /> affordable transport, and health education <br /> all in one place! 
        </p>
        <div className="flex justify-center mt-6">
          <button className="transition-all  duration-500 bg-white text-black py-3 px-5 rounded-lg font-medium    hover:bg-black hover:text-white hover:border hover:border-white">Get for free</button>
        </div>
      </div>
      <div className="flex justify-center items-center absolute left-[33vw] mt-6">
        <div className=""></div>
      </div>
    </div>
  );
}

export default LandingPage;
