"use client";

import HeroNavbar from "./HeroNavbar";
export default function Hero() {

  
 
  return (
    <div className=" flex flex-col w-screen text-center overflow-x-hidden">
      <div className="flex flex-col h-screen w-screen px-48 ">
        <div className="flex flex-col h-screen justify-start items-start">
          <div         
          className=" flex items-center justify-start gap-72 py-24 text-gray-200 h-1/2 text-left z-20 font-satoshi w-screen"
        >
          <p className="text-7xl scale-150 px-36">
             <span className="font-normal leading-10 ">Hey<span className="text-[#f18f01]">,</span> <br /> <span className="text-[#f18f01]">I'm</span> Abhijith J Nair.</span>
          <br />
        </p>
        <div className="pl-72 pt-24">
        <HeroNavbar />

        </div>
        </div>
        <div className="w-screen h-1/2 flex text-3xl items-center justify-start gap-96">  
        <p className=" text-left font-satoshi font-light pt-28">
        Interested?<br />Check out my <span className="uppercase text-[#f18f01]">résumé</span>
        </p>
           <div className="flex flex-col items-end px-48 justify-center">
            <p className="text-gray-200  text-5xl z-20 font-satoshi font-normal">
          <span className="text-[#f18f01]">Intermediate</span> AI & ML and Full Stack <br />
        </p>
          <h1 className="text-7xl scale-150 px-24 font-satoshi text-white font-semibold pt-8">
            DEVELOP<span className="text-[#f18f01]">ER.</span>
          </h1>
           </div>
          
        </div>
        </div>
    </div>
     <div className="flex flex-col w-screen h-screen justify-center items-center"> 
  
      
  

      <h2 className=" mb-8 text-left px-16 font-satoshi scale-150 font-light text-7xl">Its all in the <span className="text-[#f18f01] uppercase font-normal">Code.</span></h2>
      

     </div>
        
        </div>
        

      
  );
}

