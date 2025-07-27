"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Draggable, ScrollTrigger);

const featuredProjects = [
  {
    title: "Chat-It.",
    subtitle: "Chat with the Users around the World",
    services: "React · Express · MongoDB · Node.js",
    image: "https://placehold.co/1200x800/000000/f18f01?text=Chat-It",
  },
  {
    title: "EchoLearn.",
    subtitle: "The Complete Student's ToolKit - Including the Exclusive Echo AI",
    services: "React · Langchain · RAG · PineconeDB · MERN",
    image: "https://placehold.co/1200x800/000000/f18f01?text=EchoLearn",
  },
  {
    title: "iPhone Threejs.",
    subtitle: "Clone of iPhone 15 Pro with a 3D model of it",
    services: "React · ThreeJs · GSAP · Tailwind CSS",
    image: "https://placehold.co/1200x800/000000/f18f01?text=iPhone+3D",
  },
  {
    title: "Arcane.",
    subtitle: "Contributed to the Website of Event named 'Arcane'",
    services: "React · Tailwind CSS",
    image: "https://placehold.co/1200x800/000000/f18f01?text=Arcane",
  },
];

const allProjectsCard = {
  title: "See all Projects",
  isLink: true,
  href: "#",
};

const Projects: React.FC = () => {
  const allItems = [...featuredProjects, allProjectsCard];
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let draggableInstance: Draggable | null = null;

      const setupCarousel = () => {
        draggableInstance?.kill();
        autoplayRef.current?.kill();

        const items = gsap.utils.toArray<HTMLElement>(".carousel-item");
        if (!items.length || !slidesRef.current || !wrapperRef.current) return;

        const itemWidth = items[0].offsetWidth;
        const totalWidth = itemWidth * items.length;

        gsap.set(slidesRef.current, { width: totalWidth });

        const goToSlide = (index: number, isInitial = false) => {
          const newIndex = (index % items.length + items.length) % items.length;
          setActiveIndex(newIndex);
          gsap.to(slidesRef.current, {
            x: -newIndex * itemWidth,
            duration: isInitial ? 0 : 0.75,
            ease: "power3.inOut",
          });
        };

        // Delay initial render to wait for layout to stabilize
        requestAnimationFrame(() => goToSlide(activeIndex, true));

        const startAutoplay = () => {
          autoplayRef.current = gsap.delayedCall(5, () => {
            goToSlide(activeIndex + 1);
            startAutoplay();
          }).pause();
        };

        startAutoplay();

        draggableInstance = Draggable.create(slidesRef.current, {
          type: "x",
          inertia: true,
          bounds: wrapperRef.current,
          edgeResistance: 0.65,
          onPress: () => autoplayRef.current?.pause(),
          onRelease: function () {
            const snappedIndex = Math.round(this.x / -itemWidth);
            goToSlide(snappedIndex);
            autoplayRef.current?.resume(2);
          },
        })[0];
      };

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => autoplayRef.current?.resume(),
        onLeave: () => autoplayRef.current?.pause(),
        onEnterBack: () => autoplayRef.current?.resume(),
        onLeaveBack: () => autoplayRef.current?.pause(),
        onRefresh: setupCarousel,
      });

      setupCarousel();

      window.addEventListener("resize", setupCarousel);

      return () => {
        window.removeEventListener("resize", setupCarousel);
        draggableInstance?.kill();
        autoplayRef.current?.kill();
      };
    }, wrapperRef);

    return () => ctx.revert();
  }, [activeIndex]);

  const handleDotClick = (index: number) => {
    const items = gsap.utils.toArray<HTMLElement>(".carousel-item");
    if (!items.length || !slidesRef.current) return;

    const itemWidth = items[0].offsetWidth;
    autoplayRef.current?.pause();
    setActiveIndex(index);

    gsap.to(slidesRef.current, {
      x: -index * itemWidth,
      duration: 0.75,
      ease: "power3.inOut",
      onComplete: () => autoplayRef.current?.restart(true).resume(2),
    });
  };

  return (
    <section
      ref={wrapperRef}
      className="relative w-full h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden font-satoshi"
    >
      <div ref={slidesRef} className="relative h-full flex">
        {allItems.map((item, index) => (
          <div
            key={item.title + index}
            className="carousel-item w-screen h-full flex items-center justify-center px-[5vw] md:px-[15vw] flex-shrink-0"
          >
            <div className="w-full h-[70vh] transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
              {item.isLink ? (
                <a
                  href={item.href}
                  className="w-full h-full flex items-center justify-center bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg hover:bg-gray-800 hover:scale-105 transition-all duration-300"
                >
                  <h3 className="text-3xl md:text-5xl font-semibold text-[#f18f01]">
                    {item.title} &rarr;
                  </h3>
                </a>
              ) : (
                <div className="relative w-full h-full bg-black rounded-2xl shadow-2xl shadow-orange-500/20 overflow-hidden group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src =
                        "https://placehold.co/1200x800/000000/FFFFFF?text=Image+Not+Found";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end p-6 md:p-12 transition-opacity duration-300">
                    <h3 className="text-4xl md:text-7xl font-bold mb-3 text-[#f18f01]">
                      {item.title}
                    </h3>
                    <p className="text-gray-200 text-lg md:text-2xl mb-2">
                      {item.subtitle}
                    </p>
                    <p className="text-gray-400 text-sm md:text-base font-mono">
                      {item.services}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-10 flex space-x-3 z-10">
        {allItems.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              activeIndex === i ? "bg-[#f18f01] scale-125" : "bg-gray-600"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
