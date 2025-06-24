"use client";

export default function Hero() {

  return (
    <div className="flex flex-col items-center  justify-center min-h-[90vh] w-full  bg-transparent text-center relative overflow-hidden">
       
        <div>
      <h1
        className="text-xl md:text-2xl scale-125 md:scale-125 test-agraham mb-4 text-white bg-clip-text drop-shadow-lg "
      >
      Hey, I am <span className='text-white'> Abhijith J Nair</span>
      </h1>  
      <h1
        className="text-3xl md:text-7xl scale-125 test-moxa font-medium mb-4 text-white bg-clip-text drop-shadow-lg"
      >
        <span className='text-white'>AI & ML</span> Developer
      </h1>
      <p
        className="text-3xl md:text-7xl test-moxa font-medium text-white mb-8"
      >
      Intermediate <span className='text-white font-medium'>Full Stack Developer</span>
      </p>
      <a
        href='#Projects'
        className=" text-gray-300 flex flex-col test-moxa text-2xl uppercase font-medium"
      >
       <div>
        <a href="" className='text-white px-20'>Resume</a>
        <a href="https://www.linkedin.com/in/abhijith-j-nair" className='text-white px-8'>LinkedIn</a>
        <a href="https://github.com/ACE-Z666" className='text-white px-20'>GitHub</a>
       </div>
      </a>
      {/* Glowing background visuals */}
      <div className="absolute inset-0 -z-60 flex items-center justify-center">
        <div className="w-full h-full bg-gradient-radial from-blue-700/40 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>
      </div>
    </div>
  );
}

