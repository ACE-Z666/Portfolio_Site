import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { url } from "inspector";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Dummy data array
const featuredProjects = [
  {
    title: "EchoLearn",
    subtitle: "The Complete Student's ToolKit",
    services: "React · Langchain · RAG . PineconeDB . MERN",
    image: "/cards/img1.png",
  },
  {
    title: "Chat-It",
    subtitle: "Chat with the Users around the World",
    services: "React . Express . MongoDB . Node.js",
    image: "/cards/img2.png",

  },
  {
    title: "Iphone Threejs Project",
    subtitle: "Clone of Iphone 15 Pro with a 3D model of it",
    services: "React . ThreeJs . GSAP . Tailwind CSS",
    image: "/cards/img3.png",
  },
  {
    title: "Arcane",
    subtitle: "Contributed in the Website of Event named 'Arcane'",
    services: "React . Tailwind CSS",
    image: "/cards/img4.png",
    
  },
];

const Cards: React.FC = () => {
  // useEffect(() => {
  //   const cards = document.querySelectorAll(".featured-card");
  //   if (cards.length) {
  //     gsap.fromTo(
  //       cards,
  //       { y: 200 },
  //       {
  //         y: 0,
  //         duration: 1,
  //         delay: 0.5,
  //         stagger: 1,
  //         scrollTrigger: {
  //           trigger: ".card1",
  //           start: "top 20%",
  //           end: "bottom 50%",
  //           scrub: 2,
  //           markers: true,
  //         },
  //       }
  //     );
  //   }
  // }, []);

  return (
    <section
      className="py-20 px-4 md:px-10 card1 lg:px-24 bg-transparent w-screen h-full"
    >
      <div className="w-5xl flex flex-col ">
       <h2></h2>
        <div className="flex flex-col h-full gap-8">
          {featuredProjects.map((project, idx) => (
            <div
              key={project.title}
              className="featured-card bg-[#18181b] rounded-2xl shadow-lg overflow-hidden flex flex-col hover:scale-[1.025] transition-transform duration-300 cursor-pointer"
            >
              <div className="relative w-full aspect-[16/9] bg-gray-900 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-7xl font-bold font-satoshi mb-3 text-[#f18f01]">{project.title}</h3>
                  <p className="text-gray-200 font-monojb text-3xl mb-4">{project.subtitle}</p>
                  <p className="text-gray-300  text-sm font-monojb">{project.services}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <a
            href="#"
            className="inline-block text-base md:text-lg font-semibold text-[#f18f01] hover:underline transition-all"
          >
            See all work &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};

export default Cards;
