"use client";
import Cards from './Cards.tsx';

const projects = [
  {
    title: 'AI Chatbot',
    description: 'Conversational AI chatbot using NLP and deep learning.',
    tech: ['Python', 'TensorFlow', 'React'],
  },
  {
    title: 'Portfolio Website',
    description: 'Personal portfolio built with Next.js and Tailwind CSS.',
    tech: ['Next.js', 'Tailwind', 'Framer Motion'],
  },
  {
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce app with authentication and payments.',
    tech: ['Node.js', 'Express', 'MongoDB', 'React'],
  },
];

export default function Projects() {
  return (
    <div className=" flex flex-col ">
      <div className="flex flex-col w-screen h-screen justify-center items-center"> 
      <h2 className=" mb-8 text-left px-16 font-satoshi scale-[200%] font-semibold text-7xl">My Works!</h2>
      

     </div>
     <Cards></Cards>
    </div>
  );
} 