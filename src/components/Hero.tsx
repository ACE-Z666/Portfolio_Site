"use client";

import HeroNavbar from "./HeroNavbar";
export default function Hero() {

  
 
  return (
    <div className=" flex flex-col w-screen text-center overflow-x-hidden sm:pr-48">
      <div className="flex flex-col h-screen w-screen sm:px-48 px-6 ">
        <div className="flex flex-col h-screen justify-start items-start">
          <div          
          className=" flex sm:flex-row flex-col-reverse sm:justify-between justify-start sm:gap-48 gap-0  px-2 py-20 sm:pt-28 text-gray-200 h-1/2 text-left z-20 font-satoshi w-full"
        >
          <p className="sm:text-7xl sm:scale-150 sm:px-32 sm: pt-8 text-4xl sm:text-left text-left">
             <span className="font-normal leading-10 ">Hey<span className="text-[#f18f01]">,</span> <br /> <span className="text-[#f18f01]">I'm</span> Abhijith J Nair.</span>
          <br />
        </p>
        <div className="sm:text-right sm:opacity-100 opacity-0 sm:pt-24 pt-0">
        <HeroNavbar />

        </div>
        </div>
        <div className="w-full sm:h-1/2 flex sm:flex-row flex-col-reverse mt-0 sm:text-3xl text-xl sm:pt-0 pt-12 sm:justify-between justify-start">  
        <p className=" sm:text-left text-left font-satoshi font-light sm:pt-28 pt-12 pb-12">
        Interested?<br />Check out my <span className="uppercase text-[#f18f01] cursor-pointer hover:underline transition-all decoration-1">résumé</span>
        </p>
           <div className="flex flex-col sm:items-end justify-center sm:pb-0 pb-12">
            <p className="text-gray-200 sm:text-5xl sm:px-0 pl-5 sm:text-right text-right text-xl z-20 font-satoshi font-normal">
          <span className="text-[#f18f01]">Intermediate</span> AI & ML and Full Stack <br />
        </p>
          <h1 className="sm:text-7xl sm:scale-150 text-5xl sm:px-24 sm:text-right text-right font-satoshi text-white font-semibold sm:pt-8 pt-2">
            DEVELOP<span className="text-[#f18f01]">ER.</span>
          </h1>
           </div>
          
        </div>
        </div>
    </div>
     <div className="flex flex-col w-screen h-screen justify-center items-center"> 
  
      
  
      <h2 className="mb-8 text-left px-16 font-satoshi sm:scale-110 font-light sm:text-7xl text-5xl py-20 text-[#f18f01]">Guess <span className="text-white">What!</span></h2>
      <h2 className=" mb-8 text-center px-16 font-satoshi scale-150 font-light text-7xl">Its all in the <span className="text-[#f18f01] uppercase font-normal">Code.</span></h2>
      

     </div>
        
        </div>
        

      
  );
}

