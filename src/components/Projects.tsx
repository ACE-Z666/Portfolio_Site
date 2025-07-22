"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const featuredProjects = [
  {
    title: "Chat-It.",
    subtitle: "Chat with the Users around the World",
    services: "React · Express · MongoDB · Node.js",
    image: "/cards/img2.png",
  }, 
  {
    title: "EchoLearn.",
    subtitle: "The Complete Student's ToolKit - Including the Exclusive Echo AI",
    services: "React · Langchain · RAG · PineconeDB · MERN",
    image: "/cards/img1.png",
  },
  
  {
    title: "iPhone Threejs.",
    subtitle: "Clone of iPhone 15 Pro with a 3D model of it",
    services: "React · ThreeJs · GSAP · Tailwind CSS",
    image: "/cards/img3.png",
  },
  {
    title: "Arcane.",
    subtitle: "Contributed to the Website of Event named 'Arcane'",
    services: "React · Tailwind CSS",
    image: "/cards/img4.png",
  },
];

const Projects: React.FC = () => {
  useEffect(() => {
    const scrollSections = document.querySelectorAll(".scroll-section");

    scrollSections.forEach((section) => {
      const wrapper = section.querySelector(".wrapper");
      if (!wrapper) return;

      const items = wrapper.querySelectorAll(".item");
      if (!items.length) return;

      initScroll(section, items);
    });

    function initScroll(section: Element, items: NodeListOf<Element>) {
      items.forEach((item, index) => {
        gsap.set(item, {
          yPercent: index === 0 ? 0 : 130,
          zIndex: index,
        });
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: () => `+=${items.length * 100}%`,
          scrub: 3,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      items.forEach((item, index) => {
        if (items[index + 1]) {
          timeline.set(items[index + 1], { zIndex: items.length + index });
          timeline.to(items[index + 1], { yPercent: 0 });
          timeline.to(item, { scale: 0.9, borderRadius: "10px" }, "<");
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.globalTimeline.clear();
    };
  }, []);

  return (
    <section className="scroll-section h-screen w-screen bg-transparent items-center relative overflow-hidden">
      <div className="wrapper relative w-full h-full flex flex-col items-center justify-center gap-8">
        {featuredProjects.map((project) => (
          <div
            key={project.title}
            className="item absolute inset-0 featured-card bg-transparent w-screen h-screen rounded-2xl shadow-lg overflow-hidden flex flex-col cursor-pointer"
          >
            <div className="relative w-full h-full bg-gray-700 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute scale-125 inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent flex flex-col justify-end py-36 px-80">
                <h3 className="text-4xl md:text-7xl font-semibold font-satoshi mb-3 text-[#f18f01]">
                  {project.title}
                </h3>
                <p className="text-gray-200 font-satoshi text-xl md:text-2xl mb-2">
                  {project.subtitle}
                </p>
                <p className="text-gray-300 text-sm font-monojb">{project.services}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12 relative z-50">
        <a
          href="#"
          className="inline-block text-base md:text-lg font-semibold text-[#f18f01] hover:underline transition-all"
        >
          See all work &rarr;
        </a>
      </div>
    </section>
  );
};

export default Projects;
