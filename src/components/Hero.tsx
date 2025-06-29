"use client";

export default function Hero() {
 
  return (
    <div className=" flex flex-col text-center overflow-x-hidden">
      <div className="flex flex-col mypic h-screen w-screen py-8">
        <nav className="bg-transparent z-50 flex">
          <li className="flex w-screen justify-evenly font-monojb ">
            <ul className="cursor-pointer text-gray-300 hover:text-[#f18f01] transition-all">About</ul>
            <ul className="cursor-pointer text-gray-300 hover:text-[#f18f01] transition-all">Works</ul>
            <ul className="cursor-pointer text-gray-300 hover:text-[#f18f01] transition-all">Skills</ul>
            <ul className="cursor-pointer text-gray-300 hover:text-[#f18f01] transition-all">Contact</ul>
          </li>
        </nav>
        <div         
          className="text-3xl text-gray-200 text-left z-20 font-monojb w-screen py-56"
        >
          <p>
             <span className="font-monojb pl-[65vw] ">Hey, <span className="text-[#f18f01]">I'm</span> Abhijith J Nair.</span>
          <br />
        </p>
        </div>
        <div className="w-screen">
         
           <p className="text-gray-200 font-semibold px-24 text-left text-3xl z-20 font-monojb pt-28">
          <span className="text-[#f18f01]">Intermediate</span> AI & ML and Full Stack <br />
        </p>
          <h1 className="text-7xl scale-[395%] font-satoshi text-white font-semibold pt-8">
            DEVELOP<span className="text-[#f18f01]">ER.</span>
          </h1>
          
        </div>
    </div>
     <div className="flex flex-col w-screen h-screen justify-center items-center"> 
      <h2 className=" mb-8 text-left px-16 font-satoshi scale-[200%] font-semibold text-7xl">My Works!</h2>
      

     </div>
        
        </div>
        

      
  );
}

