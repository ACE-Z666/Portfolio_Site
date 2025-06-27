"use client";

export default function Hero() {

  return (
    <div className="min-h-[90vh] flex items-start w-full text-center relative overflow-hidden">
      <div className=" flex flex-col items-start justify-start w-[85vw]">
       
        <div className="text-7xl text-left font-satoshi font-semibold py-32 font-italic px-16 bg-[#0f0f0f] w-[85vw]">
          <h1> AI <span className="text-[#DC851F]">&</span> ML Developer, <br /> Intermediate Full Stack Developer.</h1>
        </div>
         <div className="text-xl text-gray-400  text-left font-monojb w-[80vw] pb-10 px-16 mt-20">
          <span className="text-[#DC851F]">Hey I'm Abhijith J Nair, </span><br /><br /> Aspiring Full Stack Developer and AI enthusiast with hands-on experience in building intelligent web applications using React, Node.js, Langchain and Huggingface. Adept at team leadership, event planning, and designing scalable software solutions. Looking to leverage tech + strategy skills in an internship or junior developer role.
        </div>
        
      </div>
      <div className="h-screen w-[20vw]" >

      </div>
    </div>
  );
}

